import formatCurrency from "@/app/shared/utils/format-currency";
import formatDateForHumans from "@/app/shared/utils/formatdate-human";
import { Img, Row, Column, Section, Text } from "@react-email/components";
import type { IOrderInfoForEmail } from "@/app/shared/interfaces";

const OrderInfo = ({ order }: { order: IOrderInfoForEmail }) => {
  return (
    <>
      <Section className="bg-gray-50 rounded-md px-4">
        <Row>
          <Column className="flex justify-start items-start w-1/3">
            <Text>
              EMAIL ACCOUNT:
              <br />
              <span className="text-blue-600">{order.email}</span>
            </Text>
          </Column>
          <Column className="w-2/3">
            <Text>
              ORDER ID:
              <br />
              <span className="text-blue-600">{order.order.id}</span>
            </Text>
            <Text>
              DATE:
              <br />
              <span>{formatDateForHumans(order.order.createdAt, "en-US")}</span>
            </Text>
          </Column>
        </Row>
      </Section>
      <Section className="bg-gray-50 rounded-md px-4 mt-10 mb-4">
        <Text>
          <h3>Products</h3>
          <div className="flex flex-col gap-4">
            {order.products.map((product) => (
              <Row key={product.name}>
                <Column>
                  <Row>
                    <Column className="w-1/2 flex gap-4 items-center">
                      <Img
                        alt={product.name}
                        src={product.file}
                        width={100}
                        height={100}
                      />
                      <Text className="text-lg">{product.name}</Text>
                    </Column>
                    <Column className="w-2/2 text-right">
                      <Text className="text-lg">
                        {product.quantity}
                        {" x "}
                        <span className="font-bold">
                          {formatCurrency(product.price / 100, "MXN")}
                        </span>
                      </Text>
                    </Column>
                  </Row>
                </Column>
              </Row>
            ))}
          </div>
          <div className="w-full text-right">
            <Text className="text-xl">
              Shipping: <span className="font-bold">$99.00</span>
              <br />
              Subtotal:{" "}
              <span className="font-bold">
                {formatCurrency(order.totalInCents / 100 - 99, "MXN")}
              </span>
            </Text>
            <hr />
            <Text className="text-2xl">
              Total:{" "}
              <span className="font-bold">
                {formatCurrency(order.totalInCents / 100, "MXN")}
              </span>
            </Text>
          </div>
        </Text>
      </Section>
      <Section>
        <Text>
          <p className="text-center text-sm">
            If you have any questions about your order, please contact us at
            <br />
            <a href="mailto:ecommerce@support.com">
              <span className="text-blue-600">ecommerce@support.com</span>
            </a>
          </p>
          <br />
          <br />
          <div className="text-center text-sm">
            LOGO
            <p className="text-center">
              <a href="https://ecommerce.com/profile">
                <span className="text-blue-600">Ecoommerce Account</span>
              </a>
              {" • "}
              <a href="https://ecommerce.com/terms-of-sales">
                <span className="text-blue-600">Terms of Sale</span>
              </a>
              {" • "}
              <a href="https://ecommerce.com/privacy-policy">
                <span className="text-blue-600">Privacy Policy</span>
              </a>
            </p>
          </div>
          <p className="text-center text-sm">
            Copyright © {new Date().getFullYear()} Ecommerce Inc.
            <br />
            <a href="https://ecommerce.com/legal">
              <span className="text-blue-600">All rights reserved.</span>
            </a>
            <br />
            <span>Ecommerce Inc. 1234 Main St. Anytown, USA 12345</span>
          </p>
        </Text>
      </Section>
    </>
  );
};

export default OrderInfo;
