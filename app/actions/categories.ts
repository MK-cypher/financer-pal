"use server";

import {createSupabaseServerClient} from "@/lib/db/server";
import {CategoryType} from "@/lib/types";
import {revalidatePath} from "next/cache";

export const getCategories = async () => {
  const supabase = await createSupabaseServerClient();
  const {data, error} = await supabase.from("categories").select("*");
  if (error) {
    console.log(error);
    return [];
  }
  return data;
};

export const updateCategories = async (data: CategoryType | {}, id: string) => {
  const supabase = await createSupabaseServerClient();

  const {error} = await supabase.from("categories").update(data).eq("id", id);
  if (error) {
    return JSON.stringify({error: true});
  }
  revalidatePath(`${process.env.SITE_URL}/dashboard/categories`);
  return JSON.stringify({error: false});
};

export const saveCategories = async (data: CategoryType | {}) => {
  const supabase = await createSupabaseServerClient();

  const {error, data: id} = await supabase.from("categories").insert(data).select("id");
  if (error) {
    return JSON.stringify({error: true});
  }
  revalidatePath(`${process.env.SITE_URL}/dashboard/categories`);
  return JSON.stringify({error: false, id: id[0].id});
};

export const deleteCategory = async (id: string) => {
  const supabase = await createSupabaseServerClient();

  const {error} = await supabase.from("categories").delete().eq("id", id);
  if (error) {
    return JSON.stringify({error: true});
  }
  revalidatePath(`${process.env.SITE_URL}/dashboard/categories`);
  return JSON.stringify({error: false, id});
};
