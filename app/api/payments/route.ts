import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { handleCheckoutSessionCompleted } from "@/lib/payment";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;  // ← from stripe listen

export const POST = async (req: NextRequest) => {
  // IMPORTANT: Get raw body as text!
  const buf = await req.arrayBuffer();
  const body = Buffer.from(buf);

  const sig = req.headers.get("stripe-signature");

  console.log("Webhook received");
  console.log("Signature present:", !!sig);
  console.log("Secret present:", !!endpointSecret);
  console.log("Body length:", body.length);

  let event;

  try {
    if (!endpointSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not set");
    }
    // Check if it's really from Stripe
    event = stripe.webhooks.constructEvent(body, sig ?? "", endpointSecret);

    // Now handle the events
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as any;
        console.log("Payment succeeded:", session.id);
        // Here: upgrade user in your database!
        await handleCheckoutSessionCompleted({ session,stripe });
        break;

      case "customer.subscription.deleted":
        const subscription = event.data.object as any;
        console.log(`Subscription deleted: ${subscription.id}`);
        // Here: downgrade user
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Tell Stripe "I got it!"
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.log("Webhook error:", err.message);
    return NextResponse.json(
      { error: "Webhook Error" },
      { status: 400 }
    );
  }
};