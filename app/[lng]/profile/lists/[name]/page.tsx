import Link from "next/link";
import { notFound } from "next/navigation";
import { LeftArrow } from "@/public/icons";
import { ICustomList } from "@/app/interfaces";
import { getSession } from "@/app/services/user/controller";
import { getListByNameNUserId } from "@/app/services/customList/controller";
import { ProductCard } from "./components";
import { Card404 } from "@/app/components";

interface IListPage {
  params: {
    lng: string;
    name: string;
  };
}

const ListPage = async ({ params: { lng, name } }: IListPage) => {
  const session = await getSession();
  const customList = (await getListByNameNUserId({
    name,
    userId: session?.userId as string,
  })) as ICustomList;
  if (!customList) notFound();

  return (
    <>
      <div className="flex items-start gap-4">
        <Link
          href={`/${lng}/profile/lists`}
          className="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400 mt-1"
        >
          <LeftArrow size="size-6 md:size-8" />
        </Link>
        <div>
          <h1 className="text-xl md:text-4xl">{customList.name}</h1>
          <p className="text-base md:text-2xl text-gray-500 ml-1">
            {customList.description}
          </p>
          <p className="text-xs md:text-base text-gray-500 dark:text-gray-400 mt-2 ml-1">
            {customList.products.length} product
            {customList.products.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>
      {customList.products.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {customList.products.map((product) => (
            <ProductCard
              key={product.productId}
              lng={lng}
              customListId={customList.id}
              product={product.product}
            />
          ))}
        </div>
      ) : (
        <Card404
          title="No products in this list"
          description="Add products to this list to see them here"
        />
      )}
    </>
  );
};

export default ListPage;
