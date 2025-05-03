import React, { useState } from 'react'
import Navbar from '../components/navbar'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('myNotes')
  const [filter, setFilter] = useState('all')

  // Mock data - replace with actual data from your backend
  const myNotes = [
    { id: 1, title: 'Calculus Notes', course: 'MATH101', date: '2024-04-01' },
    { id: 2, title: 'Physics Lab Report', course: 'PHYS201', date: '2024-04-15' },
  ]

  const publicNotes = [
    { id: 3, title: 'Chemistry Basics', course: 'CHEM101', date: '2024-03-20', isAdmin: true },
    { id: 4, title: 'Biology Study Guide', course: 'BIO101', date: '2024-03-25', isAdmin: false },
  ]

  const courses = ['all', 'MATH101', 'PHYS201', 'CHEM101', 'BIO101']

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <button className="bg-pink-200 text-black px-4 py-2 rounded-lg hover:bg-pink-300 transition-colors">
            Upload New Note
          </button>
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <select 
            className="border rounded-lg px-4 py-2 w-full md:w-64"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {courses.map(course => (
              <option key={course} value={course}>
                {course === 'all' ? 'All Courses' : course}
              </option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 ${activeTab === 'myNotes' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('myNotes')}
          >
            My Notes
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'publicNotes' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('publicNotes')}
          >
            Public Notes
          </button>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'myNotes' ? myNotes : publicNotes)
            .filter(note => filter === 'all' || note.course === filter)
            .map(note => (
              <div key={note.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{note.title}</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-600 mb-2">Course: {note.course}</p>
                <p className="text-gray-500 text-sm">Uploaded: {note.date}</p>
                {note.isAdmin && (
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2">
                    Admin Uploaded
                  </span>
                )}
                <div className="mt-4 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                  <button className="text-gray-600 hover:text-gray-800">Download</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard