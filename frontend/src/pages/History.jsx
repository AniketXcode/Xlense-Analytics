// src/pages/History.jsx
"use client";

import React, { useEffect, useState } from "react";
import {
  IconFileSpreadsheet,
  IconChartLine,
  IconArrowLeft,
  IconEye,
  IconDownload,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import axios from "../api/config";
import { downloadFileById } from "../utils/downloadHelper";

export default function History() {
  const navigate = useNavigate();
  const [chartHistory, setChartHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartHistory = async () => {
      try {
        const response = await axios.get("/analysis/chart-history", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setChartHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching chart history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChartHistory();
  }, []);

  const handleViewChart = (chart) => {
    navigate("/charts", {
      state: {
        fileName: chart.fileName,
        fileId: chart.fileId._id,
        xAxis: chart.xAxis,
        yAxis: chart.yAxis,
        zAxis: chart.zAxis,
        chartType: chart.chartType,
        is3D: chart.is3D,
      },
    });
  };

  const handleDownload = async (chart) => {
    try {
      await downloadFileById(chart.fileId._id);
    } catch (e) {
      console.error("Download failed", e);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen relative bg-gradient-to-b from-[#050014] via-[#0a0024] to-[#050011] flex items-center justify-center text-white">
        <NebulaStyles />
        <div className="flex flex-col items-center z-10">
          <div className="animate-spin h-14 w-14 border-b-4 border-purple-500 rounded-full mb-4"></div>
          <p className="text-neutral-400">Loading your chart history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#050014] via-[#0a0024] to-[#050011] text-white p-6">
      <NebulaStyles />
      <div className="nebula" />
      <div className="max-w-5xl mx-auto relative z-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm text-purple-300 hover:text-purple-100 transition"
        >
          <IconArrowLeft size={18} />
          Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300 mb-6">
          Chart History
        </h1>

        {chartHistory.length === 0 ? (
          <p className="text-neutral-400 italic text-center py-20">
            No charts generated yet... Time to create some amazing visualizations! 📊
          </p>
        ) : (
          <div className="space-y-4">
            {chartHistory.map((chart) => (
              <div
                key={chart._id}
                className="group relative flex items-center justify-between p-5 rounded-xl border border-purple-800/20 bg-[#0b0218]/50 backdrop-blur-sm hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] transition"
              >
                {/* Neon glow border */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"
                  style={{ boxShadow: "0 0 25px rgba(139,92,246,0.2)" }}></div>

                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-700 to-purple-900 p-3 rounded-full shadow-md">
                    <IconChartLine size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{chart.fileName}</p>
                    <p className="text-sm text-neutral-400">
                      {formatDate(chart.createdAt)} • {chart.chartType.toUpperCase()}
                    </p>
                    <p className="text-xs text-purple-300 mt-1">
                      {chart.xAxis} vs {chart.yAxis}{" "}
                      {chart.zAxis && `vs ${chart.zAxis}`}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs text-cyan-300 mb-2">
                    {chart.is3D ? "3D Chart" : "2D Chart"}
                  </p>
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => handleDownload(chart)}
                      className="bg-[#16162a] hover:bg-[#20163d] text-sm px-3 py-1.5 rounded-md border border-purple-700/30 flex items-center gap-2 transition"
                    >
                      <IconDownload size={16} />
                      Download
                    </button>
                    <button
                      onClick={() => handleViewChart(chart)}
                      className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-sm px-3 py-1.5 rounded-md flex items-center gap-2 shadow-md transition"
                    >
                      <IconEye size={16} />
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Nebula background style
const NebulaStyles = () => (
  <style>{`
    @keyframes nebulaMove {
      0% { transform: translate3d(-5%, -5%, 0) scale(1); }
      50% { transform: translate3d(5%, 5%, 0) scale(1.05); }
      100% { transform: translate3d(-5%, -5%, 0) scale(1); }
    }
    .nebula {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 25% 25%, rgba(138,43,226,0.15), transparent 40%),
                  radial-gradient(circle at 75% 75%, rgba(0,229,255,0.08), transparent 40%),
                  radial-gradient(circle at 50% 50%, rgba(99,102,241,0.06), transparent 30%);
      z-index: 0;
      animation: nebulaMove 20s ease-in-out infinite;
    }
  `}</style>
);
