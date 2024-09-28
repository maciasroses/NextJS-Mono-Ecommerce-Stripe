import Image from "next/image";
import formatDateForHumans from "@/app/utils/formatdate-human";
import type { IOrder, IProduct } from "@/app/interfaces";

interface IOrderProductCard {
  order: IOrder;
  product: IProduct;
}

const OrderProductCard = ({ order, product }: IOrderProductCard) => {
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
              ? `Delivered on ${formatDateForHumans(order.updatedAt, "en-US")}`
              : order.shippingStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderProductCard;
