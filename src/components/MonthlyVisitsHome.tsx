"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const chartConfig = {
  visits: {
    label: "Visits",
    color: "hsl(var(--chart-1))",
  }
} satisfies ChartConfig

interface VisitData {
    month: "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
    visits: number
}

interface VisitFullData {
    startMonth: number,
    endMonth: number,
    chartData: VisitData[]
    trending: number,
    up: boolean
}

function getMonthName(monthNumber: number): string {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  return months[monthNumber - 1] || "Invalid Month"; // Adjusting 1-based index
}

export function MonthlyVisitsHome() {

    const [data, setData] = useState<VisitFullData>()
    const [initLoad, setInit] = useState(true)

    const getData = async () => {
        await fetch("/api/admin/stats/visits6month") // Replace with your API URL
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error fetching data:", error))
    }

    useEffect(() => {
        getData()
        setInit(false)
    }, [])

  return (
    initLoad? 
    <div className="w-full h-full justify-center items-center flex">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("animate-spin")}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    </div>
        : 
    <Card>
      <CardHeader>
        <CardTitle>Homepage Visits</CardTitle>
        <CardDescription>{`${data?.startMonth? getMonthName(data?.startMonth): ""} - ${data?.endMonth? getMonthName(data?.endMonth): ""}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data?.chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="visits"
              type="natural"
              stroke="var(--color-visits)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-visits)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {`Trending ${data?.up? "up": "down"} by ${data?.trending}% this month`} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
