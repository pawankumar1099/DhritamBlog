"use client";

import React, { useState, useEffect } from "react";
import BlogItem from "./BlogItem";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-text-secondary font-sans">Loading...</div>;
  }

  const categories = ["All", "Technology", "Startup", "Lifestyle"];

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-12 py-10 bg-bg-primary">
      <div className="flex gap-6 mb-12 border-b border-border-light pb-4 overflow-x-auto font-sans">
        {categories.map((category) => {
          const activeClass = menu === category 
            ? "border-text-primary text-text-primary font-semibold" 
            : "border-transparent text-text-secondary hover:text-text-primary";
            
          return (
            <button
              key={category}
              onClick={() => setMenu(category)}
              className={"pb-4 -mb-[17px] text-sm whitespace-nowrap border-b transition-colors " + activeClass}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-10 reading-container px-0">
        {blogs.filter((item) => menu === "All" || item.category === menu).map((item) => (
          <BlogItem key={item._id} {...item} id={item._id} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;

