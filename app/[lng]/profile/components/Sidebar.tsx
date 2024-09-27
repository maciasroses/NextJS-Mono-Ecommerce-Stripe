"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BulletList from "@/public/icons/BulletList";
import { ShoppingBag, UserIcon } from "@/public/icons";

const Sidebar = ({ lng }: { lng: string }) => {
  return (
    <aside className="fixed top-0 w-48 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-4 md:pt-24 pt-40 pb-4 overflow-y-auto">
        <ul className="space-y-2">
          <li>
            <LinkComp to={`/${lng}/profile/home`} span="Home" icon="home" />
          </li>
          <li>
            <LinkComp to={`/${lng}/profile/lists`} span="Lists" icon="lists" />
          </li>
          <li>
            <LinkComp
              to={`/${lng}/profile/orders`}
              span="Orders"
              icon="orders"
            />
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

interface ILinkComp {
  to: string;
  span: string;
  icon: string;
}

const LinkComp = ({ to, span, icon }: ILinkComp) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(to);

  return (
    <Link
      href={to}
      className={clsx(
        "flex items-center p-2 group hover:text-blue-600 dark:hover:text-blue-300 border-l-2 border-transparent hover:border-l-blue-600 dark:hover:border-l-blue-300",
        isActive &&
          "text-blue-600 dark:text-blue-300 border-l-2 border-l-blue-600 dark:border-l-blue-300"
      )}
    >
      {icon === "home" ? (
        <UserIcon />
      ) : icon === "lists" ? (
        <BulletList />
      ) : (
        <ShoppingBag strokeWidth={1} />
      )}
      <span className="ms-3">{span}</span>
    </Link>
  );
};
