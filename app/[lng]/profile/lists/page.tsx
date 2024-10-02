import { ListsList } from "./components";
import { useTranslation } from "@/app/i18n";
import { CustomListsListSkeleton, Pagination } from "@/app/components";
import { getMyLists } from "@/app/services/customList/controller";
import type {
  IBaseLangPage,
  ICustomListList,
  ICustomListSearchParams,
} from "@/app/interfaces";
import { Suspense } from "react";

interface IProfileListsPage extends IBaseLangPage {
  searchParams?: ICustomListSearchParams;
}

const ProfileListsPage = async ({
  searchParams,
  params: { lng },
}: IProfileListsPage) => {
  const { t } = await useTranslation(lng, "profile");
  const { title } = JSON.parse(t("lists"));

  const { page = "1" } = searchParams || {};

  const searchParamsForList = {
    page,
  };

  const { totalPages } = (await getMyLists(
    searchParamsForList
  )) as ICustomListList;

  return (
    <>
      <h1 className="text-4xl">{title}</h1>
      <Suspense key={page} fallback={<CustomListsListSkeleton />}>
        <ListsList lng={lng} searchParams={searchParamsForList} />
      </Suspense>
      <Pagination lng={lng} totalPages={totalPages} />
    </>
  );
};

export default ProfileListsPage;
