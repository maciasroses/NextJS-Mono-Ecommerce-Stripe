import ListCard from "./ListCard";
import { Card404 } from "@/app/components";
import { getMyLists } from "@/app/services/customList/controller";
import type {
  ICustomListList,
  ICustomListSearchParams,
} from "@/app/interfaces";

interface IListsList {
  lng: string;
  searchParams: ICustomListSearchParams;
}

const ListsList = async ({ lng, searchParams }: IListsList) => {
  const { customLists: myLists } = (await getMyLists(
    searchParams
  )) as ICustomListList;

  return (
    <>
      {myLists.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {myLists.map((list) => (
            <ListCard key={list.id} lng={lng} customList={list} />
          ))}
        </div>
      ) : (
        <Card404
          title="No lists found"
          description="You have not created any lists yet."
        />
      )}
    </>
  );
};

export default ListsList;
