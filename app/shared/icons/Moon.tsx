import { cn } from "@/app/shared/utils/cn";
import type { IGenericIcon } from "@/app/shared/interfaces";

interface IMoon extends IGenericIcon {
  theme: string;
}

const Moon = ({
  theme,
  size = "size-6",
  customClass = "",
  strokeWidth = 1.5,
}: IMoon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      className={cn(
        "transition duration-75",
        size,
        customClass,
        theme === "dark"
          ? "text-blue-600 dark:text-blue-300"
          : "text-gray-500 hover:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      )}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
      />
    </svg>
  );
};

export default Moon;
