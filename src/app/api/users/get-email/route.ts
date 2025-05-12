import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    // console.log('Token:', token);
    // console.log('JWT_SECRET_KEY length:', JWT_SECRET_KEY.length);

    const { payload } = await jwtVerify(token, JWT_SECRET_KEY, {
      algorithms: ['HS256'],
    });

    if (typeof payload.email === 'string') {
      return NextResponse.json({ email: payload.email });
    } else {
      return NextResponse.json({ error: 'Email not found in token' }, { status: 400 });
    }
  } catch (err) {
    console.error('Invalid or expired token:', err);
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}
