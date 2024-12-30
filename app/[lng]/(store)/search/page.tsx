import { Suspense } from "react";
import { ProductList } from "./components";
import { Filters, ListSkeleton, Pagination } from "@/app/shared/components";
import { getProductVariants } from "@/app/shared/services/product/controller";
import type {
  IBaseLangPage,
  IProductVariantList,
  IProductVariantSearchParams,
} from "@/app/shared/interfaces";

interface ISearchPage extends IBaseLangPage {
  searchParams?: IProductVariantSearchParams;
}

const SearchPage = async ({ searchParams, params: { lng } }: ISearchPage) => {
  const {
    q = "",
    size = "",
    page = "1",
    color = "",
    category = "",
    quantityTo = "",
    quantityFrom = "",
    priceInCentsTo = "",
    priceInCentsFrom = "",
  } = searchParams || {};

  const searchParamsForList = {
    q,
    size,
    page,
    color,
    category,
    quantityTo,
    quantityFrom,
    priceInCentsTo,
    priceInCentsFrom,
  };

  const { totalPages } = (await getProductVariants(
    searchParamsForList
  )) as IProductVariantList;

  return (
    <article className="pt-40 md:pt-24 px-4 pb-4 flex md:gap-4">
      <aside className="hidden md:block md:w-1/4 lg:w-1/5 z-20">
        <Filters lng={lng} />
      </aside>
      <section className="w-full md:w-3/4 lg:w-4/5">
        <Suspense
          key={
            q +
            size +
            page +
            color +
            category +
            quantityTo +
            quantityFrom +
            priceInCentsTo +
            priceInCentsFrom
          }
          fallback={<ListSkeleton />}
        >
          <ProductList lng={lng} searchParams={searchParamsForList} />
        </Suspense>
        <Pagination lng={lng} totalPages={totalPages} />
      </section>
    </article>
  );
};

export default SearchPage;
