"use server";

import { validateSchema } from "../schema";
// import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/app/shared/services/auth";
import {
  readAddress,
  createAddress,
  updateManyAddresses,
  //   updateAddress,
  //   deleteAddress,
} from "../model";
import type {
  IAddressSearchParams,
  // IAddress,
  IAddressState,
} from "@/app/shared/interfaces";

export async function getMyAddresses({ page }: IAddressSearchParams) {
  try {
    const session = await isAuthenticated();
    return await readAddress({
      page,
      userId: session.userId as string,
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getMyAddressById({ id }: { id: string }) {
  try {
    const session = await isAuthenticated();
    return await readAddress({
      id,
      userId: session.userId as string,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createNewAddress(
  _prevState: IAddressState,
  formData: FormData
) {
  const session = await isAuthenticated();

  const data = {
    userId: session.userId as string,
    fullName: formData.get("fullName") as string,
    address1: formData.get("address1") as string,
    address2: formData.get("address2") as string,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    zipCode: formData.get("zipCode") as string,
    country: formData.get("country") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    additionalInfo: formData.get("additionalInfo") as string,
    isDefault: formData.get("isDefault") === "on",
  };

  const errors = validateSchema("create", data);

  if (Object.keys(errors).length) {
    return {
      errors,
      message: "",
    };
  }

  try {
    if (data.isDefault) {
      await updateManyAddresses({
        userId: session.userId as string,
        data: {
          isDefault: false,
        },
      });
    }

    await createAddress({
      data,
    });
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to create address",
    };
  }
  return { message: "OK" };
}
