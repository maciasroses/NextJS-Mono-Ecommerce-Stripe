import { Hero, RecentList } from "@/app/components";
import { IBaseLangPage, IProduct } from "../interfaces";
import { getAllProducts } from "../services/product/controller";

export default async function Home({ params: { lng } }: IBaseLangPage) {
  const products = (await getAllProducts()) as IProduct[];

  return (
    <div className="pt-40 sm:pt-24 px-4 pb-4 flex flex-col gap-4">
      <Hero lng={lng} />
      <RecentList lng={lng} category="Electronics" products={products} />
      <RecentList lng={lng} category="Toys" products={products} />
    </div>
  );
}
