"use client";

import {Plus} from "lucide-react";
import {buttonVariants} from "../ui/button";
import {Dialog, DialogTrigger} from "../ui/dialog";
import CatDialog from "./CatDialog";

export default function AddCatBtn() {
  return (
    <div>
      <Dialog>
        <DialogTrigger className={buttonVariants()}>
          <div>Add Category</div>
          <Plus size={20} />
        </DialogTrigger>
        <CatDialog />
      </Dialog>
    </div>
  );
}
