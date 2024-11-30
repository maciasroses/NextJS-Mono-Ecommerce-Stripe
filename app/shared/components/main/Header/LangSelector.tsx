"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MXFlag, USFlag } from "@/app/shared/icons";
import { useEffect, useRef, useState } from "react";

interface LangSelectorProps {
  lng: string;
}

const LangSelector = ({ lng }: LangSelectorProps) => {
  const fullPathname = usePathname();
  // PATHWITHOUTLANG
  const splitPath = fullPathname.split("/");
  const currentPath = "/" + splitPath.slice(2).join("/");
  // PATHWITHOUTLANG
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !(menuRef.current as HTMLElement).contains(event.target as Node)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        type="button"
        onClick={toggleMenu}
        className="flex items-center"
        aria-label="Language selector"
      >
        {lng === "es" ? <MXFlag /> : <USFlag />}
      </button>
      {menuOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow list-none bg-red-white bg-gray-50 dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
          aria-roledescription="menu"
        >
          <div aria-roledescription="none">
            <SwitchLink
              value="es"
              flag={<MXFlag />}
              currentPath={currentPath}
              span={lng === "es" ? "Español" : "Spanish"}
            />
            <SwitchLink
              value="en"
              flag={<USFlag />}
              currentPath={currentPath}
              span={lng === "es" ? "Inglés" : "English"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LangSelector;

interface ISwitchLink {
  span: string;
  value: string;
  flag: JSX.Element;
  currentPath: string;
}

const SwitchLink = ({ value, currentPath, flag, span }: ISwitchLink) => {
  return (
    <Link
      href={`/${value}${currentPath}`}
      className="flex items-center p-2 rounded-md dark:hover:bg-gray-800 group w-full hover:bg-gray-200 text-gray-900 dark:text-white"
    >
      {flag}
      <span className="ml-2">{span}</span>
    </Link>
  );
};
