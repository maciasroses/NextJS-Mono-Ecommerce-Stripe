import { Suspense } from "react";
import { ProductList } from "./components";
import { Filters, ListSkeleton, Pagination } from "@/app/components";
import { getProducts } from "@/app/services/product/controller";
import type {
  IBaseLangPage,
  IProductList,
  IProductSearchParams,
} from "@/app/interfaces";

interface ISearchPage extends IBaseLangPage {
  searchParams?: IProductSearchParams;
}

const SearchPage = async ({ searchParams, params: { lng } }: ISearchPage) => {
  const {
    q = "",
    page = "1",
    priceTo = "",
    category = "",
    priceFrom = "",
    quantityTo = "",
    quantityFrom = "",
  } = searchParams || {};

  const searchParamsForList = {
    q,
    page,
    priceTo,
    category,
    priceFrom,
    quantityTo,
    quantityFrom,
  };

  const { totalPages } = (await getProducts(
    searchParamsForList
  )) as IProductList;

  return (
    <div className="pt-40 sm:pt-24 px-4 pb-4 flex md:gap-4">
      <aside className="hidden md:block md:w-1/4 lg:w-1/5 z-20">
        <Filters />
      </aside>
      <div className="w-full md:w-3/4 lg:w-4/5">
        <Suspense
          key={
            q +
            page +
            priceTo +
            category +
            priceFrom +
            quantityTo +
            quantityFrom
          }
          fallback={<ListSkeleton />}
        >
          <ProductList lng={lng} searchParams={searchParamsForList} />
        </Suspense>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default SearchPage;
