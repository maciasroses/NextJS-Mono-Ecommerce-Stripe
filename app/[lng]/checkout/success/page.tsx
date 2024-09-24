import Stripe from "stripe";
import { ClearCart } from "./components";
import { GenericBackToPage } from "@/app/components";

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
        title="Payment failed"
        linkText="Back to checkout"
        description="The payment was not successful"
      />
    );
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

    if (!paymentIntent.metadata.productsIds) {
      return (
        <GenericBackToPage
          link={`/${lng}/checkout`}
          title="Payment failed"
          linkText="Back to checkout"
          description="The payment was not successful"
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
            title="Payment failed"
            linkText="Try again"
            description="The payment was not successful"
          />
        )}
      </>
    );
  } catch (error) {
    // console.error("Stripe error:", error);
    return (
      <GenericBackToPage
        link={`/${lng}/checkout`}
        title="Payment failed"
        linkText="Back to checkout"
        description="The payment was not successful"
      />
    );
  }
};

export default CheckoutSuccessPage;
