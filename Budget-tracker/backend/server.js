import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import dotenv from "dotenv";
import connectDB, { pool } from "./config/db.js";
import cors from "cors";
import jwt from "jsonwebtoken";

dotenv.config();
connectDB();

const app = express();
const port = 5000;
const saltRounds = 15;

// ================= Middleware =================
app.use(session({
  secret: process.env.SESSION_SECRET || "secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
}));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= SIGN UP =================
app.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (password.length < 6 || password.length > 50) {
      return res.status(400).json({ error: "Password must be 6-50 chars long" });
    }
    if (!/^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/.test(password)) {
      return res.status(400).json({ error: "Password must contain a special character" });
    }

    const userCheck = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    const user = result.rows[0];

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "720h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(201).json({ message: "User created & authenticated", user, token });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ================= SIGN IN =================
app.post("/sign-in", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const checkUser = await pool.query(
      "SELECT * FROM users WHERE email=$1 OR username=$1",
      [usernameOrEmail]
    );

    if (checkUser.rows.length === 0) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const user = checkUser.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "720h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ message: "Login successful", user, token });
  } catch (err) {
    console.error("Signin error:", err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ================= Passport Serialize =================
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// ================= Google Strategy =================
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;

        // check if user exists
        let result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

        let user;
        if (result.rows.length === 0) {
          // insert new user
          const insert = await pool.query(
            "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
            [name, email, "google_oauth"]
          );
          user = insert.rows[0];
        } else {
          user = result.rows[0];
        }

        return done(null, user);
      } catch (err) {
        console.error("Google login error:", err);
        return done(err, null);
      }
    }
  )
);

// ================= Google Auth Routes =================
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/sign-in" }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "720h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // ✅ Redirect back to React with token in query
    res.redirect(`http://localhost:5173/DashBoard?token=${token}`);
  }
);

export default app;
