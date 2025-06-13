import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ModelVisit from "@/lib/models/modelVisit";

const MODELS = [
  'cap',
  'tshirt',
  'tshirtAnimated',
  'oversizedTshirt',
  'beanie',
  'pants'
];

export async function GET() {
  await connectDB();

  try {

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const rawData = await ModelVisit.aggregate([
      {
        $match: {
          visitTime: {
            $gte: startOfMonth,
            $lte: endOfMonth
          }
        }
      },
      {
        $group: {
          _id: '$objectModel',
          visitors: { $sum: 1 }
        }
      }
    ]);

    const countMap: Record<string, number> = {};
    rawData.forEach(({ _id, visitors }) => {
      countMap[_id] = visitors;
    });

    const chartData = MODELS.map((model) => ({
      model,
      visitors: countMap[model] || 0,
      fill: 'var(--color-foreground)'
    }));

    return NextResponse.json(chartData);
  } catch (err) {
    console.error('Error in visit-summary:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

