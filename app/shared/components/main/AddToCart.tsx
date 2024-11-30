"use client";

import Toast from "../Toast";
import { cn } from "@/app/shared/utils/cn";
import { useTranslation } from "@/app/i18n/client";
import { useCart, useResolvedTheme } from "@/app/shared/hooks";
import type { IProduct } from "@/app/shared/interfaces";

interface IAddToCart {
  lng: string;
  product: IProduct;
}

const AddToCart = ({ lng, product }: IAddToCart) => {
  const theme = useResolvedTheme();
  const { cart, addToCart } = useCart();
  const { t } = useTranslation(lng, "addToCart");
  const toastMessage = t("toast");
  const enoughStock = t("enoughStockBtn");
  const outOfStock = t("notEnoughStockBtn");

  const handleAddToCart = () => {
    addToCart({
      id: product.slug,
      name: product.name,
      file: product.files[0].url,
      price: product.priceInCents,
      quantity: 1,
    });
    Toast({
      theme,
      type: "success",
      message: toastMessage,
    });
  };

  const currentQuantityProduct =
    cart.find((item) => item.id === product.slug)?.quantity ?? 0;

  return (
    <button
      onClick={
        currentQuantityProduct < product.maximumQuantityPerOrder &&
        product.quantity > 0
          ? handleAddToCart
          : () => {}
      }
      className={cn(
        "font-medium rounded-lg text-sm",
        currentQuantityProduct < product.maximumQuantityPerOrder &&
          product.quantity > 0
          ? "link-button-blue"
          : "px-4 py-2 text-gray-600 dark:text-gray-200 bg-gray-300 cursor-not-allowed  dark:bg-gray-700"
      )}
    >
      {currentQuantityProduct < product.maximumQuantityPerOrder &&
      product.quantity > 0
        ? enoughStock
        : outOfStock}
    </button>
  );
};

export default AddToCart;
