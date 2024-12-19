"use client";
import {Plus} from "lucide-react";
import {buttonVariants} from "../ui/button";
import {Dialog, DialogTrigger} from "../ui/dialog";
import ExpenseDialog from "./ExpenseDialog";
import {CategoryType} from "@/lib/types";

export default function AddExpenses({categories}: {categories: CategoryType[] | null}) {
  return (
    <div>
      <Dialog>
        <DialogTrigger className={buttonVariants()}>
          <div>Add Expenses</div>
          <Plus size={20} />
        </DialogTrigger>
        <ExpenseDialog categories={categories} />
      </Dialog>
    </div>
  );
}
