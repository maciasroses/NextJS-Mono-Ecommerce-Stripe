"use server";

import OrderService from "../service";
import { isAdmin } from "@/app/services/auth";

export async function getOrdersByUserId({ userId }: { userId: string }) {
  try {
    await isAdmin();

    return await OrderService.getOrdersByUserId({
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

    return await OrderService.getOrderById({
      id,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
