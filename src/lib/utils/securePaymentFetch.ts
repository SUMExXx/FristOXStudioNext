'use server';

export async function securePaymentFetch(paymentData: PaymentProps): Promise<boolean> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/capture-order`, {
        method: 'POST',
        headers: {
        'x-internal-api-key': process.env.INTERNAL_API_KEY!,
        },
        body: JSON.stringify(paymentData),
    });
    
    const data = await res.json();
    return data.success;
}
