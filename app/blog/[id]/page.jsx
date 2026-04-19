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
      <>
        <Header />
        <div className="text-center py-16" style={{ fontFamily: 'var(--font-poppins)' }}>
          Loading blog...
        </div>
        <Footer />
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-red-600 mb-8" style={{ fontFamily: 'var(--font-poppins)' }}>
            {error || 'Blog not found'}
          </p>
          <Link 
            href="/" 
            className="text-black font-bold hover:gap-2 inline-flex items-center gap-1"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            ← Back to Home
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-white py-12 px-5 md:px-12 lg:px-28">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/" 
            className="text-black font-bold hover:gap-2 inline-flex items-center gap-1 mb-8 border-b-2 border-black pb-2"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            ← Back to All Blogs
          </Link>

          {/* Blog Header */}
          <div className="mb-12">
            <h1 
              className="text-5xl sm:text-6xl font-bold mb-6 text-black leading-tight" 
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {blog.title}
            </h1>

            {/* Author Info and Category */}
            <div className="flex items-center justify-between border-y-2 border-black py-6 mb-8">
              <div className="flex items-center gap-4">
                <Image
                  src={blog.author_img}
                  alt={blog.author}
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-black"
                />
                <div>
                  <p 
                    className="font-bold text-black"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {blog.author}
                  </p>
                  <p 
                    className="text-gray-600 text-sm"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <span 
                className="bg-black text-white px-6 py-2 font-bold border-2 border-black"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {blog.category}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          {blog.image && (
            <div className="mb-12">
              <Image
                src={blog.image}
                alt={blog.title}
                width={800}
                height={500}
                className="w-full h-auto border-2 border-black shadow-[-10px_10px_0px_0px_rgba(0,0,0,0.1)]"
              />
            </div>
          )}

          {/* Blog Description */}
          <div className="mb-12 p-8 bg-gray-50 border-2 border-black">
            <p 
              className="text-xl text-black leading-relaxed"
              style={{ fontFamily: 'var(--font-merriweather)' }}
            >
              {blog.description}
            </p>
          </div>

          {/* Blog Content */}
          <div className="mb-12">
            <MarkdownRenderer content={blog.content} />
          </div>

          {/* Footer Divider and Back Button */}
          <div className="border-t-2 border-black pt-8">
            <Link 
              href="/" 
              className="text-black font-bold hover:gap-2 inline-flex items-center gap-1 border-b-2 border-black pb-2"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              ← Back to All Blogs
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
