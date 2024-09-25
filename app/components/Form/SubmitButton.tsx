"use client";

import Loading from "../Loading";
import { useEffect } from "react";
import { cn } from "@/app/utils/cn";
import { useFormStatus } from "react-dom";

const colorMap: { [key: string]: string } = {
  red: "text-white dark:tex-red-300 bg-red-600 dark:bg-red-950 hover:bg-red-700 dark:hover:bg-red-900 focus:ring-red-600 dark:focus:ring-red-300 border border-red-600 hover:border-red-700 dark:border-red-300",
  blue: "text-white dark:text-blue-300 bg-blue-600 dark:bg-blue-950 hover:bg-blue-700 dark:hover:bg-blue-900 focus:ring-blue-600 dark:focus:ring-blue-950 border border-blue-600 hover:border-blue-700 dark:border-blue-300",
  green:
    "text-white dark:text-green-300 bg-green-600 dark:bg-green-950 hover:bg-green-700 dark:hover:bg-green-900 focus:ring-green-600 dark:focus:ring-green-950 border border-green-600 hover:boder-green-700 dark:border-green-300",
};

interface ISubmitButton {
  title: string;
  color?: string;
  handleChangeIsSearching: (value: boolean) => void;
}

const SubmitButton: React.FC<ISubmitButton> = ({
  title,
  color = "blue",
  handleChangeIsSearching,
}) => {
  const { pending } = useFormStatus();

  useEffect(() => {
    handleChangeIsSearching(pending);
  }, [pending, handleChangeIsSearching]);
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "px-4 py-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
        pending && "cursor-not-allowed",
        colorMap[color]
      )}
    >
      {pending ? <Loading color={color} /> : title}
    </button>
  );
};

export default SubmitButton;
