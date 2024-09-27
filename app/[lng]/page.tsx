import { useTranslation } from "@/app/i18n";
import { Hero, RecentList } from "@/app/components";
import { getSession } from "@/app/services/user/controller";
import { getAllProducts } from "@/app/services/product/controller";
import { getListsByUserId } from "@/app/services/customList/controller";
import type { IBaseLangPage, ICustomList, IProduct } from "@/app/interfaces";

export default async function Home({ params: { lng } }: IBaseLangPage) {
  // const { t } = await useTranslation(lng, "test");
  let myLists: ICustomList[] = [];
  const session = await getSession();
  if (session) {
    myLists = (await getListsByUserId({
      userId: session.userId as string,
    })) as ICustomList[];
  }

  const products = (await getAllProducts()) as IProduct[];

  return (
    <section className="pt-40 md:pt-24 px-4 pb-4 flex flex-col gap-8">
      <Hero lng={lng} />
      <article>
        <RecentList
          lng={lng}
          userId={session?.userId as string}
          myLists={myLists}
          category="Electronics"
          products={products}
        />
      </article>
      <article>
        <RecentList
          lng={lng}
          userId={session?.userId as string}
          myLists={myLists}
          category="Toys"
          products={products}
        />
      </article>
    </section>
  );
}
