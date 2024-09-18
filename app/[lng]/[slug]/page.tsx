import { notFound } from "next/navigation";
import { ProductSlugCard } from "@/app/components";
import { getProductBySlug } from "@/app/services/product/controller";
import type { IProduct } from "@/app/interfaces";

const SlugPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const product = (await getProductBySlug({ slug })) as IProduct;
  if (!product) notFound();
  return (
    <div className="pt-40 md:pt-24 px-4 pb-4">
      <ProductSlugCard product={product} />
    </div>
  );
};

export default SlugPage;
