"use client";

import {Plus} from "lucide-react";
import {buttonVariants} from "../ui/button";
import {Dialog, DialogTrigger} from "../ui/dialog";
import SubDialog from "./SubDialog";

export default function AddSubBtn() {
  return (
    <div>
      <Dialog>
        <DialogTrigger className={buttonVariants()}>
          <div>Add Subscription</div>
          <Plus size={20} />
        </DialogTrigger>
        <SubDialog />
      </Dialog>
    </div>
  );
}
