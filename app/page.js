"use client"

import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Head from "next/head";

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>Health & Wellness Blog - Science-Backed Insights</title>
        <meta name="description" content="Discover expert insights on health, wellness, fitness, and nutrition. Stay informed with science-backed articles to improve your lifestyle." />
        <meta name="keywords" content="health blog, wellness tips, fitness guides, nutrition advice, healthy lifestyle, wellness resources" />
      </Head>

      <Header />
      <BlogList />
      <Footer />
    </div>
  );
}
