import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { contents } from '@/lib/data/website'
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='w-full flex justify-center items-start md:px-20 md:pt-10 md:pb-20 relative'>
        <div className='w-full flex flex-col justify-start items-start md:gap-10'>
          <Link href={'/'}>
            <Image src={'/icons/firstox-studio.png'} width={153} height={59} draggable={false} alt={"Frist'OX Studio"} className='md:h-full w-auto object-contain pointer-events-none' />
          </Link>
          <div className='flex md:gap-8'>
            <Link href={'/'}>
              <FaInstagram size={28}/>
            </Link>
            <Link href={'/'}>
              <FaTiktok size={28} />
            </Link>
            <Link href={'/'}>
              <FaTwitter size={28} />
            </Link>
            <Link href={'/'}>
              <FaFacebook size={28} />
            </Link>
          </div>
          <span className='custom-text2 text-foreground'>{contents.copyright}</span>
        </div>
        <div className='w-full flex flex-col justify-start items-start md:gap-10'>
          {
            contents.footerLinks.slice(0,4).map((link, index) => (
              <Link key={index} href={link.link} className='custom-display2 text-foreground'>
                {link.text}
              </Link>
            ))
          }
        </div>
        <div className='w-full flex flex-col justify-start items-start md:gap-10'>
          {
            contents.footerLinks.slice(4,8).map((link, index) => (
              <Link key={index} href={link.link} className='custom-display2 text-foreground'>
                {link.text}
              </Link>
            ))
          }
        </div>
    </div>
  )
}

export default Footer