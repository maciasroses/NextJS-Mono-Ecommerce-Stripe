import Link from "next/link";
import { Card404 } from "@/app/components";
import { RightArrow } from "@/public/icons";
import { useTranslation } from "@/app/i18n";
import OrderProductCard from "./OrderProductCard";
import formatCurrency from "@/app/utils/format-currency";
import { getMyOrders } from "@/app/services/order/controller";
import formatDateForHumans from "@/app/utils/formatdate-human";
import type { IOrderList, IOrderSearchParams } from "@/app/interfaces";

interface IOrderListComp {
  lng: string;
  searchParams: IOrderSearchParams;
}

const OrdersList = async ({ lng, searchParams }: IOrderListComp) => {
  const { t } = await useTranslation(lng, "profile");
  const { viewDetailsLink } = JSON.parse(t("orders"));

  const { orders: myOrders } = (await getMyOrders(searchParams)) as IOrderList;

  return (
    <>
      {myOrders.length > 0 ? (
        <>
          {myOrders.map((order) => (
            <Link key={order.id} href={`/${lng}/profile/orders/${order.id}`}>
              <div className="shadow-lg dark:shadow-gray-800 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg mt-4 p-4 group">
                <div className="flex flex-col sm:flex-row gap-2 justify-between text-xl border-b border-gray-200 dark:border-gray-800 pb-4">
                  <p>
                    {formatDateForHumans(
                      order.createdAt,
                      lng === "en" ? "en-US" : "es-ES"
                    )}
                  </p>
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
                      lng={lng}
                      order={order}
                      key={product.productId}
                      product={product.product}
                    />
                  ))}
                </div>
                <p className="flex items-center justify-end gap-0.5 text-blue-600 group-hover:text-blue-700 dark:text-blue-500 dark:group-hover:text-blue-600">
                  {viewDetailsLink}
                  <RightArrow
                    size="size-5"
                    customClass="group-hover:translate-x-1 duration-300"
                  />
                </p>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <Card404 title="No orders found" description="Try another page" />
      )}
    </>
  );
};

export default OrdersList;
