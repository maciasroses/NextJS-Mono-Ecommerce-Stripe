"use client";

import { useTranslation } from "@/app/i18n/client";

const Footer = ({ lng }: { lng: string }) => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation(lng, "footer");
  const rights = t("rights");

  return (
    <footer className="w-full bg-black text-white">
      <section className="max-w-[1440px] mx-auto text-center p-4">
        <p>
          &copy; {currentYear} - {rights}
        </p>
      </section>
    </footer>
  );
};

export default Footer;
