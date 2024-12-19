"use server";

import {createSupabaseServerClient} from "@/lib/db/server";
import {UserSubs} from "@/lib/types";
import {revalidatePath} from "next/cache";

export const getUserSubs = async () => {
  const supabase = await createSupabaseServerClient();
  const {data, error} = await supabase.from("recurring").select("*");
  if (!error) {
    return data;
  }
  return data;
};

export const updateNewSub = async (data: UserSubs | {}, id: string) => {
  const supabase = await createSupabaseServerClient();

  const {error} = await supabase.from("recurring").update(data).eq("id", id);
  if (error) {
    return JSON.stringify({error: true});
  }
  revalidatePath(`${process.env.SITE_URL}/dashboard/subscriptions`);
  return JSON.stringify({error: false});
};

export const saveNewSub = async (data: UserSubs | {}) => {
  const supabase = await createSupabaseServerClient();

  const {error, data: id} = await supabase.from("recurring").insert(data).select("id");
  if (error) {
    console.log(error);
    return JSON.stringify({error: true});
  }
  revalidatePath(`${process.env.SITE_URL}/dashboard/subscriptions`);
  return JSON.stringify({error: false, id});
};

export const deleteSub = async (id: string) => {
  const supabase = await createSupabaseServerClient();

  const {error} = await supabase.from("recurring").delete().eq("id", id);
  if (error) {
    return JSON.stringify({error: true});
  }
  revalidatePath(`${process.env.SITE_URL}/dashboard/subscriptions`);
  return JSON.stringify({error: false, id});
};
