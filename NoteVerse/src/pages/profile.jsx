import React, { useState } from "react";
import Navbar from "../components/navbar";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4">
            <div className="bg-[#2b2b2b] rounded-lg p-6 shadow-lg">
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <img
                    className="w-32 h-32 rounded-full object-cover border-4 border-pink-200"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                    alt="Profile"
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-pink-200 rounded-full hover:bg-pink-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                <h2 className="mt-4 text-2xl font-bold text-white">Jane Ferguson</h2>
                <p className="text-pink-200">Student at University</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-pink-200 text-gray-800'
                      : 'text-white hover:bg-[#3b3b3b]'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'notes'
                      ? 'bg-pink-200 text-gray-800'
                      : 'text-white hover:bg-[#3b3b3b]'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  My Notes
                </button>
                <button
                  onClick={() => setActiveTab('bookmarks')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'bookmarks'
                      ? 'bg-pink-200 text-gray-800'
                      : 'text-white hover:bg-[#3b3b3b]'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Bookmarks
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-pink-200 text-gray-800'
                      : 'text-white hover:bg-[#3b3b3b]'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  </svg>
                  Settings
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full md:w-3/4">
            <div className="bg-[#2b2b2b] rounded-lg p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Profile Information</h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 text-sm font-medium text-white bg-pink-200 hover:bg-pink-300 rounded-lg transition-colors"
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-pink-200 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-[#3b3b3b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-200"
                      defaultValue="Jane"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-pink-200 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-[#3b3b3b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-200"
                      defaultValue="Ferguson"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-pink-200 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 bg-[#3b3b3b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-200"
                    defaultValue="jane.ferguson@example.com"
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-pink-200 mb-2">Bio</label>
                  <textarea
                    className="w-full px-4 py-2 bg-[#3b3b3b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-200"
                    rows="4"
                    defaultValue="Computer Science student passionate about learning and sharing knowledge through notes."
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-pink-200 mb-2">University</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-[#3b3b3b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-200"
                      defaultValue="University of Technology"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-pink-200 mb-2">Major</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-[#3b3b3b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-200"
                      defaultValue="Computer Science"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;