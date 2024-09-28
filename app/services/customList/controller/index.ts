"use server";

import { cookies } from "next/headers";
import { validateSchema } from "../schema";
import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/app/services/auth";
import {
  readCustomList,
  createCustomList,
  deleteCustomList,
  updateCustomList,
  deleteCustomProductList,
  createCustomProductsList,
} from "../model";
import type {
  ICustomListState,
  IAddProductToCustomList,
  ICustomList,
} from "@/app/interfaces";

export async function getMyLists() {
  try {
    const session = await isAuthenticated();
    return await readCustomList({
      userId: session.userId as string,
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getMyListByName({ name }: { name: string }) {
  try {
    const session = await isAuthenticated();
    return await readCustomList({
      name,
      userId: session.userId as string,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createNewCustomList(
  _prevState: ICustomListState,
  formData: FormData
) {
  const session = await isAuthenticated();
  const productId = (formData.get("productId") as string) ?? "";

  const data = {
    name: formData.get("name") as string,
    userId: session?.userId as string,
    description: formData.get("description") ?? "",
  };

  const errors = validateSchema("create", data);

  if (Object.keys(errors).length !== 0) {
    return {
      errors,
      message: "",
    };
  }

  try {
    const customListAlreadyExists = await readCustomList({
      userId: data.userId,
      name: data.name,
    });

    if (customListAlreadyExists) {
      return {
        errors: {
          name: "List already exists",
        },
        message: "",
      };
    }

    const customList = await createCustomList({ data });

    const customProductsListData = {
      productId,
      customListId: customList.id,
    };

    await createCustomProductsList({
      data: customProductsListData,
    });
  } catch (error) {
    console.error(error);
    return { message: "Internal server error" };
  }
  return { message: "OK" };
}

export async function addProductToManyCustomLists(
  _prevState: IAddProductToCustomList,
  formData: FormData
) {
  const productId = formData.get("productId") as string;
  const customListIds = formData.getAll("customListId") as string[];

  if (customListIds.length === 0) {
    return {
      errors: [
        {
          customListId: "Select at least one list",
          productId: "Select a product",
        },
      ],
      message: "",
    };
  }

  const globalErrors: IAddProductToCustomList["errors"] = [];

  customListIds.forEach(async (customListId) => {
    const data = {
      customListId,
      productId,
    };

    const errors = validateSchema("addProduct", data);

    if (Object.keys(errors).length !== 0) {
      globalErrors.push(errors);
    }
  });

  if (globalErrors.length !== 0) {
    return {
      errors: globalErrors,
      message: "",
    };
  }

  try {
    customListIds.forEach(async (customListId) => {
      await createCustomProductsList({
        data: {
          productId,
          customListId,
        },
      });
    });
  } catch (error) {
    console.error(error);
    return { message: "Internal server error" };
  }
  return { message: "OK" };
}

export async function updateExistingCustomList(
  _prevState: ICustomListState,
  formData: FormData
) {
  const data = {
    id: formData.get("id") as string,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
  };

  const errors = validateSchema("update", data);

  if (Object.keys(errors).length !== 0) {
    return {
      errors,
      message: "",
    };
  }

  try {
    const customList = await readCustomList({
      id: data.id,
    });

    if (!customList) {
      return {
        errors: {
          id: "List not found",
        },
        message: "",
      };
    }

    await updateCustomList({ id: data.id, data });
  } catch (error) {
    console.error(error);
    return { message: "Internal server error" };
  }
  const lng = cookies().get("i18next")?.value ?? "en";
  revalidatePath(`/${lng}/profile/lists`);
  return { message: "OK" };
}

export async function deleteExistingCustomList(customListId: string) {
  try {
    await deleteCustomList({
      id: customListId,
    });
  } catch (error) {
    console.error(error);
    return { message: "Internal server error" };
  }
  const lng = cookies().get("i18next")?.value ?? "en";
  revalidatePath(`/${lng}/profile/lists`);
  return { message: "OK" };
}

export async function deleteProductFromAllCustomLists(productId: string) {
  try {
    const session = await isAuthenticated();
    await deleteCustomProductList({
      userId: session?.userId as string,
      productId,
    });
  } catch (error) {
    console.error(error);
    return { message: "Internal server error" };
  }
}

export async function deleteProductFromCustomList(
  customListId: string,
  productId: string
) {
  let name = "";
  try {
    const customList = (await readCustomList({
      id: customListId,
    })) as ICustomList;
    if (!customList) {
      return {
        errors: {
          customListId: "List not found",
        },
        message: "",
      };
    }
    name = customList.name;
    await deleteCustomProductList({
      customListId,
      productId,
    });
  } catch (error) {
    console.error(error);
    return { message: "Internal server error" };
  }
  const lng = cookies().get("i18next")?.value ?? "en";
  revalidatePath(`/${lng}/profile/lists/${name}`);
  return { message: "OK" };
}
