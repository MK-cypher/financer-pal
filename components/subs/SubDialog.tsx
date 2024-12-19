"use client";
import {saveNewSub, updateNewSub} from "@/app/actions/userSubs";
import {useToast} from "@/hooks/use-toast";
import {UserSubs} from "@/lib/types";
import {useState} from "react";
import {Button} from "../ui/button";
import {DialogContent, DialogTitle} from "../ui/dialog";
import EmojiBtn from "../ui/EmojiBtn";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";

export default function SubDialog({data}: {data?: UserSubs}) {
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState<UserSubs | {}>(data || {});
  const {toast} = useToast();

  const save = async () => {
    setLoading(true);
    //
    let res;
    if (data) {
      res = JSON.parse(await updateNewSub(newData, data.id!));
    } else {
      res = JSON.parse(await saveNewSub(newData));
    }
    if (res.error) {
      toast({title: "Something went Wrong!", variant: "destructive"});
    } else {
      toast({title: "Data has been saved Successfully", variant: "success"});
    }

    setLoading(false);
  };
  return (
    <DialogContent aria-describedby={undefined}>
      <DialogTitle className="font-normal"></DialogTitle>
      <div>
        <div className="flex items-center gap-5">
          <div className="space-y-2 mb-5 w-fit">
            <label htmlFor="icon">Icon</label>
            <div className="h-9">
              <EmojiBtn setNewData={setNewData} defaultEmoji={data?.icon || ""} />
            </div>
          </div>
          <div className="space-y-2 mb-5 w-full">
            <label htmlFor="subName">Subscription Name</label>
            <input
              onChange={(e) => {
                setNewData((prev) => ({...prev, subName: e.target.value}));
              }}
              id="subName"
              name="subName"
              className="w-full"
              defaultValue={data?.subName || ""}
              readOnly={false}
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="space-y-2 mb-5 w-full">
            <label htmlFor="nextBilling">Next Billing</label>
            <input
              onChange={(e) => {
                setNewData((prev) => ({...prev, nextBilling: e.target.value}));
              }}
              id="nextBilling"
              name="nextBilling"
              type="date"
              className="w-full"
              defaultValue={data?.nextBilling || ""}
              readOnly={false}
            />
          </div>
          <div className="space-y-2 mb-5 w-full">
            <label htmlFor="billingType">Billing Type</label>
            <Select
              defaultValue={data?.billingType || ""}
              onValueChange={(e) => {
                setNewData((prev: any) => ({...prev, billingType: e}));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Category" />
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </SelectTrigger>
            </Select>
          </div>
        </div>
        <div className="space-y-2 mb-5 w-full">
          <label htmlFor="subAmount">Amount</label>
          <input
            onChange={(e) => {
              setNewData((prev) => ({...prev, subAmount: e.target.value}));
            }}
            id="subAmount"
            type="number"
            name="subAmount"
            className="w-full"
            defaultValue={data?.subAmount || ""}
            readOnly={false}
          />
        </div>
        <Button onClick={save} className={`w-full ${loading && "loading"}`}>
          <span></span>Save
        </Button>
      </div>
    </DialogContent>
  );
}
