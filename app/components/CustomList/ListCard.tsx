import Link from "next/link";
import Image from "next/image";
import Actions from "./Actions";
import type { ICustomList } from "@/app/interfaces";

interface IListCard {
  lng: string;
  customList: ICustomList;
}

const ListCard = ({ lng, customList }: IListCard) => {
  const customListForActions = {
    id: customList.id,
    name: customList.name,
    description: customList.description,
  };
  return (
    <div className="flex justify-between items-start border border-gray-200 rounded-lg">
      <Link
        href={`/${lng}/profile/lists/${customList.name}`}
        className="flex gap-2 m-4 w-full"
      >
        <div className="grid grid-cols-2 gap-2 min-h-[136px] min-w-[136px]">
          {customList.products.slice(0, 3).map((item) => (
            <Image
              key={item.productId}
              src={item.product.files[0].url}
              alt={item.product.name}
              width={50}
              height={50}
              className="size-16 object-contain"
            />
          ))}

          {customList.products.length > 4 ? (
            <div className="size-16 flex items-center justify-center bg-gray-100 text-black">
              +{customList.products.length - 3}
            </div>
          ) : (
            customList.products.length === 4 && (
              <Image
                key={customList.products[3].productId}
                src={customList.products[3].product.files[0].url}
                alt={customList.products[3].product.name}
                width={50}
                height={50}
                className="size-16 object-contain"
              />
            )
          )}
        </div>
        <div className="flex flex-col justify-center items-start">
          <h2 className="text-lg">{customList.name}</h2>
          <p className="text-base text-gray-500">{customList.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            {customList.products.length} products
          </p>
        </div>
      </Link>
      <Actions customList={customListForActions} />
    </div>
  );
};

export default ListCard;
