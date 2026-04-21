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
      <div className='flex flex-col items-center justify-center py-32 bg-pure-black'>
        <div className="w-12 h-12 border-2 border-hero-lime/20 border-t-hero-lime rounded-full animate-spin"></div>
        <p className='text-xs uppercase tracking-[0.4em] text-hero-lime animate-pulse font-system mt-6'>
          Loading...
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
    <div className='py-20 px-5 md:px-12 lg:px-28 bg-pure-black'>
      {/* Category Filters */}
      <div className='flex justify-center gap-4 sm:gap-10 mb-20 flex-wrap'>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setMenu(category)}
            className={`py-3 px-8 rounded-full border transition-all uppercase tracking-[0.3em] text-[10px] font-bold font-system ${
              menu === category
                ? 'bg-hero-lime text-pure-black border-hero-lime shadow-[0_0_20px_rgba(219,255,0,0.2)]'
                : 'text-white/30 border-white/5 hover:border-white/20 hover:text-white/60'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 max-w-[1400px] mx-auto'>
        {blogs.filter((item) => menu === 'All' ? true : item.category === menu).length === 0 ? (
          <div className="col-span-full text-center py-32 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className='text-white/20 text-sm uppercase tracking-[0.5em] font-system'>
              SYSTEM MESSAGE: NO DATA DETECTED IN THIS DOMAIN
            </p>
          </div>
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
