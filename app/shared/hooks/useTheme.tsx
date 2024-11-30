import { useContext } from "react";
import { ThemeContext, IThemeContext } from "@/app/providers/ThemeProvider";

export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
