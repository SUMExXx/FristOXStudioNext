"use client"
import React from 'react'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from '@mui/material';
// import { securePaymentFetch } from '@/lib/utils/securePaymentFetch';

const PremiumCheckoutDodo = ({token} : {token : string}) => {

    const [email, setEmail] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const router = useRouter();

    const fetchEmail = async (token: string) => {
        const res = await fetch('/api/users/get-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });

        if(res.ok) {
            const data = await res.json();
            setEmail(data.email);
        } else {
            console.error('Error fetching email:', res.statusText);
        }
    }

    fetchEmail(token);

    const createOrder = async () => {
        if (!email) {
            console.error("Email is not set");
            return;
        }

        setIsProcessing(true);

        try {
            const res = await fetch('/api/users/dodo/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: "Premium User",
                    email: email,
                    city: "New York",
                    country: "AU",
                    state: "NY",
                    street: "123 Main Street",
                    zipcode: "799045"
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to create order");
            }

            const data = await res.json();
            router.push(data.paymentLink);

        } catch (error) {
            console.error("Error creating order:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className='w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center'>
            <div className="h-full flex items-center justify-center bg-gray-50 px-4">
                <div className="flex flex-col justify-center items-center md:gap-4 rounded-2xl md:p-10 min-w-sm hover:p-12 transition-all duration-300 ease-in-out bg-white shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Checkout</h2>
                    <button type='button' onClick={createOrder} className='cursor-pointer flex w-full md:gap-5 md:px-4 md:h-10 md:py-2 rounded-full justify-center items-center bg-main-foreground hover:scale-110 transition-all duration-300 ease-in-out'>
                        {
                            isProcessing?
                            <CircularProgress className='text-main-background' size={20} color='inherit' />:
                            <span className='text-main-background'>Go for Payment</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PremiumCheckoutDodo