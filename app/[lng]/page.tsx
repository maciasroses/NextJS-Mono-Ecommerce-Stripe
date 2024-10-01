import { Hero, RecentList } from "@/app/components";
import { getMe } from "@/app/services/user/controller";
import { getAllProducts } from "@/app/services/product/controller";
import { getMyLists } from "@/app/services/customList/controller";
import type {
  IBaseLangPage,
  ICustomList,
  IProduct,
  IUser,
} from "@/app/interfaces";

export default async function Home({ params: { lng } }: IBaseLangPage) {
  const me = (await getMe()) as IUser;
  const myLists = (await getMyLists()) as ICustomList[];
  const products = (await getAllProducts()) as IProduct[];

  return (
    <section className="pt-40 md:pt-24 px-4 pb-4 flex flex-col gap-8">
      <Hero lng={lng} />
      <article>
        <RecentList
          lng={lng}
          userId={me?.id}
          myLists={myLists}
          products={products}
          category="Electronics"
        />
      </article>
      <article>
        <RecentList
          lng={lng}
          category="Toys"
          userId={me?.id}
          myLists={myLists}
          products={products}
        />
      </article>
    </section>
  );
}
