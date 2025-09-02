import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
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

// Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || "secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
}));
app.use(cors({
  origin: "http://localhost:5173",  // tumhara React ka port
  credentials: true
}));
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example Sign-in route (POST, safer than GET)
app.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user in DB
    const result = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    const user = result.rows[0];

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ✅ Send token in cookie
    res.cookie("token", token, {
      httpOnly: true, // prevents JS access
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(201).json({ message: "User created & authenticated", user });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
