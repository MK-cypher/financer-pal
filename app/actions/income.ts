"use server";

import {incomeData} from "@/lib/consts";
import {createSupabaseServerClient} from "@/lib/db/server";
import {ChartPieType} from "@/lib/types";
import {revalidatePath} from "next/cache";

export const getIncome = async () => {
  const supabase = await createSupabaseServerClient();
  const {data, error} = await supabase.from("income").select("*");
  if (!error) {
    return data;
  }
  return [];
};

export const saveIncome = async (data: ChartPieType) => {
  data.amount = Number(data.amount);

  const supabase = await createSupabaseServerClient();

  const {error, data: id} = await supabase.from("income").insert(data).select("id");
  if (error) {
    return JSON.stringify({error: true});
  }
  revalidatePath(`${process.env.SITE_URL}/dashboard/income`);
  return JSON.stringify({error: false, id});
};

export const updateIncome = async (data: ChartPieType, id: string) => {
  // db
  data.amount = Number(data.amount);
  const supabase = await createSupabaseServerClient();

  const {error} = await supabase.from("income").update(data).eq("id", id);
  if (error) {
    return JSON.stringify({error: true});
  }
  revalidatePath(`${process.env.SITE_URL}/dashboard/income`);
  return JSON.stringify({error: false});
};

export const deleteIncome = async (id: string) => {
  const supabase = await createSupabaseServerClient();

  const {error} = await supabase.from("income").delete().eq("id", id);
  if (error) {
    return JSON.stringify({error: true});
  }
  revalidatePath(`${process.env.SITE_URL}/dashboard/income`);
  return JSON.stringify({error: false, id});
};
