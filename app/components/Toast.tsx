"use client";

import { toast, Slide, type ToastPosition } from "react-toastify";

interface IToast {
  theme: string;
  message: string;
  position?: ToastPosition;
  type: "success" | "error" | "info" | "warning";
}

const Toast = ({
  type = "info",
  theme,
  message,
  position = "bottom-right",
}: IToast) => {
  const options = {
    position,
    transition: Slide,
    closeOnClick: true,
    hideProgressBar: true,
    theme: theme === "dark" ? "dark" : "light",
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "warning":
      toast.warning(message, options);
      break;
    default:
      toast.info(message, options);
      break;
  }
};

export default Toast;
