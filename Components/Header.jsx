'use client';

import { assets } from '@/Assets/assets'
import React, { useState } from 'react'
import Image from 'next/image'

const Header = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessageType('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbwkEq3LJKZZC9EQeOxf1mdp7Q112VFlhnz2Fc4KT2gr2UY-opi9mUZY0ojqbwB2UGSf/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({
            email: email,
            timestamp: new Date().toISOString(),
            source: 'Blog Subscription'
          }),
        }
      );

      setMessageType('success');
      setMessage('✓ Thank you for subscribing!');
      setEmail('');
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
    } catch (error) {
      console.error('Error subscribing:', error);
      setMessageType('error');
      setMessage('Failed to subscribe. Please try again.');
      
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='py-8 px-5 md:px-12 lg:px-28 bg-white border-b-2 border-black'>
      {/* Navigation */}
      <div className='flex justify-between items-center mb-12'>
        <Image src={assets.logo} width={120} alt="logo" className="cursor-pointer w-[120px] sm:w-[180px]"/>
        <a href="https://blog.dhritam.com" target="_blank" rel="noopener noreferrer">
          <button 
            className='flex items-center gap-2 font-bold py-2 px-4 sm:py-3 sm:px-6 border-2 border-black shadow-[-7px_7px_0px_0px_rgba(0,0,0,1)] hover:shadow-[-10px_10px_0px_0px_rgba(0,0,0,0.15)] transition-all'
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Get Started <Image src={assets.arrow} width={20} height={20} alt="get started icon"/>
          </button>
        </a>
      </div>

      {/* Hero Section */}
      <div className='text-center'>
        <h1 
          className='text-4xl sm:text-6xl font-bold mb-6 text-black' 
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Latest Blogs
        </h1>
        <p 
          className='mt-6 max-w-[740px] m-auto text-sm sm:text-lg text-gray-700 leading-relaxed'
          style={{ fontFamily: 'var(--font-merriweather)' }}
        >
          Discover the latest insights, trends, and stories in our blog. Stay informed and inspired with our expert content.
        </p>

        {/* Email Subscription */}
        <form onSubmit={handleSubscribe} className='flex flex-col gap-3 max-w-[600px] mx-auto mt-10'>
          <div className='flex justify-between border-2 border-black shadow-[-8px_8px_0px_0px_rgba(0,0,0,0.1)]'>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email' 
              className='pl-6 w-full outline-none focus:outline-none text-black placeholder:text-gray-500'
              style={{ fontFamily: 'var(--font-poppins)' }}
              disabled={loading}
            />
            <button 
              type="submit"
              disabled={loading}
              className='border-l-2 border-black py-4 px-6 sm:px-8 font-bold cursor-pointer hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed'
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>

          {/* Status Message */}
          {message && (
            <p 
              className={`text-sm font-bold ${
                messageType === 'success' 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Header
