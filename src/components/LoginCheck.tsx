"use client"

import { contents } from '@/data/website'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const LoginCheck = (
    {
        token
    }: {
        token: string | null
    }
) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const verifyToken = async () => {
        if (!token) return
        try {
            const res = await fetch('/api/users/verify-jwt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
            })
            if (res.ok) {
                const data = await res.json()
                setIsLoggedIn(data.value)
            }
        } catch (err) {
            console.error('JWT verification failed', err)
        }
    }

    useEffect(() => {
        verifyToken()
    }, [token])

    return (
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
    )
}

export default LoginCheck