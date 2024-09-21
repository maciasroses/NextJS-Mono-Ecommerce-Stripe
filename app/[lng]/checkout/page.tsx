import { Form } from "./components";

const CheckoutPage = ({ params: { lng } }: { params: { lng: string } }) => {
  return (
    <>
      <Form lng={lng} />
    </>
  );
};

export default CheckoutPage;
