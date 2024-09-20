import { cn } from "@/app/utils/cn";

interface ILeftArrow {
  size?: string;
  customClass?: string;
}

const LeftArrow = ({ size = "size-6", customClass = "" }: ILeftArrow) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn(size, customClass)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
  );
};

export default LeftArrow;
