"use server";

import { create, read } from "./model";

export async function getOrdersByUserId({ userId }: { userId: string }) {
  try {
    return await read({
      userId,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface ICreateOrderThroughStripWebHook {
  userId: string;
  productsIds: string[];
  totalInCents: number;
  productsPrices: number[];
  productsQuantities: number[];
}

export async function createOrderThroughStripeWebHook({
  userId,
  productsIds,
  totalInCents,
  productsPrices,
  productsQuantities,
}: ICreateOrderThroughStripWebHook) {
  try {
    return await create({
      data: {
        userId,
        totalInCents,
        paymentStatus: "PAID",
        products: {
          create: productsIds.map((productId, index) => ({
            unitPriceInCents: productsPrices[index],
            quantity: productsQuantities[index],
            product: {
              connect: {
                slug: productId,
              },
            },
          })),
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create order");
  }
}
