import { NextResponse } from "next/server";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";
import connectDB from "@/lib/mongodb";
import Visit from "@/lib/models/visit";

export async function GET() {
  await connectDB();

  try {
    // Define the date range (last 6 months)
    const endDate = endOfMonth(new Date());
    const startDate = startOfMonth(subMonths(endDate, 5));

    // Aggregate visits data by page
    const results = await Visit.aggregate([
      {
        $match: {
          visitTime: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: "$page",
          visits: { $sum: 1 },
        },
      },
      { $sort: { visits: -1 } }, // Sort by highest visits
    ]);

    // Predefined colors to be used in cycle
    const colors = [
      "var(--color-chrome)",
      "var(--color-safari)",
      "var(--color-firefox)",
      "var(--color-edge)",
      "var(--color-other)",
    ];

    // Generate formatted chart data with cyclic colors
    const chartData = results.map(({ _id, visits }, index) => ({
      browser: _id, // Mapping "browser" to "page"
      visitors: visits, // Mapping "visitors" to "visits"
      fill: colors[index % colors.length], // Cycle through colors
    }));

    return NextResponse.json({
      startMonth: startDate.getMonth() + 1,
      endMonth: endDate.getMonth() + 1,
      chartData,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

