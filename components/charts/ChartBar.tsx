"use client";

import {TrendingUp} from "lucide-react";
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts";

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {ExpensesType} from "@/lib/types";
import {getMonth, mergeDailyData} from "@/lib/utils";

const chartConfig = {
  amount: {
    label: "amount",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChartBar({expenses, date}: {expenses: ExpensesType[]; date: string}) {
  const chartData = mergeDailyData(expenses);

  return (
    <Card className="flex-grow max-h-[400px] w-full">
      <CardHeader>
        <CardTitle>{date}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[310px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
