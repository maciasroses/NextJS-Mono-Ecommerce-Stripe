import { randomInt } from "crypto";
import { OrderCardSkeleton } from "./Card";

const OrdersListSkeleton = () => {
  return (
    <div className="mt-4 flex flex-col gap-4 rounded-lg">
      {Array.from({ length: randomInt(3, 6) }).map((_, index) => (
        <OrderCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default OrdersListSkeleton;
