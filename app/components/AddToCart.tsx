"use client";

import { cn } from "../utils/cn";
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
  };

  const currentQuantityProduct =
    cart.find((item) => item.id === product.slug)?.quantity ?? 0;

  return (
    <button
      onClick={
        currentQuantityProduct < product.maximumQuantityPerOrder &&
        currentQuantityProduct < product.quantity
          ? handleAddToCart
          : () => {}
      }
      className={cn(
        "text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none",
        currentQuantityProduct < product.maximumQuantityPerOrder &&
          currentQuantityProduct < product.quantity
          ? "bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
          : "bg-gray-300 cursor-not-allowed text-gray-600 dark:bg-gray-700 dark:text-gray-200"
      )}
    >
      {currentQuantityProduct < product.maximumQuantityPerOrder &&
      currentQuantityProduct < product.quantity
        ? "Add to cart"
        : "Max quantity reached"}
    </button>
  );
};

export default AddToCart;
