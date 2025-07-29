"use client";

import React, { useState } from "react";
import {
  IconDatabase,
  IconFileText,
  IconBrain,
  IconArrowUpRight,
} from "@tabler/icons-react";
import { cn } from "../lib/utils";

import StatCard from "../components/StatCard";
import FileUploadDemo from "../components/FileUploadDemo";
import Chart2DPreview from "../components/Chart2D";
import Chart3DPreview from "../components/Chart3D";
import TopNavbar from "../components/TopNavbar"; // Top navbar component

export default function Dashboard() {
  const [showUploadInline, setShowUploadInline] = useState(false);

  const username = "Aniket"; // ✅ TODO: Replace with dynamic user from backend (e.g. GET /api/user)

  // ✅ MOCK DATA - TODO: Replace with GET /api/uploads/recent
  const recentUploads = [
    { name: "sales_data.xlsx", date: "July 14, 2025" },
    { name: "finance_q2.xlsx", date: "July 10, 2025" },
    { name: "user_metrics.csv", date: "July 8, 2025" },
  ];

  return (
    <div
      className={cn(
        "relative flex w-full min-h-screen flex-col overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-950 text-white"
      )}
    >
      {/* ✅ Top Navbar with Username */}
      <TopNavbar username={username} />

      <main className="flex-1 p-6 bg-neutral-900 text-white transition-all duration-300">
        {/* ✅ Greeting */}
        <div className="mb-6 pt-14">
          <h1 className="text-3xl font-bold text-purple-400">
            Welcome, {username} 👋
          </h1>
          <p className="text-neutral-400 mt-1">
            Here’s a quick look at your analytics activity.
          </p>
        </div>

        {/* ✅ Upload Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowUploadInline(!showUploadInline)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md shadow-md transition"
          >
            + Upload New File
          </button>
        </div>

        {/* ✅ Upload Section - shown when toggled */}
        {showUploadInline && (
          <div className="mb-10">
            {/* ✅ BACKEND INTEGRATION: File upload component connects to POST /api/upload */}
            <FileUploadDemo />
          </div>
        )}

        {/* ✅ Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* ✅ TODO: Replace static values with backend stats (GET /api/stats or similar) */}
          <StatCard title="Total Uploads" value="128" icon={<IconFileText size={28} />} />
          <StatCard title="Charts Created" value="64" icon={<IconDatabase size={28} />} />
          <StatCard title="Last Upload" value="July 9, 2025" icon={<IconArrowUpRight size={28} />} />
          <StatCard title="AI Insights Used" value="12" icon={<IconBrain size={28} />} />
        </div>

        {/* ✅ Recent Uploads Section */}
        <div className="bg-[#1a1a1a] rounded-lg p-6 mb-10 shadow border border-neutral-800">
          <h2 className="text-xl font-semibold text-purple-300 mb-4">📄 Recent Uploads</h2>
          <ul className="divide-y divide-neutral-800 text-sm">
            {recentUploads.map((file, index) => (
              <li key={index} className="py-2 flex justify-between text-white">
                <span>{file.name}</span>
                <span className="text-neutral-400">{file.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ 2D Chart Preview Section */}
        <div className="mb-10">
          <div className="overflow-x-auto md:overflow-x-scroll scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-neutral-800">
            <div className="flex space-x-6 min-w-[800px] md:min-w-full">
              {/* ✅ BACKEND INTEGRATION: Chart2DPreview should visualize data from uploaded files */}
              <Chart2DPreview />
            </div>
          </div>
        </div>

        {/* ✅ 3D Chart Preview Section */}
        <div className="mb-10">
          <div className="overflow-x-auto md:overflow-x-scroll scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-neutral-800">
            <div className="flex space-x-6 min-w-[800px] md:min-w-full">
              {/* ✅ BACKEND INTEGRATION: Chart3DPreview should visualize data from uploaded files */}
              <Chart3DPreview />
            </div>
          </div>
        </div>

        {/* ✅ Smart Insights Box */}
        <div className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-6 rounded-lg shadow-lg border border-purple-600">
          <h3 className="text-lg font-semibold text-white mb-2">🧠 Smart Insight</h3>
          <p className="text-sm text-purple-100">
            {/* ✅ BACKEND INTEGRATION: This insight should be generated via AI from backend (e.g. /api/insights) */}
            Sales increased by <strong className="text-white">+20%</strong> in Q2 compared to Q1 based on your uploaded Excel data.
          </p>
        </div>
      </main>
    </div>
  );
}
