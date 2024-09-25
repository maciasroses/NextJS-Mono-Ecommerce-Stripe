"use server";

import { cookies } from "next/headers";
import { validateSchema } from "./schema";
// import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSession } from "../user/controller";
// import { getProductById } from "../product/controller";
import {
  createCustomList,
  createCustomProductsList,
  deleteCustomList,
  deleteCustomProductList,
  readCustomList,
  readCustomProductsList,
  updateCustomList,
} from "./model";
import type {
  IAddProductToCustomList,
  ICustomListState,
  // IProduct,
} from "@/app/interfaces";

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

export async function createNewCustomList(
  _prevState: ICustomListState,
  formData: FormData
) {
  // const lng = cookies().get("i18next")?.value ?? "en";
  const session = await getSession().catch(() => null);
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
  // const { slug } = (await getProductById({ id: productId })) as IProduct;
  // revalidatePath(`/${lng}/${slug}`);
  return { message: "OK" };
}

export async function addProductToCustomList(
  _prevState: ICustomListState,
  formData: FormData
) {
  // const lng = cookies().get("i18next")?.value ?? "en";

  const data = {
    customListId: formData.get("customListId") as string,
    productId: formData.get("productId") as string,
  };

  const errors = validateSchema("addProduct", data);

  if (Object.keys(errors).length !== 0) {
    return {
      errors,
      message: "",
    };
  }

  try {
    await createCustomProductsList({ data });
  } catch (error) {
    console.error(error);
    return { message: "Internal server error" };
  }
  return { message: "OK" };
  // revalidatePath(`/${lng}/profile/lists`);
  // redirect(`/${lng}/profile/lists`);
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
  const lng = cookies().get("i18next")?.value ?? "en";

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

  revalidatePath(`/${lng}/profile/lists`);
  // redirect(`/${lng}/profile/lists`);
  return { message: "OK" };
}

export async function deleteExistingCustomList(customListId: string) {
  const lng = cookies().get("i18next")?.value ?? "en";
  try {
    await deleteCustomList({
      id: customListId,
    });
  } catch (error) {
    console.error(error);
    return { message: "Internal server error" };
  }
  revalidatePath(`/${lng}/profile/lists`);
  // redirect(`/${lng}/profile/lists`);
  return { message: "OK" };
}

export async function deleteProductFromAllCustomLists(productId: string) {
  const session = await getSession().catch(() => null);
  try {
    await deleteCustomProductList({
      userId: session?.userId as string,
      productId,
    });
  } catch (error) {
    console.error(error);
    return { message: "Internal server error" };
  }
}
