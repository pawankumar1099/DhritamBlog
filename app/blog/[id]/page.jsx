'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import MarkdownRenderer from '@/Components/MarkdownRenderer';

export default function BlogDetail() {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params?.id) {
      fetchBlog();
    }
  }, [params?.id]);

  useEffect(() => {
    if (blog && typeof window !== 'undefined') {
      // Update document title and meta tags for SEO
      document.title = `${blog.title} | Dhritam Blog`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', blog.description);
      }

      // Update Open Graph meta tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', blog.title);
      }

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', blog.description);
      }

      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', blog.image);
      }

      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', `https://blog.dhritam.com/blog/${blog._id}`);
      }

      // Add canonical URL
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = `https://blog.dhritam.com/blog/${blog._id}`;

      // Add Schema markup for Article
      const schemaScript = document.querySelector('script[type="application/ld+json"]');
      if (schemaScript) {
        schemaScript.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: blog.title,
          description: blog.description,
          image: blog.image,
          author: {
            '@type': 'Person',
            name: blog.author,
          },
          datePublished: new Date(blog.createdAt).toISOString(),
          dateModified: new Date(blog.updatedAt || blog.createdAt).toISOString(),
        });
      }
    }
  }, [blog]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogs');
      const data = await response.json();

      if (data.success) {
        const foundBlog = data.data.find(
          (b) => b._id === params.id
        );
        if (foundBlog) {
          setBlog(foundBlog);
          setError(null);
        } else {
          setError('Blog not found');
        }
      } else {
        setError('Failed to fetch blog');
      }
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('An error occurred while fetching the blog');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pure-black flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
             <div className="w-12 h-12 border-2 border-hero-lime/20 border-t-hero-lime rounded-full animate-spin"></div>
             <p className='text-xs uppercase tracking-[0.4em] text-hero-lime animate-pulse font-system'>
               Decrypting Data_
             </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-pure-black flex flex-col">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-32 text-center flex-grow">
          <div className="inline-block p-12 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm mb-8">
            <p className="text-red-500 text-sm uppercase tracking-[0.5em] font-system mb-8">
              {error || 'Error: Entry Not Found'}
            </p>
            <Link 
              href="/" 
              className="px-8 py-3 bg-white text-black font-bold rounded-full uppercase tracking-widest text-[11px] font-system hover:bg-hero-lime transition-all"
            >
              ← Return to Hub
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-pure-black min-h-screen">
      <Header />
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-[60]">
        <div className="h-full bg-hero-lime shadow-[0_0_10px_rgba(219,255,0,0.5)] transition-all duration-300"></div>
      </div>

      <div className="py-20 px-5 md:px-12 lg:px-28">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/" 
            className="group inline-flex items-center gap-4 mb-20 text-white/60 hover:text-hero-lime transition-all"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-hero-lime group-hover:bg-hero-lime/10 transition-all">
              <span className="text-xl">←</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold font-system">Return to Index</span>
          </Link>

          {/* Blog Header */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
               <span className="px-3 py-1 bg-hero-lime/10 border border-hero-lime/30 text-hero-lime text-[9px] uppercase font-bold tracking-[0.3em] font-system rounded-full">
                 {blog.category}
               </span>
               <div className="h-[1px] flex-grow bg-white/5"></div>
               <span className="text-white/20 text-[9px] uppercase tracking-[0.5em] font-system font-bold">Ref: {blog._id.slice(-6)}</span>
            </div>

            <h1 
              className="text-5xl sm:text-7xl font-bold mb-10 text-white leading-tight uppercase font-system tracking-tighter" 
            >
              {blog.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center justify-between border-t border-white/5 py-10 mt-10">
              <div className="flex items-center gap-6">
                <div className="relative p-1 rounded-full border border-white/10">
                  <Image
                    src={blog.author_img}
                    alt={blog.author}
                    width={64}
                    height={64}
                    className="rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-hero-lime border-2 border-pure-black"></div>
                </div>
                <div>
                  <p className="font-bold text-white uppercase tracking-[0.2em] text-xs font-system">
                    {blog.author}
                  </p>
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-medium mt-1">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              
              <div className="hidden sm:flex flex-col items-end gap-2">
                 <span className="text-[9px] text-white/20 uppercase tracking-[0.4em]">Written within the</span>
                 <span className="text-white font-bold uppercase tracking-[0.2em] text-[10px]">Public Health Domain</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {blog.image && (
            <div className="mb-20 relative group">
              <div className="absolute inset-0 bg-hero-lime/20 blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={1000}
                  height={600}
                  className="w-full h-auto object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pure-black/60 to-transparent"></div>
              </div>
            </div>
          )}

          {/* Blog Description / TLDR */}
          <div className="mb-20 p-10 bg-soft-black border border-white/10 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-hero-lime/5 blur-3xl"></div>
            <div className="relative">
              <span className="text-[9px] text-hero-lime uppercase tracking-[0.5em] font-bold block mb-4">Executive Summary</span>
              <p className="text-xl text-white/90 leading-relaxed font-body font-light italic">
                {blog.description}
              </p>
            </div>
          </div>

          {/* Blog Content */}
          <div className=" sm:text-2xl text-xl text-center mb-20 prose prose-invert  max-w-none ">
            <MarkdownRenderer  content={blog.content} />
          </div>

          {/* Footer Navigation */}
          <div className="border-t border-white/5 pt-12 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-4 text-white hover:text-hero-lime transition-all group py-4 px-8 border border-white/5 rounded-full hover:border-hero-lime/30 bg-white/5 hover:bg-hero-lime/5"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold font-system">Close Blog & Exit</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
