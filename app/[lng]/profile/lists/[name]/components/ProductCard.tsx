"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { TrashIcon } from "@/public/icons";
import formatCurrency from "@/app/utils/format-currency";
import { AddToCart, Modal, Toast } from "@/app/components";
import { deleteProductFromCustomList } from "@/app/services/customList/controller";
import type { IProduct } from "@/app/interfaces";

interface IProductCard {
  lng: string;
  product: IProduct;
  customListId: string;
}

const ProductCard = ({ lng, product, customListId }: IProductCard) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = async () => {
    const response = await deleteProductFromCustomList(
      customListId,
      product.id
    );

    if (response.message === "OK") {
      Toast({
        type: "success",
        message: "Product removed successfully",
      });
    } else {
      Toast({
        type: "error",
        message: "Something went wrong",
      });
    }
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} isForSideBar={false} onClose={handleClose}>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl md:text-4xl">Removing from list</h1>
          <div className="text-center">
            <p className="text-2xl">
              Are you sure you want to remove the product{" "}
              <span className="font-semibold">{product.name}</span> from the
              list?
            </p>
            <button
              type="button"
              onClick={handleConfirm}
              className="mt-4 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 text-white dark:tex-red-300 bg-red-600 dark:bg-red-950 hover:bg-red-700 dark:hover:bg-red-900 focus:ring-red-600 dark:focus:ring-red-300 border border-red-600 hover:border-red-700 dark:border-red-300"
            >
              Remove
            </button>
          </div>
        </div>
      </Modal>
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
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="text-red-600 dark:text-red-300 hover:text-red-700 dark:hover:text-red-400"
            >
              <TrashIcon />
            </button>
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
    </>
  );
};

export default ProductCard;
