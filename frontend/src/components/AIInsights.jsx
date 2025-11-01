import React, { useState, useEffect } from "react";
import {
  IconBrain,
  IconChevronDown,
  IconChevronUp,
  IconSparkles,
} from "@tabler/icons-react";
import axios from "../api/config";

const AIInsights = ({ fileId, fileName, xAxis, yAxis, zAxis, chartType }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(null);

  const fetchInsights = async () => {
    if (!fileId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `/ai/insights/${fileId}`,
        { xAxis, yAxis, zAxis, chartType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setInsights(response.data.insights);
    } catch (err) {
      console.error("Error fetching AI insights:", err);
      setError("⚠️ Failed to generate insights. Try again!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fileId) fetchInsights();
  }, [fileId, xAxis, yAxis, zAxis, chartType]);

  if (!fileId) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-purple-700/40 bg-gradient-to-br from-purple-900/40 to-blue-900/40 shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)] backdrop-blur-xl">
      {/* Header */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex cursor-pointer items-center justify-between px-5 py-4 transition-all hover:bg-purple-900/20"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/30 text-purple-300">
            <IconBrain size={22} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">AI Insights</h3>
            <p className="text-sm text-purple-200/80">
              Smart analysis of your uploaded data
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {loading && (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-purple-400 border-t-transparent"></div>
          )}
          {expanded ? (
            <IconChevronUp size={20} className="text-purple-300" />
          ) : (
            <IconChevronDown size={20} className="text-purple-300" />
          )}
        </div>
      </div>

      {/* Expanded Section */}
      {expanded && (
        <div className="border-t border-purple-700/30 px-5 py-5 transition-all duration-300">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-400 border-t-transparent"></div>
              <p className="mt-2 text-sm text-purple-200">
                Generating smart insights...
              </p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-red-400">{error}</p>
              <button
                onClick={fetchInsights}
                className="mt-3 rounded-lg bg-purple-600/40 px-3 py-1.5 text-sm text-purple-100 transition hover:bg-purple-600/60"
              >
                Try Again
              </button>
            </div>
          ) : insights ? (
            <div className="space-y-6">
              {/* Summary */}
              <div className="rounded-xl bg-purple-800/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-semibold text-purple-300">
                  <IconSparkles size={18} />
                  Summary
                </h4>
                <p className="text-sm text-white/90">{insights.summary}</p>
              </div>

              {/* Key Insights */}
              {insights.insights?.length > 0 && (
                <div>
                  <h4 className="mb-2 font-semibold text-purple-300">
                    📊 Key Insights
                  </h4>
                  <div className="grid gap-2 md:grid-cols-2">
                    {insights.insights.map((i, index) => (
                      <div
                        key={index}
                        className="rounded-lg bg-purple-800/10 p-3 text-sm text-purple-100 shadow-sm hover:bg-purple-800/20"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {insights.recommendations?.length > 0 && (
                <div>
                  <h4 className="mb-2 font-semibold text-blue-300">
                    💡 Recommendations
                  </h4>
                  <div className="grid gap-2 md:grid-cols-2">
                    {insights.recommendations.map((r, index) => (
                      <div
                        key={index}
                        className="rounded-lg bg-blue-800/10 p-3 text-sm text-blue-100 shadow-sm hover:bg-blue-800/20"
                      >
                        {r}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats Section */}
              {insights.stats && (
                <div>
                  <h4 className="mb-3 font-semibold text-purple-300">📈 Stats Overview</h4>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { label: "Rows", value: insights.stats.totalRows },
                      { label: "Columns", value: insights.stats.totalColumns },
                      { label: "Numeric", value: insights.stats.numericColumns },
                      { label: "Dates", value: insights.stats.dateColumns },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="rounded-lg bg-neutral-900/60 p-3 text-center shadow-md hover:bg-neutral-800/60 transition"
                      >
                        <div className="text-lg font-bold text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs text-neutral-400">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-purple-200">No insights found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AIInsights;
