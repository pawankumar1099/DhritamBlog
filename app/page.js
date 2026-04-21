"use client"

import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Image from "next/image";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 1;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-pure-black font-system text-hero-lime transition-opacity duration-500">
           <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-hero-lime rounded-full animate-pulse opacity-20"></div>
              <div className="absolute inset-4 border border-hero-lime/40 rounded-full flex items-center justify-center">
                 <span className="text-5xl font-black zalando-sans-expanded-font">{percent}%</span>
              </div>
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle 
                  cx="50%" cy="50%" r="48%" 
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeDasharray="300%" 
                  strokeDashoffset={`${300 - (percent * 3)}%`}
                  className="transition-all duration-300 ease-out"
                />
              </svg>
           </div>
           <div className="flex flex-col items-center gap-4">
              <span className="text-xs tracking-[0.5em] uppercase animate-pulse">System Initializing_</span>
              <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-hero-lime transition-all duration-300"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Bio-Tech Interface v4.0</span>
           </div>
        </div>
      )}
      <Head>
        <title>Health & Wellness Blog - Science-Backed Insights</title>
        <meta name="description" content="Discover expert insights on health, wellness, fitness, and nutrition. Stay informed with science-backed articles to improve your lifestyle." />
        <meta name="keywords" content="health blog, wellness tips, fitness guides, nutrition advice, healthy lifestyle, wellness resources" />
        <meta name="author" content="Dhritam Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph Tags - Better Social Sharing */}
        <meta property="og:title" content="Health & Wellness Blog - Science-Backed Insights" />
        <meta property="og:description" content="Discover expert insights on health, wellness, fitness, and nutrition." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Health & Wellness Blog" />
        <meta name="twitter:description" content="Science-backed health and wellness insights" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://yourdomain.com" />
        
        {/* Schema.org Markup for Search Engines */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Dhritam Health & Wellness Blog",
          "description": "Expert insights on health, wellness, fitness, and nutrition",
          "url": "https://yourdomain.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://yourdomain.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}</script>
      </Head>

      <Header />
      <BlogList />
      <Footer />
    </div>
  );
}
