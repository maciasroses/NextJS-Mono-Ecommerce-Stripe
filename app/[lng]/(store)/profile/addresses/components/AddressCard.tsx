import type { IAddress } from "@/app/shared/interfaces";
import Actions from "./Actions";

interface IAddressCard {
  address: IAddress;
}

const AddressCard = ({ address }: IAddressCard) => {
  console.log(address);
  return (
    <div className="relative shadow-lg dark:shadow-gray-800 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
      <h3 className="font-bold text-lg line-clamp-1 pr-5">
        {address.fullName}
      </h3>
      <p>{address.address1}</p>
      <p>{address.address2}</p>
      <p>
        {address.city}, {address.state}, {address.zipCode}
      </p>
      <p>{address.country}</p>
      <p>{address.phoneNumber}</p>
      {address.isDefault && (
        <p className="absolute bottom-4 right-4 font-thin italic">By Default</p>
      )}
      <Actions lng="en" />
    </div>
  );
};

export default AddressCard;
