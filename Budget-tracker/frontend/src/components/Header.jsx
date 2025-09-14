// Header.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaMoneyCheckAlt,
  FaRegCreditCard,
  FaChartLine,
  FaUserTie,
} from "react-icons/fa";
import logo from "../assets/logo.svg";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");

  // ✅ Check login status from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsSignedIn(true);
      setUsername("User"); // 🔹 yaha tu backend se username fetch kar sakta hai agar chahe
    } else {
      setIsSignedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsSignedIn(false);
    navigate("/sign-in");
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
      case "/app":
        return "Dashboard";
      case "/app/transactions":
        return "Transactions";
      case "/app/subscriptions":
        return "Subscriptions";
      case "/app/reports":
        return "Reports";
      case "/app/account":
        return "Account";
      default:
        return "";
    }
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md transition font-medium
     ${
       isActive
         ? "bg-purple-600 text-white"
         : "text-gray-300 hover:bg-gray-800 hover:text-white"
     }`;

  return (
    <header
      className="fixed top-0 w-full z-50 h-16 flex items-center justify-between px-4 sm:px-6 
      bg-black border-b border-gray-800 shadow-lg text-white"
    >
      {/* Left: Logo + Welcome */}
      <div className="flex items-center gap-3 sm:gap-6">
        <Link to="/DashBoard" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-16 w-15  bg-black" />
          <div className="hidden sm:flex flex-col">
            <span className="text-base sm:text-lg font-bold text-purple-400">
              BudgetTracker
            </span>
            {isSignedIn && (
              <span className="text-xs text-white/70">
                Hi, {username} 👋
              </span>
            )}
          </div>
        </Link>

        {/* Calendar */}
        <div
          className="flex items-center gap-2 px-2 sm:px-3 py-1 rounded-full 
          bg-gray-900 text-gray-400 text-xs sm:text-sm"
        >
          <SlCalender className="text-sm sm:text-base text-purple-400" />
          <span>
            {new Date().toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Center: Page Title (Only md+) */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 
        text-gray-200 text-sm sm:text-lg font-semibold hidden md:block"
      >
        {getPageTitle()}
      </div>

      {/* Right: Auth + Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-2">
          {!isSignedIn ? (
            <>
              <Link
                to="/sign-in"
                className="px-3 sm:px-4 py-1.5 bg-purple-600 text-white text-xs sm:text-sm rounded-md 
                hover:bg-purple-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="px-3 sm:px-4 py-1.5 bg-white text-black text-xs sm:text-sm rounded-md 
                hover:bg-gray-200 transition-colors"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="h-8 sm:h-9 px-3 sm:px-4 bg-red-600 text-white text-xs sm:text-sm font-medium 
                rounded-md hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black border-b border-gray-800 shadow-md p-4 md:hidden">
          <nav className="space-y-2">
            <NavLink
              to="/app"
              end
              className={linkClasses}
              onClick={() => setMenuOpen(false)}
            >
              <FaTachometerAlt className="text-purple-400" /> Dashboard
            </NavLink>
            <NavLink
              to="/app/transactions"
              className={linkClasses}
              onClick={() => setMenuOpen(false)}
            >
              <FaMoneyCheckAlt className="text-yellow-400" /> Transactions
            </NavLink>
            <NavLink
              to="/app/subscriptions"
              className={linkClasses}
              onClick={() => setMenuOpen(false)}
            >
              <FaRegCreditCard className="text-pink-400" /> Subscriptions
            </NavLink>
            <NavLink
              to="/app/reports"
              className={linkClasses}
              onClick={() => setMenuOpen(false)}
            >
              <FaChartLine className="text-green-400" /> Reports
            </NavLink>
            <NavLink
              to="/app/account"
              className={linkClasses}
              onClick={() => setMenuOpen(false)}
            >
              <FaUserTie className="text-indigo-400" /> Account
            </NavLink>
          </nav>

          {/* Mobile Auth */}
          <div className="mt-4">
            {!isSignedIn ? (
              <>
                <Link
                  to="/sign-in"
                  onClick={() => setMenuOpen(false)}
                  className="w-full block text-center px-4 py-2 bg-purple-600 text-white text-sm rounded-md 
                  hover:bg-purple-700 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  onClick={() => setMenuOpen(false)}
                  className="w-full block text-center px-4 py-2 bg-white text-black text-sm rounded-md 
                  hover:bg-gray-200 transition-colors mt-2"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2 bg-red-600 text-white text-sm font-medium 
                  rounded-md hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
