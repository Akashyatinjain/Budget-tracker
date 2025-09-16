import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaWallet, FaChartPie, FaBell, FaUsers, FaClock, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Particles from "../components/Particles.jsx";

// Data Definitions
const features = [
  {
    icon: <FaWallet />,
    title: "Expense Tracking",
    description: "Automatically categorize and monitor your spending with ease."
  },
  {
    icon: <FaBell />,
    title: "Bill Reminders",
    description: "Never miss a payment thanks to smart, customizable alerts."
  },
  {
    icon: <FaChartPie />,
    title: "AI Analytics",
    description: "Visualize your spending habits and make smarter financial decisions."
  }
];

const stats = [
  { icon: <FaUsers />, value: "10k+", label: "Happy Users" },
  { icon: <FaMoneyBillWave />, value: "$5M+", label: "Transactions Managed" },
  { icon: <FaClock />, value: "24/7", label: "Support" }
];

const testimonials = [
  {
    quote: "FinTrack helped me save more than I expected! The interface is simple and clean.",
    name: "Priya S."
  },
  {
    quote: "I never miss a bill now. Love the smart reminders!",
    name: "Rajesh K."
  },
  {
    quote: "AI analytics are a game changer. Now I know exactly where my money goes.",
    name: "Ananya M."
  }
];

const slides = [
  { icon: "⚙️", title: "Animations", description: "Smooth animations for your projects." },
  { icon: "📊", title: "Analytics", description: "Visualize your spending habits easily." },
  { icon: "🔒", title: "Security", description: "Keep your data safe and private." },
  { icon: "💡", title: "Insights", description: "Smart suggestions to optimize your finance." },
  { icon: "🚀", title: "Performance", description: "Fast and seamless user experience." }
];

export default function HomePage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  // Slide Auto-play with Pause on Hover
  useEffect(() => {
    startSlideAutoPlay();
    return () => stopSlideAutoPlay();
  }, []);

  const startSlideAutoPlay = () => {
    stopSlideAutoPlay();
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
  };

  const stopSlideAutoPlay = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
      if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Swipe Gesture for Mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current - touchEndX.current > 50) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
    if (touchEndX.current - touchStartX.current > 50) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  return (
    <div className="bg-black text-white relative min-h-screen flex flex-col overflow-x-hidden transition-colors duration-500">
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
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-purple-400">BudgetTracker</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/sign-in")} className="px-5 py-2 rounded-full bg-white text-purple-700 font-semibold shadow-md hover:bg-gray-100 transition">Sign In</button>
          <button onClick={() => navigate("/sign-up")} className="px-5 py-2 rounded-full bg-purple-600 text-white font-semibold shadow-md hover:bg-purple-500 transition">Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between px-6 sm:px-12 md:px-20 py-16 gap-12 md:gap-0">
        <div className="max-w-xl space-y-6 text-center md:text-left">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Smart Finance <span className="text-purple-400">Tracking</span> Made Easy
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="text-gray-400 text-base sm:text-lg md:text-xl">
            Manage your expenses, bills, and savings in one intuitive dashboard. Stay in control of your finances effortlessly.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.6 }}>
            <button onClick={() => navigate("/sign-up")} className="px-8 py-3 rounded-full bg-purple-600 text-white font-bold shadow-lg hover:bg-purple-500 transition">Get Started</button>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, rotate: -10, y: 50 }} animate={{ opacity: 1, rotate: 0, y: 0 }} transition={{ duration: 1 }} className="w-full md:w-1/2 flex justify-center">
          <div className="w-44 sm:w-72 md:w-80 h-44 sm:h-72 md:h-80 bg-gray-900/80 border border-gray-800 rounded-3xl shadow-2xl flex items-center justify-center text-purple-400 text-6xl font-bold">💰</div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 sm:px-12 md:px-20 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">Why Choose FinTrack?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="text-purple-400 text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 bg-gray-900/70 py-16 px-6 sm:px-12 md:px-20 rounded-t-3xl mt-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">Our Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-purple-400 text-5xl mb-3">{stat.icon}</div>
              <p className="text-4xl font-bold text-white">{stat.value}</p>
              <p className="text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 px-6 sm:px-12 md:px-20 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} whileHover={{ scale: 1.03 }} className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 ease-in-out">
              <p className="text-gray-400 mb-4">&quot;{testimonial.quote}&quot;</p>
              <h4 className="font-semibold text-white">– {testimonial.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

     {/* Carousel Section */}
     {/* Carousel Section (Only Mobile) */}
<section
  className="block md:hidden relative z-10 px-6 sm:px-12 md:px-20 py-12"
  onMouseEnter={stopSlideAutoPlay}
  onMouseLeave={startSlideAutoPlay}
  onTouchStart={handleTouchStart}
  onTouchEnd={handleTouchEnd}
>
  <h2 className="text-2xl font-bold text-center mb-8 text-white">Explore Features</h2>
  <div className="max-w-xs mx-auto bg-gray-900/70 border border-gray-800 rounded-2xl p-6 text-center shadow-lg">
    <div className="text-6xl mb-4">{slides[currentSlide].icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{slides[currentSlide].title}</h3>
    <p className="text-gray-400 text-sm">{slides[currentSlide].description}</p>
  </div>
  <div className="flex justify-center gap-2 mt-4">
    {slides.map((_, index) => (
      <button
        key={index}
        aria-label={`Slide ${index + 1}`}
        onClick={() => setCurrentSlide(index)}
        className={`h-3 w-3 rounded-full cursor-pointer ${currentSlide === index ? "bg-purple-400" : "bg-gray-600"} transition`}
      />
    ))}
  </div>
</section>


      {/* CTA Banner */}
      <section className="relative z-10 bg-purple-600 rounded-3xl mx-6 sm:mx-12 md:mx-20 py-12 mt-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Take Control?</h2>
        <p className="text-white text-lg sm:text-xl mb-6">Sign up today and start managing your finances smarter!</p>
        <button onClick={() => navigate("/sign-up")} className="px-8 py-3 rounded-full bg-white text-purple-700 font-bold shadow-lg hover:bg-gray-100 transition">Get Started</button>
      </section>

 


      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-gray-400 text-sm sm:text-base mt-16 border-t border-gray-800">
        © {new Date().getFullYear()} FinTrack. All rights reserved.
      </footer>
    </div>
  );
}
