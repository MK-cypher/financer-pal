"use client";

import {Plus} from "lucide-react";
import {buttonVariants} from "../ui/button";
import {Dialog, DialogTrigger} from "../ui/dialog";
import IncomeDialog from "./IncomeDialog";

export default function AddIncome() {
  return (
    <div>
      <Dialog>
        <DialogTrigger className={buttonVariants()}>
          <div>Add Income</div>
          <Plus size={20} />
        </DialogTrigger>
        <IncomeDialog />
      </Dialog>
    </div>
  );
}
