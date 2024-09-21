"use client";

import Link from "next/link";
import Image from "next/image";
import AddToCart from "../AddToCart";
import AddCustomList from "../CustomList/AddCustomList";
import formatCurrency from "@/app/utils/format-currency";
import type { ICustomList, IProduct } from "@/app/interfaces";

interface IProductCard {
  lng: string;
  userId: string;
  myLists: ICustomList[];
  product: IProduct;
}

const ProductCard = ({ lng, userId, myLists, product }: IProductCard) => {
  const isFavorite = myLists.some((list) => {
    return list.products.some(
      (myProduct) => myProduct.productId === product.id
    );
  });

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link
        href={`/${lng}/${product.slug}`}
        className="flex justify-center p-8"
      >
        <Image
          className="size-auto"
          alt={product.name}
          src={product.files[0].url}
          width={500}
          height={300}
        />
      </Link>
      <div className="flex flex-col gap-2 px-5 pb-5 relative">
        <div className="absolute top-0 right-5">
          <AddCustomList
            lng={lng}
            myLists={myLists}
            userId={userId}
            productId={product.id}
            isFavorite={isFavorite}
          />
        </div>
        <Link href={`/${lng}/${product.slug}`}>
          <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h1>
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(product.priceInCents / 100, "MXN")}
          </span>
        </Link>
        <AddToCart product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
