import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border-light bg-bg-secondary py-12 font-sans">
      <div className="max-w-7xl mx-auto px-5 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-sm text-text-muted">
          &copy; 2026 Dhritam. All rights reserved. &middot; Built with ❤️
        </div>
        <div className="flex gap-6 text-sm text-text-secondary">
          <a href="#" className="hover:text-text-primary transition-colors">About</a>
          <a href="#" className="hover:text-text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-text-primary transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

