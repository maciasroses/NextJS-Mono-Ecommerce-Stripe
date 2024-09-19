"use server";

import { readCustomList, readCustomProductsList } from "./model";

export async function getListByUserId({ userId }: { userId: string }) {
  try {
    return await readCustomList({
      userId,
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProductsByListId({
  customListId,
}: {
  customListId: string;
}) {
  try {
    return await readCustomProductsList({
      customListId,
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getListsByProductId({
  productId,
}: {
  productId: string;
}) {
  try {
    return await readCustomProductsList({
      productId,
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}
