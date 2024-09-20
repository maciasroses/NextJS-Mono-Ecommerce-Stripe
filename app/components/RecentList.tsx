import { ProductCard } from "./Card";
import type { ICustomList, IProduct } from "@/app/interfaces";

interface IRecentList {
  lng: string;
  userId: string;
  myLists: ICustomList[];
  category: string;
  products: IProduct[];
}

const RecentList = ({
  lng,
  userId,
  myLists,
  category,
  products,
}: IRecentList) => {
  const productsFilteredByCategory = products.filter(
    (product) => product.category === category.toUpperCase()
  );

  return (
    <>
      <h1 className="text-xl sm:text-3xl md:text-6xl">{category}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCard
            lng={lng}
            key={index}
            userId={userId}
            myLists={myLists}
            product={productsFilteredByCategory[index]}
          />
        ))}
      </div>
    </>
  );
};

export default RecentList;
