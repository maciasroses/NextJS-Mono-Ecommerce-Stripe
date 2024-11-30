import { getMe } from "@/app/shared/services/user/controller";
import { Card404, ProductCard } from "@/app/shared/components";
import { getProducts } from "@/app/shared/services/product/controller";
import { getMyLists } from "@/app/shared/services/customList/controller";
import type {
  ICustomList,
  IProductList,
  IProductSearchParams,
  IUser,
} from "@/app/shared/interfaces";

interface IProductListComp {
  lng: string;
  searchParams: IProductSearchParams;
}

const ProductList = async ({ lng, searchParams }: IProductListComp) => {
  const me = (await getMe()) as IUser;
  const myLists = (await getMyLists({ isForFav: true })) as ICustomList[];
  const { products } = (await getProducts(searchParams)) as IProductList;

  return (
    <>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              lng={lng}
              key={product.id}
              product={product}
              myLists={myLists}
              userId={me?.id}
            />
          ))}
        </div>
      ) : (
        <Card404
          title="No products found"
          description="Try changing the search parameters"
        />
      )}
    </>
  );
};

export default ProductList;
