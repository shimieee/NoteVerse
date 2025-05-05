import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';
import { supabase } from "../supabase";
import TipTapEditor from '../components/TipTapEditor';

const CreateNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [course, setCourse] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      let fileUrl = null;
      let fileName = null;

      if (file) {
        // Upload the file to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const uniqueFileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${uniqueFileName}`;

        const { error: uploadError } = await supabase.storage
          .from('notes')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Get the public URL for the uploaded file
        const { data: publicUrlData } = supabase.storage
          .from('notes')
          .getPublicUrl(filePath);

        fileUrl = publicUrlData.publicUrl;
        fileName = file.name;
      }

      const { error } = await supabase
        .from('notes')
        .insert({
          title,
          content,
          course,
          is_public: isPublic,
          user_id: user.id,
          file_url: fileUrl,
          file_name: fileName,
        });

      if (error) throw error;

      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-6">Create New Note</h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-4 py-2 bg-[#2b2b2b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-200"
                  placeholder="Enter course code"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Content
              </label>
              <div className="h-64">
                <TipTapEditor content={content} onChange={setContent} />
              </div>
            </div>

            <div className="mt-32">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div>
                  <label htmlFor="file" className="block text-sm font-medium text-white mb-2">
                    Upload File (Optional)
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 bg-[#2b2b2b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-200"
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  {file && (
                    <p className="mt-2 text-sm text-gray-400">
                      Selected: {file.name}
                    </p>
                  )}
                </div>

                <div className="flex items-center h-full pt-1">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-600 bg-pink-200 text-pink-200 focus:ring-pink-200"
                  />
                  <label htmlFor="isPublic" className="ml-2 block text-sm text-white">
                    Make this note public
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 ">
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
                disabled={saving || uploading}
              >
                {saving || uploading ? 'Creating...' : 'Create Note'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;