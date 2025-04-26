import React, { useState } from "react";
import image from "../assets/signup.png";
import Logo from "../assets/logo.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [phone, setPhone] = useState("");

    const handleRegister = async (event) => {
        event.preventDefault();
        // Validate input
        try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User registered successfully");
        navigate("/dashboard");
        } catch (error) {
        console.error("Error registering user:", error);
        setError("Error registering user: " + error.message);
        }
    };

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 text-center hidden md:flex">
          <div
            className="m-40 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <img src={Logo} alt="Your Company" className="mx-auto h-32 w-auto" />
              <h1 className="text-2xl xl:text-4xl font-extrabold text-white">
                 Sign up
              </h1>
    
            </div>
            <div className="w-full flex-1 mt-8">
              <form className="mx-auto max-w-xs flex flex-col gap-4" onSubmit={handleRegister}>
                <input
                  className="w-full px-5 py-3 rounded-lg text-gray-900 font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white focus:text-gray-900"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}                  
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium text-gray-900 bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white focus:text-gray-900"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium text-gray-900 bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white focus:text-gray-900"
                  type="tel"
                  placeholder="Enter your phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg text-gray-900 font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white focus:text-gray-900"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button className="mt-5 tracking-wide font-semibold bg-pink-200 text-gray-900 w-full py-4 rounded-lg hover:bg-pink-300 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" type="submit">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="mt-6 text-l text-gray-200 text-center">
                  Already have an account?{" "}
                  <a href="/signin">
                    <span className="text-pink-200 font-semibold">Sign in</span>
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;

