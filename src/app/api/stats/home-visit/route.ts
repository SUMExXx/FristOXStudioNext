import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Visit from '@/lib/models/visit';

export async function POST(req: Request) {
  try {

    await connectDB();

    const { page, referrer, ipAddress } = await req.json();

    if (!page || !ipAddress) {
      return NextResponse.json({ error: 'Page and IP Address are required' }, { status: 400 });
    }

    const newVisit = await Visit.create({
      visitTime: new Date(),
      page,
      referrer,
      ipAddress
    });

    return NextResponse.json({ success: true, data: newVisit }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
