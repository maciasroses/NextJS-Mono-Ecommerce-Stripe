import { Greetings, MainInfo } from "./components";
import type { IBaseLangPage } from "@/app/shared/interfaces";

interface IProfileHomePage extends IBaseLangPage {}

const ProfileHomePage = ({ params: { lng } }: IProfileHomePage) => {
  return (
    <>
      <Greetings lng={lng} />
      <div className="flex flex-col md:flex-row gap-2 mt-4">
        <MainInfo lng={lng} />
      </div>
    </>
  );
};

export default ProfileHomePage;
