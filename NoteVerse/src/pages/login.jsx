import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Error logging in: " + error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset your password.");
      return;
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setMessage("Password reset email sent! Check your inbox.");
      setError(""); // Clear any previous errors
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setError("Error sending password reset email: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#2b2b2b] rounded-lg shadow-xl p-8">
          <div className="flex flex-col items-center">
            <img src={Logo} alt="NoteVerse" className="h-16 w-auto mb-6" />
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-sm mb-8">Sign in to your account to continue</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-[#3b3b3b] border border-[#4b4b4b] text-white placeholder-gray-500 focus:outline-none focus:border-pink-200 focus:ring-1 focus:ring-pink-200"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-[#3b3b3b] border border-[#4b4b4b] text-white placeholder-gray-500 focus:outline-none focus:border-pink-200 focus:ring-1 focus:ring-pink-200"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg">
                {error}
              </div>
            )}
            {message && (
              <div className="text-green-500 text-sm bg-green-500/10 p-3 rounded-lg">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-pink-200 text-[#1e1e1e] font-semibold rounded-lg hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-offset-2 focus:ring-offset-[#2b2b2b] transition-colors"
            >
              Sign In
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-pink-200 hover:text-pink-300 focus:outline-none"
              >
                Forgot Password?
              </button>
            </div>

            <div className="text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <a href="/register" className="text-pink-200 hover:text-pink-300">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;