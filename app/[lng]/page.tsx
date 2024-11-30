import { Hero, RecentList } from "@/app/shared/components";
import { getMe } from "@/app/shared/services/user/controller";
import { getMyLists } from "@/app/shared/services/customList/controller";
import { getAllProducts } from "@/app/shared/services/product/controller";
import type {
  IBaseLangPage,
  ICustomList,
  IProduct,
  IUser,
} from "@/app/shared/interfaces";

export default async function Home({ params: { lng } }: IBaseLangPage) {
  const me = (await getMe()) as IUser;
  const myLists = (await getMyLists({ isForFav: true })) as ICustomList[];
  const products = (await getAllProducts()) as IProduct[];

  return (
    <article className="pt-40 md:pt-24 px-4 pb-4 flex flex-col gap-8">
      <Hero lng={lng} />
      <RecentList
        lng={lng}
        userId={me?.id}
        myLists={myLists}
        products={products}
        category="Electronics"
      />
      <RecentList
        lng={lng}
        category="Toys"
        userId={me?.id}
        myLists={myLists}
        products={products}
      />
    </article>
  );
}
