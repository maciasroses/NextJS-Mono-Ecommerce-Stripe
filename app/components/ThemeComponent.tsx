"use client";

import { ThemeProvider } from "@/app/providers";

const ThemeComponent = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default ThemeComponent;
