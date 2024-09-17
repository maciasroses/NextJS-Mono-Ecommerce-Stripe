import Link from "next/link";
import { Metadata } from "next";
import { Form } from "./components";
import { IBaseLangPage } from "@/app/interfaces";

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
            <Link className="text-blue-500" href={`/${lng}/signup`}>
              Sign up
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
