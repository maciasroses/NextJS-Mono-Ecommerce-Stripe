"use server";

import Stripe from "stripe";
import { isAuthenticated } from "@/app/shared/services/auth";
import { createPaymentMethod } from "../paymentMethod/model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function savePaymentMethod(paymentMethodId: string) {
  try {
    const session = await isAuthenticated();

    stripe.paymentMethods.attach(paymentMethodId, {
      customer: session.userId as string,
    });

    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    await createPaymentMethod({
      data: {
        userId: session.userId as string,
        stripePaymentMethodId: paymentMethod.id,
        brand: paymentMethod.card?.brand,
        last4Digits: paymentMethod.card?.last4,
        expiryMonth: paymentMethod.card?.exp_month,
        expiryYear: paymentMethod.card?.exp_year,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to save payment method");
  }
}
