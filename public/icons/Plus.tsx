import { cn } from "@/app/utils/cn";

interface IPlus {
  size?: string;
  customClass?: string;
}

const Plus = ({ size = "size-6", customClass = "" }: IPlus) => {
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
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
};

export default Plus;
