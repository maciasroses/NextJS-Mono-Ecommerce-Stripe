import Link from "next/link";
import { Metadata } from "next";
import { Form } from "./components";
import type { IBaseLangPage } from "@/app/interfaces";

export const metadata: Metadata = {
  title: "Log in",
};

const LoginPage = ({ params: { lng } }: IBaseLangPage) => {
  return (
    <div className="h-screen flex justify-center items-center pt-24 px-4 pb-4">
      <div className="flex flex-col items-center gap-4 max-h-full overflow-y-auto">
        <Form lng={lng} />
        <p>
          Not registered yet?{" "}
          <span>
            <Link
              className="hover:underline text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-600"
              href={`/${lng}/signup`}
            >
              Sign up
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
