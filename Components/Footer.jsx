import React from 'react'
import Image from 'next/image'
import { assets } from '@/Assets/assets'

const Footer = () => {
  return (
    <div className='bg-black text-white py-16 px-5 md:px-12 lg:px-28'>
      <div className='flex flex-col items-center justify-between gap-8 mb-12'>
        {/* Logo and About */}
        <div className='text-center'>
          <Image src={assets.logo_light} width={140} alt="logo" className="cursor-pointer mx-auto" />
          <p 
            className='text-sm text-gray-400 mt-4'
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Copyright © {new Date().getFullYear()} Dhritam. All rights reserved.
          </p>
        </div>

        {/* LinkedIn Link */}
        <div>
          <a href="https://www.linkedin.com/company/dhritam/" target="_blank" rel="noopener noreferrer">
            <svg 
              className='w-12 h-12 cursor-pointer hover:opacity-70 transition-opacity fill-white' 
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className='border-t border-gray-700 pt-8'>
        <p 
          className='text-center text-xs text-gray-500'
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          Built with passion for bloggers and readers worldwide
        </p>
      </div>
    </div>
  )
}

export default Footer
