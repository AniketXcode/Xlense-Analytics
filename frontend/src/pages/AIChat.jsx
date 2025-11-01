import React from "react";
import TopNavbar from "../components/TopNavbar";

const AIChat = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a0020] text-white">
      <TopNavbar username="Rajat" />
      <main className="pt-20 px-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-400 mb-4">🤖 AI Assistant</h1>
        <p className="text-gray-300 mb-6">
          Ask questions about chart generation, data visualization, or app usage.
          The AI assistant will help you understand and troubleshoot your data workflows.
        </p>
        <div className="bg-[#1a1a1a]/60 rounded-2xl p-6 border border-purple-800/30 shadow-lg">
          <p className="text-gray-400 italic">
            (Chatbot UI coming soon — integrated with your analytics engine!)
          </p>
        </div>
      </main>
    </div>
  );
};

export default AIChat;
