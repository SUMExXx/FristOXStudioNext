import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import connectDB from '@/lib/mongodb';
import Affiliate from '@/lib/models/affiliate';

const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!);
const JWT_EXPIRATION = 7 * 24 * 60 * 60; // 7 days in seconds

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    await connectDB();

    // Check if admin exists
    const affiliate = await Affiliate.findOne({ username });
    if (!affiliate) {
      return NextResponse.json({ error: 'Invalid affiliate credentials' }, { status: 401 });
    }

    // Compare passwords
    // const isMatch = await bcrypt.compare(password, admin.password);
    const isMatch = password == affiliate.password
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid affiliate credentials' }, { status: 401 });
    }

    // Generate JWT token using `jose`
    const token = await new SignJWT({ adminId: affiliate._id.toString(), username: affiliate.username })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(`${JWT_EXPIRATION}s`)
      .sign(JWT_SECRET_KEY);

    const response = NextResponse.json({ message: 'Admin login successful' }, { status: 200 });

    response.cookies.set('affiliate_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure in production
      maxAge: JWT_EXPIRATION,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Error during admin login:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}