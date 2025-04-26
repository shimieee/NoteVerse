import React from "react";
import image from "../assets/signup.png";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase"; 

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in successfully");
            navigate("/dashboard");
        }catch (error) {
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
          await sendPasswordResetEmail(auth, email);
          setMessage("Password reset email sent! Check your inbox.");
          setError(""); // Clear any previous errors
        } catch (error) {
          console.error("Error sending password reset email:", error);
          setError("Error sending password reset email: " + error.message);
        }
      };

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="shadow sm:rounded-lg flex justify-center flex-1">
        {/* Form Section */}
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <img src={Logo} alt="Your Company" className="mx-auto h-32 w-auto" />
              <h1 className="text-2xl xl:text-4xl font-extrabold text-white">
                Sign in
              </h1>
            </div>
            <div className="w-full flex-1 mt-8">
              <form className="mx-auto max-w-xs flex flex-col gap-4" onSubmit={handleLogin}>
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {message && <p className="text-green-500 text-sm">{message}</p>}
                <button className="mt-5 tracking-wide font-semibold bg-pink-200 text-gray-900 w-full py-4 rounded-lg hover:bg-pink-300 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" type="submit">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign In</span>
                </button>
                <div className="text-sm text-center mt-4">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="font-semibold text-pink-200 hover:text-pink-100"
                  >
                    Forgot password?
                  </button>
                </div>
                <p className="mt-6 text-l text-gray-200 text-center">
                  Don't have an account?{" "}
                  <a href="/register">
                    <span className="text-pink-200 font-semibold">Sign up</span>
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 text-center hidden md:flex">
          <div
            className="m-40 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Login;