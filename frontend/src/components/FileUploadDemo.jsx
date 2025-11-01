"use client";

import React, { useState } from "react";
import { FileUpload } from "./ui/file-upload";
import { useNavigate } from "react-router-dom";
import axios from "../api/config";
import { motion } from "framer-motion";
import { IconUpload, IconFileSpreadsheet, IconCheck } from "@tabler/icons-react";

export default function FileUploadDemo() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (uploadedFiles) => {
    console.log("FileUploadDemo - Files received:", uploadedFiles);
    setFiles(uploadedFiles);

    if (uploadedFiles.length > 0) {
      const file = uploadedFiles[0];
      console.log("File details:", {
        name: file.name,
        type: file.type,
        size: file.size,
      });

      // ✅ Validate file type
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "text/csv",
      ];

      const isValidType = validTypes.includes(file.type);
      const hasValidExtension = /\.(xlsx|xls|csv)$/i.test(file.name);

      if (!isValidType && !hasValidExtension) {
        alert("Please select a valid Excel (.xlsx, .xls) or CSV file");
        setFiles([]);
        return;
      }

      setUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        console.log("Uploading file:", file.name);

        const response = await axios.post("/files/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const { fileId, fileName } = response.data;
        console.log("Upload response:", response.data);

        // ✅ Navigate to axis selection page after success
        setTimeout(() => {
          navigate("/axis-selection", {
            state: { fileName, fileId },
          });
        }, 1000);
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Upload failed: " + (error.response?.data?.message || error.message));
        setFiles([]);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto rounded-2xl bg-[#131313]/90 border border-neutral-800 shadow-[0_0_30px_rgba(147,51,234,0.2)] p-6 mb-10 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5 border-b border-neutral-800 pb-3">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-2 rounded-lg">
          <IconUpload size={22} className="text-white" />
        </div>
        <h2 className="text-lg md:text-xl font-semibold text-purple-300">
          Upload Excel or CSV Files
        </h2>
      </div>

      {/* Upload Input */}
      <FileUpload onChange={handleFileUpload} />

      {/* Uploading Animation */}
      {uploading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-5 text-center"
        >
          <div className="relative flex justify-center mb-3">
            <div className="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full"></div>
          </div>
          <p className="text-purple-300 font-medium tracking-wide">
            Uploading your file... Please wait
          </p>
        </motion.div>
      )}

      {/* File Selected Confirmation */}
      {files.length > 0 && !uploading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-5 text-center flex flex-col items-center"
        >
          <div className="flex items-center gap-2 text-green-400 font-medium">
            <IconCheck size={20} /> File selected: {files[0]?.name}
          </div>
          <p className="text-xs text-gray-400 mt-1">Ready to upload automatically.</p>
        </motion.div>
      )}

      {/* Debug Info (Optional — keep for dev only) */}
      <div className="mt-6 text-xs text-gray-600 bg-neutral-900/50 rounded-lg p-3">
        <p>Files selected: {files.length}</p>
        <p>Uploading: {uploading ? "Yes" : "No"}</p>
      </div>
    </motion.div>
  );
}
