"use client";

import {ChartPieType, ExpensesData} from "@/lib/types";
import dynamic from "next/dynamic";
import {Pie, PieChart} from "recharts";

import {CardFooter} from "@/components/ui/card";
import {ChartConfig, ChartTooltip} from "@/components/ui/chart";
const Card = dynamic(() => import("@/components/ui/card").then((mod) => mod.Card), {ssr: false});
const CardContent = dynamic(() => import("@/components/ui/card").then((mod) => mod.CardContent), {ssr: false});
const CardDescription = dynamic(() => import("@/components/ui/card").then((mod) => mod.CardDescription), {ssr: false});
const CardHeader = dynamic(() => import("@/components/ui/card").then((mod) => mod.CardHeader), {ssr: false});
const CardTitle = dynamic(() => import("@/components/ui/card").then((mod) => mod.CardTitle), {ssr: false});
const ChartContainer = dynamic(() => import("@/components/ui/chart").then((mod) => mod.ChartContainer), {ssr: false});
const ChartTooltipContent = dynamic(() => import("@/components/ui/chart").then((mod) => mod.ChartTooltipContent), {
  ssr: false,
});

export function ChartPie({date, chartData}: {date: string; chartData: ChartPieType[] | ExpensesData[] | []}) {
  const labels =
    chartData && chartData.length
      ? Object.fromEntries(
          chartData.map((item) => [
            item.category,
            {
              label: item.category,
              // color: item.fill
            },
          ])
        )
      : [];
  const chartConfig = {
    amount: {
      label: "amount",
    },
    ...labels,
  } satisfies ChartConfig;

  return (
    <Card className="shrink-0 w-[400px] flex flex-col max-[950px]:w-full max-sm:h-fit max-sm:min-h-0 min-h-[400px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>{date}</CardTitle>
      </CardHeader>
      <CardContent className={`flex-1 pb-0 ${!chartData || !chartData.length ? "flex flex-col flex-grow" : ""}`}>
        {chartData && chartData.length ? (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey="amount" label nameKey="category" />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="h-full flex justify-center items-center flex-grow text-xl">No Data Yet</div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center items-center gap-3 flex-wrap mt-2">
        {chartData &&
          chartData.length &&
          chartData.map((item, i) => (
            <div className="flex items-center gap-1" key={item.id}>
              <div className="w-3 h-3 rounded-sm" style={{backgroundColor: item.fill}} />
              <div className="text-ellipsis overflow-hidden whitespace-nowrap text-xs">{item.category}</div>
            </div>
          ))}
      </CardFooter>
    </Card>
  );
}
