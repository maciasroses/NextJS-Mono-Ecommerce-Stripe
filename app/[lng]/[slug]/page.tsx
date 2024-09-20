import { notFound } from "next/navigation";
import { ProductSlugCard } from "@/app/components";
import { getSession } from "@/app/services/user/controller";
import { getProductBySlug } from "@/app/services/product/controller";
import { getListByUserId } from "@/app/services/customList/controller";
import type { IProduct, ICustomList } from "@/app/interfaces";

interface ISlugPage {
  params: {
    lng: string;
    slug: string;
  };
}

const SlugPage = async ({ params: { lng, slug } }: ISlugPage) => {
  let myLists: ICustomList[] = [];
  const session = await getSession();
  if (session) {
    myLists = (await getListByUserId({
      userId: session.userId as string,
    })) as ICustomList[];
  }

  const product = (await getProductBySlug({ slug })) as IProduct;
  if (!product) notFound();

  const isFavorite = myLists.some((list) => {
    return list.products.some(
      (listProduct) => listProduct.productId === product.id
    );
  });

  return (
    <div className="pt-40 md:pt-24 px-4 pb-4">
      <ProductSlugCard
        lng={lng}
        userId={session?.userId as string}
        product={product}
        myLists={myLists}
        isFavorite={isFavorite}
      />
    </div>
  );
};

export default SlugPage;
