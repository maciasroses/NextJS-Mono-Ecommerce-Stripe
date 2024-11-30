import { cn } from "@/app/shared/utils/cn";
import type { IGenericIcon } from "@/app/shared/interfaces";

interface ILight extends IGenericIcon {
  theme: string;
}

const Light = ({
  theme,
  size = "size-6",
  customClass = "",
  strokeWidth = 1.5,
}: ILight) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      className={cn(
        "transition duration-75 ",
        size,
        customClass,
        theme === "light"
          ? "text-blue-600 dark:text-blue-300"
          : "text-gray-500 hover:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      )}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
    </svg>
  );
};

export default Light;
