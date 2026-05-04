import React from "react";
import Image from "next/image";
import Link from "next/link";

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <div className="flex flex-row-reverse items-center justify-between group gap-16 border-b border-border-light pb-12 blog-card p-4 rounded-sm">
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 font-sans">
          <span className="text-xs font-medium text-brand">{category}</span>
        </div>
        <Link href={"/blog/" + id} className="flex flex-col">
          <h2 className="text-[26px] font-bold leading-tight mb-2 group-hover:text-brand font-serif text-text-primary transition-colors">
            {title}
          </h2>
          <p className="text-[16px] line-clamp-3 leading-relaxed mb-6 font-sans text-text-secondary">
            {description}
          </p>
        </Link>
        <div className="flex items-center text-xs text-text-muted gap-2 mt-auto font-sans">
          <span>Dec 12</span>
          <span>&middot;</span>
          <span>4 min read</span>
        </div>
      </div>
      <Link href={"/blog/" + id} className="flex-shrink-0 hidden sm:block">
        <div className="overflow-hidden rounded-[4px] border border-border-light shadow-sm ">
          <Image src={image} width={240} height={160} alt={title} className="w-[180px] h-[120px] sm:w-[240px] sm:h-[160px] object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
      </Link>
    </div>
  );
};

export default BlogItem;

