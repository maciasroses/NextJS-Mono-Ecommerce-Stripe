"use server";

import { read } from "../model";
import { isAdmin } from "@/app/shared/services/auth";

export async function getOrdersByUserId({ userId }: { userId: string }) {
  try {
    await isAdmin();

    return await read({
      userId,
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getOrderById({ id }: { id: string }) {
  try {
    await isAdmin();

    return await read({
      id,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
