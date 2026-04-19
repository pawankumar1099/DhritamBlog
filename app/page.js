"use client"

import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  return (
    <div>
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
