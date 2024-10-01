"use client";

import { cn } from "@/app/utils/cn";
import { useTranslation } from "../i18n/client";
import { CATEGORIES_FILTERS } from "@/app/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LanguageTypeForSchemas } from "../interfaces";

interface IFiltersComp {
  lng: string;
}

const Filters = ({ lng }: IFiltersComp) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation(lng, "filters");
  const categoriesTitle = t("categories");
  const {
    title: priceTitle,
    fromInput,
    toInput,
    applyBtn,
  } = JSON.parse(t("price"));

  const handleCategory = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    params.set("category", category);
    replace(`${pathname}?${params.toString()}`);
  };

  const handlePrice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams(searchParams);
    params.delete("page");
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
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-medium text-lg">{categoriesTitle}</p>
        <ul className="flex flex-col">
          {CATEGORIES_FILTERS[lng as LanguageTypeForSchemas].map(
            ({ label, category }) => (
              <li key={category}>
                <ButtonCategoryComponent
                  label={label}
                  category={category}
                  searchParams={searchParams}
                  handleCategory={handleCategory}
                />
              </li>
            )
          )}
        </ul>
      </div>
      <div>
        <p className="font-medium text-lg">{priceTitle}</p>
        <form onSubmit={handlePrice} className="flex gap-2 flex-col ml-5 mt-2">
          <div className="flex gap-2 items-center">
            <InputField
              name="priceFrom"
              placeholder={fromInput}
              defaultValue={searchParams.get("priceFrom")}
            />
            {" - "}
            <InputField
              name="priceTo"
              placeholder={toInput}
              defaultValue={searchParams.get("priceTo")}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg text-white dark:text-blue-300 bg-blue-600 dark:bg-blue-950 hover:bg-blue-700 dark:hover:bg-blue-900 border border-blue-600 hover:border-blue-700 dark:border-blue-300"
          >
            {applyBtn}
          </button>
        </form>
      </div>
    </div>
  );
};

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
}) => (
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

const InputField = ({
  name,
  placeholder,
  defaultValue,
}: {
  name: string;
  placeholder: string;
  defaultValue: string | null;
}) => (
  <input
    type="number"
    step="0.01"
    name={name}
    min="0"
    max="19999999"
    placeholder={placeholder}
    defaultValue={defaultValue ?? ""}
    className="w-full p-2 rounded-lg focus:outline-none border bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white dark:placeholder-gray-400 border-gray-300 focus:border-gray-500 dark:focus:border-gray-100"
  />
);

export default Filters;
