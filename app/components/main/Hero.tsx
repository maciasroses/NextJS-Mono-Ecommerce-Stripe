"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/app/i18n/client";
import HeroPic from "@/public/products/electronics/apple-watch/apple-watch-0.webp";

const Hero = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, "root");
  const {
    title,
    subtitle,
    description,
    secondaryDescription,
    callToActionBtn,
  } = JSON.parse(t("hero"));
  return (
    <section className="w-full flex justify-between">
      <div className="w-1/2 md:w-2/5 flex flex-col items-start justify-center">
        <small className="text-sm sm:text-lg md:text-xl lg:text-4xl tracking-widest">
          {title}
        </small>
        <h1 className="text-2xl sm:text-5xl md:text-7xl lg:text-9xl font-bold">
          {subtitle}
        </h1>
        <p className="text-lg sm:text-2xl md:text-4xl lg:text-6xl md:mt-4 font-thin">
          {description} <br />
          {secondaryDescription}
        </p>
        <Link
          href={`/${lng}/apple-watch`}
          className="link-button-blue mt-4 md:mt-10 text-sm sm:text-base md:text-lg lg:text-xl"
        >
          {callToActionBtn}
        </Link>
      </div>
      <Link href={`/${lng}/apple-watch`} className="w-1/2 md:w-3/5">
        <Image alt="Hero" src={HeroPic} className="size-full" priority />
      </Link>
    </section>
  );
};

export default Hero;
