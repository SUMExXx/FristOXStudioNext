import { contents } from '@/lib/data/website'
import Link from 'next/link'
import React from 'react'

function HeroSection() {
  return (
    <div className='w-full flex flex-col items-center justify-start md:px-20 md:py-10'>
        <div className='bg-primary rounded-[40px] flex justify-center items-center md:h-[520px] w-full md:px-10'>
            <div className='flex flex-col w-full items-start justify-center gap-8 md:pr-10'>
                <h1 className='z-30 font-bold text-background custom-heading1 md:w-[900px] leading-[90px]'>{contents.mainTitle}</h1>
                <p className='z-30 custom-text2 md:w-[640px] text-background justify-start text-left'>{contents.mainSubtitle}</p>
                <Link href='/signin' className='md:px-10 md:py-5 rounded-full bg-background text-foreground custom-display1'>
                  {contents.mainButton}
                </Link>
            </div>
            <video autoPlay loop muted playsInline className='absolute h-[600px] right-20 object-cover bg-transparent pointer-events-none'>
                <source src="/videos/GIF-12.webm" type="video/webm"/>
                <img src="/videos/GIF-12.gif" alt="Fallback image"/>
            </video>
        </div>
    </div>
  )
}

export default HeroSection