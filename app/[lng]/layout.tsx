import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { dir } from "i18next";
import { languages } from "@/app/i18n/settings";
import { ToastContainer } from "react-toastify";
import { getAllProducts } from "../services/product/controller";
import { getSession, getUserById } from "@/app/services/user/controller";
import {
  Footer,
  Header,
  AuthComponent,
  CartComponent,
  ThemeComponent,
} from "@/app/components";
import type { Metadata } from "next";
import type { IBaseLangPage, IProduct, IUser } from "@/app/interfaces";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  title: {
    template: "%s | Ecommerce",
    default: "Ecommerce",
  },
  description: "A basic ecommerce site",
};

interface RootLayoutProps extends IBaseLangPage {
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
  params: { lng },
}: Readonly<RootLayoutProps>) {
  const session = await getSession();
  let user = null;
  if (session)
    user =
      ((await getUserById({ id: session.userId as string })) as IUser) || null;

  const products = (await getAllProducts()) as IProduct[];

  return (
    <html lang={lng} dir={dir(lng)}>
      <body
        suppressHydrationWarning
        className="dark:bg-gray-950 dark:text-white"
      >
        <ThemeComponent>
          <CartComponent>
            <AuthComponent>
              <ToastContainer />
              <Header user={user} lng={lng} products={products} />
              <main className="w-full min-h-screen max-w-[1440px] mx-auto">
                {children}
              </main>
              <Footer />
            </AuthComponent>
          </CartComponent>
        </ThemeComponent>
      </body>
    </html>
  );
}
