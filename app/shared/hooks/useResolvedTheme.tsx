import { useTheme } from "./useTheme";
import { useEffect, useState } from "react";

export const useResolvedTheme = () => {
  const { theme } = useTheme();
  const [resolvedTheme, setResolvedTheme] = useState(theme);

  useEffect(() => {
    if (theme === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setResolvedTheme(systemPrefersDark ? "dark" : "light");
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  return resolvedTheme;
};
