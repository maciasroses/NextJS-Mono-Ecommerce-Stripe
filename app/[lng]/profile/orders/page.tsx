import Link from "next/link";
import { RightArrow } from "@/public/icons";
import { OrderProductCard } from "./components";
import formatCurrency from "@/app/utils/format-currency";
import { getMyOrders } from "@/app/services/order/controller";
import formatDateForHumans from "@/app/utils/formatdate-human";
import type { IBaseLangPage, IOrder } from "@/app/interfaces";

interface IProfileOrdersPage extends IBaseLangPage {}

const ProfileOrdersPage = async ({ params: { lng } }: IProfileOrdersPage) => {
  const myOrders = (await getMyOrders()) as IOrder[];

  return (
    <>
      <h1 className="text-4xl">My Orders</h1>
      {myOrders.map((order) => (
        <Link key={order.id} href={`/${lng}/profile/orders/${order.id}`}>
          <div className="shadow-lg dark:shadow-gray-800 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg mt-4 p-4 group">
            <div className="flex flex-col sm:flex-row gap-2 justify-between text-xl border-b border-gray-200 dark:border-gray-800 pb-4">
              <p>{formatDateForHumans(order.createdAt, "en-US")}</p>
              <p className="text-right">
                Total:{" "}
                <span className="font-bold">
                  {formatCurrency(order.totalInCents / 100, "USD")}
                </span>
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {order.products.map((product) => (
                <OrderProductCard
                  order={order}
                  key={product.productId}
                  product={product.product}
                />
              ))}
            </div>
            <p className="flex items-center justify-end gap-0.5 text-blue-600 group-hover:text-blue-700 dark:text-blue-500 dark:group-hover:text-blue-600">
              View details
              <RightArrow
                size="size-5"
                customClass="group-hover:translate-x-1 duration-300"
              />
            </p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default ProfileOrdersPage;
