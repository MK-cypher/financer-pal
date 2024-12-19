"use client";
import {saveCategories, updateCategories} from "@/app/actions/categories";
import {CategoryType} from "@/lib/types";
import {useState} from "react";
import {Button} from "../ui/button";
import {DialogContent, DialogTitle} from "../ui/dialog";
import EmojiBtn from "../ui/EmojiBtn";
import {useToast} from "@/hooks/use-toast";

export default function CatDialog({data}: {data?: CategoryType}) {
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState<CategoryType | {}>(data || {});
  const {toast} = useToast();

  const save = async () => {
    setLoading(true);
    //
    let res;
    if (data) {
      res = JSON.parse(await updateCategories(newData, data.id!));
    } else {
      res = JSON.parse(await saveCategories(newData));
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
            <label htmlFor="CatIcon">Icon</label>
            <div className="h-9">
              <EmojiBtn setNewData={setNewData} defaultEmoji={data?.icon || ""} />
            </div>
          </div>
          <div className="space-y-2 mb-5 w-fit">
            <label htmlFor="fill">Color</label>
            <input
              onChange={(e) => {
                setNewData((prev) => ({...prev, fill: e.target.value}));
              }}
              id="fill"
              type="color"
              name="fill"
              className="w-full h-9"
              defaultValue={data?.fill || ""}
              readOnly={false}
            />
          </div>
          <div className="space-y-2 mb-5 w-full">
            <label htmlFor="category">Category</label>
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
        </div>
        <Button onClick={save} className={`w-full ${loading && "loading"}`}>
          <span></span>Save
        </Button>
      </div>
    </DialogContent>
  );
}
