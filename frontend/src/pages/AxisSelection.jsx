import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/config";
import {
  IconTable,
  IconChartLine,
  IconChartPie,
  IconChartDots3,
  IconChartBar,
  IconCube,
} from "@tabler/icons-react";

export default function AxisSelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { fileName, fileId } = location.state || {};

  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [zAxis, setZAxis] = useState("");
  const [chartType, setChartType] = useState("");
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColumns = async () => {
      if (!fileId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `/analysis/map-data/${fileId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setColumns(response.data.columns);
      } catch (error) {
        console.error("Error fetching columns:", error);
        alert("Failed to load file data");
      } finally {
        setLoading(false);
      }
    };

    fetchColumns();
  }, [fileId]);

  const handleGenerateChart = () => {
    if (!xAxis || !yAxis || !chartType) {
      alert("Please select X-axis, Y-axis, and chart type");
      return;
    }

    navigate("/charts", {
      state: {
        fileName,
        fileId,
        xAxis,
        yAxis,
        zAxis,
        chartType,
        is3D: chartType.includes("3d"),
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mb-3"></div>
        <p className="text-gray-400">Loading file data...</p>
      </div>
    );
  }

  if (!fileId) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-400 mb-4">
          No File Selected
        </h1>
        <button
          onClick={() => navigate("/upload")}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg shadow-lg transition"
        >
          Upload a File
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3">
            Configure Chart Axes
          </h1>
          <p className="text-neutral-400 text-sm">
            File Selected: <span className="text-purple-400">{fileName}</span>
          </p>
        </div>

        {/* Axis Selection Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* X Axis */}
          <AxisBox
            title="X-Axis (Categories)"
            icon={<IconTable className="mr-2" size={20} />}
            value={xAxis}
            onChange={setXAxis}
            options={columns}
          />

          {/* Y Axis */}
          <AxisBox
            title="Y-Axis (Values)"
            icon={<IconChartBar className="mr-2" size={20} />}
            value={yAxis}
            onChange={setYAxis}
            options={columns}
          />

          {/* Z Axis (Only for 3D charts) */}
          {chartType.includes("3d") && (
            <AxisBox
              title="Z-Axis (Depth)"
              icon={<IconCube className="mr-2" size={20} />}
              value={zAxis}
              onChange={setZAxis}
              options={columns}
              optional
            />
          )}
        </div>

        {/* Chart Type Section */}
        <div className="bg-neutral-900 rounded-xl p-8 border border-neutral-800 shadow-lg mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-purple-300">
            Choose Chart Type
          </h2>

          {/* 2D Section */}
          <ChartSection
            title="2D Charts"
            color="purple"
            charts={[
              { type: "line", icon: IconChartLine, label: "Line" },
              { type: "column", icon: IconChartBar, label: "Bar" },
              { type: "pie", icon: IconChartPie, label: "Pie" },
              { type: "scatter", icon: IconChartDots3, label: "Scatter" },
            ]}
            chartType={chartType}
            setChartType={setChartType}
          />

          {/* 3D Section */}
          <ChartSection
            title="3D Charts"
            color="cyan"
            charts={[
              { type: "3d-column", icon: IconCube, label: "3D Column" },
              { type: "3d-pie", icon: IconChartPie, label: "3D Pie" },
              { type: "3d-scatter", icon: IconChartDots3, label: "3D Scatter" },
              { type: "3d-donut", icon: IconChartPie, label: "3D Donut" },
            ]}
            chartType={chartType}
            setChartType={setChartType}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-neutral-800 hover:bg-neutral-700 px-6 py-3 rounded-lg border border-neutral-700 text-gray-300 hover:text-white transition"
          >
            Back to Dashboard
          </button>
          <button
            onClick={handleGenerateChart}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 px-8 py-3 rounded-lg font-semibold shadow-md transition"
          >
            Generate Chart
          </button>
        </div>
      </div>
    </div>
  );
}

/* --- Sub Components --- */

const AxisBox = ({ title, icon, value, onChange, options, optional }) => (
  <div className="bg-[#1a1a1a] rounded-xl p-6 border border-neutral-800 shadow-md hover:border-purple-500 transition">
    <h2 className="text-lg font-semibold mb-4 flex items-center text-purple-300">
      {icon}
      {title}
      {optional && <span className="ml-2 text-gray-500 text-sm">(Optional)</span>}
    </h2>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none"
    >
      <option value="">Select {title}</option>
      {options.map((col) => (
        <option key={col} value={col}>
          {col}
        </option>
      ))}
    </select>
  </div>
);

const ChartSection = ({ title, color, charts, chartType, setChartType }) => (
  <div className="mb-8">
    <h3
      className={`text-lg font-medium mb-4 text-${color === "cyan" ? "cyan-300" : "purple-300"
        }`}
    >
      {title}
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {charts.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          onClick={() => setChartType(type)}
          className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center justify-center text-sm ${chartType === type
            ? `border-${color}-500 bg-${color}-500/20 scale-105 shadow-${color}-500/30`
            : "border-neutral-700 hover:border-purple-400 hover:scale-105"
            }`}
        >
          <Icon size={28} className="mb-2" />
          {label}
        </button>
      ))}
    </div>
  </div>
);
