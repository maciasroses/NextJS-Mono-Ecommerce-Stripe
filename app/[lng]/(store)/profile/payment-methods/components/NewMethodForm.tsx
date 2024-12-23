"use client";

import { loadStripe, StripeElementLocale } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  CardElement,
  useElements,
} from "@stripe/react-stripe-js";
import { useResolvedTheme } from "@/app/shared/hooks";
import { useState } from "react";
import { cn } from "@/app/shared/utils/cn";
import { savePaymentMethod } from "@/app/shared/services/stripe/savePaymentMethod";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const NewMethodForm = () => {
  const theme = useResolvedTheme();

  const appearance: {
    theme: "night" | "stripe";
  } = {
    theme: theme === "dark" ? "night" : "stripe",
  };

  const options = {
    appearance,
    locale: "en" as StripeElementLocale,
  };

  return (
    <Elements options={options} stripe={stripePromise}>
      <StripeForm />
    </Elements>
  );
};

export default NewMethodForm;

const StripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleAddPaymentMethod = async (event: React.FormEvent) => {
    event.preventDefault();
    if (stripe == null || elements == null) return;
    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setErrorMessage("Card element not found");
      setIsLoading(false);
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message ?? "An error occurred");
      setIsLoading(false);
      return;
    }

    try {
      await savePaymentMethod(paymentMethod?.id as string);
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred");
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleAddPaymentMethod}>
      <fieldset
        disabled={stripe === null || elements === null || isLoading}
        className={cn(
          stripe == null || elements == null || (isLoading && "opacity-50")
        )}
      >
        {errorMessage && (
          <p className="text-[#cb3544] dark:text-[#c87688] font-bold mb-2">
            {errorMessage}
          </p>
        )}
        <CardElement />
        <button
          type="submit"
          disabled={stripe == null || elements == null || isLoading}
          className={cn(
            "w-full mt-4",
            stripe == null || elements == null || isLoading
              ? "py-2 bg-gray-300 dark:bg-gray-800 cursor-not-allowed"
              : "link-button-blue"
          )}
        >
          {isLoading ? "Processing" : "Confirm"}
        </button>
      </fieldset>
    </form>
  );
};
