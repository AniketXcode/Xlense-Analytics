"use client";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IconCheck,
  IconFileSpreadsheet,
  IconArrowLeft,
  IconChartBar,
  IconRobotFace,
} from "@tabler/icons-react";

export default function UploadSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const fileName = location.state?.fileName || "your_excel_file.xlsx";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white p-6">
      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full bg-neutral-900/70 border border-neutral-800 rounded-2xl p-8 shadow-[0_0_30px_rgba(147,51,234,0.3)] text-center backdrop-blur-md"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex justify-center mb-5"
        >
          <div className="bg-green-600/90 p-3 rounded-full shadow-[0_0_25px_rgba(34,197,94,0.6)]">
            <IconCheck size={36} />
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">
          Upload Successful 🎉
        </h1>
        <p className="text-neutral-300 mb-6">
          Your file{" "}
          <span className="text-white font-semibold">{fileName}</span> has been
          uploaded and is now ready for analysis.
        </p>

        {/* Animated Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
          {[
            {
              icon: <IconFileSpreadsheet size={34} className="text-purple-400 mb-2" />,
              label: "Excel Detected",
            },
            {
              icon: <IconChartBar size={34} className="text-blue-400 mb-2" />,
              label: "Chart Ready",
            },
            {
              icon: <IconRobotFace size={34} className="text-yellow-300 mb-2" />,
              label: "AI Insights Active",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.2 }}
              className="bg-neutral-800/60 border border-neutral-700 rounded-xl p-5 flex flex-col items-center justify-center hover:scale-105 transition-all duration-200 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
            >
              {item.icon}
              <p className="text-sm text-neutral-200">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Fun Quote */}
        <p className="text-purple-300 text-sm italic mb-8">
          “Data speaks louder than words — let’s visualize it beautifully.” 💫
        </p>

        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/dashboard")}
          className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 
          text-white px-6 py-2.5 rounded-lg shadow-md flex items-center gap-2 mx-auto font-medium"
        >
          <IconArrowLeft size={18} />
          Back to Dashboard
        </motion.button>
      </motion.div>

      {/* Footer Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-xs text-neutral-500 mt-8"
      >
        Next Step: View charts or generate AI analysis from your dashboard ⚙️
      </motion.p>
    </div>
  );
}
