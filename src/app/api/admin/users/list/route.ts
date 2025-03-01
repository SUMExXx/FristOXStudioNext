
import { NextResponse } from 'next/server';
import User from '@/lib/models/user';
import connectDB from '@/lib/mongodb';

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
    const users = await User.find({});
    
    if (!users) {
      return NextResponse.json({ error: 'Invalid' }, { status: 400 });
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error('Verification Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}