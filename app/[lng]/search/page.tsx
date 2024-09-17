import { getProducts } from "@/app/services/product/controller";
import type {
  IBaseLangPage,
  IProductList,
  IProductSearchParams,
} from "@/app/interfaces";
import { Suspense } from "react";
import { ListSkeleton, Pagination } from "@/app/components";
import { ProductList } from "./components";

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
    <div className="pt-40 sm:pt-24 px-4 pb-4">
      <Suspense
        key={
          q + page + priceTo + category + priceFrom + quantityTo + quantityFrom
        }
        fallback={<ListSkeleton />}
      >
        <ProductList lng={lng} searchParams={searchParamsForList} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default SearchPage;
