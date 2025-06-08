"use client"
import React from 'react'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { securePaymentFetch } from '@/lib/utils/securePaymentFetch';

const PremiumCheckoutMainPocketsFlow = ({token} : {token : string}) => {

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

    const onApprove = async (data: any, actions: any) => {
        setIsProcessing(true);
        try {
            const order = await actions.order.get();
            console.log('Payment successful', order);
            
            // Extract payer information from PayPal response
            const payerName = order.payer?.name?.given_name || '';
            // const payerEmail = order.payer?.email_address || '';

            if (!email) {
                throw new Error('Email not found');
            }
            
            const paymentData = {
                name: payerName,
                email: email,
                plan: "premium",
                amount: total.toFixed(2),
                orderID: data.orderID
            };

            const res = await securePaymentFetch(paymentData)

            if (res) {
                console.log('Success');
                alert('Payment processed successfully!');

                router.push('/studio/3D');
            } else {
                throw new Error('Payment processing failed');
            }

        } catch (error) {
            console.error('Payment failed:', error);
            setPaypalError('Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const onError = (err: any) => {
        console.error('PayPal error:', err);
        setPaypalError('An error occurred with PayPal. Please try again.');
    };

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <div className="h-full flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md p-6 bg-white rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Checkout</h2>

                    {paypalError && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
                        {paypalError}
                    </div>
                    )}

                    <PayPalScriptProvider
                    options={{
                        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
                        currency: "USD",
                        intent: "capture",
                    }}
                    >
                    <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                        style={{ layout: "vertical" }}
                        disabled={isProcessing}
                    />
                    
                    </PayPalScriptProvider>
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

export default PremiumCheckoutMainPocketsFlow