import { Hero, RecentList } from "@/app/components";
import { getSession } from "@/app/services/user/controller";
import { getAllProducts } from "@/app/services/product/controller";
import { getListByUserId } from "@/app/services/customList/controller";
import type { IBaseLangPage, ICustomList, IProduct } from "@/app/interfaces";

export default async function Home({ params: { lng } }: IBaseLangPage) {
  let myLists: ICustomList[] = [];
  const session = await getSession();
  if (session) {
    myLists = (await getListByUserId({
      userId: session.userId as string,
    })) as ICustomList[];
  }

  const products = (await getAllProducts()) as IProduct[];

  return (
    <div className="pt-40 sm:pt-24 px-4 pb-4 flex flex-col gap-4">
      <Hero lng={lng} />
      <RecentList
        lng={lng}
        userId={session?.userId as string}
        myLists={myLists}
        category="Electronics"
        products={products}
      />
      <RecentList
        lng={lng}
        userId={session?.userId as string}
        myLists={myLists}
        category="Toys"
        products={products}
      />
    </div>
  );
}
