"use client";

import { CartProvider } from "@/app/providers";

const CartComponent = ({ children }: { children: React.ReactNode }) => {
  return <CartProvider>{children}</CartProvider>;
};

export default CartComponent;
