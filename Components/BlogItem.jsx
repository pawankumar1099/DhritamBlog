import React from 'react'
import Image from 'next/image' 
import { assets } from '@/Assets/assets'
import Link from 'next/link'

const BlogItem = ({title, description, category, image, id}) => {
  
  return (
    <div className='w-full sm:w-[360px] modern-card flex flex-col group relative overflow-hidden'>
      {/* Glow Effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-hero-lime/5 blur-[80px] group-hover:bg-hero-lime/10 transition-all"></div>
      
      <Link href={`/blog/${id}`} className='flex flex-col h-full'>
        <div className='overflow-hidden bg-black h-[220px] relative'>
          <Image 
            src={image} 
            width={400} 
            height={300} 
            alt={title} 
            className='w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out grayscale hover:grayscale-0'
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card-bg via-card-bg/20 to-transparent"></div>
          
          <div className="absolute top-4 left-4">
            <span 
              className='px-3 py-1 bg-white/5 border border-white/10 backdrop-blur-md text-hero-lime text-[9px] uppercase font-bold tracking-[0.3em] font-system rounded-full'
            >
              {category}
            </span>
          </div>
        </div>
        
        <div className='p-8 flex flex-col flex-grow bg-card-bg/40'>
          <h5 
            className='mb-4 text-2xl font-bold tracking-tight text-white line-clamp-2 uppercase font-system leading-none group-hover:text-hero-lime transition-colors duration-300'
          >
            {title}
          </h5>
          
          <p 
            className='mb-8 text-sm text-white/40 line-clamp-3 leading-relaxed flex-grow font-body font-light tracking-wide'
          >
            {description}
          </p>
          
          <div className='mt-auto flex items-center justify-between pt-6 border-t border-white/5'>
            <div className='inline-flex items-center gap-3 cursor-pointer group/btn'>
              <span className="font-system text-[10px] uppercase font-bold tracking-[0.2em] text-white/60 group-hover/btn:text-white transition-colors">Read Case Study</span>
              <div className="w-8 h-[1px] bg-white/10 transition-all group-hover/btn:w-12 group-hover/btn:bg-hero-lime"></div>
            </div>
            <div className="flex gap-1">
               <div className="w-1 h-1 rounded-full bg-hero-lime/20 group-hover:bg-hero-lime transition-colors"></div>
               <div className="w-1 h-1 rounded-full bg-hero-lime/20 group-hover:bg-hero-lime transition-colors delay-75"></div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BlogItem
