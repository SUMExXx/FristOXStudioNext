"use client";
import { contents } from '@/data/website'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function SignInHero() {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [spin, setSpin] = useState(false)
  
  const router = useRouter()

  const submit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSpin(true);
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: pass }),
    })

    if(res.status === 401){
      setSpin(false);
      toast.error('Invalid Credentials!',
        {
          position: "top-center"
        }
      )
    }
    
    if(res.status === 200){
      setSpin(false);
      toast.success('🎉 Successfully Signed In!',
        {
          position: "top-center"
        }
      )
      setTimeout(() => {
        router.push('/studio');
      }, 3000);
    }
  }

  return (
    <div className='w-full flex items-center justify-start md:px-32 md:py-10 md:gap-10'>
        <div className='flex flex-col justify-center items-center md:w-full md:px-10 md:gap-10'>
          <div className='flex w-full flex-col items-center justify-center md:gap-[10px]'>
            <h4 className='custom-heading text-tertiary'>{contents.text13}</h4>
            <h4 className='custom-text2 text-foreground'>{contents.text14}</h4>
          </div>
          <form className='flex flex-col max-w-96 md:w-96 items-center justify-center md:gap-5' onSubmit={(e) => submit(e)}>
            <div className='flex flex-col w-full items-center justify-center md:gap-[10px]'>
              <label htmlFor='email' className='custom-display2 w-full text-left text-foreground'>{contents.text15}</label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-[10px] md:w-full bg-transparent border border-foreground rounded-[10px] placeholder:text-foreground placeholder:custom-text2 text-foreground custom-text2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter email"
              />
            </div>
            <div className='flex flex-col w-full items-center justify-center md:gap-[10px]'>
              <label htmlFor='email' className='custom-display2 w-full text-left text-foreground'>{contents.text16}</label>
              <input
                id="email"
                type="text"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="p-[10px] md:w-full bg-transparent border border-foreground rounded-[10px] placeholder:text-foreground placeholder:custom-text2 text-foreground custom-text2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter password"
              />
            </div>
            <Link href="/forgot" className='w-full text-right text-tertiary custom-text1'>{contents.text17}</Link>
            <button type='submit' className='w-full p-[10px] bg-primary text-background rounded-[10px] custom-display2 flex justify-center items-center'>
              {
                spin? 
                <div className="w-6 h-6 border-4 border-background border-t-transparent rounded-full animate-spin"></div>
                :
                contents.text18
              }
            </button>
          </form>
          <div className='flex justify-center items-center md:gap-2 w-full'>
            <span className="custom-text2 text-foreground">{contents.text19}</span>
            <Link href="/signup" className='text-primary custom-text1'>{contents.text20}</Link>
          </div>
        </div>
        <div className='bg-primary rounded-[40px] flex justify-center items-center md:h-[520px] md:w-full md:px-10'>
            
        </div>
    </div>
  )
}

export default SignInHero