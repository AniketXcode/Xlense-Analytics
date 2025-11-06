// src/pages/Charts.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import "highcharts/highcharts-3d";
import Exporting from "highcharts/modules/exporting"; // ✅ Add this
import { motion, AnimatePresence } from "framer-motion";
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconCheck,
  IconBrain,
  IconX,
  IconDownload,
} from "@tabler/icons-react";
import axios from "../api/config";



// ✅ Activate Highcharts exporting module
if (typeof exportingInit === "function") {
  exportingInit(Highcharts);
}

// ---------- Styles for nebula background ----------
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
    .highcharts-credits { display: none !important; }
  `}</style>
);

const Charts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fileName, xAxis, yAxis, zAxis, chartType, fileId } = location.state || {};

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiInsights, setAiInsights] = useState(null);
  const chartRef = React.useRef(null);


  // ✅ Fetch chart data
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

  // ✅ Save chart handler
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

  // ✅ Download chart as PNG (Highcharts built-in)
  const handleDownloadChart = () => {
    const chart = chartRef.current?.chart;
    if (!chart) {
      alert("Chart not found!");
      return;
    }
    chart.exportChart({ type: "image/png", filename: fileName || "chart" });
    chart.exportChart({ type: "application/pdf" });


  };
  // ✅ AI insights
  const fetchAIInsights = async () => {
    if (!fileId) {
      setAiError("No file available to analyze.");
      return;
    }
    setAiLoading(true);
    setAiError("");
    setAiInsights(null);

    try {
      const res = await axios.post(
        `/ai/insights/${fileId}`,
        { xAxis, yAxis, zAxis, chartType },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setAiInsights(res.data.insights || res.data);
    } catch (err) {
      console.error("AI insights error:", err);
      setAiError(err.response?.data?.message || "Failed to generate AI insights.");
    } finally {
      setAiLoading(false);
    }
  };

  // ✅ Chart options
  const getChartOptions = () => {
    if (!chartData) return {};
    const is3DChart = chartType?.includes("3d");
    const baseChartType = chartType?.replace("3d-", "");
    return {
      chart: {
        backgroundColor: "transparent",
        type: baseChartType === "donut" ? "pie" : baseChartType,
        ...(is3DChart && { options3d: { enabled: true, alpha: 45, beta: 0, depth: 50 } }),
      },
      title: { text: `${(chartType || "").toUpperCase()} - ${fileName}`, style: { color: "#fff" } },
      xAxis: { categories: chartData.categories, labels: { style: { color: "#ccc" } }, title: { text: xAxis, style: { color: "#ccc" } } },
      yAxis: { title: { text: yAxis, style: { color: "#ccc" } }, labels: { style: { color: "#ccc" } } },
      plotOptions: {
        pie: { allowPointSelect: true, cursor: "pointer", depth: 45, dataLabels: { enabled: true, style: { color: "#fff" } } },
        column: { depth: 25, colorByPoint: true },
      },
      series: [{ name: `${yAxis} vs ${xAxis}`, data: chartData.seriesData, color: "#8b5cf6" }],
      credits: { enabled: false },
      legend: { itemStyle: { color: "#ccc" } },
      exporting: { enabled: false }, // disable default icon
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#050014] via-[#0a0024] to-[#050011] flex items-center justify-center text-white">
        <NebulaStyles />
        <div className="flex flex-col items-center">
          <div className="animate-spin h-14 w-14 border-b-4 border-purple-400 rounded-full mb-4"></div>
          <p className="text-neutral-300">Preparing your chart...</p>
        </div>
      </div>
    );
  }

  if (!fileName || !xAxis || !yAxis || !chartType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#050014] to-[#050011] text-white">
        <NebulaStyles />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Missing chart configuration</h2>
          <button onClick={() => navigate("/axis-selection")} className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg">
            Go back to configure
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#050014] via-[#0a0024] to-[#050011] text-white p-6 overflow-hidden">
      <NebulaStyles />
      <div className="nebula" />
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/axis-selection", { state: { fileName, fileId } })}
              className="text-purple-300 hover:text-purple-200 flex items-center gap-2"
            >
              <IconArrowLeft size={18} /> Back
            </button>
            <div>
              <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-cyan-300">
                Generated Chart
              </h1>
              <p className="text-neutral-400 mt-1 text-sm">
                File: <span className="text-white font-medium">{fileName}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* ✅ Save Button */}
            <button
              onClick={handleSaveChart}
              disabled={saving || saved}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${saved ? "bg-green-600 text-white" : saving ? "bg-neutral-700 text-neutral-300" : "bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white"}`}
            >
              {saved ? <><IconCheck size={16} /> Saved</> :
                saving ? <><div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full" /> Saving...</> :
                  <><IconDeviceFloppy size={16} /> Save</>}
            </button>

            {/* ✅ Download Button */}
            <button
              onClick={handleDownloadChart}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-700/30 hover:bg-purple-700/50 border border-purple-600/40 text-purple-200 transition shadow-md hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)]"
            >
              <IconDownload size={16} /> Download
            </button>

            {/* AI Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-700/30 hover:bg-purple-700/50 px-4 py-2 rounded-lg border border-purple-600/40 text-purple-200 transition shadow-md hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)]"
            >
              <div className="flex items-center gap-2">
                <IconBrain size={18} /> AI Insights
              </div>
            </button>
          </div>
        </div>

        {/* Chart area */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="glass-border rounded-2xl p-5 bg-gradient-to-br from-[#0f0f16]/60 to-[#08040a]/60 border border-purple-700/10"
        >
          {chartData ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={getChartOptions()}
              ref={chartRef}
            />

          ) : (
            <p className="text-center text-neutral-400 py-8">No chart data available</p>
          )}
        </motion.div>

        {/* AI Insights Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative z-50 max-w-3xl w-full mx-4 glass-border rounded-2xl border border-purple-600/30 p-6 bg-gradient-to-br from-[#0d0420]/80 to-[#0b0216]/60"
              >
                <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 rounded-md hover:bg-white/5">
                  <IconX size={18} />
                </button>
                <h2 className="text-2xl font-bold text-white mb-3">AI Insights</h2>
                <p className="text-sm text-purple-300/80 mb-4">Analyze this dataset and suggest actions.</p>

                <button
                  onClick={fetchAIInsights}
                  disabled={aiLoading}
                  className={`px-4 py-2 rounded-lg font-medium transition ${aiLoading ? "bg-neutral-700 text-neutral-300" : "bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white"}`}
                >
                  {aiLoading ? "Generating insights..." : "Generate AI Insights"}
                </button>

                <div className="max-h-[60vh] overflow-auto mt-5">
                  {aiLoading && <p className="text-purple-200 text-center">Analyzing your data...</p>}
                  {aiError && <div className="bg-red-600/10 text-red-300 p-4 rounded-lg mt-3">{aiError}</div>}
                  {aiInsights && (
                    <div className="mt-4 space-y-3 text-sm">
                      {aiInsights.summary && <p className="text-white">{aiInsights.summary}</p>}
                      {aiInsights.insights?.length > 0 && (
                        <ul className="list-disc list-inside text-purple-200">{aiInsights.insights.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Charts;
