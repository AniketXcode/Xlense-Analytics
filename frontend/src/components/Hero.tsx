import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Link } from "react-router-dom";
import bgVideo from "@/assets/bar-chart.mp4";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Animated Background Video */}
      <motion.video
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2 }}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#090013]/90"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 sm:px-8 md:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#9C4EFF] via-[#B46DFF] to-[#E1B7FF] drop-shadow-lg"
        >
          Turn Your Excel Data
          <br />
          Into Stunning <span className="text-white">Visual Insights</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-6 text-gray-300 text-lg sm:text-xl leading-relaxed"
        >
          Upload your Excel files and watch them transform into
          <br className="hidden sm:block" />
          <span className="text-[#9C4EFF] font-medium">
            interactive 2D & 3D charts
          </span>{" "}
          — instantly and effortlessly.
        </motion.p>

        {/* Button Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-10 flex justify-center"
        >
          {/* Wrap Link around Button for full clickable area */}
          <Link to="/login">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#9C4EFF] to-[#6A1BFF] hover:from-[#A35CFF] hover:to-[#814DFF]
                text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-[#9C4EFF]/30
                transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl flex items-center"
            >
              <Upload className="w-5 h-5 mr-3" />
              Get Started
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
