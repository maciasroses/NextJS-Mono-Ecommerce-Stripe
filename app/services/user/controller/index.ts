"use server";

import { read } from "../model";
import { isAuthenticated } from "@/app/services/auth";

export async function getMe() {
  try {
    const session = await isAuthenticated();
    return await read({
      id: session.userId as string,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
