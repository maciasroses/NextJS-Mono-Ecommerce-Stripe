"use client";

import Link from "next/link";
import CartMenu from "./CartMenu";
import { cn } from "@/app/utils/cn";
import MainSearch from "./MainSearch";
import ProfileMenu from "./ProfileMenu";
import FiltersMenu from "./FiltersMenu";
import LangSelector from "./LangSelector";
import ThemeSelector from "./ThemeSelector";
import { usePathname } from "next/navigation";
import type { IProduct, IUser } from "@/app/interfaces";

interface IHeader {
  lng: string;
  user: IUser | null;
  products: IProduct[];
}

const Header = ({ lng, user, products }: IHeader) => {
  const pathname = usePathname();
  return (
    <header className="fixed z-30 top-0 w-full md:h-20 bg-gray-50 dark:bg-gray-800">
      <div className="h-full flex flex-col md:flex-row items-center p-4 gap-4 max-w-[1440px] mx-auto">
        <div className="w-full flex justify-between items-center gap-4">
          <Link href={`/${lng}`} className="text-4xl dark:text-white">
            LOGO
          </Link>
          {pathname !== `/${lng}/login` &&
            pathname !== `/${lng}/signup` &&
            !pathname.startsWith(`/${lng}/checkout`) && (
              <div className="w-full max-w-2xl hidden md:block">
                <MainSearch id="search-bar" lng={lng} />
              </div>
            )}
          <div className="flex items-center gap-2">
            <ThemeSelector lng={lng} />
            <LangSelector lng={lng} />
            {pathname !== `/${lng}/login` &&
              pathname !== `/${lng}/signup` &&
              !pathname.startsWith(`/${lng}/checkout`) && (
                <CartMenu lng={lng} products={products} />
              )}
            {user && pathname !== `/${lng}/checkout` ? (
              <ProfileMenu lng={lng} user={user} />
            ) : (
              <>
                {pathname !== `/${lng}/login` &&
                  pathname !== `/${lng}/signup` &&
                  !pathname.startsWith(`/${lng}/checkout`) && (
                    <Link
                      href={`/${lng}/login`}
                      className="px-4 py-2 text-sm rounded-lg text-white dark:text-blue-300 bg-blue-600 dark:bg-blue-950 hover:bg-blue-700 dark:hover:bg-blue-900 border border-blue-600 hover:border-blue-700 dark:border-blue-300"
                    >
                      {lng === "en" ? "Log in" : "Ingresa"}
                    </Link>
                  )}
              </>
            )}
          </div>
        </div>
        {pathname !== `/${lng}/login` &&
          pathname !== `/${lng}/signup` &&
          !pathname.startsWith(`/${lng}/checkout`) && (
            <div
              className={cn(
                "w-full md:hidden",
                pathname === `/${lng}/search` && "flex gap-2"
              )}
            >
              <div className="w-full">
                <MainSearch id="mobile-search-bar" lng={lng} />
              </div>
              {pathname === `/${lng}/search` && <FiltersMenu lng={lng} />}
            </div>
          )}
      </div>
    </header>
  );
};

export default Header;
