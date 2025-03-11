
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Affiliate from '@/lib/models/affiliate';

export async function GET(req: Request) {
  try {
    await connectDB();

    // const { searchParams } = new URL(req.url);
    // const email = searchParams.get('email');
    // const token = searchParams.get('token');

    // if (!email || !token) {
    //   return NextResponse.json({ error: 'Invalid or missing parameters' }, { status: 400 });
    // }

    // Find the user in unverified users collection
    const affiliates = await Affiliate.find({});
    
    if (!affiliates) {
      return NextResponse.json({ error: 'Invalid' }, { status: 400 });
    }

    return NextResponse.json(affiliates);
  } catch (error) {
    console.error('Verification Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}