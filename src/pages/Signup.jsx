import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const SignUp = () => {
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User:", user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign up error", error);
    }
  };
  
  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-white mb-2">Create your Xlense Analyticscd  account</h2>
      <p className="text-gray-400 mb-6">Join the next-gen data visualization experience</p>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full px-4 py-2 mb-4 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 mb-4 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 mb-6 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded mb-3 transition">
        Sign Up
      </button>

      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-700" />
        <span className="px-3 text-gray-500 text-sm">OR</span>
        <hr className="flex-grow border-gray-700" />
      </div>

      <button
        onClick={handleGoogleSignup}
        className="w-full flex items-center justify-center gap-2 border border-gray-600 text-white py-2 rounded hover:bg-white hover:text-black transition"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
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
