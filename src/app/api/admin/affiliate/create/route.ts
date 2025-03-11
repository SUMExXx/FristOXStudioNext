import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Affiliate from '@/lib/models/affiliate';

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const newAffiliate = new Affiliate({
      username,
      password
    });

    await newAffiliate.save();

    return NextResponse.json({ message: 'Affiliate created successfully', affiliate: newAffiliate });
  } catch (error) {
    console.error('Error creating affiliate:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}