import { cn } from "@/app/utils/cn";
import type { IGenericIcon } from "@/app/interfaces";

const DownChevron = ({ size = "size-6", customClass = "" }: IGenericIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={cn(size, customClass)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

export default DownChevron;