"use client";
import Checkout from "@/components/payment/Checkout";
import {useUser} from "@/components/UserContext";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {monthDayYear} from "@/lib/utils";
import SubModal from "./SubModal";
import {buttonVariants} from "@/components/ui/button";

export default function SubscriptionsBtn() {
  const {user} = useUser();
  const {currentPlan, isSub, isActive} = user;
  return (
    <div className="subscription-tier p-2 mb-10">
      <h3 className="text-xl font-bold">Current Plan</h3>
      <div className="text-muted-foreground">
        You are curerntly on the
        <strong> {currentPlan} </strong>
        Plan
      </div>
      <div>
        <div className="flex justify-start items-center flex-wrap gap-5 my-3">
          {isSub && <Checkout manage={true} />}
          <Dialog>
            <DialogTrigger className={`${buttonVariants()}`}>Upgrade</DialogTrigger>
            <SubModal />
          </Dialog>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {isActive && isSub
            ? `Your plan renews on ${monthDayYear(new Date(user.subscription.end_at))}`
            : !isActive && isSub
            ? `Your plan cancels on ${monthDayYear(new Date(user.subscription.end_at))}`
            : !isSub
            ? "Upgrade to a higher plan for more resources"
            : ""}
        </p>
      </div>
    </div>
  );
}
