import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

const Bookmarks = () => {
  const [bookmarkedNotes, setBookmarkedNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [courses, setCourses] = useState(['all']);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) {
          console.error('Error fetching user:', userError);
          setError('Failed to fetch user information.');
          return;
        }

        if (!user) {
          navigate('/signin');
          return;
        }

        // Fetch bookmarked notes
        const { data: bookmarks, error: bookmarkError } = await supabase
          .from('bookmarks')
          .select(`
            note_id,
            notes (*)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (bookmarkError) {
          console.error('Error fetching bookmarks:', bookmarkError);
          setError(bookmarkError.message || 'Failed to fetch bookmarks.');
          return;
        }

        const bookmarkedNotesData = bookmarks.map(bookmark => bookmark.notes);
        setBookmarkedNotes(bookmarkedNotesData || []);

        // Extract unique courses
        const allCourses = [...new Set(
          (bookmarkedNotesData || []).map(note => note.course)
        )].filter(Boolean);
        setCourses(['all', ...allCourses]);

        // Calculate total pages
        const totalNotes = bookmarkedNotesData.length;
        const notesPerPage = 9; // Assuming 9 notes per page
        setTotalPages(Math.ceil(totalNotes / notesPerPage));

      } catch (err) {
        console.error('Error fetching bookmarks:', err);
        setError(err.message || 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [navigate]);

  // Filter and search notes
  const filteredNotes = bookmarkedNotes.filter(note => {
    const matchesFilter = filter === 'all' || note.course === filter;
    const matchesSearch = searchQuery === '' || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-500">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-pink-200 text-black rounded-lg hover:bg-pink-300 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold text-white">Bookmarks</h1>
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search bookmarks..."
                className="w-full md:w-64 px-4 py-2 bg-[#2b2b2b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-[#2b2b2b] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white">{note.title}</h3>
                <button
                  onClick={() => handleBookmark(note.id)}
                  className="text-gray-400 hover:text-pink-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-400 mb-2">Course: {note.course}</p>
              <p className="text-gray-500 text-sm mb-2">Uploaded: {new Date(note.created_at).toLocaleDateString()}</p>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{note.content}</p>
              <div className="mt-4 flex space-x-2">
                <Link
                  to={`/view-note/${note.id}`}
                  className="text-pink-200 hover:text-pink-300"
                >
                  View
                </Link>
                <button
                  onClick={() => handleDownload(note.id)}
                  className="text-gray-400 hover:text-white"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-l-md ${
              currentPage === 1
                ? 'bg-[#3b3b3b] text-gray-500 cursor-not-allowed'
                : 'bg-[#2b2b2b] text-white hover:bg-pink-200 hover:text-[#1e1e1e] transition-colors'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <span className="px-4 py-2 bg-[#2b2b2b] text-white border-l border-r border-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-r-md ${
              currentPage === totalPages
                ? 'bg-[#3b3b3b] text-gray-500 cursor-not-allowed'
                : 'bg-[#2b2b2b] text-white hover:bg-pink-200 hover:text-[#1e1e1e] transition-colors'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks; 