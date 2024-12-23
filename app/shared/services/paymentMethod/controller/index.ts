"use server";

// import { validateSchema } from "../schema";
import { isAuthenticated } from "@/app/shared/services/auth";
import {
  readPaymentMethod,
  // createPaymentMethod
} from "../model";
import type { IPaymentMethodSearchParams } from "@/app/shared/interfaces";

export async function getMyActivePaymentMethods({
  page,
}: IPaymentMethodSearchParams) {
  try {
    const session = await isAuthenticated();
    return await readPaymentMethod({
      page,
      isActive: true,
      userId: session.userId as string,
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}
