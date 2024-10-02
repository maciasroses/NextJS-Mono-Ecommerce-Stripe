import { notFound } from "next/navigation";
import { ProductSlugCard } from "./components";
import { getMe } from "@/app/services/user/controller";
import { getMyLists } from "@/app/services/customList/controller";
import { getProductBySlug } from "@/app/services/product/controller";
import type { IProduct, ICustomList, IUser } from "@/app/interfaces";

interface ISlugPage {
  params: {
    lng: string;
    slug: string;
  };
}

const SlugPage = async ({ params: { lng, slug } }: ISlugPage) => {
  const me = (await getMe()) as IUser;
  const myLists = (await getMyLists({ isForFav: true })) as ICustomList[];
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
        userId={me?.id}
        product={product}
        myLists={myLists}
        isFavorite={isFavorite}
      />
    </div>
  );
};

export default SlugPage;
