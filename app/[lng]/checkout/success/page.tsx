import Stripe from "stripe";
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
      <div className="pt-40">
        <>{isSuccess ? <h1>YEAH</h1> : <h1>Payment failed</h1>}</>
      </div>
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
