import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

const ViewNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [relatedNotes, setRelatedNotes] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        // Fetch note
        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          throw new Error('Note not found');
        }

        setNote(data);
        setIsOwner(data.user_id === user.id);

        // Check if note is bookmarked
        if (user) {
          const { data: bookmarkData } = await supabase
            .from('bookmarks')
            .select('id')
            .eq('user_id', user.id)
            .eq('note_id', id)
            .single();

          setIsBookmarked(!!bookmarkData);
        }

        // Fetch related notes
        const { data: relatedData, error: relatedError } = await supabase
          .from('notes')
          .select('*')
          .eq('course', data.course)
          .neq('id', data.id)
          .order('created_at', { ascending: false })
          .limit(3);

        if (relatedError) throw relatedError;
        setRelatedNotes(relatedData || []);
      } catch (err) {
        console.error('Error fetching note:', err);
        setError(err.message);
      } finally {
        setLoading(false);
        setRelatedLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleBookmark = async () => {
    try {
      setBookmarkLoading(true);
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      if (isBookmarked) {
        // Remove bookmark
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('note_id', id);

        if (error) throw error;
        setIsBookmarked(false);
      } else {
        // Add bookmark
        const { error } = await supabase
          .from('bookmarks')
          .insert([
            { user_id: user.id, note_id: id }
          ]);

        if (error) throw error;
        setIsBookmarked(true);
      }
    } catch (err) {
      console.error('Error toggling bookmark:', err);
      setError(err.message);
    } finally {
      setBookmarkLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('notes')
        .download(note.file_path);

      if (error) {
        throw error;
      }

      // Create a URL for the blob
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = note.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading note:', err);
      setError('Failed to download note');
    }
  };

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
              onClick={() => navigate('/dashboard')}
              className="mt-4 px-4 py-2 bg-pink-200 text-black rounded-lg hover:bg-pink-300 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            <p>Note not found</p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="mt-4 px-4 py-2 bg-pink-200 text-black rounded-lg hover:bg-pink-300 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Main Note Section */}
            <div className="bg-[#3b3b3b] rounded-xl p-8 border border-[#4b4b4b] shadow-xl mb-8">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-3xl font-bold text-white">{note.title}</h1>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                      <span>{note.course}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>Created: {new Date(note.created_at).toLocaleDateString()}</span>
                    </div>
                    {note.updated_at !== note.created_at && (
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                        <span>Updated: {new Date(note.updated_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  {isOwner && (
                    <Link
                      to={`/edit-note/${note.id}`}
                      className="px-4 py-2 rounded-lg bg-[#4b4b4b] text-white hover:bg-pink-200 hover:text-black transition-all duration-300 flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </Link>
                  )}
                  <button
                    onClick={handleBookmark}
                    className={`p-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                      isBookmarked 
                        ? 'bg-pink-200 text-black' 
                        : 'bg-[#4b4b4b] text-white hover:bg-pink-200 hover:text-black'
                    }`}
                    disabled={bookmarkLoading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                    {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                  </button>
                  {note.file_url && (
                    <button
                      onClick={handleDownload}
                      className="p-2 rounded-lg bg-[#4b4b4b] text-white hover:bg-pink-200 hover:text-black transition-all duration-300 flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Download
                    </button>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="bg-[#2b2b2b] rounded-lg p-8 border border-[#4b4b4b] mb-8">
                <div className="prose prose-invert max-w-none">
                  {note.content}
                </div>
              </div>

              {/* Footer Section */}
              <div className="flex justify-between items-center text-sm text-gray-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>Last viewed: {new Date().toLocaleDateString()}</span>
                  </div>
                  {note.is_public && (
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      <span>Public Note</span>
                    </div>
                  )}
                </div>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 rounded-lg bg-[#4b4b4b] text-white hover:bg-pink-200 hover:text-black transition-all duration-300 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to Dashboard
                </Link>
              </div>
            </div>

            {/* Related Notes Section */}
            {relatedNotes.length > 0 && (
              <div className="bg-[#3b3b3b] rounded-xl p-8 border border-[#4b4b4b] shadow-xl">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  More Notes from {note.course}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedNotes.map((relatedNote) => (
                    <div key={relatedNote.id} className="bg-[#2b2b2b] rounded-lg p-4 border border-[#4b4b4b] hover:border-pink-200 transition-colors">
                      <h3 className="text-lg font-medium text-white mb-2 line-clamp-1">{relatedNote.title}</h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{relatedNote.content}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">
                          {new Date(relatedNote.created_at).toLocaleDateString()}
                        </span>
                        <Link
                          to={`/view-note/${relatedNote.id}`}
                          className="text-pink-200 hover:text-pink-300 transition-colors"
                        >
                          View Note
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Course Stats */}
            <div className="bg-[#3b3b3b] rounded-xl p-6 border border-[#4b4b4b] shadow-xl">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                Course Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Notes</span>
                  <span className="text-white font-medium">{relatedNotes.length + 1}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Your Notes</span>
                  <span className="text-white font-medium">
                    {isOwner ? 1 : 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Last Updated</span>
                  <span className="text-white font-medium">
                    {new Date(note.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#3b3b3b] rounded-xl p-6 border border-[#4b4b4b] shadow-xl">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleBookmark}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isBookmarked 
                      ? 'bg-pink-200 text-black' 
                      : 'bg-[#4b4b4b] text-white hover:bg-pink-200 hover:text-black'
                  }`}
                  disabled={bookmarkLoading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                  {isBookmarked ? 'Bookmarked' : 'Bookmark Note'}
                </button>
                {note.file_url && (
                  <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#4b4b4b] text-white hover:bg-pink-200 hover:text-black transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Download File
                  </button>
                )}
                {isOwner && (
                  <Link
                    to={`/edit-note/${note.id}`}
                    className="block w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#4b4b4b] text-white hover:bg-pink-200 hover:text-black transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit Note
                  </Link>
                )}
              </div>
            </div>

            {/* Course Notes */}
            <div className="bg-[#3b3b3b] rounded-xl p-6 border border-[#4b4b4b] shadow-xl">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Course Notes
              </h3>
              <div className="space-y-3">
                <Link
                  to={`/course/${note.course}`}
                  className="block w-full text-center px-4 py-2 rounded-lg bg-[#4b4b4b] text-white hover:bg-pink-200 hover:text-black transition-all duration-300"
                >
                  View All Notes
                </Link>
                <Link
                  to="/create-note"
                  className="block w-full text-center px-4 py-2 rounded-lg bg-pink-200 text-black hover:bg-pink-300 transition-all duration-300"
                >
                  Create New Note
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNote; 