"use client";

import Filters from "./Filters";
import { useState } from "react";
import { cn } from "@/app/shared/utils/cn";
import { Filters as FiltersIcon, XMark } from "@/app/shared/icons";

const FiltersMenu = ({ lng }: { lng: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button
        aria-label="Filters"
        onClick={toggleMenu}
        className="h-full flex items-center"
      >
        <FiltersIcon size="size-8" strokeWidth={1} />
      </button>
      <div
        className={cn(
          "bg-white dark:bg-gray-800 fixed top-0 right-0 h-full w-64 shadow-lg transform transition-transform z-40",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          onClick={toggleMenu}
          aria-label="Close Cart"
          className="absolute top-0 right-0 m-4"
        >
          <XMark />
        </button>
        <div className="p-4">
          <Filters lng={lng} />
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default FiltersMenu;
