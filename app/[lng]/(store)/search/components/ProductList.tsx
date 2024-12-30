import { getMe } from "@/app/shared/services/user/controller";
import { Card404, ProductCard } from "@/app/shared/components";
import { getMyLists } from "@/app/shared/services/customList/controller";
import { getProductVariants } from "@/app/shared/services/product/controller";
import type {
  IUser,
  ICustomList,
  IProductVariantList,
  IProductVariantSearchParams,
} from "@/app/shared/interfaces";

interface IProductListComp {
  lng: string;
  searchParams: IProductVariantSearchParams;
}

const ProductList = async ({ lng, searchParams }: IProductListComp) => {
  const me = (await getMe()) as IUser;
  const myLists = (await getMyLists({ isForFav: true })) as ICustomList[];
  const { products } = (await getProductVariants(
    searchParams
  )) as IProductVariantList;

  return (
    <>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              lng={lng}
              userId={me?.id}
              key={product.id}
              myLists={myLists}
              product={{
                files: product.product.files,
                name: product.product.name,
                slug: product.product.slug,
                variant: product,
              }}
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
