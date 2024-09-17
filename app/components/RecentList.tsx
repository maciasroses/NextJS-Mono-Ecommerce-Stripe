import { IProduct } from "../interfaces";
import { ProductCard } from "./Card";

interface IRecentList {
  lng: string;
  category: string;
  products: IProduct[];
}

const RecentList = ({ lng, category, products }: IRecentList) => {
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
            product={productsFilteredByCategory[index]}
          />
        ))}
      </div>
    </>
  );
};

export default RecentList;
