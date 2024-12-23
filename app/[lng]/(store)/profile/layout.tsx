import { Sidebar } from "./components";
import type { IBaseLangPage } from "@/app/shared/interfaces";

interface IProfileLayout extends IBaseLangPage {
  children: React.ReactNode;
}

const ProfileLayout = async ({ children, params: { lng } }: IProfileLayout) => {
  return (
    <>
      <Sidebar lng={lng} />
      <article className="sm:ml-48 pt-40 md:pt-24 px-4 pb-4 min-h-screen">
        {children}
      </article>
    </>
  );
};

export default ProfileLayout;
