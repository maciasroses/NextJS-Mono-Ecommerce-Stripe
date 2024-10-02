"use server";

import prisma from "@/app/services/prisma";
import type { IOrderSearchParams } from "@/app/interfaces";

export async function create({
  data,
}: {
  data: (typeof prisma.order.create)["arguments"]["data"];
}) {
  return await prisma.order.create({
    data,
  });
}

export async function read({
  id,
  page = 1,
  limit = 6,
  userId,
  allData,
}: IOrderSearchParams) {
  const globalInclude = {
    products: {
      include: {
        product: {
          include: {
            files: true,
          },
        },
      },
    },
  };

  if (allData) {
    return await prisma.order.findMany({
      include: globalInclude,
    });
  }

  if (id && userId) {
    return await prisma.order.findUnique({
      where: { id, userId },
      include: globalInclude,
    });
  }

  if (id) {
    return await prisma.order.findUnique({
      where: { id },
      include: globalInclude,
    });
  }

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  if (userId) {
    const totalCount = await prisma.order.count({
      where: {
        userId,
      },
    });
    const totalPages = Math.ceil(totalCount / Number(limit));

    const orders = await prisma.order.findMany({
      where: { userId },
      skip,
      take,
      include: globalInclude,
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      orders,
      totalPages,
    };
  }

  const totalCount = await prisma.order.count();
  const totalPages = Math.ceil(totalCount / Number(limit));

  const orders = await prisma.order.findMany({
    skip,
    take,
    include: globalInclude,
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    orders,
    totalPages,
  };
}

export async function update({
  where,
  data,
}: {
  where: (typeof prisma.order.update)["arguments"]["where"];
  data: (typeof prisma.order.update)["arguments"]["data"];
}) {
  return await prisma.order.update({
    where,
    data,
  });
}

export async function deleteById({ id }: { id: string }) {
  return await prisma.order.delete({
    where: {
      id,
    },
  });
}
