"use client";

import { cn } from "@/app/shared/utils/cn";
import { useTheme } from "@/app/shared/hooks";
import { useTranslation } from "@/app/i18n/client";
import { useEffect, useRef, useState } from "react";
import { Moon, Light, System } from "@/app/shared/icons";

interface IThemeButton {
  span: string;
  theme: string;
  icon: JSX.Element;
  themeColor: string;
  handleThemeChange: () => void;
}

const ThemeButton = ({
  icon,
  span,
  theme,
  themeColor,
  handleThemeChange,
}: IThemeButton) => {
  return (
    <button
      aria-label="Botón de cambio de tema"
      onClick={handleThemeChange}
      className={cn(
        "w-full flex items-center gap-2 p-2 rounded-md group hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-white",
        theme === themeColor && "text-blue-600 dark:text-blue-300"
      )}
    >
      {icon}
      <span>{span}</span>
    </button>
  );
};

const ThemeSelector = ({ lng }: { lng: string }) => {
  const menuRef = useRef(null);
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation(lng, "header");
  const [menuOpen, setMenuOpen] = useState(false);
  const { light, dark, system } = JSON.parse(t("themeSelector"));
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
    setMenuOpen(false);
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
    }
  };

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    setSystemTheme(darkModeMediaQuery.matches ? "dark" : "light");

    darkModeMediaQuery.addEventListener("change", handleSystemThemeChange);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleSystemThemeChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center"
        aria-label="Theme selector"
      >
        {theme === "light" ||
        (theme === "system" && systemTheme === "light") ? (
          <Light theme={theme} />
        ) : (
          <Moon theme={theme} />
        )}
      </button>
      {menuOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow list-none bg-gray-50 dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
          aria-roledescription="menu"
        >
          <div aria-roledescription="none">
            <ThemeButton
              theme={theme}
              themeColor="light"
              handleThemeChange={() => handleThemeChange("light")}
              icon={<Light theme={theme} />}
              span={light}
            />
            <ThemeButton
              theme={theme}
              themeColor="dark"
              handleThemeChange={() => handleThemeChange("dark")}
              icon={<Moon theme={theme} />}
              span={dark}
            />
            <ThemeButton
              theme={theme}
              themeColor="system"
              handleThemeChange={() => handleThemeChange("system")}
              icon={<System theme={theme} />}
              span={system}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
