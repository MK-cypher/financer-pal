"use client";
import {UserSubs} from "@/lib/types";
import React, {useState} from "react";
import ActiveSubs from "@/components/subs/ActiveSubs";

export default function SubsPage({subs}: {subs: UserSubs[] | null}) {
  return <>{subs?.length ? subs.map((item) => <ActiveSubs key={item.id} item={item} />) : <></>}</>;
}
