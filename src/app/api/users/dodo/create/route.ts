import dodo from "@/lib/dodo";
import { CountryCode } from "dodopayments/resources/misc.mjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const subs = await dodo.subscriptions.list()

    console.log(subs)

    try {
        const {name, email, city, country, state, street, zipcode} = await req.json();

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
            product_id: 'sub_qm9HBZPCSR5yI4Dzx6geS',
            quantity: 1,
        });

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