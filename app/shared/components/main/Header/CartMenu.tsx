"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/app/shared/utils/cn";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { useCart } from "@/app/shared/hooks/useCart";
import formatCurrency from "@/app/shared/utils/format-currency";
import {
  MinusCircle,
  PlusCircle,
  ShoppingBag,
  XMark,
} from "@/app/shared/icons";
import type { IProduct } from "@/app/shared/interfaces";

interface ICartMenu {
  lng: string;
  products: IProduct[];
}

const CartMenu = ({ lng, products }: ICartMenu) => {
  const { push } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation(lng, "header");
  const { cart, addToCart, clearCart, removeFromCart } = useCart();
  const { title, emptyCart, deleteBtn, checkoutBtn, clearBtn } = JSON.parse(
    t("cartMenu")
  );

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckout = () => {
    toggleCart();
    push(`/${lng}/checkout`);
  };

  return (
    <>
      <button
        aria-label="Cart"
        onClick={toggleCart}
        className={cn("relative", cart.length > 0 && "mr-2")}
      >
        {cart.length > 0 && (
          <span className="absolute -top-2 -end-2 bg-red-500 text-white text-xs rounded-full px-1">
            {cart.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        )}
        <ShoppingBag strokeWidth={1} />
      </button>
      <div
        className={cn(
          "bg-white dark:bg-gray-800 fixed top-0 right-0 h-full w-64 shadow-lg transform transition-transform z-40",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          onClick={toggleCart}
          aria-label="Close Cart"
          className="absolute top-0 right-0 m-4"
        >
          <XMark />
        </button>
        <div className="p-4 h-full flex flex-col justify-between gap-4">
          {cart.length === 0 ? (
            <div>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-gray-500 dark:text-gray-200">{emptyCart}</p>
            </div>
          ) : (
            <>
              <div className="h-3/4 sm:h-1/2 lg:h-5/6">
                <h2 className="text-xl font-semibold">{title}</h2>
                <ul className=" max-h-full overflow-y-auto">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center py-2 gap-2"
                    >
                      <div className="w-1/3">
                        <Image
                          width={50}
                          height={50}
                          src={item.file}
                          alt={item.name}
                          className="rounded-lg size-auto"
                        />
                      </div>
                      <div className="w-2/3">
                        <div className="flex justify-end">
                          {(products.find((product) => product.slug === item.id)
                            ?.quantity ?? 0) > 0 &&
                            (products.find(
                              (product) => product.slug === item.id
                            )?.maximumQuantityPerOrder ?? 0) >
                              item.quantity && (
                              <button
                                aria-label="Add one more"
                                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-500"
                                onClick={() =>
                                  addToCart({
                                    ...item,
                                    quantity: 1,
                                  })
                                }
                              >
                                <PlusCircle />
                              </button>
                            )}
                          {item.quantity > 1 && (
                            <button
                              aria-label="Remove one"
                              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500"
                              onClick={() =>
                                addToCart({
                                  ...item,
                                  quantity: -1,
                                })
                              }
                            >
                              <MinusCircle />
                            </button>
                          )}
                        </div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          {item.quantity} x{" "}
                          {formatCurrency(item.price / 100, "MXN")}
                        </p>
                        <button
                          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          {deleteBtn}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="h-1/4 sm:h-1/2 lg:h-1/6 flex flex-col gap-2 justify-end">
                <p className="text-right">
                  Subtotal:{" "}
                  <span className="font-bold">
                    {formatCurrency(
                      cart.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      ) / 100,
                      "MXN"
                    )}
                  </span>
                </p>
                <button onClick={handleCheckout} className="link-button-blue">
                  {checkoutBtn}
                </button>
                <button className="link-button-red" onClick={clearCart}>
                  {clearBtn}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleCart}
        ></div>
      )}
    </>
  );
};

export default CartMenu;
