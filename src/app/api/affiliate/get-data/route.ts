
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Affiliate from '@/lib/models/affiliate';

export async function POST(req: Request) {

  const { username } = await req.json();

  try {
    await connectDB();

    const affiliate = await Affiliate.findOne({ username: username}).select("total_refers success_refers");
  
    if (!affiliate) {
      return NextResponse.json({ error: 'Invalid' }, { status: 400 });
    }

    return NextResponse.json(affiliate);
  } catch (error) {
    console.error('Verification Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}