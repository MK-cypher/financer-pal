"use client";
import {deleteExpense} from "@/app/actions/expenses";
import {useToast} from "@/hooks/use-toast";
import {CategoryType, ExpensesData} from "@/lib/types";
import {MoneyFormat} from "@/lib/utils";
import {ChevronDown, Pen, Trash} from "lucide-react";
import dynamic from "next/dynamic";
import {useState} from "react";
import {Dialog, DialogTrigger} from "../ui/dialog";
import ExpenseDialog from "./ExpenseDialog";
const EmojiComponent = dynamic(() => import("emoji-picker-react").then((mod) => mod.Emoji), {
  ssr: false,
});

export default function ActiveExpenses({item, categories}: {item: ExpensesData; categories: CategoryType[] | null}) {
  const [active, setActive] = useState(false);
  const {toast} = useToast();

  const expenseDelete = async (id: string, amount: number, category: string) => {
    const {error} = JSON.parse(await deleteExpense(id, category, amount));
    if (error) {
      toast({title: "Something went Wrong!", variant: "destructive"});
    }
  };
  return (
    <div className={`overflow-hidden my-5 ${!item.data.length && "opacity-30"}`}>
      <div
        style={{borderLeftColor: item.fill}}
        className="cursor-pointer bg-secondary mb-2 p-2 rounded-lg w-full max-sm:w-full flex justify-between items-center gap-5 border-l-4 hover:bg-secondary/60 transition-d"
        onClick={() => {
          setActive(!active);
        }}
      >
        <div className="flex items-center gap-5">
          <div className="shrink-0">
            <EmojiComponent unified={item.icon || "1f4b3"} />
          </div>
          <div className=" max-sm:w-full line-clamp-2 overflow-hidden text-start " style={{color: item.fill}}>
            {item.category}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div>{MoneyFormat.format(Number(item.amount))}</div>
          <div className={`${active && "rotate-180"}`}>
            <ChevronDown />
          </div>
        </div>
      </div>
      {item.data.length ? (
        <div
          className={`pl-5 space-y-2 accordion ${
            active ? "active-accordion" : "overflow-hidden"
          } transition-all duration-300`}
        >
          {item.data.map((item) => (
            <div
              key={item.id}
              className="bg-secondary p-1 rounded-md flex items-center justify-between relative"
              style={{color: item.fill}}
            >
              <div className="absolute -left-4 bottom-1/2 h-[calc(100%+20px)] w-10 z-[-1] border-l border-b rounded-b-lg"></div>
              <div> {item.label}</div>
              <div className="flex items-center gap-2">
                <div>{MoneyFormat.format(Number(item.amount))}</div>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger className="bg-blue-400 p-1 rounded-lg">
                      <Pen className="text-white" />
                    </DialogTrigger>
                    <ExpenseDialog data={item} categories={categories} />
                  </Dialog>
                  <button
                    onClick={() => {
                      expenseDelete(item.id!, item.amount!, item.category!);
                    }}
                    className="bg-red-400 p-1 rounded-lg"
                  >
                    <Trash className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
