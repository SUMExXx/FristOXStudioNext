"use client"
import React from 'react'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { securePaymentFetch } from '@/lib/utils/securePaymentFetch';

const PremiumCheckoutDodo = ({token} : {token : string}) => {

    const [email, setEmail] = useState<string | null>(null);
    const [total, setTotal] = useState<number>(0);
    const ADDITIONAL_COST = 1.00;
    const [isProcessing, setIsProcessing] = useState(false);
    const [dodoError, setDodoError] = useState("");

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

    useEffect(() => {
        // setTotal(0 + SHIPPING_COST);
        setTotal(0 + ADDITIONAL_COST);
        fetchEmail(token);
    }, []);

    const createOrder = async () => {
        if (!email) {
            console.error("Email is not set");
            return;
        }

        setIsProcessing(true);
        setDodoError("");

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
            setDodoError("An error occurred while processing your payment. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className='w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center'>
            <div className="h-full flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md p-6 bg-white rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Checkout</h2>
                    <button onClick={createOrder} className='cursor-pointer'>
                        Buy Product
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PremiumCheckoutDodo