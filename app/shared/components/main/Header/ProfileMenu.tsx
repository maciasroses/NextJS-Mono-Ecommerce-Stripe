"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/app/shared/utils/cn";
import { useAuth } from "@/app/shared/hooks";
import { DownChevron } from "@/app/shared/icons";
import { useTranslation } from "@/app/i18n/client";
import { useEffect, useRef, useState } from "react";
import { logout } from "@/app/shared/services/user/controller";
import type { IUser } from "@/app/shared/interfaces";

interface IProfileLink {
  to: string;
  text: string;
  onClick: () => void;
  customClass?: string;
}

const ProfileLink = ({ to, onClick, text, customClass }: IProfileLink) => {
  return (
    <Link
      href={to}
      className={cn(
        "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white",
        customClass
      )}
      onClick={onClick}
    >
      {text}
    </Link>
  );
};

const ProfileMenu = ({ lng, user }: { lng: string; user: IUser }) => {
  const menuRef = useRef(null);
  const { setUser } = useAuth();
  const { t } = useTranslation(lng, "header");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const {
    home,
    logout: logoutBtn,
    profile: {
      title: profileTitle,
      home: profileHome,
      lists: profileLists,
      orders: profileOrders,
    },
  } = JSON.parse(t("profileMenu"));

  const handleProfileMenu = () => {
    setProfileMenu(!profileMenu);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !(menuRef.current as HTMLElement).contains(event.target as Node)
    ) {
      setMenuOpen(false);
      setProfileMenu(false);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setProfileMenu(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={toggleMenu}
        className="size-10 rounded-full flex items-center"
      >
        <Image
          alt="Profile"
          src={user.image}
          width={40}
          height={40}
          className="size-full object-cover rounded-full"
        />
      </button>
      {menuOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow list-none bg-red-white bg-gray-50 dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
          aria-roledescription="menu"
        >
          <div className="py-1" aria-roledescription="none">
            <div className="px-4 py-3">
              <p className="text-base text-gray-900 dark:text-white">
                {user.username}
              </p>
              <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                {user.email}
              </p>
            </div>
            <div className="border-t border-gray-300 dark:border-gray-800"></div>
            <ProfileLink
              to={user.role === "ADMIN" ? `/${lng}/admin` : `/${lng}`}
              onClick={closeMenu}
              text={home}
            />
            {user.role === "ADMIN" && (
              <ProfileLink
                to="/admin/sales"
                onClick={closeMenu}
                text="Ventas"
              />
            )}
            <p
              onClick={handleProfileMenu}
              className="relative block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
            >
              {profileTitle}
              <span
                className={cn(
                  "absolute right-4 top-2.5 transform transition-all duration-300",
                  profileMenu ? " rotate-180" : "rotate-0"
                )}
              >
                <DownChevron size="size-4" />
              </span>
            </p>
            <ul
              className={`${
                profileMenu ? "block" : "hidden"
              } transition duration-300`}
            >
              <li>
                <ProfileLink
                  text={profileHome}
                  customClass="pl-8"
                  onClick={closeMenu}
                  to={`/${lng}/profile`}
                />
              </li>
              <li>
                <ProfileLink
                  text={profileLists}
                  customClass="pl-8"
                  onClick={closeMenu}
                  to={`/${lng}/profile/lists`}
                />
              </li>
              <li>
                <ProfileLink
                  text={profileOrders}
                  customClass="pl-8"
                  onClick={closeMenu}
                  to={`/${lng}/profile/orders`}
                />
              </li>
            </ul>
            {user.role === "ADMIN" && (
              <>
                <ProfileLink
                  to="/admin/products"
                  onClick={closeMenu}
                  text="Productos"
                />
                <ProfileLink
                  to="/admin/providers"
                  onClick={closeMenu}
                  text="Proveedores"
                />
              </>
            )}
            <div className="border-t border-gray-300 dark:border-gray-800"></div>
            <form action={logout}>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left"
                type="submit"
              >
                {logoutBtn}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
