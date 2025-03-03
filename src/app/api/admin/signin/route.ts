import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import connectDB from '@/lib/mongodb';
import Admin from '@/lib/models/admin';

const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!);
const JWT_EXPIRATION = 7 * 24 * 60 * 60; // 7 days in seconds

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectDB();

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    // Compare passwords
    // const isMatch = await bcrypt.compare(password, admin.password);
    const isMatch = password == admin.password
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    // Generate JWT token using `jose`
    const token = await new SignJWT({ adminId: admin._id.toString(), email: admin.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(`${JWT_EXPIRATION}s`)
      .sign(JWT_SECRET_KEY);

    const response = NextResponse.json({ message: 'Admin login successful' }, { status: 200 });

    response.cookies.set('admin_token', token, {
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
