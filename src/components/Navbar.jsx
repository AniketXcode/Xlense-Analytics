// src/components/Navbar.jsx

import { useState } from "react";
import { Menu, X, BarChart2, Upload, History, LogIn, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // ✅ Navigation Links: Can dynamically update or hide based on auth in the future
  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <BarChart2 size={18} /> },
    { name: "Upload", path: "/upload", icon: <Upload size={18} /> },
    { name: "History", path: "/history", icon: <History size={18} /> },
    { name: "Login", path: "/", icon: <LogIn size={18} /> },
    { name: "Signup", path: "/signup", icon: <User size={18} /> },
  ];

  return (
    <nav className="bg-[#0f0f0f] text-white shadow-md w-full fixed z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* ✅ Brand Logo */}
        <Link to="/dashboard" className="text-xl font-bold text-purple-400">
          Xlense Analytics
        </Link>

        {/* ✅ Desktop Navigation Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className="flex items-center gap-1 hover:text-purple-400 transition"
              >
                {link.icon}
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* ✅ Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Navigation Dropdown */}
      {isOpen && (
        <ul className="md:hidden flex flex-col bg-[#121212] px-4 pb-4 space-y-3 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)} // ✅ Close on link click
                className="flex items-center gap-2 py-2 hover:text-purple-400 transition"
              >
                {link.icon}
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;  