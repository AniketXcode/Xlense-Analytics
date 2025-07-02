import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-white mb-2">Reset your password</h2>
      <p className="text-gray-400 mb-6">We’ll send you an email with reset instructions.</p>

      <input
        type="email"
        placeholder="Enter your email"
        className="w-full px-4 py-2 mb-6 rounded bg-gray-800 text-white border border-gray-600"
      />
      <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded mb-3">
        Send Reset Link
      </button>

      <p className="text-sm text-center text-gray-400">
        Back to{" "}
        <Link to="/" className="text-blue-400 hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;
