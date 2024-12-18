"use client";

import Image from "next/image";
import { useTranslation } from "@/app/i18n/client";
import formatDateForHumans from "@/app/shared/utils/formatdate-human";
import type { IOrder, IProduct } from "@/app/shared/interfaces";

interface IOrderProductCard {
  lng: string;
  order: IOrder;
  product: IProduct;
}

const OrderProductCard = ({ lng, order, product }: IOrderProductCard) => {
  const { t } = useTranslation(lng, "profile");
  const {
    details: {
      statusOn: { DELIVERED: deliveredOn },
    },
    shippingStatus,
  } = JSON.parse(t("orders"));
  return (
    <div className="p-6">
      <div className="flex gap-2 items-center">
        <div className="size-16 sm:size-24 md:size-32">
          <Image
            alt={product.name}
            src={product.files[0].url}
            width={50}
            height={50}
            className="size-full object-contain"
          />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl">{product.name}</h1>
          <p className="text-gray-400 dark:text-gray-500 text-sm md:text-base">
            {order.shippingStatus === "DELIVERED"
              ? `${deliveredOn} ${formatDateForHumans(
                  order.updatedAt,
                  lng === "en" ? "en-US" : "es-ES"
                )}`
              : shippingStatus[order.shippingStatus]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderProductCard;
