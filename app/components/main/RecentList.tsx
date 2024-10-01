"use client";

import { ProductCard } from "@/app/components";
import { useTranslation } from "@/app/i18n/client";
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
  const { t } = useTranslation(lng, "root");
  const categories = JSON.parse(t("categories"));
  const categoryLabel = categories[category.toLowerCase()];
  const productsFilteredByCategory = products.filter(
    (product) => product.category === category.toUpperCase()
  );
  return (
    <section>
      <h1 className="text-2xl sm:text-4xl md:text-6xl text-center lg:text-left mb-2 md:mb-4">
        {categoryLabel}
      </h1>
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
    </section>
  );
};

export default RecentList;
