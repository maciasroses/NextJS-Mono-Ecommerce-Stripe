"use client";

import { useFormStatus } from "react-dom";
import Loading from "../Loading";
import { cn } from "@/app/utils/cn";
import { useEffect } from "react";

const colorMap: { [key: string]: string } = {
  red: "bg-red-500 hover:bg-red-600 focus:ring-red-500",
  blue: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
  green: "bg-green-500 hover:bg-green-600 focus:ring-green-500",
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
        "px-4 py-2 text-white rounded-md w-auto transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 border borde-white",
        pending ? `${colorMap[color]}/50` : colorMap[color]
      )}
    >
      {pending ? <Loading color={color} /> : title}
    </button>
  );
};

export default SubmitButton;
