"use client";
import {checkout, manageSubscription} from "@/lib/payment/stripe";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";
import {useState} from "react";
import {Button} from "../ui/button";
import {useUser} from "../UserContext";

interface props {
  priceId?: string;
  manage?: boolean;
}

export default function Checkout({priceId, manage}: props) {
  const {user} = useUser();
  const {toast} = useToast();
  const price_id = user?.subscription?.price_id;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleCheckout = async () => {
    setLoading(true);
    if (user) {
      const isSub = user.isSub;
      const customer_id = user?.subscription?.customer_id;
      const email = user.email;
      let url = "";
      if (isSub) {
        url = JSON.parse(await manageSubscription(customer_id, location.href)).url;
      } else {
        url = JSON.parse(await checkout(location.href, email, priceId)).url;
      }
      if (url) {
        window.location.href = url;
      } else {
        toast({
          title: "Failed to checkout! Please refresh the page and try again",
        });
      }
    } else {
      router.push(`/signin?next=${location.pathname}`);
    }
    setLoading(false);
  };
  return (
    <>
      <Button
        onClick={handleCheckout}
        className={`
        ${price_id == priceId || manage ? "bg-blue-400" : ""}
        ${loading ? "loading" : ""} ${!manage && "mx-auto w-full"}`}
      >
        {manage ? "Manage Subscription" : price_id == priceId ? "Currently Active" : user ? "Upgrade" : "Get Started"}
        <span></span>
      </Button>
    </>
  );
}
