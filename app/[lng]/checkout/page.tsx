import { Form } from "./components";
import { getMe } from "@/app/services/user/controller";
import type { IUser } from "@/app/interfaces";

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
