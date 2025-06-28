'use client';
import { redirect } from 'next/navigation';
import React from 'react'

const LogOutButton = () => {

    const logout = async () => {
        await fetch('/api/users/logout', {
            method: 'POST',
        }).then(() =>
            redirect('/')
        )
    }

    return (
        <button type='button' onClick={() => logout()} rel="canonical" className='w-full cursor-pointer md:h-10 px-10 rounded-full flex justify-center items-center bg-red-600 md:text-[16px] text-[12px] custom-display2 text-background'>
            <span>Logout</span>
        </button>
    )
}

export default LogOutButton