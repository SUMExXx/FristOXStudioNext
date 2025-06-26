import { Webhook } from "standardwebhooks";
import { headers } from "next/headers";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";
import TempOrder from "@/lib/models/tempOrder";
import { NextResponse } from "next/server";
// import { WebhookPayload } from "@/types/api-types";

const webhook = new Webhook(process.env.DODO_WEBHOOK_KEY!); // Replace with your secret key generated from the Dodo Payments Dashboard

export async function POST(request: Request) {
  const headersList = await headers();
  const rawBody = await request.text();

  const webhookHeaders = {
    "webhook-id": headersList.get("webhook-id") || "",
    "webhook-signature": headersList.get("webhook-signature") || "",
    "webhook-timestamp": headersList.get("webhook-timestamp") || "",
  };

  await webhook.verify(rawBody, webhookHeaders);
  const payload = JSON.parse(rawBody);

  try {
    switch(payload.type) {
      case 'payment.succeeded':
        await handlePaymentSucceeded(payload);
        return NextResponse.json({ error: 'Email not found in token' }, { status: 200 });
      // case 'subscription.expired':
      //   await handlePaymentSucceeded(payload);
      //   return NextResponse.json({ error: 'Email not found in token' }, { status: 200 });
    }

    return NextResponse.json({ error: 'Unhandled event type' }, { status: 501 });
    
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: 'Email not found in token' }, { status: 400 });
  }
  
  // Process the payload according to your business logic
}

const handlePaymentSucceeded = async (payload: any) => {
  // Implement your logic to handle the payment succeeded event
  // For example, you might want to update the user's subscription status in your database
  await connectDB()
  
  // You can access the payment details from payload.data
  const { payment_id } = payload.data;
  
  const tempOrder = await TempOrder.findOne({ paymentId: payment_id });

  if (tempOrder) {
    // Update the temp order status or perform any other necessary actions
    const user = await User.findOne({ email: tempOrder.email });
    if (user) {
      // Update user's subscription status or any other relevant information
      user.plan = 'premium'; // Example field, adjust as necessary
      await user.save();
    }
    
    // You can also send a confirmation email or perform other actions here
    console.log(`Payment succeeded for order: ${tempOrder.email}`);

    await tempOrder.deleteOne()
  }
}