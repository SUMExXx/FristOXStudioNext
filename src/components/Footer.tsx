import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { contents } from '@/data/website'

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';

const Footer = () => {
  return (
    <div className='w-full flex justify-center items-start md:px-20 md:pt-10 md:pb-20 relative'>
        <div className='w-full flex flex-col justify-start items-start md:gap-10'>
          <Image src={'/icons/fristox-studio.png'} width={235} height={30} draggable={false} alt={"Frist'OX Studio"} className='md:w-[235px] md:h-[30px] w-[235px] h-[30px]'></Image>
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