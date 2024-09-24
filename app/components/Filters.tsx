"use client";

import { cn } from "@/app/utils/cn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filters = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleCategory = (category: string) => {
    const params = new URLSearchParams(searchParams);
    // params.set("page", "1");
    params.delete("page");
    params.set("category", category);
    replace(`${pathname}?${params.toString()}`);
  };

  const handlePrice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams(searchParams);
    if (formData.get("priceFrom")) {
      params.set("priceFrom", formData.get("priceFrom") as string);
    } else {
      params.delete("priceFrom");
    }
    if (formData.get("priceTo")) {
      params.set("priceTo", formData.get("priceTo") as string);
    } else {
      params.delete("priceTo");
    }
    // params.set("page", "1");
    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <p className="font-medium text-lg">Categories</p>
          <ul className="flex flex-col">
            <li>
              <ButtonCategoryComponent
                label="Electronics"
                category="ELECTRONICS"
                searchParams={searchParams}
                handleCategory={handleCategory}
              />
            </li>
            <li>
              <ButtonCategoryComponent
                label="Books"
                category="BOOKS"
                searchParams={searchParams}
                handleCategory={handleCategory}
              />
            </li>
            <li>
              <ButtonCategoryComponent
                label="Clothing"
                category="CLOTHING"
                searchParams={searchParams}
                handleCategory={handleCategory}
              />
            </li>
            <li>
              <ButtonCategoryComponent
                label="Toys"
                category="TOYS"
                searchParams={searchParams}
                handleCategory={handleCategory}
              />
            </li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-lg">Price</p>
          <form
            onSubmit={handlePrice}
            className="flex gap-2 flex-col ml-5 mt-2"
          >
            <div className="flex gap-2 items-center">
              <input
                type="number"
                step="0.01"
                name="priceFrom"
                min="0"
                max="19999999"
                placeholder="From"
                defaultValue={searchParams.get("priceFrom")?.toString()}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800"
              />
              {" - "}
              <input
                type="number"
                step="0.01"
                name="priceTo"
                min="0"
                max="19999999"
                placeholder="To"
                defaultValue={searchParams.get("priceTo")?.toString()}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800"
              />
            </div>
            <button
              type="submit"
              className="w-full text-white dark:text-blue-300 bg-blue-600 dark:bg-blue-950 hover:bg-blue-700 dark:hover:bg-blue-900 dark:border-blue-300 dark:border-2 p-2 rounded-md"
            >
              Apply
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Filters;

const ButtonCategoryComponent = ({
  label,
  category,
  searchParams,
  handleCategory,
}: {
  label: string;
  category: string;
  searchParams: URLSearchParams;
  handleCategory: (category: string) => void;
}) => {
  return (
    <button
      onClick={() => handleCategory(category)}
      className={cn(
        "text-sm text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300 ml-5",
        searchParams.get("category") === category &&
          "text-blue-600 dark:text-blue-300"
      )}
    >
      {label}
    </button>
  );
};
