"use client";

import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/app/shared/utils/cn";
import { Loading } from "@/app/shared/components";

const colorMap: { [key: string]: string } = {
  red: "link-button-red",
  blue: "link-button-blue",
  green: "link-button-green",
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
      className={cn(pending && "cursor-not-allowed", colorMap[color])}
    >
      {pending ? <Loading color={color} /> : title}
    </button>
  );
};

export default SubmitButton;
