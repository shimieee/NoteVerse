import React, { useState } from 'react';
import Navbar from '../components/navbar';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    updates: false,
    marketing: false
  });

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Settings Navigation */}
          <aside className="w-full md:w-1/4">
            <div className="bg-[#2b2b2b] rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveSection('account')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === 'account'
                      ? 'bg-pink-200 text-gray-800'
                      : 'text-white hover:bg-[#3b3b3b]'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Account Settings
                </button>
                <button
                  onClick={() => setActiveSection('notifications')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === 'notifications'
                      ? 'bg-pink-200 text-gray-800'
                      : 'text-white hover:bg-[#3b3b3b]'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Notifications
                </button>
                <button
                  onClick={() => setActiveSection('privacy')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === 'privacy'
                      ? 'bg-pink-200 text-gray-800'
                      : 'text-white hover:bg-[#3b3b3b]'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Privacy & Security
                </button>
                <button
                  onClick={() => setActiveSection('appearance')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === 'appearance'
                      ? 'bg-pink-200 text-gray-800'
                      : 'text-white hover:bg-[#3b3b3b]'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Appearance
                </button>
              </nav>
            </div>
          </aside>

          {/* Settings Content */}
          <main className="w-full md:w-3/4">
            <div className="bg-[#2b2b2b] rounded-lg p-6 shadow-lg">
              {activeSection === 'account' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-pink-200 mb-2">Email Address</label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 bg-[#3b3b3b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-200"
                        defaultValue="jane.ferguson@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-pink-200 mb-2">Current Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 bg-[#3b3b3b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-pink-200 mb-2">New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 bg-[#3b3b3b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-pink-200 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 bg-[#3b3b3b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-200"
                      />
                    </div>

                    <button className="px-4 py-2 bg-pink-200 text-gray-800 rounded-lg hover:bg-pink-300 transition-colors">
                      Update Account
                    </button>
                  </div>
                </div>
              )}

              {activeSection === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Notification Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#3b3b3b] rounded-lg">
                      <div>
                        <h3 className="text-white font-medium">Email Notifications</h3>
                        <p className="text-gray-400 text-sm">Receive notifications via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notifications.email}
                          onChange={() => handleNotificationChange('email')}
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-200"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#3b3b3b] rounded-lg">
                      <div>
                        <h3 className="text-white font-medium">Push Notifications</h3>
                        <p className="text-gray-400 text-sm">Receive push notifications</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notifications.push}
                          onChange={() => handleNotificationChange('push')}
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-200"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#3b3b3b] rounded-lg">
                      <div>
                        <h3 className="text-white font-medium">Updates</h3>
                        <p className="text-gray-400 text-sm">Receive updates about new features</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notifications.updates}
                          onChange={() => handleNotificationChange('updates')}
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-200"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#3b3b3b] rounded-lg">
                      <div>
                        <h3 className="text-white font-medium">Marketing Emails</h3>
                        <p className="text-gray-400 text-sm">Receive marketing and promotional emails</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notifications.marketing}
                          onChange={() => handleNotificationChange('marketing')}
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-200"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Privacy & Security</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-[#3b3b3b] rounded-lg">
                      <h3 className="text-white font-medium mb-2">Two-Factor Authentication</h3>
                      <p className="text-gray-400 text-sm mb-4">Add an extra layer of security to your account</p>
                      <button className="px-4 py-2 bg-pink-200 text-gray-800 rounded-lg hover:bg-pink-300 transition-colors">
                        Enable 2FA
                      </button>
                    </div>

                    <div className="p-4 bg-[#3b3b3b] rounded-lg">
                      <h3 className="text-white font-medium mb-2">Data Privacy</h3>
                      <p className="text-gray-400 text-sm mb-4">Manage your data privacy settings</p>
                      <button className="px-4 py-2 bg-pink-200 text-gray-800 rounded-lg hover:bg-pink-300 transition-colors">
                        Manage Privacy
                      </button>
                    </div>

                    <div className="p-4 bg-[#3b3b3b] rounded-lg">
                      <h3 className="text-white font-medium mb-2">Account Deletion</h3>
                      <p className="text-gray-400 text-sm mb-4">Permanently delete your account and all associated data</p>
                      <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Appearance</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-[#3b3b3b] rounded-lg">
                      <h3 className="text-white font-medium mb-2">Theme</h3>
                      <div className="flex gap-4 mt-4">
                        <button className="flex-1 p-4 bg-[#1E1E1E] border-2 border-pink-200 rounded-lg">
                          <span className="text-white">Dark</span>
                        </button>
                        <button className="flex-1 p-4 bg-white border-2 border-gray-300 rounded-lg">
                          <span className="text-gray-800">Light</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-[#3b3b3b] rounded-lg">
                      <h3 className="text-white font-medium mb-2">Accent Color</h3>
                      <div className="flex gap-4 mt-4">
                        <button className="w-10 h-10 bg-pink-200 rounded-full border-2 border-pink-200"></button>
                        <button className="w-10 h-10 bg-blue-400 rounded-full border-2 border-gray-600"></button>
                        <button className="w-10 h-10 bg-purple-400 rounded-full border-2 border-gray-600"></button>
                        <button className="w-10 h-10 bg-green-400 rounded-full border-2 border-gray-600"></button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;