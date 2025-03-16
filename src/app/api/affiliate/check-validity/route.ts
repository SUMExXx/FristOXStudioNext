import { jwtVerify } from "jose";
import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
import connectDB from '@/lib/mongodb';
import Affiliate from '@/lib/models/affiliate';

export async function POST(req: Request) {

    const { username } = await req.json();

  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("affiliate_token")?.value || null;

    if (!token) {
      return NextResponse.json({ error: 'Invalid or missing token' }, { status: 400 });
    }

    // Find the user in unverified users collection
    const affiliate = await Affiliate.findOne({ username });
    
    if (!affiliate) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    if(process.env.JWT_SECRET){
        const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, SECRET_KEY);

        // Extract username
        const verified = payload.username as string == username;

        if(verified){
            return NextResponse.json({ success: 'Verified' }, { status: 200 });
        }
    }

    return NextResponse.json({ error: 'Problem' }, { status: 400 });
  } catch (error) {
    console.error('Verification Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
