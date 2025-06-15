"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ForgotPass = () => {

    const [email, setEmail] = useState<string>('')
    const [step, setStep] = useState<number>(0)
    const [code, setCode] = useState<string | undefined>(undefined)
    const [pass, setPass] = useState<string>('')
    const [confirmPass, setConfirmPass] = useState<string>('')
    const [spin, setSpin] = useState<boolean>(false)
    const [popup, setPopup] = useState<boolean>(false)

    const getCode = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSpin(true);
        const res = await fetch('/api/auth/forgot-pass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
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
            setStep(1);
        }
    }

    const isValidCode = (code: string): boolean => {
        return /^\d{6}$/.test(code);
    };

    const verifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSpin(true)

        if(!code){
            alert("Enter verification code");
            return;
        }

        if(!isValidCode(code)){
            alert("Enter valid verification code")
            return;
        }

        const res = await fetch('/api/auth/forgot-pass-verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, code: code }),
        })

        if (res.status === 401) {
            setSpin(false);
            toast.error('Invalid Code!',
                {
                    position: "top-center"
                }
            )
        }

        if (res.status === 200) {
            setSpin(false);
            setStep(2);
        }
    }

    const resetPass = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSpin(true)

        if (pass !== confirmPass) {
            alert("Passwords don't match");
            return;
        }

        if (pass.length<8) {
            alert("Password is too short")
            return;
        }

        const res = await fetch('/api/auth/forgot-pass-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: pass }),
        })

        if (res.status === 401) {
            setSpin(false);
            toast.error('Invalid Code!',
                {
                    position: "top-center"
                }
            )
        }

        if (res.status === 200) {
            setSpin(false);
            setStep(0);
            setPopup(true);
        }
    }

    return (
        <div className='w-full flex items-center justify-start md:px-32 md:py-10 md:gap-10'>
            <div className='flex flex-col justify-center items-center md:w-full md:px-10 md:gap-10'>
                <div className='flex w-full flex-col items-center justify-center md:gap-[10px]'>
                    <h4 className='custom-heading text-tertiary'>Forgot Password</h4>
                    <h4 className='custom-text2 text-foreground'>Reset your password</h4>
                </div>

                {(() => {
                    switch (step) {
                        case 1:
                            return (
                                <form className='flex flex-col max-w-96 md:w-96 items-center justify-center md:gap-5' onSubmit={(e) => verifyCode(e)}>
                                    <div className='flex flex-col w-full items-center justify-center md:gap-[10px]'>
                                        <div className='w-full flex justify-start items-center'>
                                            <IconButton
                                                onClick={() => setStep(0)}
                                                sx={{
                                                    border: '1px solid #ccc',
                                                    borderRadius: '8px',
                                                    width: '40px',
                                                    height: '40px',
                                                    color: 'black',
                                                }}
                                            >
                                                <ArrowBackIcon />
                                            </IconButton>
                                            <label htmlFor='code' className='custom-display2 w-full text-center text-foreground'>
                                                Enter Verification Code
                                            </label>
                                        </div>
                                        <InputOTP maxLength={6} value={code} onChange={(value) => setCode(value)}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>

                                    <div className='w-full flex justify-end items-center'>
                                        <Link href="/signin" className='text-right text-tertiary custom-text1'>Sign In</Link>
                                    </div>

                                    <button
                                        type='submit'
                                        className='w-full p-[10px] bg-primary text-background rounded-[10px] custom-display2 flex justify-center items-center cursor-pointer'
                                    >
                                        {
                                            spin ? (
                                                <div className="w-6 h-6 border-4 border-background border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                "Verify Code"
                                            )
                                        }
                                    </button>
                                </form>
                            )
                        case 2:
                            return (
                                <form className='flex flex-col max-w-96 md:w-96 items-center justify-center md:gap-5' onSubmit={(e) => resetPass(e)}>
                                    <div className='flex flex-col w-full items-center justify-center md:gap-[10px]'>
                                        <label htmlFor='email' className='custom-display2 w-full text-left text-foreground'>Enter New Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            value={pass}
                                            onChange={(e) => setPass(e.target.value)}
                                            className="p-[10px] md:w-full bg-transparent border border-foreground rounded-[10px] placeholder:text-foreground placeholder:custom-text2 text-foreground custom-text2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            placeholder="Enter new password"
                                        />
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPass}
                                            onChange={(e) => setConfirmPass(e.target.value)}
                                            className="p-[10px] md:w-full bg-transparent border border-foreground rounded-[10px] placeholder:text-foreground placeholder:custom-text2 text-foreground custom-text2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                    {/* <div className='flex flex-col w-full items-center justify-center md:gap-[10px]'>
                                        <label htmlFor='email' className='custom-display2 w-full text-left text-foreground'></label>
                                        <input
                                            id="email"
                                            type="text"
                                            value={pass}
                                            onChange={(e) => setPass(e.target.value)}
                                            className="p-[10px] md:w-full bg-transparent border border-foreground rounded-[10px] placeholder:text-foreground placeholder:custom-text2 text-foreground custom-text2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            placeholder="Enter password"
                                        />
                                    </div> */}
                                    <div className='w-full flex justify-end items-center'><Link href="/signin" className='text-right text-tertiary custom-text1'>Sign In</Link></div>
                                    <button type='submit' className='w-full p-[10px] bg-primary text-background rounded-[10px] custom-display2 flex justify-center items-center cursor-pointer'>
                                        {
                                            spin ?
                                                <div className="w-6 h-6 border-4 border-background border-t-transparent rounded-full animate-spin"></div>
                                                :
                                                "Change Password"
                                        }
                                    </button>
                                </form>
                            )
                        default:
                            return (
                                <form className='flex flex-col max-w-96 md:w-96 items-center justify-center md:gap-5' onSubmit={(e) => getCode(e)}>
                                    <div className='flex flex-col w-full items-center justify-center md:gap-[10px]'>
                                        <label htmlFor='email' className='custom-display2 w-full text-left text-foreground'>Enter email address</label>
                                        <input
                                            id="email"
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="p-[10px] md:w-full bg-transparent border border-foreground rounded-[10px] placeholder:text-foreground placeholder:custom-text2 text-foreground custom-text2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            placeholder="Enter email"
                                        />
                                    </div>
                                    {/* <div className='flex flex-col w-full items-center justify-center md:gap-[10px]'>
                                        <label htmlFor='email' className='custom-display2 w-full text-left text-foreground'></label>
                                        <input
                                            id="email"
                                            type="text"
                                            value={pass}
                                            onChange={(e) => setPass(e.target.value)}
                                            className="p-[10px] md:w-full bg-transparent border border-foreground rounded-[10px] placeholder:text-foreground placeholder:custom-text2 text-foreground custom-text2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            placeholder="Enter password"
                                        />
                                    </div> */}
                                    <div className='w-full flex justify-end items-center'><Link href="/signin" className='text-right text-tertiary custom-text1'>Sign In</Link></div>
                                    <button type='submit' className='w-full p-[10px] bg-primary text-background rounded-[10px] custom-display2 flex justify-center items-center cursor-pointer'>
                                        {
                                            spin ?
                                                <div className="w-6 h-6 border-4 border-background border-t-transparent rounded-full animate-spin"></div>
                                                :
                                                "Get Verification Code"
                                        }
                                    </button>
                                </form>
                            )
                    }
                })()}

                <div className='flex justify-center items-center md:gap-2 w-full'>
                    <span className="custom-text2 text-foreground">Don&apos;t have an account?</span>
                    <Link href="/signup" className='text-primary custom-text1'>Sign Up</Link>
                </div>
            </div>
            <div className='bg-primary rounded-[40px] flex justify-center items-center md:h-[520px] md:w-full md:px-10'>

            </div>
            {
                popup &&
                <div className='absolute top-0 left-0 w-full h-screen flex justify-center items-center backdrop-blur-[4px]'>
                <div className='md:h-[400px] md:w-[600px] flex flex-col justify-center items-center md:gap-20 bg-foreground rounded-3xl md:p-20'>
                    <h5 className='text-background text-center'>Password was successfully changed</h5>
                    <Link href={'/signin'} className='font-black text-background hover:underline'>Go to Login</Link>
                </div>
                </div>
            }
        </div>
    )
}

export default ForgotPass