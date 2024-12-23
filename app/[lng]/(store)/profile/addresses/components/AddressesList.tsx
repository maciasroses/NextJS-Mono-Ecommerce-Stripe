import type {
  IAddressesList,
  IAddressSearchParams,
} from "@/app/shared/interfaces";
import AddressCard from "./AddressCard";
import { getMyAddresses } from "@/app/shared/services/address/controller";
import { Card404 } from "@/app/shared/components";

interface IAddressesListPage {
  searchParams: IAddressSearchParams;
}

const AddressesList = async ({ searchParams }: IAddressesListPage) => {
  const { addresses: myAddresses } = (await getMyAddresses(
    searchParams
  )) as IAddressesList;

  return (
    <>
      {myAddresses.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {myAddresses.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
      ) : (
        <Card404
          title="No addresses found"
          description="You have not created any addresses yet."
        />
      )}
    </>
  );
};

export default AddressesList;
