// src/pages/History.jsx
"use client";

import React from "react";
import {
  IconFileSpreadsheet,
  IconDownload,
  IconArrowLeft,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const uploadHistory = [
  {
    name: "sales_data.xlsx",
    date: "July 14, 2025",
    size: "324 KB",
    type: "Excel Sheet",
  },
  {
    name: "finance_q2.xlsx",
    date: "July 10, 2025",
    size: "278 KB",
    type: "Excel Sheet",
  },
  {
    name: "user_metrics.csv",
    date: "July 8, 2025",
    size: "112 KB",
    type: "CSV File",
  },
];

export default function History() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition"
        >
          <IconArrowLeft size={18} />
          Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-purple-400 mb-6">
           Upload History
        </h1>

        {uploadHistory.length === 0 ? (
          <p className="text-neutral-400 italic">
            No uploads yet... Maybe it's time to Excel at something! 😄
          </p>
        ) : (
          <div className="space-y-4">
            {uploadHistory.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-[#1a1a1a] border border-neutral-800 rounded-lg px-6 py-4 shadow hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-purple-700 p-2 rounded-full">
                    <IconFileSpreadsheet size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{file.name}</p>
                    <p className="text-sm text-neutral-400">
                      {file.date} • {file.size}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs text-purple-300 mb-1">{file.type}</p>
                  <button className="bg-purple-600 hover:bg-purple-700 text-sm px-3 py-1 rounded shadow flex items-center gap-2">
                    <IconDownload size={16} />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
