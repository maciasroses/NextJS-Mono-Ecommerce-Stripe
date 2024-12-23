import { Suspense } from "react";
import { ListsList } from "./components";
import { useTranslation } from "@/app/i18n";
import { getMyLists } from "@/app/shared/services/customList/controller";
import { CustomListsListSkeleton, Pagination } from "@/app/shared/components";
import type {
  IBaseLangPage,
  ICustomListList,
  ICustomListSearchParams,
} from "@/app/shared/interfaces";

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
