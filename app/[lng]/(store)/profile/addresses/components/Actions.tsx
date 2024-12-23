"use client";

import { ElipsisList } from "@/app/shared/icons";
import { useEffect, useRef, useState } from "react";

interface IActions {
  lng: string;
}

const Actions = ({ lng }: IActions) => {
  console.log(lng);
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !(menuRef.current as HTMLElement).contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute top-4 right-4" ref={menuRef}>
      <button onClick={handleModal}>
        <ElipsisList />
      </button>
      {isOpen && (
        <div className="w-36 origin-top-right absolute right-4 top-10 rounded-md shadow-lg bg-gray-50 dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none  flex flex-col">
          <button>Edit</button>
          <button>Delete</button>
          <button>Make as default</button>
        </div>
      )}
    </div>
  );
};

export default Actions;
