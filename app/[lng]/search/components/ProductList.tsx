import { Card404, ProductCard } from "@/app/components";
import { getProducts } from "@/app/services/product/controller";
import type {
  ICustomList,
  IProductList,
  IProductSearchParams,
} from "@/app/interfaces";
import { getSession } from "@/app/services/user/controller";
import { getListsByUserId } from "@/app/services/customList/controller";

interface IProductListComp {
  lng: string;
  searchParams: IProductSearchParams;
}

const ProductList = async ({ lng, searchParams }: IProductListComp) => {
  let myLists: ICustomList[] = [];
  const session = await getSession();
  if (session) {
    myLists = (await getListsByUserId({
      userId: session.userId as string,
    })) as ICustomList[];
  }

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
              userId={session?.userId as string}
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
