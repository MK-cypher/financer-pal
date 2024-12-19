"use client";
import {deleteIncome} from "@/app/actions/income";
import {useToast} from "@/hooks/use-toast";
import {ChartPieType} from "@/lib/types";
import {MoneyFormat} from "@/lib/utils";
import {Pen, Trash} from "lucide-react";
import {Dialog, DialogTrigger} from "../ui/dialog";
import IncomeDialog from "./IncomeDialog";

export default function ActiveIncome({item, preview}: {item: ChartPieType; preview?: boolean}) {
  const {toast} = useToast();

  const incomeDelete = async () => {
    const {error} = JSON.parse(await deleteIncome(item.id!));
    if (error) {
      toast({title: "Something went Wrong!", variant: "destructive"});
    }
  };
  return (
    <div
      style={{borderLeftColor: item.fill}}
      className="bg-secondary p-2 rounded-lg w-full max-sm:w-full flex justify-between items-center my-3 gap-5 border-l-4 hover:bg-secondary/60 transition-d"
    >
      <div className="w-full line-clamp-2 overflow-hidden text-start " style={{color: item.fill}}>
        {item.category || item.label}
      </div>
      <div className="flex items-center gap-5">
        <div>{item.amount && MoneyFormat.format(Number(item.amount))}</div>
        {!preview ? (
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger className="bg-blue-400 p-1 rounded-lg">
                  <Pen className="text-white" />
                </DialogTrigger>
                <IncomeDialog data={item} />
              </Dialog>
              <button onClick={incomeDelete} className="bg-red-400 p-1 rounded-lg">
                <Trash className="text-white" />
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
