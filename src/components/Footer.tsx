import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { contents } from '@/lib/data/website'

const Footer = () => {
  return (
    <div className='w-full flex justify-center items-start md:px-32 md:pt-10 md:pb-20 relative'>
        <div className='w-full flex flex-col justify-start items-start md:gap-10'>
          <Image src={'/icons/firstox-studio.png'} width={131} height={40} draggable={false} alt={"Frist'OX Studio"} className='brightness-0 dark:brightness-100 md:w-[131px] md:h-[40px] w-[235px] h-[30px]'></Image>
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