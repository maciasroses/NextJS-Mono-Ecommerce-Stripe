import { notFound } from "next/navigation";
import { ProductSlugCard } from "@/app/components";
import { getSession } from "@/app/services/user/controller";
import { getProductBySlug } from "@/app/services/product/controller";
import {
  getListByUserId,
  getListsByProductId,
} from "@/app/services/customList/controller";
import type {
  ICustomList,
  ICustomProductsList,
  IProduct,
} from "@/app/interfaces";

const SlugPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  let myLists: ICustomList[] = [];
  const session = await getSession();
  if (session) {
    myLists = (await getListByUserId({
      userId: session.userId as string,
    })) as ICustomList[];
  }

  const product = (await getProductBySlug({ slug })) as IProduct;
  if (!product) notFound();

  const lists = (await getListsByProductId({
    productId: product.id,
  })) as ICustomProductsList[];

  const isFavorite = lists.some((list) => {
    return myLists.some((myList) => myList.id === list.customListId);
  });

  return (
    <div className="pt-40 md:pt-24 px-4 pb-4">
      <ProductSlugCard product={product} isFavorite={isFavorite} />
    </div>
  );
};

export default SlugPage;
