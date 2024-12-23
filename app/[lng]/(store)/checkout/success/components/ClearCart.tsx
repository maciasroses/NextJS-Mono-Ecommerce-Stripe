"use client";

import { useEffect } from "react";
import { useCart } from "@/app/shared/hooks";
import { GenericBackToPage } from "@/app/shared/components";

const ClearCart = ({ lng }: { lng: string }) => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <GenericBackToPage
      link={`/${lng}/profile/orders`}
      title={lng === "en" ? "Payment succeeded" : "Pago exitoso"}
      linkText={lng === "en" ? "Go to my orders" : "Ir a mis pedidos"}
      description={
        lng === "en" ? "The payment was successful" : "El pago fue exitoso"
      }
    />
  );
};

export default ClearCart;
