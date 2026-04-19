import React from 'react'
import Image from 'next/image' 
import { assets } from '@/Assets/assets'
import Link from 'next/link'

const BlogItem = ({title, description, category, image, id}) => {
  
  return (
    <div className='w-[340px] h-[540px] bg-white border-2 border-black hover:shadow-[-10px_10px_0px_0px_rgba(0,0,0,0.2)] transition-all duration-300 flex flex-col'>
      <Link href={`/blog/${id}`} className='flex flex-col h-full'>
        <div className='overflow-hidden bg-gray-100 h-[200px]'>
          <Image 
            src={image} 
            width={400} 
            height={300} 
            alt="blog image" 
            className='w-full h-full object-cover border-b-2 border-black hover:scale-105 transition-transform duration-300'
          />
        </div>
        
        <div className='p-6 flex flex-col flex-grow'>
          <span 
            className='mb-4 px-3 py-1 inline-block bg-black text-white text-xs font-bold'
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            {category}
          </span>
          
          <h5 
            className='mb-3 text-xl font-bold tracking-tight text-black line-clamp-2'
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {title}
          </h5>
          
          <p 
            className='mb-4 text-sm text-gray-700 line-clamp-3 leading-relaxed flex-grow'
            style={{ fontFamily: 'var(--font-merriweather)' }}
          >
            {description}
          </p>
          
          <div className='mt-auto'>
            <button className='inline-flex items-center gap-2 cursor-pointer font-bold text-black hover:gap-4 transition-all group'>
              <span style={{ fontFamily: 'var(--font-poppins)' }}>Read More</span>
              <Image 
                src={assets.arrow} 
                width={18} 
                height={18} 
                alt="read more icon" 
                className='group-hover:translate-x-1 transition-transform'
              />
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BlogItem
