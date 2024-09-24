"use client";

import clsx from "clsx";
import Link from "next/link";
import {
  HomeIcon,
  Dollar,
  // ShoppingBag,
  Puzzle,
  // UserIcon,
} from "@/public/icons";
import { usePathname } from "next/navigation";

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
        "flex items-center p-2 rounded-lg group group-hover:bg-accent hover:bg-accent",
        isActive && "bg-accent"
      )}
    >
      {icon === "home" ? (
        <HomeIcon isActive={isActive} />
      ) : icon === "sales" ? (
        <Dollar isActive={isActive} />
      ) : icon === "orders" ? // <ShoppingBag isActive={isActive} />
      null : icon === "products" ? (
        <Puzzle isActive={isActive} />
      ) : null}
      {/* ) : (
         icon === "providers" && <UserIcon isActive={isActive} />
       )} */}
      <span className="ms-3 font-black">{span}</span>
    </Link>
  );
};

export default LinkComp;
