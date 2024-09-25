import Link from "next/link";
import { cn } from "@/app/utils/cn";

interface IGenericBackToPage {
  link: string;
  title: string;
  linkText: string;
  description: string;
  isWithMDExtraPadding?: boolean;
}

const GenericBackToPage = ({
  link,
  title,
  linkText,
  description,
  isWithMDExtraPadding,
}: IGenericBackToPage) => {
  return (
    <section
      className={cn(
        "flex flex-col h-screen items-center justify-center px-4 pb-4 text-center",
        isWithMDExtraPadding ? "pt-40 md:pt-24" : "pt-24"
      )}
    >
      <h1 className="text-3xl md:text-6xl font-bold">{title}</h1>
      <p className="text-gray-500 dark:text-gray-200 text-xl md:text-3xl">
        {description}
      </p>
      <Link
        href={link}
        className="text-base md:text-xl px-4 py-2 mt-4 rounded-lg text-white dark:text-blue-300 bg-blue-600 dark:bg-blue-950 hover:bg-blue-700 dark:hover:bg-blue-900 border border-blue-600 hover:border-blue-700 dark:border-blue-300 transition-colors duration-300"
      >
        {linkText}
      </Link>
    </section>
  );
};

export default GenericBackToPage;
