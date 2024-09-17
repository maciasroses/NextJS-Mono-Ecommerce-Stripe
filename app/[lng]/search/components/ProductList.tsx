import { getProducts } from "@/app/services/product/controller";
import type { IProductList, IProductSearchParams } from "@/app/interfaces";
import { Card404, ProductCard } from "@/app/components";

interface IProductListComp {
  lng: string;
  searchParams: IProductSearchParams;
}

const ProductList = async ({ lng, searchParams }: IProductListComp) => {
  const { products } = (await getProducts(searchParams)) as IProductList;
  return (
    <>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} lng={lng} product={product} />
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
