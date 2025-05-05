import React from "react";
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon, BookOpenIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import Screenshot from "../assets/screenshot.png";

const Hero = () => {
  return (
    <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10" />

      {/* Content */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 lg:items-start lg:gap-y-10">
        {/* Left Content */}
        <div className="lg:pr-8">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#2b2b2b] px-4 py-1.5 text-sm text-pink-200 ring-1 ring-[#4b4b4b]">
              <span className="h-2 w-2 rounded-full bg-pink-200"></span>
              New Features Available
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Your Ultimate Study Companion
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Organize your notes, collaborate with peers, and ace your courses with NoteVerse. The all-in-one platform for modern students.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-md bg-pink-200 px-4 py-2.5 text-sm font-semibold text-[#1e1e1e] shadow-sm hover:bg-pink-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-200"
              >
                Get Started
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-md bg-[#3b3b3b] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#4b4b4b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Learn More
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="mt-12">
              <h2 className="text-lg font-semibold text-white mb-6">Why Choose NoteVerse?</h2>
              <ul role="list" className="space-y-6 text-gray-400">
                <li className="flex gap-x-4 rounded-lg bg-[#2b2b2b] p-4 ring-1 ring-[#4b4b4b]">
                  <BookOpenIcon className="mt-1 h-5 w-5 flex-none text-pink-200" />
                  <div>
                    <h3 className="font-semibold text-white">Organized Notes</h3>
                    <p className="mt-1">Keep all your course materials in one place, beautifully organized and easily accessible.</p>
                  </div>
                </li>
                <li className="flex gap-x-4 rounded-lg bg-[#2b2b2b] p-4 ring-1 ring-[#4b4b4b]">
                  <CloudArrowUpIcon className="mt-1 h-5 w-5 flex-none text-pink-200" />
                  <div>
                    <h3 className="font-semibold text-white">Access Anywhere</h3>
                    <p className="mt-1">Study on any device, anytime. Your notes are always in sync and ready when you are.</p>
                  </div>
                </li>
                <li className="flex gap-x-4 rounded-lg bg-[#2b2b2b] p-4 ring-1 ring-[#4b4b4b]">
                  <LockClosedIcon className="mt-1 h-5 w-5 flex-none text-pink-200" />
                  <div>
                    <h3 className="font-semibold text-white">Secure & Private</h3>
                    <p className="mt-1">Your data is protected with enterprise-grade security and privacy controls.</p>
                  </div>
                </li>
                <li className="flex gap-x-4 rounded-lg bg-[#2b2b2b] p-4 ring-1 ring-[#4b4b4b]">
                  <ServerIcon className="mt-1 h-5 w-5 flex-none text-pink-200" />
                  <div>
                    <h3 className="font-semibold text-white">Smart Features</h3>
                    <p className="mt-1">AI-powered search, smart tags, and collaborative tools to enhance your study experience.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Content - Screenshot */}
        <div className="lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-visible lg:-mr-48">
          <div className="relative rounded-l-lg overflow-hidden bg-[#2b2b2b] border-l border-t border-b border-[#4b4b4b] w-[140%] shadow-xl">
            <img
              src={Screenshot}
              alt="NoteVerse Interface Preview"
              className="w-full h-auto rounded-l-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1e1e1e] opacity-50 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;