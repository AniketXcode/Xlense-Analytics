// src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { IconFileSpreadsheet } from "@tabler/icons-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0014] via-[#1a0b2e] to-[#0f021f] text-white flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-lg backdrop-blur-lg bg-white/5 border border-white/10 p-8 rounded-2xl shadow-[0_0_25px_rgba(139,92,246,0.3)]">
        <div className="relative flex justify-center">
          <div className="absolute w-24 h-24 bg-purple-500/30 blur-2xl rounded-full animate-pulse"></div>
          <IconFileSpreadsheet
            size={80}
            className="relative text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]"
          />
        </div>

        <h1 className="text-5xl font-extrabold mt-6 text-purple-400 tracking-tight">
          404 - Cell Not Found
        </h1>

        <p className="text-lg mt-3 text-neutral-300">
          You tried to access <code className="text-purple-300">=A404</code>, but Excel screamed{" "}
          <span className="text-pink-400 font-semibold">#REF!</span> 😵‍💫
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Even Excel couldn’t <span className="text-purple-300 font-medium">SUM</span> this page.
        </p>

        <div className="bg-white/10 border border-white/10 p-4 mt-6 rounded-lg text-sm text-left font-mono text-gray-300 shadow-inner">
          <p>🔍 <span className="text-purple-300">Error:</span> FileNotFoundException.xlsx</p>
          <p>📅 <span className="text-purple-300">Last seen:</span> In a mysterious pivot table</p>
          <p>🧪 <span className="text-purple-300">Tried:</span> =IF(page="exist","Load","Cry")</p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 px-6 py-2.5 bg-purple-600/80 hover:bg-purple-700 text-white rounded-md transition-all shadow-lg shadow-purple-600/40 hover:shadow-purple-500/60"
        >
          🧾 Return to Dashboard
        </button>

        <div className="mt-6 text-xs text-neutral-500 italic">
          Or stay here and cry over a missing Excel row 😭
        </div>
      </div>
    </div>
  );
};

export default NotFound;
