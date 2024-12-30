"use client";

import Toast from "../Toast";
import { cn } from "@/app/shared/utils/cn";
import { useTranslation } from "@/app/i18n/client";
import { useCart, useResolvedTheme } from "@/app/shared/hooks";
import { formatToSnakeCase } from "@/app/shared/utils/formatToSnakeCase";
import type { IProductFile, IProductVariant } from "@/app/shared/interfaces";

interface IAddToCart {
  lng: string;
  product: {
    name: string;
    files: IProductFile[];
    variant: IProductVariant;
  };
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
      id: product.variant.id,
      name: `${product.name} (${product.variant.size}) ${
        product.variant.color !== "" ? `- ${product.variant.color}` : ""
      }`,
      file:
        product.files.find(
          (file) =>
            file.type === "IMAGE" &&
            file.url.includes(
              `${formatToSnakeCase(
                product.variant.color as string
              ).toLowerCase()}_0`
            )
        )?.url ?? product.files[0].url,
      price: product.variant.priceInCents,
      quantity: 1,
      maximumQuantityPerOrder: product.variant.maximumQuantityPerOrder,
    });
    Toast({
      theme,
      type: "success",
      message: toastMessage,
    });
  };

  const currentQuantityProduct =
    cart.find((item) => item.id === product.variant.id)?.quantity ?? 0;

  return (
    <button
      onClick={
        currentQuantityProduct < product.variant.maximumQuantityPerOrder &&
        product.variant.quantity > 0
          ? handleAddToCart
          : () => {}
      }
      className={cn(
        "font-medium rounded-lg text-sm",
        currentQuantityProduct < product.variant.maximumQuantityPerOrder &&
          product.variant.quantity > 0
          ? "link-button-blue"
          : "px-4 py-2 text-gray-600 dark:text-gray-200 bg-gray-300 cursor-not-allowed  dark:bg-gray-700"
      )}
    >
      {currentQuantityProduct < product.variant.maximumQuantityPerOrder &&
      product.variant.quantity > 0
        ? enoughStock
        : outOfStock}
    </button>
  );
};

export default AddToCart;
