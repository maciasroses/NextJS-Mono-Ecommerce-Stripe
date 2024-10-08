import { Form } from "./components";
import { getMe } from "@/app/services/user/controller";
import type { IUser } from "@/app/interfaces";

const CheckoutPage = async ({
  params: { lng },
}: {
  params: { lng: string };
}) => {
  const me = (await getMe()) as IUser;
  if (!me) throw new Error("User not found");
  return (
    <>
      <Form lng={lng} userEmail={me?.email} />
    </>
  );
};

export default CheckoutPage;
