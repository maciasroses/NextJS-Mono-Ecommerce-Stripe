import { OrderInfo } from "./components";
import {
  Html,
  Body,
  Head,
  Preview,
  Tailwind,
  Container,
} from "@react-email/components";
import type { IOrderInfoForEmail } from "@/app/shared/interfaces";

OrderReceipt.PreviewProps = {
  order: {
    email: "test@test.com",
    order: {
      id: "123",
      totalInCents: 1234,
      discountInCents: 0,
      finalTotalInCents: 1234,
      shippingType: "STANDARD",
      paymentStatus: "PENDING",
      shippingStatus: "PENDING",
      user: {
        id: "",
        email: "",
        password: "",
        username: "",
        firstName: "",
        lastName: "",
        role: "USER",
        image: "",
        resetPasswordToken: "",
        resetPasswordTokenExpiry: new Date(),
        orders: [],
        comments: [],
        addresses: [],
        customLists: [],
        notifications: [],
        paymentMethods: [],
        stockReservations: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      products: [],
      userId: "",
      addressId: "",
      paymentId: "",
      promotionId: "",
      discountCodeId: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    products: [
      {
        name: "Product 1",
        file: "https://via.placeholder.com/100",
        price: 1234,
        quantity: 1,
      },
      {
        name: "Product 2",
        file: "https://via.placeholder.com/100",
        price: 5678,
        quantity: 1,
      },
    ],
    totalInCents: 6912 + 9900,
  },
} satisfies { order: IOrderInfoForEmail };

export default function OrderReceipt({ order }: { order: IOrderInfoForEmail }) {
  return (
    <Html lang="en">
      <Preview>Your receipt from Ecommerce</Preview>
      <Head />
      <Body className="bg-white">
        <Container className="max-w-2xl">
          <Tailwind>
            <div className="text-4xl flex items-center justify-between">
              <p className="font-bold">LOGO</p>
              <p className="font-thin text-gray-500">Invoice</p>
            </div>
            <OrderInfo order={order} />
          </Tailwind>
        </Container>
      </Body>
    </Html>
  );
}
