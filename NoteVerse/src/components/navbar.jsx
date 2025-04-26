import React, { useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import Logo from "../assets/logo.png"; // Adjust the import path if needed
import { onAuthStateChanged, signOut } from "firebase/auth";
import gsap from "gsap";

const Navbar = () => {
  const [user, setUser] = React.useState(null); // State to track user authentication
  const navigate = useNavigate(); // Hook to programmatically navigate
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
    // Track authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser); // Set the user state
      });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);
    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out the user
            setUser(null); // Clear the user state
            navigate("/signin"); // Redirect to the login page
        } catch (error) {
          console.error("Error logging out:", error);
        }
  };

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
      
      {/* Conditional Navbar Items */}
      <div className="flex items-center gap-6 ml-auto">
        {user ? (
          <>
            <span className="text-l text-white font-medium hover:text-pink-200 transition-all duration-300 hover:scale-111">
                    Welcome Back {user.displayName || user.email} !
            </span>
            {/* Logged-in User */}
            <div className="relative group">
            <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
              >
                <span className="sr-only">Open user menu</span>
                <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                </div>

              </button>
                 {/* Dropdown Menu */}
              <div className="absolute right-0 z-50 hidden group-hover:block group-focus-within:block my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                 <div className="px-4 py-3">
                    <Link
                        to="/profile"
                        className="flex items-center space-x-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {user.email}
                  </span>
                    </Link> 
                </div>
                <ul className="py-2">
                  <li>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
  
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
      </>)}
        </div>
    </nav>
  );
};

export default Navbar;
