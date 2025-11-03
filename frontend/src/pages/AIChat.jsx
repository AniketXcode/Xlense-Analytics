import React, { useState } from "react";
import TopNavbar from "../components/TopNavbar";
import axios from "axios";
import { TbMessageChatbot } from "react-icons/tb";

const AIChat = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi Rajat 👋! I’m your Nova AI Assistant. Ask me anything about charts or data!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/chat", { message: input }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const reply = res.data.reply || "Sorry, I didn’t quite get that.";
      setMessages([...newMessages, { sender: "bot", text: reply }]);
    } catch (err) {
      setMessages([...newMessages, { sender: "bot", text: "⚠️ Error contacting AI. Try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a0020] text-white flex flex-col">
      <TopNavbar username="Rajat" />
      <main className="flex-1 pt-20 px-6 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-purple-400 mb-4"> <TbMessageChatbot /> AI Assistant</h1>
        <div className="bg-[#1a1a1a]/70 rounded-2xl p-6 border border-purple-800/40 shadow-lg flex flex-col h-[70vh]">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl max-w-[80%] ${msg.sender === "user"
                  ? "bg-purple-600 self-end text-right"
                  : "bg-[#2b2b2b] text-left"
                  }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="text-sm text-gray-400 italic">Thinking...</div>
            )}
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-[#111] border border-purple-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSend}
              className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIChat;
