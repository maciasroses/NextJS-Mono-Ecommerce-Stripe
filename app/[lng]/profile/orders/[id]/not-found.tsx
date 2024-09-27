import { Card404 } from "@/app/components";

const OrderIdNotFoundPage = () => {
  return (
    <div>
      <Card404
        title="Order Not Found"
        description="The order you are looking for does not exist."
      />
    </div>
  );
};

export default OrderIdNotFoundPage;
