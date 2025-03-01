import { NextResponse } from "next/server";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";
import connectDB from "@/lib/mongodb";
import Visit from "@/lib/models/visit"; // Fixed import

export async function GET() {
  await connectDB();

  try {
    // Define the date range (last 6 months)
    const endDate = endOfMonth(new Date());
    const startDate = startOfMonth(subMonths(endDate, 5));

    // Aggregate visits data by month
    const results = await Visit.aggregate([
      {
        $match: {
          page: "/",
          visitTime: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { $month: "$visitTime" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Month mapping
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    // Generate an empty structure with visits: 0
    const chartData = Array.from({ length: 6 }, (_, i) => {
      const monthIndex = (startDate.getMonth() + i) % 12;
      return { month: monthNames[monthIndex], visits: 0 };
    });

    // Fill in available data
    results.forEach(({ _id, count }) => {
      const index = chartData.findIndex((item) => item.month === monthNames[_id - 1]);
      if (index !== -1) chartData[index].visits = count;
    });

    // Calculate percentage increase/decrease
    const currentMonthVisits = chartData[5]?.visits || 0;
    const previousMonthVisits = chartData[4]?.visits || 0;

    let trending = 0;
    let up = false;

    if (previousMonthVisits > 0) {
      trending = ((currentMonthVisits - previousMonthVisits) / previousMonthVisits) * 100;
      up = trending > 0;
    }

    return NextResponse.json({
      startMonth: startDate.getMonth() + 1,
      endMonth: endDate.getMonth() + 1,
      chartData,
      trending: parseFloat(trending.toFixed(2)), // Limit to 2 decimal places
      up,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
