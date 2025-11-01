"use client";

import React, { useState, useEffect } from "react";
import {
  IconUsers,
  IconArrowLeft,
  IconServer,
  IconUpload,
  IconChartBar,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import axios from "../api/config";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    totalUsers: 0,
    totalFiles: 0,
    storageUsed: "0 MB",
    users: [],
    summary: { sharedFiles: 0, deletedFiles: 0, activeUsers: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const response = await axios.get("/admin/stats", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAdminData(response.data.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      if (error.response?.status === 401) {
        alert("Access denied. Admin privileges required.");
        navigate("/dashboard");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClearStorage = async () => {
    if (
      !window.confirm(
        "Are you sure you want to clear ALL storage? This action cannot be undone!"
      )
    )
      return;
    try {
      setClearing(true);
      await axios.delete("/admin/clear-storage", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Storage cleared successfully!");
      fetchAdminData();
    } catch (error) {
      console.error("Error clearing storage:", error);
      alert("Failed to clear storage");
    } finally {
      setClearing(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this user? This will also delete all their files and charts."
      )
    )
      return;
    try {
      await axios.delete(`/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("User deleted successfully!");
      fetchAdminData();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  const handleEditUser = async (userId) => {
    const newRole = prompt('Enter new role (Admin/User):');
    if (!newRole || !['Admin', 'User'].includes(newRole)) {
      alert('Invalid role. Please enter "Admin" or "User"');
      return;
    }

    try {
      await axios.patch(`/admin/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("User role updated successfully!");
      fetchAdminData();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user role");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-neutral-900 text-white p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0d0d0d] text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-purple-400 hover:text-purple-300 flex items-center gap-2 transition"
          >
            <IconArrowLeft size={18} />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold mt-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            🛡️ Admin Dashboard
          </h1>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Users" value={adminData.totalUsers} icon={<IconUsers size={26} />} />
        <StatCard title="Files Uploaded" value={adminData.totalFiles} icon={<IconUpload size={26} />} />
        <StatCard title="Charts Created" value={adminData.totalCharts || 0} icon={<IconChartBar size={26} />} />
        <StatCard title="Storage Used" value={adminData.storageUsed} icon={<IconServer size={26} />} />
      </div>

      {/* Data Usage Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-[#151515]/80 backdrop-blur-lg rounded-2xl p-6 border border-purple-600/20 shadow-md hover:shadow-purple-500/20 transition-all duration-300">
          <h2 className="text-lg font-semibold text-purple-300 mb-4">📦 Data Usage Summary</h2>
          <ul className="text-sm space-y-2">
            <li className="flex justify-between border-b border-neutral-800 pb-2">
              <span>Total Users</span>
              <span className="text-purple-300">{adminData.totalUsers}</span>
            </li>
            <li className="flex justify-between border-b border-neutral-800 pb-2">
              <span>Shared Files</span>
              <span className="text-purple-300">{adminData.summary.sharedFiles}</span>
            </li>
            <li className="flex justify-between">
              <span>Deleted Files</span>
              <span className="text-purple-300">{adminData.summary.deletedFiles}</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#151515]/80 backdrop-blur-lg rounded-2xl p-6 border border-purple-600/20 shadow-md hover:shadow-purple-500/20 transition-all duration-300">
          <h2 className="text-lg font-semibold text-purple-300 mb-4">📊 Monitor Excel Usage</h2>
          <div className="text-sm space-y-3">
            <div className="flex justify-between">
              <span>Current Uploads</span>
              <span className="text-purple-300">{adminData.totalFiles} files</span>
            </div>
            <div className="flex justify-between">
              <span>Active Users</span>
              <span className="text-purple-300">{adminData.summary.activeUsers}</span>
            </div>
            <button
              onClick={handleClearStorage}
              disabled={clearing}
              className={`mt-4 px-4 py-2 rounded-md text-sm font-medium transition-all ${clearing
                ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white shadow-md"
                }`}
            >
              {clearing ? "🔄 Clearing..." : "🗑️ Clear Storage"}
            </button>
          </div>
        </div>
      </div>

      {/* User Management Table */}
      <div className="bg-[#151515]/80 backdrop-blur-lg rounded-2xl p-6 border border-purple-600/20 shadow-md">
        <h2 className="text-lg font-semibold text-purple-300 mb-4">👥 User Management</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-purple-400 border-b border-neutral-700">
                <th className="py-2">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Uploads</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminData.users.map((user) => (
                <tr key={user._id} className="border-b border-neutral-800 hover:bg-purple-900/10 transition">
                  <td className="py-3">{user.name}</td>
                  <td className="text-neutral-400">{user.email}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs ${user.role === "Admin"
                        ? "bg-purple-600 text-white"
                        : "bg-neutral-700 text-neutral-300"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>{user.uploads}</td>
                  <td className="text-right space-x-3">
                    <button
                      onClick={() => handleEditUser(user._id)}
                      className="text-yellow-400 hover:text-yellow-300"
                      title="Edit Role"
                    >
                      <IconEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-red-500 hover:text-red-400"
                      title="Delete User"
                    >
                      <IconTrash size={16} />
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

/* ✨ Modern Stat Card */
const StatCard = ({ title, value, icon }) => (
  <div className="relative group bg-gradient-to-br from-[#1b1b1b] to-[#111] border border-purple-600/20 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 overflow-hidden">
    {/* Glow effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h2 className="text-3xl font-bold text-white">{value}</h2>
      </div>
      <div className="p-3 rounded-full bg-purple-700/20 text-purple-400 group-hover:bg-purple-700/40 transition-all">
        {icon}
      </div>
    </div>
    <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"></div>
  </div>
);
