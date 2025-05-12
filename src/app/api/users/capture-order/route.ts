import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get('x-internal-api-key');
    if (apiKey !== process.env.INTERNAL_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized', success: false }, { status: 401 });
    }

    const { email, plan } = await req.json();

    if (!email || !plan) {
      return NextResponse.json({ error: 'Missing fields', success: false }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOneAndUpdate(
      { email },
      { plan },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found', success: false }, { status: 404 });
    }

    return NextResponse.json({ message: 'Plan updated', success: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error', success: false }, { status: 500 });
  }
}
