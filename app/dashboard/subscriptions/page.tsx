import {getUserSubs} from "@/app/actions/userSubs";
import AddSubBtn from "@/components/subs/AddSubBtn";
import SubsPage from "@/components/subs/SubsPage";
import React from "react";

export default async function page() {
  const subs = await getUserSubs();
  return (
    <div>
      <AddSubBtn />
      <div className="mt-5">
        <div className="text-xl font-semibold">Active Subscriptions</div>
        <SubsPage subs={subs} />
      </div>
    </div>
  );
}
