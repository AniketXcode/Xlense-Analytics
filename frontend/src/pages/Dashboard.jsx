"use client";

import React, { useState, useEffect } from "react";
import {
  IconDatabase,
  IconFileText,
  IconBrain,
  IconArrowUpRight,
  IconSparkles,
  IconMessageChatbot,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import axios from "../api/config";
import { getUserProfile } from "../api/auth";


import StatCard from "../components/StatCard";
import FileUploadDemo from "../components/FileUploadDemo";
import Chart2DPreview from "../components/Chart2D";
import Chart3DPreview from "../components/Chart3D";
import TopNavbar from "../components/TopNavbar";

export default function Dashboard() {
  const [showUploadInline, setShowUploadInline] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalUploads: 0,
    chartsCreated: 0,
    lastUpload: null,
    storageUsed: "0 MB",
    recentUploads: [],
  });
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profileResponse = await getUserProfile();
        setUsername(profileResponse.data.name);

        const statsResponse = await axios.get("/dashboard/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setDashboardData(statsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUsername(userData.name || "User");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "No uploads yet";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className={cn(
        "relative flex w-full min-h-screen flex-col overflow-hidden bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0b0b0b] text-white"
      )}
    >
      <TopNavbar username={username} />

      <main className="flex-1 p-6 pt-20 transition-all duration-300">
        {/* ✨ Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            Welcome, {username} 👋
          </h1>
          <p className="text-neutral-400 mt-2 text-sm">
            Your personal analytics control center.
          </p>
        </motion.div>

        {/* Upload Button */}
        <div className="flex justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowUploadInline(!showUploadInline)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg transition-all"
          >
            <IconFileText size={20} />
            {showUploadInline ? "Close Upload" : "Upload New File"}
          </motion.button>
        </div>

        {/* Upload Inline */}
        {showUploadInline && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10 max-w-4xl mx-auto"
          >
            <FileUploadDemo />
          </motion.div>
        )}

        {/* ⚙️ Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-neutral-800 rounded-lg p-6 animate-pulse"
              >
                <div className="h-4 bg-neutral-700 rounded mb-2"></div>
                <div className="h-8 bg-neutral-700 rounded"></div>
              </div>
            ))
            : [
              {
                title: "Total Uploads",
                value: dashboardData.totalUploads.toString(),
                icon: <IconFileText size={28} />,
              },
              {
                title: "Charts Created",
                value: dashboardData.chartsCreated.toString(),
                icon: <IconDatabase size={28} />,
              },
              {
                title: "Last Upload",
                value: formatDate(dashboardData.lastUpload),
                icon: <IconArrowUpRight size={28} />,
              },
              {
                title: "Storage Used",
                value: dashboardData.storageUsed,
                icon: <IconBrain size={28} />,
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StatCard {...card} />
              </motion.div>
            ))}
        </div>

        {/* 📁 Recent Uploads */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 bg-[#1a1a1a] rounded-xl p-6 border border-neutral-800 shadow-lg"
        >
          <h2 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
            📁 Recent Uploads
          </h2>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between animate-pulse h-4 bg-neutral-700 rounded"
                ></div>
              ))}
            </div>
          ) : dashboardData.recentUploads.length === 0 ? (
            <p className="text-neutral-400 italic">
              No files uploaded yet. Upload your first Excel file to get
              started! 📊
            </p>
          ) : (
            <div className="space-y-3">
              {dashboardData.recentUploads.map((upload, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-neutral-700 last:border-b-0"
                >
                  <span className="text-white font-medium">{upload.name}</span>
                  <span className="text-neutral-400 text-sm">
                    {formatDate(upload.date)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* 📊 Chart Previews */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 space-y-10"
        >
          <div className="overflow-x-hidden scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-neutral-800">
            <Chart2DPreview />
          </div>
          <div className="overflow-x-hidden scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-neutral-800">
            <Chart3DPreview />
          </div>
        </motion.div>

        {/* 🧠 Smart Insight Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-purple-700/90 via-purple-800/90 to-blue-900/80 p-6 rounded-xl shadow-lg border border-purple-600 flex flex-col md:flex-row items-start md:items-center justify-between"
        >
          <div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <IconBrain size={22} /> Smart Insights
            </h3>
            <p className="text-sm text-purple-100">
              {loading
                ? "Loading insights..."
                : dashboardData.totalUploads > 0
                  ? `You've uploaded ${dashboardData.totalUploads} files and created ${dashboardData.chartsCreated} charts. ${dashboardData.chartsCreated > dashboardData.totalUploads
                    ? "Great job exploring your data!"
                    : "Try creating more charts to unlock deeper insights!"
                  }`
                  : "Upload your first Excel file to start discovering insights with AI-powered analytics!"}
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="flex items-center gap-2 bg-purple-700/30 hover:bg-purple-700/50 px-4 py-2 rounded-lg border border-purple-500/30 text-sm text-purple-200 transition-all">
              <IconSparkles size={18} />
              How to Generate
            </button>
            <button className="flex items-center gap-2 bg-blue-700/30 hover:bg-blue-700/50 px-4 py-2 rounded-lg border border-blue-500/30 text-sm text-blue-200 transition-all">
              <IconMessageChatbot size={18} />
              AI Chatbot Help
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
