import { NextResponse } from "next/server";
import { addDays, subMonths, format } from "date-fns";
import connectDB from "@/lib/mongodb";
import Visit from "@/lib/models/visit";

export async function GET() {
  await connectDB();

  try {
    // Define the date range (exactly 3 months ago from today)
    const endDate = new Date(); // Today
    const startDate = subMonths(endDate, 3); // 3 months ago

    // Aggregate visits data by date
    const results = await Visit.aggregate([
      {
        $match: {
          page: "/",
          visitTime: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$visitTime" },
            month: { $month: "$visitTime" },
            day: { $dayOfMonth: "$visitTime" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    // Generate a list of all dates within the last 3 months
    const chartData: { date: string; visits: number }[] = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      chartData.push({ date: format(currentDate, "yyyy-MM-dd"), visits: 0 });
      currentDate = addDays(currentDate, 1);
    }

    // Fill in available data
    results.forEach(({ _id, count }) => {
      const date = format(new Date(_id.year, _id.month - 1, _id.day), "yyyy-MM-dd");
      const index = chartData.findIndex((item) => item.date === date);
      if (index !== -1) chartData[index].visits = count;
    });

    // Calculate percentage increase/decrease based on the last day vs previous day
    const lastIndex = chartData.length - 1;
    const prevIndex = lastIndex - 1;

    const currentDayVisits = chartData[lastIndex]?.visits || 0;
    const previousDayVisits = chartData[prevIndex]?.visits || 0;

    let trending = 0;
    let up = false;

    if (previousDayVisits > 0) {
      trending = ((currentDayVisits - previousDayVisits) / previousDayVisits) * 100;
      up = trending > 0;
    }

    return NextResponse.json({
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      chartData,
      trending: parseFloat(trending.toFixed(2)), // Limit to 2 decimal places
      up,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
