"use client";

import Link from "next/link";
import CartMenu from "./CartMenu";
import MainSearch from "./MainSearch";
import ProfileMenu from "./ProfileMenu";
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
    <header className="fixed z-30 top-0 w-full sm:h-20 bg-gray-50 dark:bg-gray-800">
      <div className="h-full flex flex-col sm:flex-row items-center p-4 gap-4 max-w-[1440px] mx-auto">
        <div className="w-full flex justify-between items-center gap-4">
          <Link href={`/${lng}`} className="text-4xl dark:text-white">
            LOGO
          </Link>
          {pathname !== `/${lng}/login` &&
            pathname !== `/${lng}/signup` &&
            pathname !== `/${lng}/checkout` && (
              <div className="w-full max-w-2xl hidden sm:block">
                <MainSearch id="search-bar" lng={lng} />
              </div>
            )}
          <div className="flex items-center gap-2">
            <ThemeSelector />
            <LangSelector lng={lng} />
            {pathname !== `/${lng}/login` &&
              pathname !== `/${lng}/signup` &&
              pathname !== `/${lng}/checkout` && (
                <CartMenu lng={lng} products={products} />
              )}
            {user && pathname !== `/${lng}/checkout` ? (
              <ProfileMenu user={user} />
            ) : (
              <>
                {pathname !== `/${lng}/login` &&
                  pathname !== `/${lng}/signup` &&
                  pathname !== `/${lng}/checkout` && (
                    <Link
                      href={`/${lng}/login`}
                      className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 flex items-center"
                    >
                      Ingresa
                    </Link>
                  )}
              </>
            )}
          </div>
        </div>
        {pathname !== `/${lng}/login` &&
          pathname !== `/${lng}/signup` &&
          pathname !== `/${lng}/checkout` && (
            <div className="w-full block sm:hidden">
              <MainSearch id="mobile-search-bar" lng={lng} />
            </div>
          )}
      </div>
    </header>
  );
};

export default Header;
