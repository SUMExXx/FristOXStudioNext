import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/lib/models/user';
import getEmail from '@/lib/utils/getEmail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = body.token;

    if (!token) {
      return NextResponse.json({ success: false, error: 'Token missing' }, { status: 400 });
    }

    const email = await getEmail(token);
    if (!email) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }

    // Ensure DB connection
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const hasValidPlan = user.plan === 'premium' || user.plan === 'enterprise';

    return NextResponse.json({ success: true, plan: user.plan, valid: hasValidPlan });
  } catch (error) {
    console.error('❌ Plan verification failed:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
