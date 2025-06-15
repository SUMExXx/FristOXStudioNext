import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';
import ForgotPassMapping from '@/lib/models/forgotPassMapping';

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code are required' }, { status: 400 });
    }

    await connectDB();

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const userForgot = await ForgotPassMapping.findOne({ email });

    if(!userForgot) {
      return NextResponse.json({ error: 'user not found' }, { status: 500 });
    }

    if(userForgot.code == parseInt(code)){
      userForgot.deleteOne()
      return NextResponse.json({ error: 'Verification Code sent' }, { status: 200 });
    }

    return NextResponse.json({ error: 'Verification Code not matched' }, { status: 400 });

  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

