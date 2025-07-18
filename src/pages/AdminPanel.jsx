"use client";

import React from "react";
import {
  IconUsers,
  IconDatabase,
  IconArrowLeft,
  IconServer,
  IconUser,
  IconUpload,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();

  const users = [
    { name: "Rajat ", role: "Admin", uploads: 12 },
    { name: "Aniket ", role: "User", uploads: 6 },
    { name: "Raj ", role: "User", uploads: 3 },
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
          >
            <IconArrowLeft size={18} />
            Dashboard
          </button>
          <h1 className="text-3xl font-bold mt-2">🛡️ Admin Dashboard</h1>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Users" value="3" icon={<IconUsers />} />
        <StatCard title="Files Uploaded" value="12" icon={<IconUpload />} />
        <StatCard title="Storage Used" value="58 Mb" icon={<IconServer />} />
      </div>

      {/* Data Usage Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-neutral-800">
          <h2 className="text-lg font-semibold text-purple-300 mb-4">
            Data Usage Summary
          </h2>
          <ul className="text-sm space-y-2">
            <li className="flex justify-between">
              <span>Total Users</span>
              <span>960</span>
            </li>
            <li className="flex justify-between">
              <span>Shared Files</span>
              <span>11</span>
            </li>
            <li className="flex justify-between">
              <span>Deleted Files</span>
              <span>3%</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-neutral-800">
          <h2 className="text-lg font-semibold text-purple-300 mb-4">
            Monitor Excel Usage
          </h2>
          <div className="text-sm space-y-3">
            <div className="flex justify-between">
              <span>Current Uploads</span>
              <span>128 files</span>
            </div>
            <div className="flex justify-between">
              <span>Active Users</span>
              <span>8</span>
            </div>
            <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 text-sm">
              🗑️ Clear Storage
            </button>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-[#1a1a1a] rounded-lg p-6 border border-neutral-800">
        <h2 className="text-lg font-semibold text-purple-300 mb-4">
          👥 User Management
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-purple-400 border-b border-neutral-700">
              <th className="py-2">Name</th>
              <th>Role</th>
              <th>Uploads</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i} className="border-b border-neutral-800 hover:bg-neutral-800 transition">
                <td className="py-3">{user.name}</td>
                <td>{user.role}</td>
                <td>{user.uploads}</td>
                <td className="text-right space-x-3">
                  <button className="text-yellow-400 hover:text-yellow-300">
                    <IconEdit size={16} />
                  </button>
                  <button className="text-red-500 hover:text-red-400">
                    <IconTrash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Card component
const StatCard = ({ title, value, icon }) => (
  <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-5 shadow hover:shadow-md transition flex justify-between items-center">
    <div>
      <p className="text-sm text-neutral-400">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
    <div className="text-purple-400">{icon}</div>
  </div>
);
