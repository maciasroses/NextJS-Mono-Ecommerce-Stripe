"use server";

import { create, read } from "../model";
import { isAuthenticated } from "@/app/services/auth";
import type { IOrderSearchParams } from "@/app/interfaces";

export async function getMyOrders({ page, limit }: IOrderSearchParams) {
  try {
    const session = await isAuthenticated();

    return await read({
      page,
      limit,
      userId: session.userId as string,
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getMyOrderById({ id }: { id: string }) {
  try {
    const session = await isAuthenticated();

    return await read({
      id,
      userId: session.userId as string,
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
