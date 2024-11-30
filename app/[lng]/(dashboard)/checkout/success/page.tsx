import Stripe from "stripe";
import { ClearCart } from "./components";
import { GenericBackToPage } from "@/app/shared/components";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface ICheckoutSuccessPage {
  params: {
    lng: string;
  };
  searchParams: {
    payment_intent: string;
  };
}

const CheckoutSuccessPage = async ({
  params: { lng },
  searchParams: { payment_intent },
}: ICheckoutSuccessPage) => {
  if (!payment_intent || typeof payment_intent !== "string") {
    return (
      <GenericBackToPage
        link={`/${lng}/checkout`}
        title={lng === "en" ? "Payment failed" : "Pago fallido"}
        linkText={
          lng === "en" ? "Back to checkout" : "Volver al proceso de pago"
        }
        description={
          lng === "en"
            ? "The payment was not successful"
            : "El pago no fue exitoso"
        }
      />
    );
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

    if (!paymentIntent.metadata.productsIds) {
      return (
        <GenericBackToPage
          link={`/${lng}/checkout`}
          title={lng === "en" ? "Payment failed" : "Pago fallido"}
          linkText={
            lng === "en" ? "Back to checkout" : "Volver al proceso de pago"
          }
          description={
            lng === "en"
              ? "The payment was not successful"
              : "El pago no fue exitoso"
          }
        />
      );
    }

    const isSuccess = paymentIntent.status === "succeeded";

    return (
      <>
        {isSuccess ? (
          <ClearCart lng={lng} />
        ) : (
          <GenericBackToPage
            link={`/${lng}/checkout`}
            title={lng === "en" ? "Payment failed" : "Pago fallido"}
            linkText={lng === "en" ? "Try again" : "Intentar de nuevo"}
            description={
              lng === "en"
                ? "The payment was not successful"
                : "El pago no fue exitoso"
            }
          />
        )}
      </>
    );
  } catch (error) {
    console.error("Stripe error:", error);
    return (
      <GenericBackToPage
        link={`/${lng}/checkout`}
        title={lng === "en" ? "Payment failed" : "Pago fallido"}
        linkText={
          lng === "en" ? "Back to checkout" : "Volver al proceso de pago"
        }
        description={
          lng === "en"
            ? "The payment was not successful"
            : "El pago no fue exitoso"
        }
      />
    );
  }
};

export default CheckoutSuccessPage;
