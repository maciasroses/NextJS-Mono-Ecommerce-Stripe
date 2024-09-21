import type { ICustomList } from "@/app/interfaces";

interface IListCard {
  lng: string;
  customList: ICustomList;
}

const ListCard = ({ lng, customList }: IListCard) => {
  console.log(lng, customList);
  return <div>ListCard</div>;
};

export default ListCard;
