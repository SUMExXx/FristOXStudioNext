import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/models/user';
import getEmail from '@/lib/utils/getEmail';
import connectDB from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = body.token;

    await connectDB();

    if (!token) {
      return NextResponse.json({ value: false, error: 'Token missing' }, { status: 400 });
    }

    const email = await getEmail(token);
    if (!email) {
      return NextResponse.json({ value: false, error: 'Invalid token' }, { status: 401 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ value: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ value: true });
  } catch (error) {
    console.error('❌ Plan verification failed:', error);
    return NextResponse.json({ value: false, error: 'Server error' }, { status: 500 });
  }
}
