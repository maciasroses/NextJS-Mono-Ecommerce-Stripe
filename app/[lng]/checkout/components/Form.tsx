"use client";

import Link from "next/link";
import { useCart } from "@/app/hooks";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { createPaymentIntent } from "@/app/services/stripe/payment";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import formatCurrency from "@/app/utils/format-currency";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface IForm {
  lng: string;
}

const Form = ({ lng }: IForm) => {
  const { cart } = useCart();
  const [clientSecret, setClientSecret] = useState("");

  if (cart.length === 0) {
    return (
      <section className="flex flex-col h-screen items-center justify-center">
        <h1 className="text-3xl md:text-6xl font-bold">Your cart is empty</h1>
        <p className="text-gray-500 dark:text-gray-200 text-xl md:text-3xl">
          Add some items to your cart
        </p>
        <Link
          href={`/${lng}`}
          className="text-base md:text-xl text-white bg-blue-600 px-4 py-2 mt-4 rounded-full"
        >
          Back to home
        </Link>
      </section>
    );
  }

  useEffect(() => {
    const handlePaymentIntent = async () => {
      const clientSecret = (await createPaymentIntent(cart)) as string;
      setClientSecret(clientSecret);
    };
    handlePaymentIntent();
  }, [cart]);

  return (
    <section className="pt-40 md:pt-24 px-4 pb-4 flex md:gap-4">
      CHECKOUT, AND THE PRODUCTS WILL BE SHOWN HERE
      {clientSecret.length > 0 && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <StripeForm
            totalPrice={cart.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            )}
          />
        </Elements>
      )}
    </section>
  );
};

export default Form;

const StripeForm = ({ totalPrice }: { totalPrice: number }) => {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <>
      <PaymentElement />
      <button>Pay - {formatCurrency(totalPrice / 100, "MXN")}</button>
    </>
  );
};
