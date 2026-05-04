"use client";

import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full border-b border-border-default bg-bg-primary font-sans sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 md:px-12 flex justify-between items-center h-[72px]">
        <div className="flex items-center gap-4 cursor-pointer">
          <h1 className="text-3xl tracking-tight font-serif text-text-primary font-bold">Dhritam</h1>
        </div>
        <div className="flex items-center gap-6">
          
          <a href="https://dhritam.com"><button className="btn-primary text-sm py-2 px-6">Get started</button></a>
        </div>
      </div>
    </header>
  );
};

export default Header;

