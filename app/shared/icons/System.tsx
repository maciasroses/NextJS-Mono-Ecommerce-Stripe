import { cn } from "@/app/shared/utils/cn";
import type { IGenericIcon } from "@/app/shared/interfaces";

interface ISystem extends IGenericIcon {
  theme: string;
}

const System = ({
  theme,
  size = "size-6",
  customClass = "",
  strokeWidth = 1.5,
}: ISystem) => {
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
        theme === "system"
          ? "text-blue-600 dark:text-blue-300"
          : "text-gray-500 hover:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      )}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
      />
    </svg>
  );
};

export default System;
