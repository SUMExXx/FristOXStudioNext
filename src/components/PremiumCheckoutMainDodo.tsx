"use client"
import React from 'react'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { securePaymentFetch } from '@/lib/utils/securePaymentFetch';

const PremiumCheckoutMainDodo = ({token} : {token : string}) => {

    const [email, setEmail] = useState<string | null>(null);
    const router = useRouter();
    const [total, setTotal] = useState<number>(0);
    const ADDITIONAL_COST = 1.00;
    const [isProcessing, setIsProcessing] = useState(false);
    const [paypalError, setPaypalError] = useState("");

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

    const createOrder = (data: any, actions: any) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                    value: total.toFixed(2),
                    currency_code: 'USD'
                    },
                    description: `Farm Market Order`,
                }
            ],
        });
    };

    return (
        <div className='w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center'>
            <div className="h-full flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md p-6 bg-white rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Checkout</h2>
                    <button
                        onClick={() => {
                            (window as any).openPocketsflowCheckout({
                                type: "subscription",
                                subscriptionId: "683b04327a8d84f8df0d73bb",
                                subdomain: "sumexxx",
                                isDarkMode: true,
                                metadata: {}, // webhook metadata
                                onSuccess: (data: any) => {
                                    // Success callback - called immediately after payment
                                    console.log("Payment successful:", data);
                                    // data contains: email, firstName, lastName, paymentIntentId, and payment intent data
                                }
                            });
                        }}
                    >
                        Buy Product
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PremiumCheckoutMainDodo