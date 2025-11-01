import React, { useState } from "react";
import {
  IconMenu2,
  IconX,
  IconBrandTabler,
  IconUpload,
  IconHistory,
  IconShieldCheck,
  IconLogout,
  IconSparkles,
  IconMessageChatbot,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const TopNavbar = ({ username = "Rajat" }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", href: "/dashboard", icon: <IconBrandTabler size={20} /> },
    { label: "Upload", href: "/upload", icon: <IconUpload size={20} /> },
    { label: "History", href: "/history", icon: <IconHistory size={20} /> },
    { label: "Admin", href: "/admin", icon: <IconShieldCheck size={20} /> },
  ];

  // ✅ Extra sections
  const helpLinks = [
    { label: "How to Generate", icon: <IconSparkles size={20} />, action: () => navigate("/guide") },
    { label: "AI Chatbot Help", icon: <IconMessageChatbot size={20} />, action: () => navigate("/ai-chat") },
  ];

  const handleLogout = () => {
    // 🔒 You can clear token/session storage here before navigating
    navigate("/login");
  };

  return (
    <>
      {/* 🌌 Top Navbar */}
      <header className="fixed top-0 left-0 z-50 w-full bg-gradient-to-r from-[#0f0f0f] via-[#1a1a1a] to-[#111] text-white px-5 h-16 flex items-center justify-between shadow-lg border-b border-purple-800/30 backdrop-blur-md">
        {/* 📱 Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-purple-400 transition"
        >
          {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>

        {/* 💠 Logo / Title */}
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 cursor-pointer hover:text-purple-400 transition"
        >
          <IconBrandTabler size={24} className="text-purple-500" />
          <span className="text-lg font-semibold hidden sm:inline">
            Xlense Analytics
          </span>
        </div>

        {/* 💻 Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => navigate(link.href)}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-purple-400 transition-all duration-200"
            >
              {link.icon}
              {link.label}
            </button>
          ))}
        </nav>

        {/* 🧠 Extra Buttons + Avatar */}
        <div className="flex items-center gap-3">
          {/* 💡 How to Generate */}
          <button
            onClick={() => navigate("/guide")}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-purple-700/20 hover:bg-purple-700/40 border border-purple-600/30 rounded-lg text-sm text-purple-300 transition-all duration-300"
          >
            <IconSparkles size={18} /> Guide
          </button>

          {/* 🤖 AI Chatbot */}
          <button
            onClick={() => navigate("/ai-chat")}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-700/20 hover:bg-blue-700/40 border border-blue-500/30 rounded-lg text-sm text-blue-300 transition-all duration-300"
          >
            <IconMessageChatbot size={18} /> AI Help
          </button>

          {/* 🔒 Logout */}
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center gap-1 text-sm text-gray-300 hover:text-red-400 transition"
          >
            <IconLogout size={20} />
            Logout
          </button>

          {/* 🧑‍💻 Avatar */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:block text-sm text-gray-400">
              Hi, <span className="text-purple-300 font-semibold">{username}</span>
            </span>
            <img
              src={`https://ui-avatars.com/api/?name=${username}&background=7e22ce&color=fff`}
              alt="User Avatar"
              className="w-9 h-9 rounded-full border border-purple-700/60 shadow-md"
            />
          </div>
        </div>
      </header>

      {/* 📱 Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-16 left-0 w-full bg-neutral-900/95 z-40 border-b border-neutral-800 flex flex-col text-sm text-white shadow-lg backdrop-blur-lg"
          >
            {[...navLinks, ...helpLinks, { label: "Logout", icon: <IconLogout size={20} />, action: handleLogout }].map(
              (item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    item.action ? item.action() : navigate(item.href);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-6 py-3 text-left hover:bg-neutral-800 flex items-center gap-3 transition"
                >
                  {item.icon}
                  {item.label}
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopNavbar;
