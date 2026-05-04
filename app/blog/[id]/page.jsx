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
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  useEffect(() => {
    if (params?.id) {
      fetchBlog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // Construct exact ID for the fetch - ensures we get the latest data including likes/comments
      const blogId = params?.id;
      if (!blogId) return;

      const response = await fetch(`/api/blogs/${blogId}`);
      const data = await response.json();

      if (data.success) {
        setBlog(data.data);
        setError(null);
      } else {
        setError(data.error || 'Blog not found');
      }
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('An error occurred while fetching the blog');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (isLiking || !params?.id) return;
    try {
      setIsLiking(true);
      // Ensure we are using the resolved ID correctly
      const blogId = params.id;
      const response = await fetch(`/api/blogs/${blogId}/like`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error(`Like failed: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        setBlog(prev => ({ ...prev, likes: data.data.likes }));
      }
    } catch (err) {
      console.error('Error liking blog:', err);
      // Optional: show a small notification or error state
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (isCommenting || !commentText.trim() || !commentAuthor.trim() || !params?.id) return;
    try {
      setIsCommenting(true);
      const blogId = params.id;
      const response = await fetch(`/api/blogs/${blogId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: commentText, author: commentAuthor }),
      });

      if (!response.ok) {
        throw new Error(`Comment failed: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setBlog(prev => ({ ...prev, comments: data.data }));
        setCommentText('');
        setCommentAuthor(''); // Clear author too if desired, or keep for convenience
      }
    } catch (err) {
      console.error('Error adding comment:', err);
    } finally {
      setIsCommenting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col">
        <Header />
        <div className="grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
             <div className="w-12 h-12 border-2 border-brand/20 border-t-brand rounded-full animate-spin"></div>
             <p className='text-xs uppercase tracking-[0.4em] text-brand animate-pulse font-sans'>
               Loading Content...
             </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-32 text-center grow">
          <div className="inline-block p-12 bg-bg-secondary rounded-3xl border border-border-light backdrop-blur-sm mb-8">
            <p className="text-error text-sm uppercase tracking-[0.5em] font-sans mb-8">
              {error || 'Error: Entry Not Found'}
            </p>
            <Link 
              href="/" 
              className="btn-primary uppercase tracking-widest text-[11px] font-sans"
            >
              ← Return Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-bg-primary min-h-screen">
      <Header />
      
      <div className="py-20 px-5 md:px-12 lg:px-28">
        <div className="reading-container">
          {/* Back Button */}
          <Link 
            href="/" 
            className="group inline-flex items-center gap-4 mb-16 text-text-secondary hover:text-text-primary transition-all"
          >
            <div className="w-10 h-10 rounded-full border border-border-default flex items-center justify-center group-hover:bg-bg-secondary transition-all">
              <span className="text-xl">←</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold font-sans">Return to Index</span>
          </Link>

          {/* Blog Header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
               <span className="tag-chip">
                 {blog.category}
               </span>
               <div className="h-px grow bg-border-light"></div>
            </div>

            <h1 
              className="text-4xl sm:text-5xl font-bold mb-8 text-text-primary leading-tight font-serif" 
            >
              {blog.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center justify-between border-y border-border-light py-8 mt-10">
              <div className="flex items-center gap-4">
                <Image
                  src={blog.author_img}
                  alt={blog.author}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-text-primary text-sm font-sans">
                    {blog.author}
                  </p>
                  <p className="text-text-muted text-[12px] font-medium mt-0.5">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })} &middot; 4 min read
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                 <button 
                  onClick={handleLike}
                  disabled={isLiking}
                  className={`flex items-center gap-1.5 text-text-muted hover:text-brand transition-colors ${isLiking ? 'opacity-50' : ''}`}
                 >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={blog.likes > 0 ? "fill-brand stroke-brand" : "stroke-current"}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                   <span className="text-sm font-medium">{blog.likes || 0}</span>
                 </button>
                 <button className="text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                   <span className="text-sm font-medium">{blog.comments?.length || 0}</span>
                 </button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {blog.image && (
            <div className="mb-16">
              <Image
                src={blog.image}
                alt={blog.title}
                width={1000}
                height={600}
                className="w-full h-auto object-cover rounded-sm"
              />
            </div>
          )}

          {/* Blog Description / TLDR */}
          <div className="mb-16">
            <p className="text-2xl text-text-secondary leading-relaxed font-sans font-light italic">
              {blog.description}
            </p>
          </div>

          {/* Blog Content */}
          <div className="text-lg text-text-primary mb-12 prose prose-lg max-w-none font-sans leading-relaxed">
            <MarkdownRenderer content={blog.content} />
          </div>

          {/* Social Interactions (Likes/Share) */}
          <div className="flex items-center gap-6 py-8 border-y border-border-light mb-16">
            <button 
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center gap-2 text-text-muted hover:text-brand transition-all group ${isLiking ? 'opacity-50' : ''}`}
            >
              <div className={`p-2 rounded-full group-hover:bg-brand/5 transition-colors ${blog.likes > 0 ? "text-brand" : ""}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill={blog.likes > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
              <span className="text-sm font-medium">{blog.likes || 0} likes</span>
            </button>
            <div className="flex items-center gap-2 text-text-muted">
              <div className="p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <span className="text-sm font-medium">{blog.comments?.length || 0} comments</span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold font-serif text-text-primary mb-8">Comments</h3>
            
            {/* Comment Form */}
            <form onSubmit={handleComment} className="mb-12 bg-bg-secondary p-6 rounded-sm border border-border-light">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" 
                  placeholder="Your Name"
                  required
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="w-full px-4 py-2 bg-bg-primary border border-border-default rounded-sm focus:border-brand outline-none text-sm transition-colors text-text-primary"
                />
              </div>
              <textarea 
                placeholder="What are your thoughts?"
                required
                rows="3"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-4 py-3 bg-bg-primary border border-border-default rounded-sm focus:border-brand outline-none text-sm transition-colors text-text-primary resize-none mb-4"
              ></textarea>
              <button 
                type="submit"
                disabled={isCommenting}
                className="btn-primary"
              >
                {isCommenting ? 'Posting...' : 'Respond'}
              </button>
            </form>

            {/* Comment List */}
            <div className="space-y-8">
              {blog.comments && blog.comments.length > 0 ? (
                blog.comments.map((comment, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-border-light shrink-0 flex items-center justify-center text-text-muted font-bold text-xs uppercase">
                      {comment.author.slice(0, 2)}
                    </div>
                    <div className="grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-text-primary">{comment.author}</span>
                        <span className="text-text-muted text-xs">&middot; {new Date(comment.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-text-secondary leading-relaxed text-[16px]">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-text-muted italic text-sm">No comments yet. Be the first to share your thoughts!</p>
              )}
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="border-t border-border-light pt-12 text-center">
            <Link 
              href="/" 
              className="btn-secondary px-10"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
