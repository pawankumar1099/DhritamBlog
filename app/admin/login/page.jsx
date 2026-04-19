'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      // Store auth token in localStorage
      localStorage.setItem('adminEmail', email);
      localStorage.setItem('adminToken', 'true');

      // Redirect to dashboard
      router.push('/admin/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-black/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full blur-3xl -z-10"></div>

      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6 p-4 border-2 border-black shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-4xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
              AD
            </span>
          </div>
          <h1 
            className="text-5xl font-bold mb-2 text-black" 
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Admin Access
          </h1>
          <p className="text-gray-700 text-lg" style={{ fontFamily: 'var(--font-merriweather)' }}>
            Dhritam Blog Management
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 border-l-4 border-red-600 bg-red-50">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-black mb-3"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-6 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black/20 transition-all text-black placeholder:text-gray-500"
              placeholder="admin@example.com"
              style={{ fontFamily: 'var(--font-poppins)' }}
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-black mb-3"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-6 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black/20 transition-all text-black placeholder:text-gray-500"
              placeholder="Enter your password"
              style={{ fontFamily: 'var(--font-poppins)' }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-bold py-4 px-6 border-2 border-black shadow-[-8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[-12px_12px_0px_0px_rgba(0,0,0,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t-2 border-black text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-black font-bold hover:gap-4 transition-all"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            <span>← Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
