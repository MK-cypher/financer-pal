"use client";
import {deleteSub} from "@/app/actions/userSubs";
import {useToast} from "@/hooks/use-toast";
import {CategoryType} from "@/lib/types";
import {Pen, Trash} from "lucide-react";
import dynamic from "next/dynamic";
import {Dialog, DialogTrigger} from "../ui/dialog";
import SubDialog from "./CatDialog";

const EmojiComponent = dynamic(() => import("emoji-picker-react").then((mod) => mod.Emoji), {
  ssr: false,
});

export default function ActiveCats({item, preview}: {item: CategoryType; preview?: boolean}) {
  const {toast} = useToast();
  const subDelete = async () => {
    const {error} = JSON.parse(await deleteSub(item.id!));
    if (error) {
      toast({title: "Something went Wrong!", variant: "destructive"});
    }
  };
  return (
    <div
      style={{borderLeftColor: item.fill}}
      className="bg-secondary p-2 rounded-lg w-full max-sm:w-full flex justify-between items-center my-3 gap-5 border-l-4 hover:bg-secondary/60 transition-d"
    >
      <div className="flex items-center gap-5">
        <div className="shrink-0">
          <EmojiComponent unified={item.icon || "1f4b3"} />
        </div>
        <div className=" max-sm:w-full line-clamp-2 overflow-hidden text-start " style={{color: item.fill}}>
          {item.category}
        </div>
      </div>
      {!preview ? (
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger className="bg-blue-400 p-1 rounded-lg">
                <Pen className="text-white" />
              </DialogTrigger>
              <SubDialog data={item} />
            </Dialog>
            <button onClick={subDelete} className="bg-red-400 p-1 rounded-lg">
              <Trash className="text-white" />
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
