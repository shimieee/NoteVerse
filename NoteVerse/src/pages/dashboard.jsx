import React, { useState, useCallback, useEffect } from 'react'
import Navbar from '../components/navbar'
import { debounce } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('myNotes')
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [myNotes, setMyNotes] = useState([])
  const [publicNotes, setPublicNotes] = useState([])
  const [courses, setCourses] = useState(['all'])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Fetch notes from Supabase
  const fetchNotes = async () => {
    try {
      setLoading(true)
      setError(null)
  
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) {
        console.error('Error fetching user:', userError)
        setError('Failed to fetch user information.')
        return
      }
  
      if (!user) {
        navigate('/signin')
        return
      }
  
      // Fetch user's private notes
      const { data: privateNotes, error: privateError } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_public', false)
        .order('created_at', { ascending: false })
  
      if (privateError) {
        console.error('Error fetching private notes:', privateError)
        setError(privateError.message || 'Failed to fetch private notes.')
        return
      }
  
      console.log('Private notes:', privateNotes)
  
      // Fetch all public notes
      const { data: publicNotesData, error: publicError } = await supabase
        .from('notes')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false })
  
      if (publicError) {
        console.error('Error fetching public notes:', publicError)
        setError(publicError.message || 'Failed to fetch public notes.')
        return
      }
  
      console.log('Public notes:', publicNotesData)
  
      setMyNotes(privateNotes || [])
      setPublicNotes(publicNotesData || [])
  
      // Extract unique courses from both private and public notes
      const allCourses = [...new Set([
        ...(privateNotes || []).map(note => note.course),
        ...(publicNotesData || []).map(note => note.course)
      ])].filter(Boolean)
      setCourses(['all', ...allCourses])
  
    } catch (err) {
      console.error('Error fetching notes:', err)
      setError(err.message || JSON.stringify(err, null, 2) || 'An unknown error occurred.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query)
    }, 300),
    []
  )

  // Filter and search notes
  const filteredNotes = (activeTab === 'myNotes' ? myNotes : publicNotes)
    .filter(note => {
      const matchesFilter = filter === 'all' || note.course === filter
      const matchesSearch = searchQuery === '' || 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    })

  const handleCreateNote = () => {
    navigate('/create-note')
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-200"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-500">
            <p>{error}</p>
            <button 
              onClick={fetchNotes}
              className="mt-4 px-4 py-2 bg-pink-200 text-black rounded-lg hover:bg-pink-300 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full md:w-64 px-4 py-2 bg-[#2b2b2b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-200"
                onChange={(e) => debouncedSearch(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-3 top-2.5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button 
              onClick={handleCreateNote}
              className="bg-pink-200 text-black px-4 py-2 rounded-lg hover:bg-pink-300 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Upload New Note
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <select 
            className="border rounded-lg px-4 py-2 w-full md:w-64 bg-[#2b2b2b] text-white border-gray-600 focus:outline-none focus:border-pink-200"
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
        <div className="flex border-b border-gray-600 mb-6">
          <button
            className={`px-4 py-2 ${activeTab === 'myNotes' ? 'border-b-2 border-pink-200 text-pink-200' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('myNotes')}
          >
            My Notes
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'publicNotes' ? 'border-b-2 border-pink-200 text-pink-200' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('publicNotes')}
          >
            Public Notes
          </button>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.length > 0 ? (
            filteredNotes.map(note => (
              <div key={note.id} className="bg-[#2b2b2b] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">{note.title}</h3>
                  <button className="text-gray-400 hover:text-pink-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-400 mb-2">Course: {note.course}</p>
                <p className="text-gray-500 text-sm mb-2">Uploaded: {new Date(note.created_at).toLocaleDateString()}</p>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{note.content}</p>
                <div className="mt-4 flex space-x-2">
                  <button className="text-pink-200 hover:text-pink-300">View</button>
                  <button className="text-gray-400 hover:text-white">Download</button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-400">No notes found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
