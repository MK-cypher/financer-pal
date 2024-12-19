"use server";

import {createSupabaseServerClient} from "@/lib/db/server";
import {CategoryType, ChartPieType, ExpensesType} from "@/lib/types";
import {revalidatePath} from "next/cache";

const groupData = (categories: CategoryType[], expensesData: ExpensesType[]) => {
  const groupedExpenses = expensesData.reduce((acc, expense) => {
    const categoryId = expense.category;
    //@ts-ignore
    if (!acc[categoryId]) {
      //@ts-ignore
      acc[categoryId] = [];
    }
    //@ts-ignore
    acc[categoryId].push(expense);
    return acc;
  }, {});

  return categories.map((category) => ({
    ...category,
    //@ts-ignore
    data: groupedExpenses[category.id] || [],
  }));
};

export const getExpenses = async () => {
  const supabase = await createSupabaseServerClient();
  const {data: category} = await supabase.from("categories").select("*");
  const {data: expenses} = await supabase.from("expenses").select("*");
  if (category?.length && expenses?.length) {
    const data = groupData(category, expenses);
    return data;
  }
  return [];
};

export const saveExpenses = async (data: ChartPieType) => {
  const supabase = await createSupabaseServerClient();

  const {error, data: id} = await supabase.from("expenses").insert(data).select("id");
  const res = await supabase.rpc("increase_category_amount", {
    new_amount: Number(data.amount),
    category_id: data.category,
  });
  if (error) {
    return JSON.stringify({error: true});
  }
  revalidatePath(`/dashboard/expenses`, "page");
  return JSON.stringify({error: false, id});
};

export const updateExpenses = async (data: ChartPieType, id: string) => {
  const supabase = await createSupabaseServerClient();

  const {data: oldData} = await supabase.from("expenses").select("*").eq("id", id);
  if (oldData?.length) {
    await supabase.rpc("decrease_category_amount", {
      new_amount: Number(oldData[0].amount),
      category_id: oldData[0].category,
    });
  }
  await supabase.rpc("increase_category_amount", {
    new_amount: Number(data.amount),
    category_id: data.category,
  });

  const {error} = await supabase.from("expenses").update(data).eq("id", id);
  if (error) {
    return JSON.stringify({error: true});
  }
  revalidatePath(`/dashboard/expenses`);
  return JSON.stringify({error: false});
};

export const deleteExpense = async (id: string, category_id: string, new_amount: number) => {
  const supabase = await createSupabaseServerClient();

  const {error} = await supabase.from("expenses").delete().eq("id", id);
  await supabase.rpc("decrease_category_amount", {
    new_amount,
    category_id,
  });
  if (error) {
    return JSON.stringify({error: true});
  }
  revalidatePath(`/dashboard/expenses`, "page");
  return JSON.stringify({error: false});
};
