import React from "react";
import MockupImage from "../assets/asset.png"; // Adjust the path to your image
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from "@heroicons/react/20/solid";

const Hero = () => {
  return (
    <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      {/* Background SVG */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-200"
        >
          <defs>
            
              <path d="M100 200V.5M.5 .5H200" fill="none" />
          </defs>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>

      {/* Content */}
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        {/* Left Content */}
<div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
  <div className="lg:pr-4">
    <div className="lg:max-w-lg">
      <p className="text-base font-semibold text-pink-300">Study Smarter</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Lost in course chaos? <br className="hidden sm:inline" />
      </h1>
      <p className="mt-6 text-xl text-gray-300">
        Access all your course materials, organize your notes, and study effectively with NoteVerse. Your ultimate study companion.
      </p>
      <div className="lg:pr-4">
    <div className="max-w-xl text-base text-gray-300 lg:max-w-lg">
      <ul role="list" className="mt-8 space-y-8 text-gray-400">
        <li className="flex gap-x-3">
          <CloudArrowUpIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-pink-300" />
          <span>
            <strong className="font-semibold text-white">Access Anywhere.</strong> Your course materials and notes are always available, no matter where you are.
          </span>
        </li>
        <li className="flex gap-x-3">
          <LockClosedIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-pink-300" />
          <span>
            <strong className="font-semibold text-white">Secure and Private.</strong> Your data is safe with us, ensuring a distraction-free study experience.
          </span>
        </li>
        <li className="flex gap-x-3">
          <ServerIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-pink-300" />
          <span>
            <strong className="font-semibold text-white">Organized Notes.</strong> Keep your notes structured and searchable for maximum productivity.
          </span>
        </li>
      </ul>
      <p className="mt-8">
        Start your journey with NoteVerse today and experience a smarter way to study.
      </p>
    </div>
    </div>
  </div>
</div>

        {/* Right Content */}
        <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt="Mockup"
            src={MockupImage}
            className="w-[48rem] max-w-none sm:w-[57rem]"
          />
        </div>
{/* Features Section */}
<div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 -mt-8">
  
  </div>
</div>
        </div>
      </div>
  );
};

export default Hero;