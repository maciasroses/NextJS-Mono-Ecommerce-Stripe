"use server";

import { create } from "./model";

interface ICreateInventoryTransaction {
  quantity: number;
  productId: string;
  description: string;
}

export async function createInventoryTransactionThroughStripeWebHook({
  quantity,
  productId,
  description,
}: ICreateInventoryTransaction) {
  try {
    return await create({
      data: {
        quantity,
        productId,
        description,
        type: "SALE",
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create inventory transaction");
  }
}
