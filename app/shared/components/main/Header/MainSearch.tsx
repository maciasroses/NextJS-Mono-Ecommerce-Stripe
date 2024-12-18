"use client";

import { useState } from "react";
import { Search } from "@/app/shared/icons";
import { useTranslation } from "@/app/i18n/client";
import { useRouter, useSearchParams } from "next/navigation";

interface IMainSearch {
  id: string;
  lng: string;
}

const MainSearch = ({ id, lng }: IMainSearch) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const { t } = useTranslation(lng, "header");
  const { placeholder, searchBtn } = JSON.parse(t("mainSearch"));

  const handleQChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query) {
      const params = new URLSearchParams();
      params.set("q", query);
      push(`/${lng}/search?${params.toString()}`);
    } else {
      push(`/${lng}`);
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <search>
      <label
        htmlFor={id}
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        {searchBtn}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3">
          <Search size="size-4 text-gray-400" />
        </div>
        <input
          type="search"
          id={id}
          autoComplete="on"
          onChange={handleQChange}
          onKeyDown={handleEnter}
          defaultValue={searchParams.get("q") || ""}
          className="block w-full p-4 ps-10 text-sm focus:outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-gray-500 dark:focus:border-gray-400 dark:text-white"
          placeholder={placeholder}
        />
        <button
          onClick={handleSearch}
          className="link-button-blue absolute end-2 bottom-2 font-medium text-sm"
        >
          {searchBtn}
        </button>
      </div>
    </search>
  );
};

export default MainSearch;
