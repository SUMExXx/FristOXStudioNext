"use client";
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { navbarLinks, contents, socials, website } from '@/data/website';

// import Menu from '@mui/icons-material/Menu';
import Logo from '@/components/Logo';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { IoPersonSharp } from "react-icons/io5";
// import HamburgerMenu from './HamburgerMenu';

// import Menu from './Menu';

const NavbarStudio = () => {

    const [style, setStyle] = useState(0);

    const path = usePathname();

    useEffect(() => {
        switch (path) {
            case '/studio/3D':
                setStyle(0)
                break;
            case '/studio/2D':
                setStyle(1)
                break;
            default:
                setStyle(0)
                break;
        }
    }, [path])

    return (
        <nav className='z-50 flex w-full fixed top-0 justify-between md:h-[80px] h-[60px] bg-grey md:px-20 bg-background border-b-[1px] border-primary' id='navbar_container'>
            
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

            <div className='flex w-full h-full justify-end items-center gap-[20px]'>
                <Link href={"/studio/3D"} className={`md:px-[20px] h-full border-b-4 ${style == 0? "border-b-primary": "border-b-background"} flex justify-center items-center`}>
                    3D Design
                </Link>
                <Link href={"/studio/2D"} className={`md:px-[20px] h-full border-b-4 ${style == 1? "border-b-primary": "border-b-background"} flex justify-center items-center`}>
                    2D Design
                </Link>
                <Link href={"/studio/upgrade"} rel="canonical" className='md:h-10 px-10 rounded-full flex justify-center items-center outline md:outline-1 outline-primary md:-outline-offset-1 -outline-offset-1 bg-primary md:text-[16px] text-[12px] custom-display2 text-background'>
                    UPGRADE
                </Link>
                <button className='flex justify-center items-center h-[40px] w-[40px] bg-primary rounded-full' title='menu'>
                    <IoPersonSharp size={24} fill='#000000'/>
                </button>
                <div className='flex justify-center items-center md:hidden' title='hamburgerMenu'>
                    {/* <HamburgerMenu/> */}
                </div>
                
            </div>
            
        </nav>
    )
}

export default NavbarStudio