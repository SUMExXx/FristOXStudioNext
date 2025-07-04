import React from 'react';

import Link from 'next/link';
import { cookies } from 'next/headers'

// import Menu from '@mui/icons-material/Menu';
import Image from 'next/image';
import { contents } from '@/lib/data/website';
// import HamburgerMenu from './HamburgerMenu';

// import Menu from './Menu';

const Navbar = async () => {

    const cookie = await cookies()
    const token = cookie.get('token')?.value || null

    let isLoggedIn = false

    const verifyToken = async () => {
        if (!token) return
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/verify-jwt`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            })
            if (res.ok) {
                const data = await res.json()
                isLoggedIn = data.value
            }
        } catch (err) {
            console.error('JWT verification failed', err)
        }
    }

    await verifyToken()

    return (
        <nav className='z-50 flex w-full fixed top-0 justify-between md:h-[80px] h-[60px] bg-grey md:px-20 p-[10px] bg-background border-b-[1px] border-primary' id='navbar_container'>
            
            <Link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || '/'} className='flex items-center gap-2 md:gap-4 outline-none'>
                <div className='flex items-center md:gap-[10px] h-full'>
                    <Image src={'/icons/firstox-studio.png'} width={737} height={286} draggable={false} alt={"Frist'OX Studio"} className='md:h-full w-auto object-contain pointer-events-none'/>
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
                    <Link
                        rel='canonical'
                        className='md:h-10 px-10 rounded-full flex justify-center items-center bg-primary custom-display2'
                        href='mailto:izaz@firstox.com'
                    >
                        <span className='md:text-[16px] text-[12px] custom-display2 text-background'>Talk to founder</span>
                    </Link>
                    <div className='items-center md:gap-[20px] gap-[10px] flex'>
                        {isLoggedIn ? (
                            <Link
                                rel='canonical'
                                className='md:h-10 px-10 rounded-full flex justify-center items-center bg-primary custom-display2'
                                href='/studio/'
                            >
                                <span className='md:text-[16px] text-[12px] custom-display2 text-background'>Go to Studio</span>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    rel='canonical'
                                    className='md:h-10 px-10 rounded-full flex justify-center items-center font-michroma outline md:outline-1 outline-primary md:-outline-offset-1 -outline-offset-1'
                                    href='/signin'
                                >
                                    <span className='md:text-[16px] text-[12px] custom-display2 text-foreground'>{contents.login}</span>
                                </Link>
                                <Link
                                    rel='canonical'
                                    className='md:h-10 px-10 rounded-full flex justify-center items-center bg-primary custom-display2'
                                    href='/signup'
                                >
                                    <span className='md:text-[16px] text-[12px] custom-display2 text-background'>{contents.signup}</span>
                                </Link>
                            </>
                        )}
                    </div>
                    
                </ul>
                <div className='flex justify-center items-center md:hidden' title='hamburgerMenu'>
                    {/* <HamburgerMenu/> */}
                </div>
                
            </div>
            
        </nav>
    )
}

export default Navbar