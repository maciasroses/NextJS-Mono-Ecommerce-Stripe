import { Suspense } from "react";
import { Pagination } from "@/app/shared/components";
import { getMyAddresses } from "@/app/shared/services/address/controller";
import type {
  IAddressesList,
  IAddressSearchParams,
  IBaseLangPage,
} from "@/app/shared/interfaces";
import AddressesList from "./components/AddressesList";
import Create from "./components/Create";

interface IProfileAddressesPage extends IBaseLangPage {
  searchParams?: IAddressSearchParams;
}

const ProfileAddressesPage = async ({
  searchParams,
  params: { lng },
}: IProfileAddressesPage) => {
  const { page = "1" } = searchParams || {};

  const searchParamsForList = {
    page,
  };

  const { totalPages } = (await getMyAddresses(
    searchParamsForList
  )) as IAddressesList;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl">Addresses</h1>
        <Create />
      </div>
      <Suspense key={page} fallback={<h2>LOADING...</h2>}>
        <AddressesList searchParams={searchParamsForList} />
      </Suspense>
      <Pagination lng={lng} totalPages={totalPages} />
    </>
  );
};

export default ProfileAddressesPage;
