import React from "react";
import TopNavbar from "../components/TopNavbar";

const Guide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a0020] text-white">
      <TopNavbar username="Rajat" />
      <main className="pt-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-purple-400">
          📊 How to Generate Charts
        </h1>
        <p className="text-gray-300 leading-relaxed">
          This guide explains how to upload your Excel (.xlsx) file, select axes, and generate 2D or 3D charts easily.
        </p>

        <section className="mt-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-purple-300 mb-2">1️⃣ Upload File</h2>
            <p className="text-gray-400">Go to the <b>Upload</b> page and upload your Excel sheet.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-300 mb-2">2️⃣ Choose Axes</h2>
            <p className="text-gray-400">
              - X-Axis → Select string or categorical values (e.g., Names, Months)<br />
              - Y-Axis → Select numeric values (e.g., Sales, Revenue)<br />
              - Z-Axis (optional) → Used only in 3D charts for additional numeric dimension.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-300 mb-2">3️⃣ Generate Charts</h2>
            <p className="text-gray-400">
              Supported chart types include: <br />
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>📈 Bar Chart — for category vs numeric</li>
                <li>📊 Column Chart — for vertical comparison</li>
                <li>📉 Line Chart — for trends</li>
                <li>🥧 Pie Chart — for percentage share</li>
                <li>🌐 3D Bar / 3D Surface — for multi-dimensional data</li>
              </ul>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-300 mb-2">4️⃣ Download</h2>
            <p className="text-gray-400">
              Once generated, you can download charts as PNG or JPG format directly from the chart preview page.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Guide;
