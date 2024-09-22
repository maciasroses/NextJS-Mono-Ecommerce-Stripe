"use client";

import { cn } from "@/app/utils/cn";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { GenericBackToPage } from "@/app/components";
import { useCart, useResolvedTheme } from "@/app/hooks";
import formatCurrency from "@/app/utils/format-currency";
import { createPaymentIntent } from "@/app/services/stripe/payment";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import Image from "next/image";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface IForm {
  lng: string;
  userEmail: string;
}

const Form = ({ lng, userEmail }: IForm) => {
  const { cart } = useCart();
  const theme = useResolvedTheme();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const handlePaymentIntent = async () => {
      const clientSecret = (await createPaymentIntent(cart)) as string;
      setClientSecret(clientSecret);
    };
    if (cart.length > 0) {
      handlePaymentIntent();
    }
  }, [cart]);

  if (cart.length === 0) {
    return (
      <GenericBackToPage
        link={`/${lng}`}
        title="Your cart is empty"
        linkText="Back to home"
        description="Add some items to your cart"
      />
    );
  }

  const appearance: {
    theme: "night" | "stripe";
  } = {
    theme: theme === "dark" ? "night" : "stripe",
  };

  const options = {
    appearance,
    clientSecret,
  };

  return (
    <section className="pt-24 px-4 pb-4 flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-2/3">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <ul className="flex flex-col gap-4 mt-4">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-2 border-b-2 border-b-gray-200 dark:border-b-gray-700 p-2"
            >
              <div className="flex items-center gap-2">
                <div className="size-24">
                  <Image
                    src={item.file}
                    alt={item.name}
                    width={500}
                    height={300}
                    className="size-full object-contain rounded-lg"
                  />
                </div>
                <p className="text-base sm:text-xl">{item.name}</p>
              </div>
              <p className="text-sm sm:text-lg">
                {item.quantity} x{" "}
                <span className="font-semibold">
                  {formatCurrency(item.price / 100, "MXN")}
                </span>
              </p>
            </li>
          ))}
        </ul>
        <p className="text-base sm:text-xl text-right mt-4">
          Total:{" "}
          <span className="font-bold">
            {formatCurrency(
              cart.reduce((acc, item) => acc + item.price * item.quantity, 0) /
                100,
              "MXN"
            )}
          </span>
        </p>
      </div>
      {clientSecret.length > 0 && (
        <Elements options={options} stripe={stripePromise}>
          <StripeForm lng={lng} userEmail={userEmail} />
        </Elements>
      )}
    </section>
  );
};

export default Form;

interface IStripeForm {
  lng: string;
  userEmail: string;
}

const StripeForm = ({ lng, userEmail }: IStripeForm) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleConfirmPayment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (stripe == null || elements == null) return;

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${lng}/checkout/success`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An error occurred, please try again later");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      onSubmit={handleConfirmPayment}
      className="w-full md:w-1/3 px-4 pt-12 pb-4 sticky top-24 h-full"
    >
      {errorMessage && (
        <p className="text-[#cb3544] dark:text-[#c87688] font-bold mb-2">
          {errorMessage}
        </p>
      )}
      <PaymentElement />
      <div className="mt-2 hidden">
        <LinkAuthenticationElement
          options={{
            defaultValues: {
              email: userEmail,
            },
          }}
        />
      </div>
      <button
        disabled={stripe == null || elements == null || isLoading}
        className={cn(
          "w-full py-2 rounded-md transition mt-4",
          stripe == null || elements == null || isLoading
            ? "bg-gray-300 dark:bg-gray-800 cursor-not-allowed"
            : "text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800"
        )}
      >
        {isLoading ? "Processing..." : "Confirm payment"}
      </button>
    </form>
  );
};
