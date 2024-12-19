import {ExpensesType} from "@/lib/types";
import {MoneyFormat} from "@/lib/utils";

export default function ExpensesPreview({item}: {item: ExpensesType}) {
  return (
    <div
      style={{borderLeftColor: item.fill}}
      className="bg-secondary p-2 rounded-lg w-full max-sm:w-full flex justify-between items-center my-3 gap-5 border-l-4 hover:bg-secondary/60 transition-d"
    >
      <div className="w-full line-clamp-2 overflow-hidden text-start " style={{color: item.fill}}>
        {item.label}
      </div>
      <div className="flex items-center gap-5">
        <div>{item.amount && MoneyFormat.format(Number(item.amount))}</div>
      </div>
    </div>
  );
}
