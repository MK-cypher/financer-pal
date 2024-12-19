"use server";

import Stripe from "stripe";

export const getSubscription = async (user: any) => {
  const stripe = new Stripe(process.env.STRIPE_SK!);
  const isSub = Boolean(
    user && user.subscription.customer_id && new Date(user.subscription.end_at).getTime() + 86400000 > Date.now()
  );

  let isActive = false;
  const subscirption_id = user.subscription.subscirption_id;
  if (isSub && subscirption_id) {
    const plan = await stripe.subscriptions.retrieve(subscirption_id);
    isActive = !plan.cancel_at_period_end;
  }

  let currentPlan = isSub ? "Pro" : "Free";

  return {isSub, isActive, currentPlan};
};

export const checkout = async (redirectTo: string, email?: string, priceId?: string) => {
  const stripe = new Stripe(process.env.STRIPE_SK!);
  let chekoutObj: Stripe.Checkout.SessionCreateParams = {
    success_url: redirectTo,
    cancel_url: redirectTo,
    customer_email: email,
    line_items: [{price: priceId, quantity: 1}],
    mode: "subscription",
    payment_method_types: ["card", "paypal"],
  };

  const result = await stripe.checkout.sessions.create(chekoutObj);
  return JSON.stringify({url: result.url});
  // }
};

export const manageSubscription = async (customer_id: string, redirectTo: string) => {
  const stripe = new Stripe(process.env.STRIPE_SK!);
  const result = await stripe.billingPortal.sessions.create({
    customer: customer_id,
    return_url: redirectTo,
  });
  return JSON.stringify({url: result.url});
};
