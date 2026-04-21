import React from 'react'
import Image from 'next/image'
import { assets } from '@/Assets/assets'

const Footer = () => {
  return (
    <div className='bg-pure-black border-t border-white/5 text-pioneers-white py-20 px-5 md:px-12 lg:px-28 font-system'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-16 mb-20'>
        {/* Logo and About */}
        <div className='text-center md:text-left'>
          <Image src={assets.logo} width={140} alt="logo" className="cursor-pointer invert brightness-150 mb-8 mx-auto md:mx-0 opacity-80 hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-4 justify-center md:justify-start bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-hero-lime animate-pulse"></span>
            <p className='text-[9px] uppercase tracking-[0.5em] text-white/50 font-bold'>
              Core System Active: v5.0.1
            </p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-3 gap-8 md:gap-16 text-[9px] uppercase tracking-[0.4em] text-white/40">
           <div className="flex flex-col gap-3">
              <span className="text-hero-lime/40 font-bold">SEC_LEVEL</span>
              <span className="text-white/80">OVERRIDE-A1</span>
           </div>
           <div className="flex flex-col gap-3">
              <span className="text-hero-lime/40 font-bold">OS_VERSION</span>
              <span className="text-white/80">DHRITAM-X</span>
           </div>
           <div className="flex flex-col gap-3">
              <span className="text-hero-lime/40 font-bold">STABILITY</span>
              <span className="text-white/80">OPTIMAL</span>
           </div>
        </div>

        {/* LinkedIn Link */}
        <div className="group relative">
          <a href="https://www.linkedin.com/company/dhritam/" target="_blank" rel="noopener noreferrer" className="relative block p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-hero-lime/30 transition-all shadow-xl">
             <div className="absolute inset-0 bg-hero-lime blur-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <svg 
              className='w-8 h-8 cursor-pointer transition-all fill-white group-hover:fill-hero-lime group-hover:scale-105' 
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className='border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8'>
        <p className='text-[9px] uppercase tracking-[0.5em] text-white/20 font-medium'>
          Transmission end. Copyright © {new Date().getFullYear()} Dhritam Research Div.
        </p>
        <div className="flex gap-10 text-[9px] uppercase tracking-[0.4em] text-white/30">
           <span className="hover:text-hero-lime cursor-pointer transition-colors hover:opacity-100">Privacy Policy</span>
           <span className="hover:text-hero-lime cursor-pointer transition-colors hover:opacity-100">Terms of Use</span>
           <span className="hover:text-white cursor-pointer transition-colors">v5.0.1</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
