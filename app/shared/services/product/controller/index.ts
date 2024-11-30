"use server";

import { read } from "../model";
import type { IProductSearchParams } from "@/app/shared/interfaces";

export async function getProducts({
  q,
  page,
  limit,
  priceTo,
  category,
  priceFrom,
  quantityTo,
  quantityFrom,
}: IProductSearchParams) {
  try {
    return await read({
      q,
      page,
      limit,
      priceTo,
      category,
      priceFrom,
      quantityTo,
      quantityFrom,
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getAllProducts() {
  try {
    return await read({
      allData: true,
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProductById({ id }: { id: string }) {
  try {
    return await read({ id });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProductBySlug({ slug }: { slug: string }) {
  try {
    return await read({ slug });
  } catch (error) {
    console.error(error);
    return null;
  }
}
