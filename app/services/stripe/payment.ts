"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface ICart {
  id: string;
  name: string;
  file: string;
  price: number;
  quantity: number;
}

export async function createPaymentIntent(cart: ICart[]) {
  //   const items = cart.map((item) => ({
  //     price_data: {
  //       currency: "MXN",
  //       product_data: {
  //         name: item.name,
  //         // images: [item.file],
  //       },
  //       unit_amount: item.price,
  //     },
  //     quantity: item.quantity,
  //   }));

  const paymentIntent = await stripe.paymentIntents.create({
    amount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    currency: "MXN",
    metadata: {
      productsIds: JSON.stringify(cart.map((item) => item.id)),
    },
  });

  console.log(paymentIntent);

  if (!paymentIntent || paymentIntent.client_secret === undefined) {
    throw new Error("Failed to create payment intent");
  }

  return paymentIntent.client_secret;
}
