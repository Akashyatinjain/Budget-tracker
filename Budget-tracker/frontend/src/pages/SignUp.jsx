import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Particles from "../components/Particles.jsx";

export default function SignUp() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ New state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);

    setIsSubmitting(true); // ✅ disable button

    try {
      const res = await fetch("http://localhost:5000/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Response from backend:", data);
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setIsSubmitting(false); // ✅ enable button back
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff", "#a855f7", "#6366f1"]}
          particleCount={200}
          particleSpread={10}
          speed={0.15}
          particleBaseSize={120}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Sign In Card */}
      <div className="relative z-10 w-full max-w-md bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.8)] border border-gray-800 p-8">
        <h2 className="text-3xl font-extrabold text-center text-white tracking-wide">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mb-8 text-sm">
          Sign in to continue to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="text-left">
            <label className="block text-gray-300 text-sm mb-2">UserName</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
              placeholder="john_doe"
            />
          </div>

          {/* Email */}
          <div className="text-left">
            <label className="block text-gray-300 text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div className="text-left">
            <label className="block text-gray-300 text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
              placeholder="••••••••"
            />
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-purple-600" />
              <span>Remember me</span>
            </label>
            <a href="#" className="hover:text-purple-400 transition">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting} // ✅ Disable while submitting
            className={`w-full bg-gradient-to-r from-purple-600 to-purple-700 
              hover:from-purple-700 hover:to-purple-800 text-white font-semibold 
              py-3 rounded-xl transition transform hover:scale-[1.02] shadow-lg
              ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-700" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        {/* Google Sign in */}
        <button className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-medium py-3 rounded-xl shadow-md hover:bg-gray-100 transition">
          <FcGoogle size={22} /> Continue with Google
        </button>

        {/* Sign Up */}
      </div>
    </div>
  );
}
