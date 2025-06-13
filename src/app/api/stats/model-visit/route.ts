import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ModelVisit from '@/lib/models/modelVisit';

export async function POST(req: Request) {
  try {

    await connectDB();

    const { objectModel, ipAddress } = await req.json();

    if (!objectModel || !ipAddress) {
      return NextResponse.json({ error: 'Page and IP Address are required' }, { status: 400 });
    }

    const newVisit = await ModelVisit.create({
      visitTime: new Date(),
      objectModel,
      ipAddress
    });

    return NextResponse.json({ success: true, data: newVisit }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
