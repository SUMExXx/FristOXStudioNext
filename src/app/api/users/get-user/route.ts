import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/lib/models/user';
import getEmail from '@/lib/utils/getEmail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = body.token;

    if (!token) {
      return NextResponse.json({ value: false, error: 'Token missing' }, { status: 400 });
    }

    const email = await getEmail(token);
    if (!email) {
      return NextResponse.json({ value: false, error: 'Invalid token' }, { status: 401 });
    }

    // Ensure DB connection
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ value: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ email: user.email, plan: user.plan });
  } catch (error) {
    console.error('❌ Plan verification failed:', error);
    return NextResponse.json({ value: false, error: 'Server error' }, { status: 500 });
  }
}
