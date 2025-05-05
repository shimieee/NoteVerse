import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import Logo from "../assets/logo.png"; // Adjust the import path if needed
import gsap from "gsap";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(3); // Mock notifications count
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dotRef = useRef(null);

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

    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

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
            {/* Quick Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/create-note"
                className={`text-slate-100 hover:text-blue-400 transition-all duration-300 ${
                  isActive('/create-note') ? 'text-blue-400 font-semibold' : ''
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </Link>
              <Link
                to="/bookmarks"
                className={`text-slate-100 hover:text-blue-400 transition-all duration-300 ${
                  isActive('/bookmarks') ? 'text-blue-400 font-semibold' : ''
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </Link>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-slate-100 hover:text-blue-400 transition-all duration-300 relative"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-800 rounded-lg shadow-lg py-2 z-50 border border-slate-700">
                  <div className="px-4 py-2 border-b border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-100">Notifications</h3>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {/* Mock notifications */}
                    <div className="px-4 py-2 hover:bg-slate-700">
                      <p className="text-sm text-slate-300">New note shared with you</p>
                      <p className="text-xs text-slate-500">2 minutes ago</p>
                    </div>
                    <div className="px-4 py-2 hover:bg-slate-700">
                      <p className="text-sm text-slate-300">Your note got 5 new views</p>
                      <p className="text-xs text-slate-500">1 hour ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative group">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
              >
                <span className="sr-only">Open user menu</span>
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>

              {/* Enhanced Dropdown Menu */}
              <div className="absolute right-0 z-50 hidden group-hover:block group-focus-within:block my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 w-64">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white font-semibold">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                  <span className="block text-xs text-gray-500 truncate">
                    {user.email}
                  </span>
                </div>
                <ul className="py-2">
                  <li>
                    <Link
                      to="/dashboard"
                      className={`flex items-center px-4 py-2 text-sm ${
                        isActive('/dashboard')
                          ? 'bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/bookmarks"
                      className={`flex items-center px-4 py-2 text-sm ${
                        isActive('/bookmarks')
                          ? 'bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                      </svg>
                      Bookmarks
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className={`flex items-center px-4 py-2 text-sm ${
                        isActive('/profile')
                          ? 'bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className={`flex items-center px-4 py-2 text-sm ${
                        isActive('/settings')
                          ? 'bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
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
              className={`text-l text-white font-medium hover:text-pink-200 transition-all duration-300 hover:scale-111 ${
                isActive('/about') ? 'text-pink-200 font-semibold' : ''
              }`}
            >
              About
            </Link>
            <Link
              to="/features"
              className={`text-l text-white font-medium hover:text-pink-200 transition-all duration-300 hover:scale-111 ${
                isActive('/features') ? 'text-pink-200 font-semibold' : ''
              }`}
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
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
