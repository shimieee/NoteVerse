import React, { useState } from "react";
import image from "../assets/signup.png";
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
      // Sign up the user with Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });
  
      console.log("Sign-up response:", data);
      if (signUpError) {
        console.error("Sign-up error:", signUpError);
        throw new Error(signUpError.message);
      }
  
      if (!data.session) {
        setError("Please confirm your email to complete registration.");
        return;
      }
  
      console.log("User registered successfully:", data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error registering user:", err);
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${image})` }}></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <img src={Logo} alt="Your Company" className="mx-auto h-32 w-auto" />
              <h1 className="text-2xl xl:text-4xl font-extrabold text-white">
                Create Account
              </h1>
            </div>
            <div className="w-full flex-1 mt-8">
              <form className="mx-auto max-w-xs flex flex-col gap-4" onSubmit={handleRegister}>
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-pink-200 text-gray-800 w-full py-4 rounded-lg hover:bg-pink-300 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>
              <p className="mt-6 text-xs text-gray-600 text-center">
                Already have an account?{" "}
                <a href="/signin" className="text-pink-200 hover:text-pink-300">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

