import React from 'react';

import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// import Menu from '@mui/icons-material/Menu';
import Image from 'next/image';
import { IoPersonSharp } from "react-icons/io5";
import { cookies} from 'next/headers';
import LogOutButton from '@/components/LogOutButton';
// import HamburgerMenu from './HamburgerMenu';

// import Menu from './Menu';

const NavbarStudio = async (
    {style, upgrade=true}: {style: number | null, upgrade?: boolean}
) => {

    const cookiesData = await cookies();
    
    const token = cookiesData.get('token')?.value;

    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/get-user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    });

    const user = await userResponse.json();

    return (
        <nav className='z-50 flex w-full fixed top-0 justify-between md:h-[80px] h-[60px] bg-grey md:px-20 bg-background border-b-[1px] border-primary' id='navbar_container'>
            
            <Link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || '/'} className='flex items-center gap-2 md:gap-4 outline-none'>
                <div className='flex items-center md:gap-[10px] h-full'>
                    <Image src={'/icons/firstox-studio.png'} width={737} height={286} draggable={false} alt={"Frist'OX Studio"} className='md:h-full w-auto object-contain'/>
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
                {
                    user.plan == 'free' && upgrade &&
                    <Link href={"/studio/upgrade"} rel="canonical" className='md:h-10 px-10 rounded-full flex justify-center items-center outline md:outline-1 outline-primary md:-outline-offset-1 -outline-offset-1 bg-primary md:text-[16px] text-[12px] custom-display2 text-background'>
                        UPGRADE
                    </Link>
                }
                <Popover>
                    <PopoverTrigger asChild>
                        <button className='cursor-pointer flex justify-center items-center h-[40px] w-[40px] bg-foreground rounded-full' title='menu'>
                            <IoPersonSharp size={24} className='text-background'/>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="border-none w-[300px] flex flex-col bg-transparent shadow-none">
                        <div className='md:h-[20px] w-full'/>
                        <div className={`w-full md:top-[40px] rounded-2xl flex flex-col md:gap-4 md:p-4 justify-center items-center bg-background shadow-2xl`}>
                            <span className='w-full text-center text-[14px] md:mt-4'>{user.email}</span>
                            <LogOutButton/>
                        </div>
                    </PopoverContent>
                </Popover>
                <div className='flex justify-center items-center md:hidden' title='hamburgerMenu'>
                    {/* <HamburgerMenu/> */}
                </div>
                
            </div>
            
        </nav>
    )
}

export default NavbarStudio