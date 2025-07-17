// src/pages/AdminPanel.jsx
"use client";

import React from "react";
import {
  IconUsers,
  IconDatabase,
  IconBrain,
  IconArrowLeft,
  IconTrash,
  IconEdit,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const users = [
  { name: "Rajat Sagar", role: "Admin", uploads: 12 },
  { name: "Aniket Sharma", role: "User", uploads: 6 },
  { name: "Vivek Kumar", role: "User", uploads: 3 },
];

export default function AdminPanel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 text-white">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition"
        >
          <IconArrowLeft size={18} />
          Back to Dashboard
        </button>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-purple-400 mb-8">
          🛡️ Admin Panel
        </h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <AdminCard title="Total Users" value="24" icon={<IconUsers size={28} />} />
          <AdminCard title="Total Uploads" value="128" icon={<IconDatabase size={28} />} />
          <AdminCard title="AI Insights Used" value="18" icon={<IconBrain size={28} />} />
        </div>

        {/* User Management Table */}
        <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-800 text-purple-300">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Uploads</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700">
              {users.map((user, idx) => (
                <tr key={idx} className="hover:bg-neutral-800 transition">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">{user.uploads}</td>
                  <td className="px-6 py-4 flex justify-end gap-3">
                    <button className="text-yellow-400 hover:text-yellow-300">
                      <IconEdit size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-400">
                      <IconTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

const AdminCard = ({ title, value, icon }) => (
  <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-5 shadow hover:shadow-lg transition flex items-center justify-between">
    <div>
      <p className="text-sm text-neutral-400">{title}</p>
      <p className="text-xl font-bold text-purple-300">{value}</p>
    </div>
    <div className="bg-purple-700 p-2 rounded-full">{icon}</div>
  </div>
);
