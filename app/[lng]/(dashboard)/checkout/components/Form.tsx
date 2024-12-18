"use client";

import Image from "next/image";
import { cn } from "@/app/shared/utils/cn";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { useCart, useResolvedTheme } from "@/app/shared/hooks";
import formatCurrency from "@/app/shared/utils/format-currency";
import { loadStripe, StripeElementLocale } from "@stripe/stripe-js";
import { createPaymentIntent } from "@/app/shared/services/stripe/payment";
import { GenericBackToPage, Loading, Toast } from "@/app/shared/components";
import {
  reserverStock,
  checkNUpdateStock,
} from "@/app/shared/services/stock/controller";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import type { ICartItem } from "@/app/shared/interfaces";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface IForm {
  lng: string;
  userEmail: string;
}

const Form = ({ lng, userEmail }: IForm) => {
  const theme = useResolvedTheme();
  const { cart, clearCart, addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [changesInCart, setChangesInCart] = useState(false);
  const [isStockChecked, setIsStockChecked] = useState(false);
  const [updatedCart, setUpdatedCart] = useState<ICartItem[]>();
  const { t } = useTranslation(lng, "checkout");
  const title = t("title");
  const shipping = t("shipping");
  const confirmBtn = t("confirmBtn");
  const processing = t("processing");

  useEffect(() => {
    const handleStockCheckAndReservation = async () => {
      const newCart = await checkNUpdateStock(cart);

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
  }, [cart, clearCart, addToCart, isStockChecked]);

  useEffect(() => {
    if (changesInCart) {
      Toast({
        theme,
        type: "warning",
        message:
          lng === "en"
            ? "Some items are out of stock or updated, please review your cart"
            : "Algunos artículos están agotados o actualizados, por favor revisa tu carrito",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changesInCart]);

  useEffect(() => {
    const handleReservationAndPaymentIntent = async () => {
      if (updatedCart && updatedCart.length > 0 && isStockChecked) {
        const reservations = await reserverStock(updatedCart);

        if (reservations.length !== updatedCart.length) {
          Toast({
            theme,
            type: "error",
            message:
              lng === "en"
                ? "An error occurred, please try again later"
                : "Ocurrió un error, por favor intenta de nuevo más tarde",
          });
          return;
        }

        const clientSecret = (await createPaymentIntent(updatedCart)) as string;
        setClientSecret(clientSecret);
      }
    };

    if (isStockChecked) {
      handleReservationAndPaymentIntent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedCart, isStockChecked]);

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
        title={lng === "en" ? "Your cart is empty" : "Tu carrito está vacío"}
        linkText={lng === "en" ? "Go back to shop" : "Regresar a la tienda"}
        description={
          lng === "en"
            ? "Add some items to your cart"
            : "Agrega algunos artículos a tu carrito"
        }
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
    locale: lng as StripeElementLocale,
  };

  return (
    <section className="pt-24 px-4 pb-4 flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-2/3">
        <h1 className="text-2xl font-bold">{title}</h1>
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
          {shipping}: <span className="font-bold">$99.00</span>
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
          <StripeForm
            lng={lng}
            userEmail={userEmail}
            confirmBtn={confirmBtn}
            processing={processing}
          />
        </Elements>
      )}
    </section>
  );
};

export default Form;

interface IStripeForm {
  lng: string;
  userEmail: string;
  confirmBtn: string;
  processing: string;
}

const StripeForm = ({
  lng,
  userEmail,
  confirmBtn,
  processing,
}: IStripeForm) => {
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
          setErrorMessage(
            lng === "en"
              ? "Something went wrong, please try again"
              : "Algo salió mal, por favor intenta de nuevo"
          );
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      onSubmit={handleConfirmPayment}
      className="w-full md:w-1/3 px-4 pt-12 pb-4 sticky top-24 h-full"
    >
      <fieldset
        disabled={stripe == null || elements == null || isLoading}
        className={cn(
          stripe == null || elements == null || (isLoading && "opacity-50")
        )}
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
          type="submit"
          disabled={stripe == null || elements == null || isLoading}
          className={cn(
            "w-full mt-4",
            stripe == null || elements == null || isLoading
              ? "py-2 bg-gray-300 dark:bg-gray-800 cursor-not-allowed"
              : "link-button-blue"
          )}
        >
          {isLoading ? processing : confirmBtn}
        </button>
      </fieldset>
    </form>
  );
};
