import {supabaseAdmin} from "@/lib/db/admin";
import Stripe from "stripe";

const endpoint = process.env.STRIPE_ENDPOINT_SK!;
const stripe = new Stripe(process.env.STRIPE_SK!);

export async function POST(req: Request) {
  const rawBody = await req.text();
  try {
    const signature = req.headers.get("stripe-signature");
    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature!, endpoint);
    } catch (error: any) {
      return Response.json({error: `Webhook Event Error ${error?.message}`});
    }
    switch (event.type) {
      case "invoice.payment_succeeded":
        const result = event.data.object;
        let price_id: any;
        if (result.lines.data.length > 1) {
          price_id = result.lines.data[1].plan?.id;
        } else {
          price_id = result.lines.data[0].plan?.id;
        }
        const email = result.customer_email as string;
        const end_at = new Date(result.lines.data[0].period.end * 1000).toISOString();
        const customer_id = result.customer as string;
        const subscirption_id = result.subscription as string;
        const supabase = await supabaseAdmin();
        const {error} = await supabase
          .from("subscription")
          .update({
            end_at,
            customer_id,
            subscirption_id,
            price_id,
          })
          .eq("email", email);
        if (error) {
          return Response.json({error: error.message});
        }
        break;
      default:
        console.log(`Unknown Event ${event.type}`);
        break;
    }
    return Response.json({});
  } catch (error: any) {
    return Response.json({error: `Webhook Error ${error?.message}`});
  }
}
