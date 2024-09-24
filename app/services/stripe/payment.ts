"use server";

import Stripe from "stripe";
import type { ICartItem } from "@/app/interfaces";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function createPaymentIntent(cart: ICartItem[], userId: string) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount:
      cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + 9900, // 99 MXN for shipping
    currency: "MXN",
    metadata: {
      userId,
      productsIds: JSON.stringify(cart.map((item) => item.id)),
      productsNames: JSON.stringify(cart.map((item) => item.name)),
      productsFiles: JSON.stringify(cart.map((item) => item.file)),
      productsPrices: JSON.stringify(cart.map((item) => item.price)),
      productsQuantities: JSON.stringify(cart.map((item) => item.quantity)),
    },
  });

  if (!paymentIntent || paymentIntent.client_secret === undefined) {
    throw new Error("Failed to create payment intent");
  }

  return paymentIntent.client_secret;
}
