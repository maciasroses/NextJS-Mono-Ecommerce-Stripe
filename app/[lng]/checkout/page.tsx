import { Form } from "./components";
import { IUser } from "@/app/interfaces";
import { getMe } from "@/app/services/user/controller";

const CheckoutPage = async ({
  params: { lng },
}: {
  params: { lng: string };
}) => {
  const me = (await getMe()) as IUser;
  return (
    <>
      <Form lng={lng} userEmail={me?.email} />
    </>
  );
};

export default CheckoutPage;
