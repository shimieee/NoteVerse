import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"; // Adjust the import path if needed
import gsap from "gsap";

const Navbar = () => {
  const dotRef = useRef(null); // Reference for the dot

  useEffect(() => {
    // GSAP animation for the bounce on page load
    gsap.fromTo(
      dotRef.current,
      { y: 0 }, // Start position
      {
        y: -30, // Move up
        duration: 0.5, // Duration of the bounce
        ease: "back.out", // Easing for smooth animation
        yoyo: true, // Bounce back
        repeat: 1, // Repeat once
      }
    );
  }, []);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-start bg-[#1E1E1E] w-full px-4 md:px-8">
      <div className="flex items-center gap-2">
        <img src={Logo} alt="NoteVerse Logo" className="h-20 w-20 hover:drop-shadow-[0_4px_15px_rgba(253,242,200,0.5)] transition-all duration-800 ease-in-out" />
        <a className="text-2xl font-semibold text-white group" href="/">
          NoteVerse
          <span
            ref={dotRef} // Attach the ref to the dot
            className="text-white inline-block transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:animate-bounce"
          >
            .
          </span>
        </a>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-6 ml-auto">
        {/* Additional Links */}
        <Link
          to="/about"
          className="text-l text-white font-medium hover:text-pink-200 transition-all duration-300 hover:scale-111"
        >
          About
        </Link>
        <Link
          to="/features"
          className="text-l text-white font-medium hover:text-pink-200 transition-all duration-300 hover:scale-111"
        >
          Features
        </Link>

        {/* Sign In Button */}
        <Link
          to="/signin"
          className="px-4 py-2 rounded-md bg-[#7D1C4A] text-l text-white font-semibold transform transition-all duration-300 hover:bg-pink-300 hover:text-[#1e1e1e] hover:scale-111 hover:shadow-[0_-4px_15px_rgba(253,242,200,0.5)]"
        >
          Sign in
        </Link>

        {/* Register Button */}
        <Link
          to="/register"
          className="px-4 py-2 rounded-md bg-[#2b2b2b] text-l text-white font-semibold transform transition-all duration-300 hover:bg-white hover:text-[#2b2b2b] hover:scale-111 hover:shadow-[0_4px_15px_rgba(253,242,200,0.5)]"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
