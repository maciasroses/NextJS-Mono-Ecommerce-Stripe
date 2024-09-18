"use client";

import { cn } from "@/app/utils/cn";
import { Filters as FiltersIcon, XMark } from "@/public/icons";
import { useState } from "react";
import Filters from "../Filters";

const FiltersMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button
        aria-label="Filters"
        onClick={toggleMenu}
        className="h-full flex justify-end items-center"
      >
        <FiltersIcon />
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
          <Filters />
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
