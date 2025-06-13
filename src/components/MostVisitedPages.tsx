"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

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

// const chartData = [
//   { model: "cap", visitors: 275, fill: "var(--color-foreground)" },
//   { model: "tshirt", visitors: 200, fill: "var(--color-foreground)" },
//   { model: "tshirtAnimated", visitors: 187, fill: "var(--color-foreground)" },
//   { model: "oversizedTshirt", visitors: 173, fill: "var(--color-foreground)" },
//   { model: "beanie", visitors: 90, fill: "var(--color-foreground)" },
//   { model: "pants", visitors: 90, fill: "var(--color-foreground)" }
// ]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  cap: {
    label: "Cap",
    color: "hsl(var(--chart-1))",
  },
  tshirt: {
    label: "T-Shirt",
    color: "hsl(var(--chart-2))",
  },
  tshirtAnimated: {
    label: "T-Shirt Animated",
    color: "hsl(var(--chart-3))",
  },
  oversizedTshirt: {
    label: "Oversized T-Shirt",
    color: "hsl(var(--chart-4))",
  },
  beanie: {
    label: "Beanie",
    color: "hsl(var(--chart-5))",
  },
  pants: {
    label: "Pants",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig

interface ModelData {
  model: string;
  visitors: number;
  fill: string;
}

export function MostVisitedPages() {

  const [data, setData] = useState<ModelData[]>()

  const [initLoad, setInit] = useState(true)

  const getData = async () => {
      const res = await fetch("/api/admin/stats/most-visited-models") // Replace with your API URL
      const modelData = await res.json();
      setData(modelData)
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
    </div>: 
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Mixed</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="model"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
