import { randomInt } from "crypto";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: randomInt(3, 6) }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ListSkeleton;
