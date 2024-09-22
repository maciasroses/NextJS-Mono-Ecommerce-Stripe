import { Form } from "./components";
import { getSession, getUserById } from "@/app/services/user/controller";

const CheckoutPage = async ({
  params: { lng },
}: {
  params: { lng: string };
}) => {
  const session = await getSession();
  const { email } = (await getUserById({ id: session?.userId as string })) as {
    email: string;
  };

  return (
    <>
      <Form lng={lng} userEmail={email} />
    </>
  );
};

export default CheckoutPage;
