import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaWallet, FaChartPie, FaBell, FaUsers, FaClock, FaMoneyBillWave, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Particles from "../components/Particles.jsx";

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="bg-black text-white relative min-h-screen flex flex-col overflow-x-hidden">
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff", "#a855f7", "#6366f1"]}
          particleCount={150}
          particleSpread={8}
          speed={0.2}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      <div className="absolute top-20 left-5 w-52 h-52 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-5 w-60 h-60 bg-indigo-600/15 rounded-full blur-3xl"></div>

      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex justify-between items-center px-4 sm:px-8 py-3 backdrop-blur-xl bg-gray-900/60 border-b border-gray-700/50"
      >
        <motion.h1 
          whileHover={{ scale: 1.05 }}
          className="text-xl sm:text-2xl font-extrabold tracking-wide bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
        >
          BudgetTracker
        </motion.h1>
        <div className="flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/sign-in")} 
            className="px-4 py-2 text-sm rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            Sign In
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 8px 25px -8px rgba(147, 51, 234, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/sign-up")} 
            className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:shadow-xl transition-all duration-300"
          >
            Sign Up
          </motion.button>
        </div>
      </motion.nav>

      <section className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-8 md:px-12 py-12 gap-8 md:gap-4">
        <div className="max-w-lg space-y-6 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7 }} 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
          >
            Smart Finance <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Tracking</span> Made Easy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }} 
            className="text-gray-300 text-base sm:text-lg leading-relaxed"
          >
            Manage your expenses, bills, and savings in one intuitive dashboard. Stay in control of your finances effortlessly.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.9, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
          >
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(147, 51, 234, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/sign-up")} 
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get Started <FaArrowRight className="text-sm" />
            </motion.button>
          </motion.div>
        </div>
       <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="w-full md:w-2/5 flex justify-center mb-6 md:mb-0"
>
  <div className="relative">
    {/* Card */}
    <div className="w-44 sm:w-56 md:w-64 h-44 sm:h-56 md:h-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg flex items-center justify-center text-gray-800 dark:text-white text-5xl sm:text-6xl font-semibold">
      💼
    </div>

    {/* Soft Glow / Accent */}
    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-2xl blur-xl -z-10"></div>
  </div>
</motion.div>

      </section>

      <section className="relative z-10 px-4 sm:px-8 md:px-12 py-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
        >
          Why Choose FinTrack?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group relative bg-gradient-to-br from-gray-900/70 to-gray-800/70 border border-gray-700/50 rounded-xl p-4 sm:p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
            >
              <div className="text-purple-400 text-4xl sm:text-5xl mb-3 sm:mb-4 transform group-hover:scale-110 transition duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 bg-gradient-to-b from-gray-900/80 to-black py-12 px-4 sm:px-8 md:px-12 rounded-t-2xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
        >
          Our Impact
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group flex flex-col items-center"
            >
              <div className="text-purple-400 text-4xl sm:text-5xl mb-4 transform group-hover:scale-110 transition duration-300 p-3 bg-gray-800/50 rounded-xl">
                {stat.icon}
              </div>
              <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">{stat.value}</p>
              <p className="text-gray-300 mt-2 text-sm sm:text-base font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-4 sm:px-8 md:px-12 py-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
        >
          What Our Users Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="group bg-gradient-to-br from-gray-900/70 to-gray-800/70 border border-gray-700/50 rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
            >
              <div className="text-3xl mb-3 opacity-50">"</div>
              <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
              <h4 className="font-semibold text-white text-base sm:text-lg bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">– {testimonial.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        className="block md:hidden relative z-10 px-4 sm:px-8 py-10"
        onMouseEnter={stopSlideAutoPlay}
        onMouseLeave={startSlideAutoPlay}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
        >
          Explore Features
        </motion.h2>
        
        <div className="relative max-w-xs mx-auto">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 rounded-xl p-6 text-center shadow-lg backdrop-blur-sm"
          >
            <div className="text-5xl sm:text-6xl mb-4 transform hover:scale-110 transition duration-300">{slides[currentSlide].icon}</div>
            <h3 className="text-xl font-semibold text-white mb-3">{slides[currentSlide].title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{slides[currentSlide].description}</p>
          </motion.div>
          
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-900/80 border border-gray-700/50 rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-all duration-300 backdrop-blur-sm"
          >
            <FaArrowLeft className="text-xs" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-900/80 border border-gray-700/50 rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-all duration-300 backdrop-blur-sm"
          >
            <FaArrowRight className="text-xs" />
          </button>
        </div>
        
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                currentSlide === index 
                  ? "w-6 bg-gradient-to-r from-purple-400 to-indigo-400" 
                  : "w-2 bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-4 sm:mx-8 md:mx-12 py-12 mt-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-center shadow-xl relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full blur-lg"></div>
          <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-white/10 rounded-full blur-lg"></div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Take Control?</h2>
          <p className="text-white/90 text-base sm:text-lg mb-6 max-w-md mx-auto">
            Sign up today and start managing your finances smarter!
          </p>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 15px 30px -10px rgba(255, 255, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/sign-up")} 
            className="px-8 py-3 rounded-full bg-white text-purple-700 font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mx-auto text-sm sm:text-base"
          >
            Get Started Free <FaArrowRight />
          </motion.button>
        </motion.div>
      </section>

      <footer className="relative z-10 py-6 text-center border-t border-gray-800/50 bg-gradient-to-t from-gray-900/50 to-transparent">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-400 text-sm"
        >
          © {new Date().getFullYear()} FinTrack. All rights reserved.
        </motion.p>
      </footer>
    </div>
  );
}