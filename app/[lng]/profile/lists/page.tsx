import { ListCard } from "@/app/components/CustomList";
import { getSession } from "@/app/services/user/controller";
import { getListsByUserId } from "@/app/services/customList/controller";
import type { IBaseLangPage, ICustomList } from "@/app/interfaces";

interface IProfileListsPage extends IBaseLangPage {}

const ProfileListsPage = async ({ params: { lng } }: IProfileListsPage) => {
  const session = await getSession();
  const myLists = (await getListsByUserId({
    userId: session?.userId as string,
  })) as ICustomList[];

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
