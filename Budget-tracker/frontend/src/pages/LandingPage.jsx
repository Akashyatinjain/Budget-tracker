import React from "react";
import "./LandingPage.css"; // CSS ko alag rakho

export default function LandingPage() {
  return (
    <div>
      {/* Header */}
      <header>
        <nav className="container flex justify-between items-center py-4">
          <a href="/" className="logo flex items-center text-blue-600 font-bold text-xl">
            <i className="fas fa-chart-pie mr-2"></i> Interfernce
          </a>
          <ul className="hidden md:flex space-x-6">
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">About</a></li>
          </ul>
          <div className="auth-buttons">
            <a href="/login" className="btn btn-outline">Log In</a>
            <a href="/signup" className="btn btn-primary">Sign Up</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero container flex flex-col md:flex-row items-center py-20">
        <div className="flex-1 pr-10">
          <h1 className="text-4xl font-bold mb-4">Take Control of Your Financial Future</h1>
          <p className="text-gray-600 mb-6">
            Interfernce helps you track expenses, set budgets, and achieve your financial goals.
          </p>
          <a href="/signup" className="btn btn-primary">Get Started For Free</a>
        </div>
        <div className="flex-1">
          <img src="https://placehold.co/600x400/2D5BFF/FFFFFF/png?text=Interfernce+App" alt="App" />
        </div>
      </section>
    </div>
  );
}
