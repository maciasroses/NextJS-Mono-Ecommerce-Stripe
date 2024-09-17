import { notFound } from "next/navigation";
import { getProductBySlug } from "@/app/services/product/controller";
import type { IProduct } from "@/app/interfaces";

import { ProductCard } from "@/app/components";

const SlugPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const product = (await getProductBySlug({ slug })) as IProduct;
  if (!product) notFound();
  return (
    <div className="pt-40 sm:pt-24 px-4 pb-4">
      {/* THIS CARD IS NOT FOREVER */}
      <ProductCard lng="en" product={product} />
    </div>
  );
};

export default SlugPage;
