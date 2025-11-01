import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      // 🧠 Backend Integration Placeholder
      // const res = await fetch("http://localhost:8000/api/auth/forgot-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });

      // const data = await res.json();
      // if (!res.ok) throw new Error(data.message || "Failed to send reset link");

      // Simulate success (remove this after backend is connected)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setMessage("✅ Password reset link sent! Check your email inbox.");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-white mb-2">
        Forgot Your Password? 🔒
      </h2>
      <p className="text-gray-400 mb-6">
        Enter your registered email, and we’ll send you a password reset link.
      </p>

      {error && (
        <div className="bg-red-600 text-white p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}
      {message && (
        <div className="bg-green-600 text-white p-3 rounded mb-4 text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mb-6 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg mb-3 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <p className="text-sm text-center text-gray-400 mt-6">
        Back to{" "}
        <Link to="/login" className="text-purple-400 hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;
