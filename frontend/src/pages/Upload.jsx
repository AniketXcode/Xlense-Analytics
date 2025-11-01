import React from "react";
import { useNavigate } from "react-router-dom";
import FileUploadDemo from "../components/FileUploadDemo";
import { motion } from "framer-motion";

export default function Upload() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-black text-white flex flex-col items-center px-6 py-12">

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 drop-shadow-lg">
          Upload Your File
        </h1>
        <p className="text-neutral-400 mt-2 text-sm sm:text-base">
          Upload your Excel file and generate 2D or 3D visualizations instantly ⚡
        </p>
      </motion.div>

      {/* Upload Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-3xl bg-neutral-900/70 border border-neutral-800 backdrop-blur-md rounded-2xl p-8 shadow-[0_0_25px_rgba(168,85,247,0.2)]"
      >
        <p className="text-neutral-300 mb-6 text-center text-sm sm:text-base">
          Drag & drop your Excel file or click below to upload
        </p>

        {/* Upload Component */}
        <div className="flex justify-center mb-6">
          <FileUploadDemo />
        </div>

        {/* Buttons */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 
            rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]"
          >
            ← Back to Dashboard
          </button>
        </div>
      </motion.div>

      {/* Footer Note */}
      <p className="text-xs text-neutral-500 mt-10">
        Supported formats: <span className="text-purple-400">.xlsx, .xls</span>
      </p>
    </div>
  );
}
