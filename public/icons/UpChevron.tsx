import { cn } from "@/app/utils/cn";
import type { IGenericIcon } from "@/app/interfaces";

const UpChevron = ({ size = "size-6", customClass = "" }: IGenericIcon) => {
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
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      />
    </svg>
  );
};

export default UpChevron;
