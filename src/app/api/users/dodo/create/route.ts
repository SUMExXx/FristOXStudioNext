import dodo from "@/lib/dodo";
import TempOrder from "@/lib/models/tempOrder";
import connectDB from "@/lib/mongodb";
// import { CountryCode } from "dodopayments/resources/misc.mjs";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {

    // const subs = await dodo.subscriptions.list()

    // console.log(subs)

    await connectDB();

    try {
        const {name, email, city, country, state, street, zipcode} = await req.json();

        const code = uuidv4();

        const subscription = await dodo.subscriptions.create({
            billing: { 
                city: city, 
                country: country, 
                state: state, 
                street: street, 
                zipcode: zipcode
            },
            customer: { 
                email: email,
                name: name
            },
            payment_link: true,
            return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
            product_id: process.env.DODO_SUBSCRIPTION_PRODUCT_ID!,
            quantity: 1,
        });

        await TempOrder.findOneAndDelete({ email: email });

        const tempOrder = new TempOrder({
            email: email,
            code: code,
            paymentId: subscription.payment_id,
        });

        await tempOrder.save()

        return NextResponse.json({ paymentLink: subscription.payment_link });
        
    } catch (err) {
        console.error("Payment link creation failed", err);
        return NextResponse.json(
        {
            error: err instanceof Error ? err.message : "An unknown error occurred",
        },
        { status: 500 }
        );
    }
}