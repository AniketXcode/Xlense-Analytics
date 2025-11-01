// src/pages/Charts.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import "highcharts/highcharts-3d";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconCheck,
  IconBrain,
  IconX,
} from "@tabler/icons-react";
import axios from "../api/config";

// ---------- Styles for nebula background (Tailwind + internal CSS) ----------
const NebulaStyles = () => (
  <style>{`
    @keyframes nebulaMove {
      0% { transform: translate3d(-10%, -5%, 0) scale(1); filter: blur(40px); }
      50% { transform: translate3d(10%, 5%, 0) scale(1.05); filter: blur(45px); }
      100% { transform: translate3d(-10%, -5%, 0) scale(1); filter: blur(40px); }
    }
    .nebula {
      position: absolute;
      inset: 0;
      background: radial-gradient(closest-side at 20% 20%, rgba(138,43,226,0.12), transparent 20%),
                  radial-gradient(closest-side at 80% 80%, rgba(0,229,255,0.08), transparent 20%),
                  radial-gradient(closest-side at 50% 50%, rgba(99,102,241,0.06), transparent 25%);
      z-index: 0;
      pointer-events: none;
      animation: nebulaMove 18s ease-in-out infinite;
    }
    .glass-border {
      box-shadow: 0 10px 30px rgba(11,7,18,0.6), 0 0 40px rgba(139,92,246,0.06);
      backdrop-filter: blur(8px) saturate(120%);
      -webkit-backdrop-filter: blur(8px) saturate(120%);
    }
    /* hide highcharts credits if any leftover */
    .highcharts-credits { display: none !important; }
  `}</style>
);

// ---------- Main Component ----------
const Charts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fileName, xAxis, yAxis, zAxis, chartType, fileId } = location.state || {};

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Modal / AI states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiInsights, setAiInsights] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        if (!fileId || !xAxis || !yAxis) {
          setLoading(false);
          return;
        }
        const response = await axios.post(
          `/analysis/generate-charts/${fileId}`,
          { xAxis, yAxis, zAxis, chartType },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setChartData(response.data.data);
      } catch (err) {
        console.error("Error fetching chart data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [fileId, xAxis, yAxis, zAxis, chartType]);

  const handleSaveChart = async () => {
    try {
      setSaving(true);
      const response = await axios.post(
        "/analysis/save-chart",
        { fileName, fileId, chartType, xAxis, yAxis, zAxis, is3D: chartType?.includes("3d") },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (response.data?.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert("Save returned an unexpected response.");
      }
    } catch (err) {
      console.error("Error saving chart:", err);
      alert("Failed to save chart: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const fetchAIInsights = async () => {
    if (!fileId) {
      setAiError("No file available to analyze.");
      return;
    }
    setAiLoading(true);
    setAiError("");
    setAiInsights(null);

    try {
      // call your AI insights endpoint
      const res = await axios.post(
        `/ai/insights/${fileId}`,
        { xAxis, yAxis, zAxis, chartType },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      // Expecting { insights: { summary, insights:[], recommendations:[], stats: {} } }
      setAiInsights(res.data.insights || res.data);
    } catch (err) {
      console.error("AI insights error:", err);
      setAiError(err.response?.data?.message || "Failed to generate AI insights.");
    } finally {
      setAiLoading(false);
    }
  };

  const getChartOptions = () => {
    if (!chartData) return {};
    const is3DChart = chartType?.includes("3d");
    const baseChartType = chartType?.replace("3d-", "");
    const baseOptions = {
      chart: {
        backgroundColor: "transparent",
        type: baseChartType === "donut" ? "pie" : baseChartType,
        ...(is3DChart && { options3d: { enabled: true, alpha: 45, beta: 0, depth: baseChartType === "column" ? 70 : 35 } }),
      },
      title: { text: `${(chartType || "").toUpperCase()} - ${fileName}`, style: { color: "#ffffff" } },
      xAxis: { categories: chartData.categories, labels: { style: { color: "#ccc" } }, title: { text: xAxis, style: { color: "#ccc" } } },
      yAxis: { title: { text: yAxis, style: { color: "#ccc" } }, labels: { style: { color: "#ccc" } } },
      plotOptions: {
        ...(baseChartType === "pie" && {
          pie: { allowPointSelect: true, cursor: "pointer", ...(is3DChart && { depth: 35 }), ...(chartType === "3d-donut" && { innerSize: 100 }), dataLabels: { enabled: true, style: { color: "#fff" } } },
        }),
        ...(baseChartType === "column" && is3DChart && { column: { depth: 25, colorByPoint: true } }),
      },
      series: [{ name: `${yAxis} vs ${xAxis}`, data: chartData.seriesData, color: "#8b5cf6" }],
      credits: { enabled: false },
      legend: { itemStyle: { color: "#cccccc" } },
    };
    return baseOptions;
  };

  // loading states
  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#050014] via-[#0a0024] to-[#050011] text-white p-6 flex items-center justify-center">
        <NebulaStyles />
        <div className="text-center z-10">
          <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-purple-400 mx-auto mb-4"></div>
          <p className="text-neutral-300">Preparing your chart...</p>
        </div>
      </div>
    );
  }

  if (!fileName || !xAxis || !yAxis || !chartType) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#050014] to-[#050011] text-white p-6 flex items-center justify-center">
        <NebulaStyles />
        <div className="z-10 text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Missing chart configuration</h2>
          <button onClick={() => navigate("/axis-selection")} className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg">
            Go back to configure
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#050014] via-[#0a0024] to-[#050011] text-white p-6">
      <NebulaStyles />
      <div className="nebula" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/axis-selection", { state: { fileName, fileId } })} className="text-purple-300 hover:text-purple-200 transition flex items-center gap-2">
              <IconArrowLeft size={18} />
              Back
            </button>
            <div>
              <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-cyan-300">
                Generated Chart
              </h1>
              <p className="text-neutral-400 mt-1 text-sm">File: <span className="text-white font-medium">{fileName}</span></p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveChart}
              disabled={saving || saved}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${saved ? "bg-green-600 text-white" : saving ? "bg-neutral-700 text-neutral-300" : "bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white"
                }`}
            >
              {saved ? (
                <>
                  <IconCheck size={16} />
                  Saved
                </>
              ) : saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Saving...
                </>
              ) : (
                <>
                  <IconDeviceFloppy size={16} />
                  Save
                </>
              )}
            </button>

            <button onClick={() => setIsModalOpen(true)} className="bg-purple-700/30 hover:bg-purple-700/50 px-4 py-2 rounded-lg border border-purple-600/40 text-purple-200 transition shadow-md hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)]">
              <div className="flex items-center gap-2">
                <IconBrain size={18} />
                AI Insights
              </div>
            </button>
          </div>
        </div>

        {/* Chart + side placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart Panel */}
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="glass-border rounded-2xl p-5 bg-gradient-to-br from-[#0f0f16]/60 to-[#08040a]/60 border border-purple-700/10">
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-2xl pointer-events-none" style={{ boxShadow: "0 0 40px rgba(139,92,246,0.06)" }} />
                <div className="rounded-xl p-4 bg-gradient-to-b from-[#0b0b10]/50 to-transparent">
                  {chartData ? (
                    <HighchartsReact highcharts={Highcharts} options={getChartOptions()} />
                  ) : (
                    <p className="text-center text-neutral-400 py-8">No chart data available</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Info column (small) */}
          <div className="lg:col-span-4">
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.05 }} className="rounded-2xl p-5 glass-border bg-gradient-to-br from-[#0b0512]/60 to-[#07020a]/60 border border-purple-700/10">
              <h3 className="text-lg font-semibold text-purple-300 mb-3">Quick Info</h3>
              <ul className="text-sm space-y-2 text-neutral-300">
                <li><strong>Type:</strong> <span className="text-white ml-2">{chartType}</span></li>
                <li><strong>X:</strong> <span className="text-white ml-2">{xAxis}</span></li>
                <li><strong>Y:</strong> <span className="text-white ml-2">{yAxis}</span></li>
                {zAxis && <li><strong>Z:</strong> <span className="text-white ml-2">{zAxis}</span></li>}
                <li><strong>File:</strong> <span className="text-white ml-2">{fileName}</span></li>
              </ul>

              <div className="mt-5">
                <button onClick={() => setIsModalOpen(true)} className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 px-4 py-2 rounded-lg font-medium shadow-md">
                  Open AI Assistant
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ---------- AI Insights Modal (centered) ---------- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="relative z-50 max-w-3xl w-full mx-4 glass-border rounded-2xl border border-purple-600/30 p-6 bg-gradient-to-br from-[#0d0420]/80 to-[#0b0216]/60"
            >
              {/* Close Button */}
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 rounded-md hover:bg-white/5">
                <IconX size={18} />
              </button>

              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">AI Insights</h2>
                  <p className="text-sm text-purple-300/80 mt-1">Ask the assistant to analyze this dataset and suggest actions.</p>
                </div>
                <div className="text-sm text-neutral-300">File: <span className="text-white ml-1 font-medium">{fileName}</span></div>
              </div>

              {/* Generate Button */}
              <div className="mb-4">
                <button
                  onClick={fetchAIInsights}
                  disabled={aiLoading}
                  className={`px-4 py-2 rounded-lg font-medium transition ${aiLoading ? "bg-neutral-700 text-neutral-300" : "bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white"
                    }`}
                >
                  {aiLoading ? "Generating insights..." : "Generate AI Insights"}
                </button>
              </div>

              {/* Body: show loading / error / insights */}
              <div className="max-h-[60vh] overflow-auto pr-2">
                {aiLoading && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-purple-400 mb-3"></div>
                    <p className="text-purple-200">Analyzing your data — this may take a few seconds.</p>
                  </div>
                )}

                {aiError && (
                  <div className="bg-red-600/10 text-red-300 p-4 rounded-lg">
                    <strong>Error:</strong>
                    <div className="mt-1">{aiError}</div>
                  </div>
                )}

                {aiInsights && (
                  <div className="space-y-4">
                    {/* Summary */}
                    {aiInsights.summary && (
                      <div className="bg-[#12041a] border border-purple-700/30 rounded-lg p-4">
                        <h4 className="text-sm text-purple-300 font-semibold mb-2">Summary</h4>
                        <p className="text-sm text-white/90">{aiInsights.summary}</p>
                      </div>
                    )}

                    {/* Key Insights */}
                    {Array.isArray(aiInsights.insights) && aiInsights.insights.length > 0 && (
                      <div>
                        <h4 className="text-sm text-purple-300 font-semibold mb-2">Key Insights</h4>
                        <ul className="space-y-2">
                          {aiInsights.insights.map((it, idx) => (
                            <li key={idx} className="bg-[#0b0520]/50 rounded-lg p-3 text-sm text-purple-100">
                              {it}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Recommendations */}
                    {Array.isArray(aiInsights.recommendations) && aiInsights.recommendations.length > 0 && (
                      <div>
                        <h4 className="text-sm text-cyan-200 font-semibold mb-2">Recommendations</h4>
                        <ul className="grid gap-2">
                          {aiInsights.recommendations.map((rec, idx) => (
                            <li key={idx} className="bg-[#021017]/50 rounded-lg p-3 text-sm text-cyan-100">
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Stats */}
                    {aiInsights.stats && (
                      <div>
                        <h4 className="text-sm text-purple-300 font-semibold mb-2">Stats</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <StatTiny label="Rows" value={aiInsights.stats.totalRows} />
                          <StatTiny label="Columns" value={aiInsights.stats.totalColumns} />
                          <StatTiny label="Numeric" value={aiInsights.stats.numericColumns} />
                          <StatTiny label="Dates" value={aiInsights.stats.dateColumns} />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {!aiLoading && !aiInsights && !aiError && (
                  <div className="text-center text-neutral-400 py-8">
                    <p className="mb-2">No insights generated yet.</p>
                    <p className="text-xs">Click <strong>Generate AI Insights</strong> to analyze the uploaded data.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Charts;

/* ---------- small helper components ---------- */
const StatTiny = ({ label, value }) => (
  <div className="rounded-lg bg-neutral-900/40 p-3 text-center">
    <div className="text-lg font-semibold text-white">{value ?? "-"}</div>
    <div className="text-xs text-neutral-400">{label}</div>
  </div>
);
