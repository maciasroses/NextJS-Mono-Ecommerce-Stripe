"use client";

import { useEffect } from "react";
import { useCart } from "@/app/hooks";
import { GenericBackToPage } from "@/app/components";

const ClearCart = ({ lng }: { lng: string }) => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <GenericBackToPage
      link={`/${lng}/profile/orders`}
      title="Payment succeeded"
      linkText="Go to my orders"
      description="The payment was successful"
    />
  );
};

export default ClearCart;
