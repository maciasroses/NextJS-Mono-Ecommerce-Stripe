"use server";

import { isAdmin } from "../../auth";
import { read } from "../model";

export async function getUsers() {
  try {
    await isAdmin();

    return await read({});
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get users");
  }
}

export async function getUserById({ id }: { id: string }) {
  try {
    await isAdmin();

    const user = await read({ id });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user");
  }
}

export async function getUserByEmail({ email }: { email: string }) {
  try {
    await isAdmin();

    const user = await read({ email });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user");
  }
}
