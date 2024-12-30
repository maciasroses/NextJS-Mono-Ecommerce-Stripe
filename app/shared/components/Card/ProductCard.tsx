import Link from "next/link";
import Image from "next/image";
import formatCurrency from "@/app/shared/utils/format-currency";
import { AddToCart, AddCustomList } from "@/app/shared/components";
import type {
  ICustomList,
  // IProduct,
  IProductFile,
  IProductVariant,
} from "@/app/shared/interfaces";
import { formatToSnakeCase } from "../../utils/formatToSnakeCase";

interface IProductCard {
  lng: string;
  userId: string;
  myLists: ICustomList[];
  product: {
    name: string;
    slug: string;
    files: IProductFile[];
    variant: IProductVariant;
  };
}

const ProductCard = ({ lng, userId, myLists, product }: IProductCard) => {
  const isFavorite = myLists.some((list) => {
    return list.products.some(
      (myProduct) => myProduct.productId === product.variant.id
    );
  });

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link
        href={`/${lng}/${product.slug}`}
        className="flex justify-center p-8"
      >
        <Image
          className="size-auto"
          alt={`${product.name} (${product.variant.size}) ${
            product.variant.color !== "" ? `- ${product.variant.color}` : ""
          }`}
          src={
            product.files.find(
              (file) =>
                file.type === "IMAGE" &&
                file.url.includes(
                  `${formatToSnakeCase(
                    product.variant.color as string
                  ).toLowerCase()}_0`
                )
            )?.url ?? product.files[0].url
          }
          width={500}
          height={300}
        />
      </Link>
      <div className="flex flex-col gap-2 px-5 pb-5 relative">
        <div className="absolute top-0 right-5">
          <AddCustomList
            lng={lng}
            myLists={myLists}
            userId={userId}
            productId={product.variant.id}
            isFavorite={isFavorite}
          />
        </div>
        <Link href={`/${lng}/${product.slug}`}>
          <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {`${product.name} (${product.variant.size}) ${
              product.variant.color !== "" ? `- ${product.variant.color}` : ""
            }`}
          </h1>
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(product.variant.priceInCents / 100, "MXN")}
          </span>
        </Link>
        <AddToCart lng={lng} product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
