import { cn } from "@/app/utils/cn";
import type { IGenericIcon } from "@/app/interfaces";

const XMark = ({
  size = "size-6",
  customClass = "",
  strokeWidth = 1.5,
}: IGenericIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      className={cn(size, customClass)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};

export default XMark;
