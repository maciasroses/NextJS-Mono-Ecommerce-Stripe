import Stripe from "stripe";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    // const productsIds = JSON.parse(charge.metadata.productsIds);
    const email = charge.billing_details.email;
    // const priceInCents = charge.amount;

    if (email == null) {
      return new Response("Bad request", { status: 400 });
    }

    await resend.emails.send({
      from: `Ecommerce <${process.env.RESEND_EMAIL}>`,
      to: email,
      subject: "Order confirmation",
      react: <h1>Yeah</h1>,
    });
  }

  return new NextResponse();
}
