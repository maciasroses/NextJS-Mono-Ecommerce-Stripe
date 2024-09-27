import { OrderProductCard } from "./components";
import { getSession } from "@/app/services/user/controller";
import formatDateForHumans from "@/app/utils/formatdate-human";
import { getOrdersByUserId } from "@/app/services/order/controller";
import type { IBaseLangPage, IOrder } from "@/app/interfaces";

interface IProfileOrdersPage extends IBaseLangPage {}

const ProfileOrdersPage = async ({ params: { lng } }: IProfileOrdersPage) => {
  const session = await getSession();
  const myOrders = (await getOrdersByUserId({
    userId: session?.userId as string,
  })) as IOrder[];

  return (
    <>
      <h1 className="text-4xl">My Orders</h1>
      {myOrders.map((order) => (
        <div
          key={order.id}
          className="mt-4 p-4 border-t border-gray-200 dark:border-gray-800"
        >
          <p className="text-xl">
            {formatDateForHumans(order.createdAt, "en-US")}
          </p>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {order.products.map((product) => (
              <OrderProductCard
                lng={lng}
                order={order}
                key={product.productId}
                product={product.product}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProfileOrdersPage;
