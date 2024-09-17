import Image from "next/image";
import HeroPic from "@/public/products/electronics/apple-watch/apple-watch-0.webp";
import Link from "next/link";

const Hero = ({ lng }: { lng: string }) => {
  return (
    <Link
      href={`/${lng}/apple-watch`}
      className="w-full rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4"
    >
      <h1 className="sm:w-1/2 text-2xl sm:text-5xl md:text-9xl line-clamp-3">
        Discover the best
      </h1>
      <div className="sm:w-1/2">
        <Image alt="Hero" src={HeroPic} className="rounded-xl" priority />
      </div>
    </Link>
  );
};

export default Hero;

// bg-gray-100 dark:bg-gray-600
