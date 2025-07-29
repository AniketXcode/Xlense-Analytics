import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

// TODO: Import authentication functions (like signup API) from your backend service when available
// import { signUpUser } from '../api/auth';  // Example placeholder

const SignUp = () => {
  const navigate = useNavigate();

  // Function to handle Google Sign Up
  const handleGoogleSignup = async () => {
    try {
      // ✅ Google Auth logic (already integrated with Firebase/any other SDK)
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User:", user);

      // TODO: Send this `user` object to the backend to store in DB (if needed)
      // await saveGoogleUserToDB(user);

      // Navigate to dashboard after success
      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign up error", error);
      // TODO: Optionally show error to user with a toast/alert
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-white mb-2">
        Create your Xlense Analytics account
      </h2>
      <p className="text-gray-400 mb-6">
        Join the next-gen data visualization experience
      </p>

      {/* 🔽 Input fields to collect signup data */}
      <input
        type="text"
        placeholder="Full Name"
        className="w-full px-4 py-2 mb-4 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
      // TODO: Add onChange and state to capture value
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 mb-4 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
      // TODO: Add onChange and state to capture value
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 mb-6 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
      // TODO: Add onChange and state to capture value
      />

      {/* 🔘 Button to trigger backend signup */}
      <button
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded mb-3 transition"
        onClick={() => {
          // TODO: Implement signup logic with backend API
          // Example:
          // const res = await signUpUser({ name, email, password });
          // if (res.success) navigate('/dashboard');
        }}
      >
        Sign Up
      </button>

      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-700" />
        <span className="px-3 text-gray-500 text-sm">OR</span>
        <hr className="flex-grow border-gray-700" />
      </div>

      {/* 🔘 Google OAuth Sign Up */}
      <button
        onClick={handleGoogleSignup}
        className="w-full flex items-center justify-center gap-2 border border-gray-600 text-white py-2 rounded hover:bg-white hover:text-black transition"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="h-5 w-5"
        />
        Sign up with Google
      </button>

      <p className="text-sm text-center text-gray-400 mt-6">
        Already have an account?{" "}
        <Link to="/" className="text-blue-400 hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignUp;
