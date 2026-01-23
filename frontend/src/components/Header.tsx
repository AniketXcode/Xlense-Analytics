import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-white/70 dark:bg-[#090013]/70 border-b border-white/10 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Site Name */}
          <div className="flex items-center space-x-3">
            <img
              src="favicon.ico"
              alt="Xlense Analytics Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#9C4EFF] to-[#6A1BFF] text-transparent bg-clip-text tracking-tight">
              Xlense Analytics
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["About Us", "Features", "Contact"].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(/\s/g, "")}`}
                className="relative text-gray-700 dark:text-gray-300 font-medium group"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-[#9C4EFF] to-[#6A1BFF] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/Login">
              <Button
                variant="ghost"
                className="text-gray-700 dark:text-gray-300 hover:text-[#9C4EFF] transition-colors"
              >
                Login
              </Button>
            </Link>

            <Link to="/Signup">
              <Button className="bg-gradient-to-r from-[#9C4EFF] to-[#6A1BFF] text-white font-semibold hover:from-[#A35CFF] hover:to-[#814DFF] transition-all duration-300 shadow-lg hover:shadow-[#9C4EFF]/30">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 dark:text-gray-200 focus:outline-none"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/90 dark:bg-[#090013]/90 backdrop-blur-lg border-t border-white/10 rounded-b-lg mt-2 p-4 space-y-4 shadow-lg"
          >
            {["About Us", "Features", "Contact"].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(/\s/g, "")}`}
                className="block text-gray-700 dark:text-gray-300 font-medium hover:text-[#9C4EFF] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="flex space-x-3 pt-2">
              <Link to="/Login" className="w-1/2">
                <Button
                  variant="outline"
                  className="w-full text-gray-700 dark:text-gray-300 hover:text-[#9C4EFF]"
                >
                  Login
                </Button>
              </Link>
              <Link to="/Signup" className="w-1/2">
                <Button className="w-full bg-gradient-to-r from-[#9C4EFF] to-[#6A1BFF] text-white font-semibold hover:from-[#A35CFF] hover:to-[#814DFF]">
                  Sign Up
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
