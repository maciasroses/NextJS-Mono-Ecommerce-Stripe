"use client";

import Toast from "./Toast";
import { cn } from "@/app/utils/cn";
import { useCart } from "@/app/hooks";
import type { IProduct } from "@/app/interfaces";

interface IAddToCart {
  product: IProduct;
}

const AddToCart = ({ product }: IAddToCart) => {
  const { cart, addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.slug,
      name: product.name,
      file: product.files[0].url,
      price: product.priceInCents,
      quantity: 1,
    });
    Toast({
      type: "success",
      message: "Product added to cart",
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
        "font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none",
        currentQuantityProduct < product.maximumQuantityPerOrder &&
          product.quantity > 0
          ? "text-white dark:text-blue-300 bg-blue-600 hover:bg-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900 border border-blue-600 hover:border-blue-700 dark:border-blue-300"
          : "text-gray-600 dark:text-gray-200 bg-gray-300 cursor-not-allowed  dark:bg-gray-700 "
      )}
    >
      {currentQuantityProduct < product.maximumQuantityPerOrder &&
      product.quantity > 0
        ? "Add to cart"
        : "Out of stock"}
    </button>
  );
};

export default AddToCart;
