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
const port = process.env.PORT || 5000;
const saltRounds = 15;

// FRONTEND & BASE URL from env with sensible defaults
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const BASE_URL = process.env.BASE_URL || `http://localhost:${port}`;

// ================= Middleware =================
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- Helper: sign JWT & set cookie ----------------
function createAndSetToken(res, user) {
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "720h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return token;
}

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

    const token = createAndSetToken(res, user);

    // For security, don't return password hash in response
    delete user.password_hash;

    res.status(201).json({ message: "User created & authenticated", user, token });
  } catch (err) {
    console.error("Signup error:", err);
    // In dev it's helpful to send the message; in production you may hide this
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
});

// ================= SIGN IN =================
app.post("/sign-in", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const checkUser = await pool.query("SELECT * FROM users WHERE email=$1 OR username=$1", [
      usernameOrEmail,
    ]);

    if (checkUser.rows.length === 0) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const user = checkUser.rows[0];

    // Defensive: ensure column exists
    if (typeof user.password_hash === "undefined") {
      console.warn("signin: password_hash undefined for user row:", user);
      return res.status(500).json({ error: "Server: password field missing. Check DB." });
    }

    // If account was created via Google OAuth, tell user to use Google
    if (user.password_hash === "google_oauth" || user.password_hash === null) {
      return res
        .status(400)
        .json({ error: "This account was created with Google. Please sign in with Google." });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = createAndSetToken(res, user);

    // hide password_hash from response
    const safeUser = { ...user };
    delete safeUser.password_hash;

    res.json({ message: "Login successful", user: safeUser, token });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
});

// ================= Passport Serialize / Deserialize =================
// Serialize only the internal DB id to session
passport.serializeUser((user, done) => {
  // user might be full DB row or profile; try to extract DB id
  const id = user?.id ?? user?.user?.id ?? null;
  done(null, id);
});

// Deserialize: fetch user row by id from DB
passport.deserializeUser(async (id, done) => {
  try {
    if (!id) return done(null, null);
    const result = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    if (result.rows.length === 0) return done(null, null);
    const user = result.rows[0];
    delete user.password_hash;
    done(null, user);
  } catch (err) {
    console.error("Deserialize error:", err);
    done(err, null);
  }
});

// ================= Google Strategy =================
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL || BASE_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName || profile.name?.givenName || "GoogleUser";

        if (!email) {
          return done(new Error("Google profile has no email"), null);
        }

        // check if user exists
        let result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

        let user;
        if (result.rows.length === 0) {
          // insert new user. store marker in password_hash so local login is blocked
          const insert = await pool.query(
            "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
            [name, email, "google_oauth"]
          );
          user = insert.rows[0];
        } else {
          user = result.rows[0];
        }

        // Remove password hash before passing user to session
        if (user && user.password_hash) delete user.password_hash;

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

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: `${FRONTEND_URL}/sign-in` }),
  (req, res) => {
    const user = req.user;
    if (!user) {
      return res.redirect(`${FRONTEND_URL}/sign-in`);
    }

    // Create JWT and set cookie
    const token = createAndSetToken(res, user);

    // Redirect to frontend with token in query (or you can use cookies only)
    res.redirect(`${FRONTEND_URL}/DashBoard?token=${encodeURIComponent(token)}`);
  }
);

// simple health route
app.get("/health", (req, res) => res.json({ status: "ok" }));

console.log("JWT_SECRET:", process.env.JWT_SECRET);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
