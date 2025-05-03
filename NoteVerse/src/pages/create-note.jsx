import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';
import { supabase } from "../supabase";

const CreateNote = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    major: '',
    content: '',
    isPublic: false
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setUploading(true);
  
      // Get the currently logged-in user
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  
      if (sessionError || !sessionData.session) {
        setError('You must be logged in to create a note.');
        return;
      }
  
      const user = sessionData.session.user;
  
      // Upload the file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
  
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('notes')
        .upload(filePath, file);
  
      if (uploadError) {
        console.error('File upload error:', uploadError);
        throw uploadError;
      }
  
      // Get the public URL for the uploaded file
      const { data: publicUrlData, error: publicUrlError } = supabase.storage
        .from('notes')
        .getPublicUrl(filePath);
  
      if (publicUrlError) {
        console.error('Public URL error:', publicUrlError);
        throw publicUrlError;
      }
  
      const publicUrl = publicUrlData.publicUrl;
  
      // Debug log for is_public value
      console.log('Form data:', formData);
      console.log('isPublic value:', formData.isPublic);
  
      // Insert the note data into Supabase
      const { data: insertData, error: insertError } = await supabase
        .from('notes')
        .insert({
          title: formData.title,
          course: formData.course,
          major: formData.major,
          content: formData.content,
          file_url: publicUrl,
          file_name: file.name,
          is_public: formData.isPublic, // This should be true when checkbox is checked
          user_id: user.id,
          created_at: new Date().toISOString(),
        });
  
      if (insertError) {
        console.error('Database insertion error:', insertError);
        throw insertError;
      }
  
      // Debug log for inserted data
      console.log('Inserted note:', insertData);
  
      // Redirect to the dashboard or another page
      navigate('/dashboard');
    } catch (err) {
      console.error('Error uploading note:', err);
      setError(err.message || JSON.stringify(err, null, 2) || 'An unknown error occurred.');
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Create New Note</h1>
          
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#2b2b2b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-200"
                placeholder="Enter note title"
                required
              />
            </div>

            <div>
              <label htmlFor="course" className="block text-sm font-medium text-white mb-2">
                Course *
              </label>
              <input
                type="text"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#2b2b2b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-200"
                placeholder="Enter course code (e.g., MATH101)"
                required
              />
            </div>

            <div>
              <label htmlFor="major" className="block text-sm font-medium text-white mb-2">
                Major *
              </label>
              <input
                type="text"
                id="major"
                name="major"
                value={formData.major}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#2b2b2b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-200"
                placeholder="Enter your major"
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-white mb-2">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#2b2b2b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-200 h-64"
                placeholder="Enter your note content"
              />
            </div>

            <div>
              <label htmlFor="file" className="block text-sm font-medium text-white mb-2">
                Upload File *
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="w-full px-4 py-2 bg-[#2b2b2b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-200"
                accept=".pdf,.doc,.docx,.txt"
                required
              />
              {file && (
                <p className="mt-2 text-sm text-gray-400">
                  Selected file: {file.name}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublic"
                name="isPublic"
                checked={formData.isPublic}
                onChange={handleChange}
                className="h-4 w-4 text-pink-200 focus:ring-pink-200 border-gray-600 rounded"
              />
              <label htmlFor="isPublic" className="ml-2 block text-sm text-white">
                Make this note public
              </label>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 text-white bg-[#2b2b2b] rounded-lg hover:bg-[#3b3b3b] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-pink-200 text-black rounded-lg hover:bg-pink-300 transition-colors disabled:opacity-50"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Create Note'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;