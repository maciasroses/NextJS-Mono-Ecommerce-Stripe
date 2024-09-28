import { ListCard } from "@/app/components/CustomList";
import { getMyLists } from "@/app/services/customList/controller";
import type { IBaseLangPage, ICustomList } from "@/app/interfaces";

interface IProfileListsPage extends IBaseLangPage {}

const ProfileListsPage = async ({ params: { lng } }: IProfileListsPage) => {
  const myLists = (await getMyLists()) as ICustomList[];

  return (
    <>
      <h1 className="text-4xl">My Lists</h1>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {myLists.map((list) => (
          <ListCard key={list.id} lng={lng} customList={list} />
        ))}
      </div>
    </>
  );
};

export default ProfileListsPage;
