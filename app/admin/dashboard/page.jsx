'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import RichTextEditor from '@/Components/RichTextEditor';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    author: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      fetchBlogs();
    }
    setLoading(false);
  }, [router]);

  const fetchBlogs = async () => {
    try {
      setLoadingBlogs(true);
      const response = await fetch('/api/blogs');
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!image) return null;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', image);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      if (data.success) {
        return {
          url: data.url,
          mimeType: data.mimeType || 'image/jpeg'
        };
      } else {
        setError(data.error || 'Image upload failed');
        return null;
      }
    } catch (err) {
      setError('An error occurred while uploading the image');
      console.error(err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setUploading(true);

    try {
      // Validate required fields
      if (
        !formData.title ||
        !formData.description ||
        !formData.content ||
        !formData.category ||
        !image
      ) {
        setError('All fields are required');
        setUploading(false);
        return;
      }

      // Upload image first
      const imageData = await uploadImage();
      if (!imageData) {
        setUploading(false);
        return;
      }

      // Create blog post
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: imageData.url,
          imageMimeType: imageData.mimeType,
          author: formData.author || 'Admin',
          author_img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create blog');
        setUploading(false);
        return;
      }

      setSuccess('Blog published successfully! 🎉');
      setFormData({
        title: '',
        description: '',
        content: '',
        category: '',
        author: '',
      });
      setImage(null);
      setImagePreview(null);

      // Refresh blogs list
      fetchBlogs();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('An error occurred while creating the blog');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      try {
        console.log('Deleting blog with ID:', blogId);
        
        const response = await fetch(`/api/blogs/${blogId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        
        console.log('Delete response:', data);

        if (response.ok) {
          setSuccess('Blog deleted successfully! ✓');
          fetchBlogs(); // Refresh the blogs list
          setTimeout(() => setSuccess(''), 3000);
        } else {
          setError(data.error || `Failed to delete blog (Status: ${response.status})`);
        }
      } catch (err) {
        console.error('Error deleting blog:', err);
        setError(`Error: ${err.message}`);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    router.push('/admin/login');
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 
              className="text-4xl font-bold text-black" 
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1" style={{ fontFamily: 'var(--font-poppins)' }}>
              Manage your blog content
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="font-bold text-black" style={{ fontFamily: 'var(--font-poppins)' }}>
                {localStorage.getItem('adminEmail')}
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
              alt="Admin"
              width={50}
              height={50}
              className="rounded-full border-2 border-black"
            />
            <button
              onClick={handleLogout}
              className="bg-black text-white px-6 py-2 font-bold border-2 border-black hover:bg-white hover:text-black transition-all"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border-2 border-black shadow-[-12px_12px_0px_0px_rgba(0,0,0,0.1)] p-8">
              <h2 
                className="text-3xl font-bold mb-8 text-black" 
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Create New Blog Post
              </h2>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
                  <p className="text-red-700 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
                    {error}
                  </p>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6">
                  <p className="text-green-700 font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
                    {success}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label 
                    className="block text-sm font-bold text-black mb-2"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black/20 text-black placeholder:text-gray-500"
                    placeholder="Enter an engaging title"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  />
                </div>

                {/* Description */}
                <div>
                  <label 
                    className="block text-sm font-bold text-black mb-2"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    Description (Short Summary) *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="2"
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black/20 text-black placeholder:text-gray-500"
                    placeholder="Write a brief summary..."
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  />
                </div>

                {/* Content */}
                <div>
                  <label 
                    className="block text-sm font-bold text-black mb-2"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    Blog Content (Full Article with Markdown Formatting) *
                  </label>
                  <RichTextEditor 
                    value={formData.content}
                    onChange={(value) => setFormData({ ...formData, content: value })}
                  />
                </div>

                {/* Category */}
                <div>
                  <label 
                    className="block text-sm font-bold text-black mb-2"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black/20 text-black bg-white"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    <option value="">Select a category</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Author */}
                <div>
                  <label 
                    className="block text-sm font-bold text-black mb-2"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    Author Name
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black/20 text-black placeholder:text-gray-500"
                    placeholder="Your name (optional)"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label 
                    className="block text-sm font-bold text-black mb-2"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    Featured Image *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none text-black"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm font-bold mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                        Image Preview:
                      </p>
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        width={300}
                        height={200}
                        className="border-2 border-black"
                      />
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-black text-white font-bold py-4 px-6 border-2 border-black shadow-[-8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[-12px_12px_0px_0px_rgba(0,0,0,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {uploading ? '🚀 Publishing...' : '🚀 Publish Blog'}
                </button>
              </form>
            </div>
          </div>

          {/* Recent Blogs Sidebar */}
          <div>
            <div className="bg-white border-2 border-black shadow-[-12px_12px_0px_0px_rgba(0,0,0,0.1)] p-8 sticky top-8">
              <h3 
                className="text-2xl font-bold mb-6 text-black" 
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Recent Blogs
              </h3>
              {loadingBlogs ? (
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Loading...
                </p>
              ) : blogs.length === 0 ? (
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-poppins)' }}>
                  No blogs yet. Create your first one! ✍️
                </p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {blogs.slice(0, 10).map((blog, index) => (
                    <div
                      key={blog._id}
                      className="border-l-4 border-black pl-4 py-3 hover:bg-black/5 transition-colors"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-grow">
                          <p 
                            className="font-bold text-sm text-black truncate" 
                            style={{ fontFamily: 'var(--font-poppins)' }}
                          >
                            {index + 1}. {blog.title}
                          </p>
                          <p 
                            className="text-xs text-gray-600 mt-1" 
                            style={{ fontFamily: 'var(--font-poppins)' }}
                          >
                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                          <span 
                            className="inline-block text-xs mt-2 px-2 py-1 bg-black text-white" 
                            style={{ fontFamily: 'var(--font-poppins)' }}
                          >
                            {blog.category}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteBlog(blog._id)}
                          className="px-2 py-1 bg-red-600 text-white text-xs font-bold border border-red-700 hover:bg-red-700 transition-all flex-shrink-0"
                          title="Delete this blog"
                          style={{ fontFamily: 'var(--font-poppins)' }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
