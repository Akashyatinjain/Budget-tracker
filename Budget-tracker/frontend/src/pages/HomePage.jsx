import React from "react";
import { motion } from "framer-motion";
import { FaWallet, FaChartPie, FaBell, FaUsers, FaClock, FaMoneyBillWave } from "react-icons/fa";
import Particles from "../components/Particles.jsx";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col bg-black text-white overflow-x-hidden">
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

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-6 sm:px-12 py-4 backdrop-blur-md bg-gray-900/40 border-b border-gray-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-purple-400">
          BudgetTracker
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/sign-in")}
            className="px-5 py-2 rounded-full bg-white text-purple-700 font-semibold shadow-md hover:bg-gray-100 transition"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/sign-up")}
            className="px-5 py-2 rounded-full bg-purple-600 text-white font-semibold shadow-md hover:bg-purple-500 transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between px-6 sm:px-12 md:px-20 py-16 gap-12 md:gap-0">
        <div className="max-w-xl space-y-6 text-center md:text-left">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Smart Finance <span className="text-purple-400">Tracking</span> Made Easy
          </motion.h1>
          <motion.p
            className="text-gray-400 text-base sm:text-lg md:text-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Manage your expenses, bills, and savings in one intuitive dashboard.
            Stay in control of your finances effortlessly.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          >
            <button
              onClick={() => navigate("/sign-up")}
              className="px-8 py-3 rounded-full bg-purple-600 text-white font-bold shadow-lg hover:bg-purple-500 transition"
            >
              Get Started
            </button>
          </motion.div>
        </div>

        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, rotate: -10, y: 50 }}
          animate={{ opacity: 1, rotate: 0, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="w-44 sm:w-72 md:w-80 h-44 sm:h-72 md:h-80 bg-gray-900/80 border border-gray-800 rounded-3xl shadow-2xl flex items-center justify-center text-purple-400 text-6xl font-bold">
            💰
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 sm:px-12 md:px-20 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
          Why Choose FinTrack?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <motion.div
            className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition"
            whileHover={{ scale: 1.05 }}
          >
            <FaWallet className="text-purple-400 text-5xl mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Expense Tracking</h3>
            <p className="text-sm sm:text-base text-gray-400">
              Automatically categorize and monitor your spending with ease.
            </p>
          </motion.div>
          <motion.div
            className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition"
            whileHover={{ scale: 1.05 }}
          >
            <FaBell className="text-purple-400 text-5xl mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Bill Reminders</h3>
            <p className="text-sm sm:text-base text-gray-400">
              Never miss a payment thanks to smart, customizable alerts.
            </p>
          </motion.div>
          <motion.div
            className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition"
            whileHover={{ scale: 1.05 }}
          >
            <FaChartPie className="text-purple-400 text-5xl mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">AI Analytics</h3>
            <p className="text-sm sm:text-base text-gray-400">
              Visualize your spending habits and make smarter financial decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 bg-gray-900/70 py-16 px-6 sm:px-12 md:px-20 rounded-t-3xl mt-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">Our Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <FaUsers className="text-purple-400 text-5xl mb-3" />
            <p className="text-4xl font-bold text-white">10k+</p>
            <p className="text-gray-400 mt-1">Happy Users</p>
          </div>
          <div className="flex flex-col items-center">
            <FaMoneyBillWave className="text-purple-400 text-5xl mb-3" />
            <p className="text-4xl font-bold text-white">$5M+</p>
            <p className="text-gray-400 mt-1">Transactions Managed</p>
          </div>
          <div className="flex flex-col items-center">
            <FaClock className="text-purple-400 text-5xl mb-3" />
            <p className="text-4xl font-bold text-white">24/7</p>
            <p className="text-gray-400 mt-1">Support</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 px-6 sm:px-12 md:px-20 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 text-center">
            <p className="text-gray-400 mb-4">
              "FinTrack helped me save more than I expected! The interface is simple and clean."
            </p>
            <h4 className="font-semibold text-white">– Priya S.</h4>
          </div>
          <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 text-center">
            <p className="text-gray-400 mb-4">
              "I never miss a bill now. Love the smart reminders!"
            </p>
            <h4 className="font-semibold text-white">– Rajesh K.</h4>
          </div>
          <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 text-center">
            <p className="text-gray-400 mb-4">
              "AI analytics are a game changer. Now I know exactly where my money goes."
            </p>
            <h4 className="font-semibold text-white">– Ananya M.</h4>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative z-10 bg-purple-600 rounded-3xl mx-6 sm:mx-12 md:mx-20 py-12 mt-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Take Control?</h2>
        <p className="text-white text-lg sm:text-xl mb-6">
          Sign up today and start managing your finances smarter!
        </p>
        <button
          onClick={() => navigate("/sign-up")}
          className="px-8 py-3 rounded-full bg-white text-purple-700 font-bold shadow-lg hover:bg-gray-100 transition"
        >
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-gray-500 text-sm sm:text-base mt-16">
        © {new Date().getFullYear()} FinTrack. All rights reserved.
      </footer>
    </div>
  );
}
