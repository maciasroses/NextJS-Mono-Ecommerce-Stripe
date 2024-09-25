"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex -space-x-px text-sm mt-4 justify-center w-full">
        <li>
          {currentPage > 1 ? (
            <Link
              href={createPageURL(currentPage - 1)}
              passHref
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </Link>
          ) : (
            <span
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-300 bg-gray-100 border border-e-0 border-gray-300 rounded-s-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-500 cursor-not-allowed select-none"
              aria-disabled="true"
            >
              Previous
            </span>
          )}
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i + 1}>
            <Link
              href={createPageURL(i + 1)}
              passHref
              className={`flex items-center justify-center px-3 h-8 leading-tight border ${
                currentPage === i + 1
                  ? "text-white dark:text-blue-300 bg-blue-600 dark:bg-blue-950 hover:bg-blue-700  dark:hover:bg-blue-900 border-2 border-blue-600 hover:border-blue-700 dark:border-blue-300 transition-colors duration-300"
                  : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              {i + 1}
            </Link>
          </li>
        ))}
        <li>
          {currentPage < totalPages ? (
            <Link
              href={createPageURL(currentPage + 1)}
              passHref
              className="flex items-center justify-center px-3 h-8 leading-tight border rounded-e-lg text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </Link>
          ) : (
            <span
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-300 bg-gray-100 border rounded-e-lg border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-500 cursor-not-allowed select-none"
              aria-disabled="true"
            >
              Next
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
