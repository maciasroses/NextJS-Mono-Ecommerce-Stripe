import { useTranslation } from "@/app/i18n";
import { ListCard } from "@/app/components/CustomList";
import { getMyLists } from "@/app/services/customList/controller";
import type { IBaseLangPage, ICustomList } from "@/app/interfaces";

interface IProfileListsPage extends IBaseLangPage {}

const ProfileListsPage = async ({ params: { lng } }: IProfileListsPage) => {
  const myLists = (await getMyLists()) as ICustomList[];
  const { t } = await useTranslation(lng, "profile");
  const { title } = JSON.parse(t("lists"));

  return (
    <>
      <h1 className="text-4xl">{title}</h1>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {myLists.map((list) => (
          <ListCard key={list.id} lng={lng} customList={list} />
        ))}
      </div>
    </>
  );
};

export default ProfileListsPage;
