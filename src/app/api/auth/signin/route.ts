import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';

const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!);
const JWT_EXPIRATION = 7 * 24 * 60 * 60; // 7 days in seconds

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectDB();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Generate JWT token using `jose`
    const token = await new SignJWT({ userId: (user._id as { toString: () => string }).toString(), email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(`${JWT_EXPIRATION}s`)
      .sign(JWT_SECRET_KEY);

    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });
    
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure in production
      maxAge: JWT_EXPIRATION,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

