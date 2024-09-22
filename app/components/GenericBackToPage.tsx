import Link from "next/link";

interface IGenericBackToPage {
  link: string;
  title: string;
  linkText: string;
  description: string;
}

const GenericBackToPage = ({
  link,
  title,
  linkText,
  description,
}: IGenericBackToPage) => {
  return (
    <section className="flex flex-col h-screen items-center justify-center pt-40 md:pt-24 px-4 pb-4 text-center">
      <h1 className="text-3xl md:text-6xl font-bold">{title}</h1>
      <p className="text-gray-500 dark:text-gray-200 text-xl md:text-3xl">
        {description}
      </p>
      <Link
        href={link}
        className="text-base md:text-xl text-white bg-blue-600 px-4 py-2 mt-4 rounded-full"
      >
        {linkText}
      </Link>
    </section>
  );
};

export default GenericBackToPage;
