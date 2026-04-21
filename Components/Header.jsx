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
    <div className='relative py-8 px-5 md:px-12 lg:px-28 bg-soft-black overflow-hidden min-h-[600px] flex flex-col justify-center'>
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none ">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover "
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-pure-black/0 via-transparent to-pure-black"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto h-full flex flex-col">
        {/* Navigation */}
        <div className='flex justify-between items-center mb-12'>
          <div className="flex items-center gap-3">
             <Image src={assets.logo} width={120} alt="logo" className="cursor-pointer invert w-[120px] sm:w-[150px] hover:opacity-80 transition-opacity"/>
             <div className="hidden sm:block h-5 w-[1px] bg-white/20 mx-2"></div>
             <span className="hidden sm:block text-white/40 text-[10px] tracking-[0.4em] font-system uppercase">Systems</span>
          </div>
          <a href="https://www.dhritam.com" target="_blank" rel="noopener noreferrer">
            <button 
              className='flex items-center gap-2 font-bold py-2 px-5 sm:py-2.5 sm:px-6 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all uppercase tracking-widest text-[11px] font-system shadow-lg bg-black/40 backdrop-blur-md'
            >
              Access Portal <Image src={assets.arrow} width={12} height={12} alt="get started icon" className="brightness-150"/>
            </button>
          </a>
        </div>

        {/* Hero Section */}
        <div className='text-center py-12'>
          <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm">
             <span className="text-hero-lime text-[10px] tracking-[0.5em] uppercase font-bold font-system">Intelligence Terminal</span>
          </div>
          <h1 
            className='text-6xl sm:text-9xl font-black mb-8 text-white zalando-sans-expanded-font tracking-tighter leading-none' 
          >
            LATEST <span className="text-hero-lime italic">INSIGHTS</span>
          </h1>
          <p 
            className='mt-8 max-w-[680px] m-auto text-base sm:text-lg text-white/90 leading-relaxed font-body tracking-tight'
          >
            Analyzing the frontier of bio-technology and startup infrastructure. <br className="hidden sm:block" /> Access specialized research and medical-grade data.
          </p>

          {/* Email Subscription */}
          <form onSubmit={handleSubscribe} className='flex flex-col gap-4 max-w-[540px] mx-auto mt-16 scale-105 sm:scale-100'>
            <div className='flex flex-col sm:flex-row gap-0 sm:gap-2 p-1.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl focus-within:border-hero-lime/40 transition-all'>
              <input 
                onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              type="email" 
              placeholder='Enter your email' 
              className='flex-grow bg-transparent outline-none px-6 py-4 text-white text-sm placeholder:text-white/20' 
              required
            />
            <button 
              type='submit' 
              disabled={loading}
              className='btn-modern bg-hero-lime text-pure-black hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 min-w-[140px] rounded-xl'
            >
              {loading ? 'Processing...' : 'Subscribe'}
              {!loading && <div className="w-1.5 h-1.5 rounded-full bg-black/30"></div>}
            </button>
          </div>
          {message && (
            <div className={`text-xs font-system uppercase tracking-widest px-4 py-2 rounded-lg ${messageType === 'success' ? 'text-hero-lime bg-hero-lime/10' : 'text-red-500 bg-red-500/10'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
    </div>
  )
}

export default Header
