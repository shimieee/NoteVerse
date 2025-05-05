import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });
  
      if (signUpError) throw signUpError;
  
      if (!data.session) {
        setError("Please confirm your email to complete registration.");
        return;
      }
  
      navigate("/dashboard");
    } catch (err) {
      console.error("Error registering user:", err);
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#2b2b2b] rounded-lg shadow-xl p-8">
          <div className="flex flex-col items-center">
            <img src={Logo} alt="NoteVerse" className="h-16 w-auto mb-6" />
            <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400 text-sm mb-8">Join NoteVerse to start organizing your notes</p>
          </div>

          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-[#3b3b3b] border border-[#4b4b4b] text-white placeholder-gray-500 focus:outline-none focus:border-pink-200 focus:ring-1 focus:ring-pink-200"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                required
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-pink-200 text-[#1e1e1e] font-semibold rounded-lg hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-offset-2 focus:ring-offset-[#2b2b2b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <a href="/login" className="text-pink-200 hover:text-pink-300">
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

