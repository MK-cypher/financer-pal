"use client";
import {saveIncome, updateIncome} from "@/app/actions/income";
import {ChartPieType} from "@/lib/types";
import {useEffect, useState} from "react";
import {Button} from "../ui/button";
import {DialogContent, DialogTitle} from "../ui/dialog";
import {useToast} from "@/hooks/use-toast";

export default function IncomeDialog({data}: {data?: ChartPieType}) {
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState<ChartPieType>(data || {fill: "", amount: "", category: ""});
  const {toast} = useToast();

  useEffect(() => {
    if (data) {
      setNewData((prev) => ({...prev, amount: `${prev.amount}`}));
    }
  }, []);

  const save = async () => {
    setLoading(true);
    //
    try {
      let res;
      if (data) {
        res = JSON.parse(await updateIncome(newData, data.id!));
      } else {
        res = JSON.parse(await saveIncome(newData));
      }
      if (res.error) {
        toast({title: "Something went Wrong!", variant: "destructive"});
      } else {
        toast({title: "Data has been saved Successfully", variant: "success"});
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <DialogContent aria-describedby={undefined}>
      <DialogTitle className="font-normal"></DialogTitle>
      <div>
        <div className="flex items-center gap-2">
          <div className="space-y-2 mb-5 w-fit">
            <label htmlFor="fill-color">Color</label>
            <input
              onChange={(e) => {
                setNewData((prev) => ({...prev, fill: e.target.value}));
              }}
              id="fill-color"
              type="color"
              name="fill"
              className="w-full h-8"
              defaultValue={data?.fill || ""}
              readOnly={false}
            />
          </div>
          <div className="space-y-2 mb-5 flex-1">
            <label htmlFor="category">Income</label>
            <input
              onChange={(e) => {
                setNewData((prev) => ({...prev, category: e.target.value}));
              }}
              id="category"
              name="category"
              className="w-full"
              defaultValue={data?.category || ""}
              readOnly={false}
            />
          </div>
          <div className="space-y-2 mb-5 flex-shrink w-min">
            <label htmlFor="amount">Amount</label>
            <input
              onKeyDown={(e) => {
                const value = e.key;
                const pass = ["e", "-", "+", "=", "."];
                if (pass.includes(value)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                const value = e.target.value;
                setNewData((prev) => ({...prev, amount: value}));
              }}
              id="amount"
              name="amount"
              type="number"
              className="min-w-[60px]"
              // @ts-ignore
              style={{width: `${newData.amount.length * 8 + 40}px`}}
              defaultValue={data?.amount || ""}
              readOnly={false}
            />
          </div>
        </div>
        <Button onClick={save} className={`w-full ${loading && "loading"}`}>
          <span></span>Save
        </Button>
      </div>
    </DialogContent>
  );
}
