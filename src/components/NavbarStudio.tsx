import React from 'react';

import Link from 'next/link';
import { navbarLinks, contents, socials, website } from '@/data/website';

// import Menu from '@mui/icons-material/Menu';
import Logo from '@/components/Logo';
import Image from 'next/image';
// import HamburgerMenu from './HamburgerMenu';

// import Menu from './Menu';

const NavbarStudio = () => {



  return (
    <nav className='z-50 flex w-full fixed top-0 justify-between md:h-[80px] h-[60px] bg-grey md:px-20 p-[10px] bg-background border-b-[1px] border-primary' id='navbar_container'>
        
        <Link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || '/'} className='flex items-center gap-2 md:gap-4 outline-none'>
            <div className='flex items-center md:gap-[10px]'>
                <Image src={'/icons/fristox-studio.png'} width={121} height={40} draggable={false} alt={"Frist'OX Studio"} className='md:w-[121px] md:h-[40px] w-[235px] h-[30px]'></Image>
                {/* <Logo className='md:w-[235px] md:h-[30px] w-[235px] h-[20px]' fontSize='inherit' height={30} width={235}/> */}
            </div>
        </Link>

        
        {/* <ul className='items-center md:gap-[40px] gap-2 font-medium lg:flex hidden'>
            {
                navbarLinks.map(item => (
                    <li key={crypto.randomUUID()} className='transition ease-in-out hover:animate-text hover:text-[#F00000]'>
                        <Link rel="canonical" className='md:text-[16px] font-medium text-neonGreen' href={item.link}>{item.text}</Link>
                    </li>
                ))
            }
        </ul> */}

        <div className='flex justify-center items-center gap-[20px]'>
            <ul className='items-center md:gap-[20px] gap-[10px] flex'>
                {/* <li className='flex justify-center items-center transition ease-in-out hover:animate-text hover:text-[#F00000]'>
                    <Link rel="canonical" target='_blank' className='md:p-[10px] p-[6px] flex justify-center items-center rounded-full bg-violet outline md:outline-4 outline-2 outline-lightViolet md:-outline-offset-4 -outline-offset-2' href={socials.linkedin}>
                        <LinkedInIcon className='md:h-[24px] md:w-[24px] h-[16px] w-[16px]' sx={{color: 'white'}}/>
                    </Link>
                </li>
                <li className='flex justify-center items-center transition ease-in-out hover:animate-text hover:text-[#F00000]'>
                    <Link rel="canonical" target='_blank' className='md:p-[10px] p-[6px] flex justify-center items-center rounded-full bg-violet outline md:outline-4 outline-2 outline-lightViolet md:-outline-offset-4 -outline-offset-2' href={socials.instagram}>
                        <InstagramIcon className='md:h-[24px] md:w-[24px] h-[16px] w-[16px]' sx={{color: 'white'}}/>
                    </Link>
                </li>
                <li className='flex justify-center items-center transition ease-in-out hover:animate-text hover:text-[#F00000]'>
                    <Link rel="canonical" target='_blank' className='md:p-[10px] p-[6px] flex justify-center items-center rounded-full bg-violet outline md:outline-4 outline-2 outline-lightViolet md:-outline-offset-4 -outline-offset-2' href={socials.github}>
                        <GitHubIcon className='md:h-[24px] md:w-[24px] h-[16px] w-[16px]' sx={{color: 'white'}}/>
                    </Link>
                </li> */}
                
                
            </ul>
            <div className='flex justify-center items-center md:hidden' title='hamburgerMenu'>
                {/* <HamburgerMenu/> */}
            </div>
            
        </div>
        
    </nav>
  )
}

export default NavbarStudio