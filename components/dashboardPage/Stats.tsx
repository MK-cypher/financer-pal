import {MoneyFormat} from "@/lib/utils";
import ChartIcon from "../icons/ChartIcon";

export default function Stats({expenses, income}: {expenses: number; income: number}) {
  const stats = [
    {
      label: "Expenses",
      value: expenses,
      stroke: "#c21b3a",
      color: "#e3546f",
    },
    {
      label: "Income",
      value: income,
      stroke: "#1ff065",
      color: "#83f2a8",
    },
    {
      label: "Savings",
      value: income - expenses,
      stroke: "#1f9cf0",
      color: "#69baf0",
    },
  ];
  return (
    <div className="mb-10">
      <div className="flex items-center gap-5 max-md:flex-col">
        {stats.map((item, i) => (
          <div key={i} className="flex justify-center items-center p-5 rounded-lg bg-secondary w-full">
            <div className="flex items-start gap-3">
              <ChartIcon bgColor={item.color} strokeColor={item.stroke} />
              <div>
                <div className="text-xl font-bold">{MoneyFormat.format(Number(item.value))}</div>
                <div className="text-muted-foreground text-sm">{item.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
