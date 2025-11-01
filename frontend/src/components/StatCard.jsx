import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-[#0d0d0d] border border-purple-600/30 p-5 transition-all duration-300 hover:border-purple-500/70 hover:shadow-[0_0_20px_-2px_rgba(168,85,247,0.6)]">
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-purple-700/20 to-transparent"></div>

      {/* Content */}
      <div className="relative flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-400 uppercase tracking-wide">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>

        <div className="p-3 rounded-full bg-purple-700/20 text-purple-400 group-hover:bg-purple-600/40 transition-all duration-300">
          {icon}
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"></div>
    </div>
  );
};

export default StatCard;
