import Link from "next/link";
import Image from "next/image";
import HeroPic from "@/public/products/electronics/apple-watch/apple-watch-0.webp";

const Hero = ({ lng }: { lng: string }) => {
  return (
    <article className="w-full flex justify-between">
      <div className="w-1/2 md:w-2/5 flex flex-col items-start justify-center">
        <small className="text-sm sm:text-lg md:text-xl lg:text-4xl tracking-widest">
          THE BEST
        </small>
        <h1 className="text-2xl sm:text-5xl md:text-7xl lg:text-9xl font-bold">
          Apple Watch
        </h1>
        <p className="text-lg sm:text-2xl md:text-4xl lg:text-6xl md:mt-4 font-thin">
          It is not just a gadget, it is all you need.
        </p>
        <Link
          href={`/${lng}/apple-watch`}
          className="mt-4 md:mt-10 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm sm:text-base md:text-lg lg:text-xl"
        >
          Buy it now
        </Link>
      </div>
      <Link href={`/${lng}/apple-watch`} className="w-1/2 md:w-3/5">
        <Image alt="Hero" src={HeroPic} className="size-full" priority />
      </Link>
    </article>
  );
};

export default Hero;
