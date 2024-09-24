"use server";

import { create } from "./model";

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
