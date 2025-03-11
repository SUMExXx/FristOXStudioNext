import { NextResponse } from 'next/server';
import Affiliate from '@/lib/models/affiliate';
import connectDB from '@/lib/mongodb';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const referrer = body.referrer;

        if (!referrer) {
            return NextResponse.json({ error: 'Username is required' }, { status: 400 });
        }

        await connectDB(); // Ensure database connection

        const updatedAffiliate = await Affiliate.findOneAndUpdate(
            { username: referrer },
            { $inc: { total_refers: 1 } },
            { new: true }
        );

        if (!updatedAffiliate) {
            return NextResponse.json({ error: 'Affiliate not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Total refers increased', data: updatedAffiliate });
    } catch (error) {
        console.error('Error updating total_refers:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
