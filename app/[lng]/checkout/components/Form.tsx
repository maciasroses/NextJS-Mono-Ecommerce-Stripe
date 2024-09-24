"use client";

import Image from "next/image";
import { cn } from "@/app/utils/cn";
import { useEffect, useState } from "react";
import { toast, Slide } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useCart, useResolvedTheme } from "@/app/hooks";
import formatCurrency from "@/app/utils/format-currency";
import { GenericBackToPage, Loading } from "@/app/components";
import { createPaymentIntent } from "@/app/services/stripe/payment";
import {
  checkNUpdateStock,
  reserverStock,
} from "@/app/services/stock/controller";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import type { ICartItem } from "@/app/interfaces";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface IForm {
  lng: string;
  userId: string;
  userEmail: string;
}

const Form = ({ lng, userId, userEmail }: IForm) => {
  const theme = useResolvedTheme();
  const { cart, clearCart, addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [changesInCart, setChangesInCart] = useState(false);
  const [isStockChecked, setIsStockChecked] = useState(false);
  const [updatedCart, setUpdatedCart] = useState<ICartItem[]>();

  useEffect(() => {
    const handleStockCheckAndReservation = async () => {
      const newCart = await checkNUpdateStock(userId, cart);

      const itemsWithUpdatedQuantity = newCart.filter((newItem) => {
        const oldItem = cart.find((item) => item.id === newItem.id);
        return oldItem && oldItem.quantity !== newItem.quantity;
      });

      const itemsRemovedFromCart = cart.filter(
        (oldItem) => !newCart.some((newItem) => newItem.id === oldItem.id)
      );

      if (
        itemsWithUpdatedQuantity.length > 0 ||
        itemsRemovedFromCart.length > 0
      ) {
        clearCart();
        newCart.forEach((item) => addToCart(item));
        setChangesInCart(true);
      }

      setUpdatedCart(newCart);
      setIsStockChecked(true);
      setIsLoading(false);
    };

    if (!isStockChecked && cart.length > 0) {
      handleStockCheckAndReservation();
    } else if (cart.length === 0) {
      setIsLoading(false);
    }
  }, [cart, theme, clearCart, addToCart, isStockChecked, userId]);

  useEffect(() => {
    if (changesInCart) {
      toast.warning(
        "Some items are out of stock or updated, please review your cart",
        {
          transition: Slide,
          hideProgressBar: true,
          closeOnClick: true,
          position: "bottom-right",
          theme: theme === "dark" ? "dark" : "light",
        }
      );
    }
  }, [changesInCart, theme]);

  useEffect(() => {
    const handleReservationAndPaymentIntent = async () => {
      if (updatedCart && updatedCart.length > 0 && isStockChecked) {
        const reservations = await reserverStock(userId, updatedCart);

        if (reservations.length !== updatedCart.length) {
          toast.error("An error occurred, please try again later", {
            transition: Slide,
            hideProgressBar: true,
            closeOnClick: true,
            position: "bottom-right",
            theme: theme === "dark" ? "dark" : "light",
          });
          return;
        }

        const clientSecret = (await createPaymentIntent(
          updatedCart,
          userId
        )) as string;
        setClientSecret(clientSecret);
      }
    };

    if (isStockChecked) {
      handleReservationAndPaymentIntent();
    }
  }, [updatedCart, isStockChecked, theme, userId]);

  useEffect(() => {
    if (isLoading && cart.length === 0) {
      setIsLoading(false);
    }
  }, [cart, isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen pt-24">
        <Loading size="size-20" />
      </div>
    );
  }

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
        <p className="text-sm sm:text-lg text-right mt-4">
          Shipping: <span className="font-bold">$99.00</span>
        </p>
        <p className="text-sm sm:text-lg text-right">
          Subtotal:{" "}
          <span className="font-bold">
            {formatCurrency(
              cart.reduce((acc, item) => acc + item.price * item.quantity, 0) /
                100,
              "MXN"
            )}
          </span>
        </p>
        <p className="text-lg sm:text-2xl text-right mt-2">
          Total:{" "}
          <span className="font-bold">
            {formatCurrency(
              cart.reduce((acc, item) => acc + item.price * item.quantity, 0) /
                100 +
                99,
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
      <fieldset disabled={stripe == null || elements == null || isLoading}>
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
          type="submit"
          disabled={stripe == null || elements == null || isLoading}
          className={cn(
            "w-full py-2 rounded-md transition mt-4",
            stripe == null || elements == null || isLoading
              ? "bg-gray-300 dark:bg-gray-800 cursor-not-allowed"
              : "text-white dark:text-blue-300 bg-blue-600 dark:bg-blue-950 hover:bg-blue-700 dark:hover:bg-blue-900 dark:border-blue-300 dark:border-2"
          )}
        >
          {isLoading ? "Processing..." : "Confirm payment"}
        </button>
      </fieldset>
    </form>
  );
};
