"use client";
import React, {useState} from "react";
import {CategoryType, ExpensesData} from "@/lib/types";
import ActiveExpenses from "@/components/expenses/ActiveExpenses";

export default function ExpensesPage({
  expenses,
  categories,
}: {
  expenses: ExpensesData[];
  categories: CategoryType[] | null;
}) {
  return (
    <>
      {expenses?.length ? (
        expenses.map((item) => <ActiveExpenses categories={categories} item={item} key={item.id} />)
      ) : (
        <></>
      )}
    </>
  );
}
