'use client'

import React, { useState, useEffect } from 'react'
import BlogItem from './BlogItem'

const BlogList = () => {
  const [menu, setMenu] = useState('All');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogs');
      const data = await response.json();
      
      if (data.success) {
        setBlogs(data.data);
      } else {
        setError('Failed to fetch blogs');
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('An error occurred while fetching blogs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='text-center py-16'>
        <p className='text-lg' style={{ fontFamily: 'var(--font-poppins)' }}>
          Loading blogs...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-16 text-red-600'>
        <p style={{ fontFamily: 'var(--font-poppins)' }}>{error}</p>
      </div>
    );
  }

  const categories = ['All', 'Technology', 'Startup', 'Lifestyle'];

  return (
    <div className='py-12 px-5 md:px-12 lg:px-28'>
      {/* Category Filters */}
      <div className='flex justify-center gap-4 mb-16 flex-wrap'>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setMenu(category)}
            className={`py-2 px-6 font-bold border-2 transition-all ${
              menu === category
                ? 'bg-black text-white border-black shadow-[-6px_6px_0px_0px_rgba(0,0,0,0.2)]'
                : 'text-black border-black hover:bg-black hover:text-white'
            }`}
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className='flex flex-wrap justify-center gap-8 mb-20'>
        {blogs.filter((item) => menu === 'All' ? true : item.category === menu).length === 0 ? (
          <p 
            className='text-gray-600 text-lg py-10'
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            No blogs found in this category yet.
          </p>
        ) : (
          blogs.filter((item) => menu === 'All' ? true : item.category === menu).map((item) => (
            <BlogItem 
              key={item._id} 
              id={item._id} 
              title={item.title} 
              description={item.description} 
              image={item.image} 
              category={item.category}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default BlogList
