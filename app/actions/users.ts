"use server";

import {createSupabaseServerClient} from "@/lib/db/server";
import {getSubscription} from "@/lib/payment/stripe";

export const getUser = async () => {
  const supabase = await createSupabaseServerClient();

  let {data, error} = await supabase.from("users").select("*, subscription(*)").single();
  if (error) {
    console.log(error);
    return null;
  }
  const {isSub, isActive, currentPlan} = await getSubscription(data);
  data = {...data, isSub, isActive, currentPlan};
  return data;
};

export const saveGoal = async (goal: number) => {
  const supabase = await createSupabaseServerClient();
  const id = (await supabase.auth.getUser()).data.user?.id;
  let {error} = await supabase.from("users").update({goal}).eq("id", id);
  if (error) {
    console.log(error);
    return JSON.stringify({error: true});
  }
  return JSON.stringify({error: false});
};
