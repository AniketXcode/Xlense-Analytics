import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-14 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Xlense Analytics Logo" className="w-9 h-9" />
              <span className="text-xl font-bold text-white">
                Xlense Analytics
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Transform your Excel data into stunning 2D & 3D visualizations
              with our simple and powerful analytics tool.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="hover:text-purple-400 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-purple-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-purple-400 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-purple-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-500" />
                <span>xlenseanalytics@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-purple-500" />
                <span>+91 123456789</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-purple-500" />
                <span>India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="text-purple-400 font-medium">
              Xlense Analytics
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
