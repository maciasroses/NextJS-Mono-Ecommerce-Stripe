"use server";

import prisma from "@/app/services/prisma";
import type { IProductSearchParams } from "@/app/interfaces";

export async function create({
  data,
}: {
  data: (typeof prisma.product.create)["arguments"]["data"];
}) {
  return await prisma.product.create({
    data,
  });
}

export async function read({
  q,
  id,
  slug,
  page = 1,
  limit = 6,
  allData = false,
  priceTo = undefined,
  category,
  priceFrom = undefined,
  quantityTo = undefined,
  quantityFrom = undefined,
  isAdminRequest = false,
}: IProductSearchParams) {
  const globalInclude = {
    files: true,
    orders: isAdminRequest ? true : false,
  };
  if (allData) {
    return await prisma.product.findMany({
      include: globalInclude,
    });
  } else {
    if (id) {
      return await prisma.product.findUnique({
        where: { id },
        include: globalInclude,
      });
    }

    if (slug) {
      return await prisma.product.findUnique({
        where: { slug },
        include: globalInclude,
      });
    }

    interface Where {
      OR?: {
        [key: string]: { contains: string; mode: "insensitive" };
      }[];
      quantity?: object;
      category?: object;
      priceInCents?: object;
    }

    const where: Where = {};

    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { slug: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    if (category) {
      where.category = { equals: category, mode: "insensitive" };
    }

    if (priceFrom || priceTo) {
      where.priceInCents = {
        gte: priceFrom,
        lte: priceTo,
      };
    }

    if (quantityFrom || quantityTo) {
      where.quantity = {
        gte: quantityFrom,
        lte: quantityTo,
      };
    }

    const totalCount = await prisma.product.count({ where });
    const totalPages = Math.ceil(totalCount / Number(limit));
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const products = await prisma.product.findMany({
      where,
      skip,
      take,
      include: globalInclude,
      orderBy: { updatedAt: "desc" },
    });

    return {
      products,
      totalPages,
    };
  }
}

export async function update({
  id,
  data,
}: {
  id: string;
  data: (typeof prisma.product.update)["arguments"]["data"];
}) {
  return await prisma.product.update({ where: { id }, data });
}

export async function deleteById({ id }: { id: string }) {
  return await prisma.product.delete({ where: { id } });
}
