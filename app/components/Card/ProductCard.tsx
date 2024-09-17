"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/app/utils/cn";
import { useCart } from "@/app/hooks/useCart";
import formatCurrency from "@/app/utils/format-currency";
import type { IProduct } from "@/app/interfaces";

interface IProductCard {
  lng: string;
  product: IProduct;
}

const ProductCard = ({ lng, product }: IProductCard) => {
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
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/${lng}/${product.slug}`} className="flex justify-center">
        <Image
          className="rounded-t-lg p-8"
          alt={product.name}
          src={product.files[0].url}
          width={500}
          height={300}
        />
      </Link>
      <div className="px-5 pb-5">
        <Link href={`/${lng}/${product.slug}`}>
          <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {product.description.length > 100
              ? product.description.slice(0, 100) + "..."
              : product.description}
          </p>
        </Link>
        <div className="flex flex-col gap-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(product.priceInCents / 100, "MXN")}
          </span>
          <button
            onClick={
              currentQuantityProduct < product.maximumQuantityPerOrder &&
              currentQuantityProduct < product.quantity
                ? handleAddToCart
                : () => {}
            }
            // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            className={cn(
              "text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none",
              currentQuantityProduct < product.maximumQuantityPerOrder &&
                currentQuantityProduct < product.quantity
                ? "bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed text-gray-600 dark:bg-gray-700 dark:text-gray-200"
            )}
          >
            {/* Add to cart */}
            {currentQuantityProduct < product.maximumQuantityPerOrder &&
            currentQuantityProduct < product.quantity
              ? "Add to cart"
              : "Max quantity reached"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
