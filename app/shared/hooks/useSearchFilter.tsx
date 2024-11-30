import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface FilterConfig {
  [key: string]: string;
}

export const useSearchFilter = (defaultFilters: FilterConfig) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const initialFilters = Object.keys(defaultFilters).reduce((acc, key) => {
    acc[key] = searchParams.get(key) || defaultFilters[key];
    return acc;
  }, {} as FilterConfig);

  const [filters, setFilters] = useState(initialFilters);

  const handleDebouncedSearch = useDebouncedCallback(
    (updatedFilters: FilterConfig) => {
      const newParams = new URLSearchParams();
      Object.entries(updatedFilters).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, String(value));
        }
      });
      replace(`${pathname}?${newParams.toString()}`);
    },
    300
  );

  const handleSearch = (key: string, value: string) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, [key]: value };
      handleDebouncedSearch(updatedFilters);
      return updatedFilters;
    });
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    replace(pathname);
  };

  return { filters, handleSearch, clearFilters };
};
