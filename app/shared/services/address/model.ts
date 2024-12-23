"use server";

import prisma from "@/app/shared/services/prisma";
import type { IAddressSearchParams } from "@/app/shared/interfaces";

export async function createAddress({
  data,
}: {
  data: (typeof prisma.address.create)["arguments"]["data"];
}) {
  return await prisma.address.create({
    data,
  });
}

export async function readAddress({
  id,
  userId,
  page = 1,
  limit = 6,
  allData,
}: IAddressSearchParams) {
  // const globalInclude = {
  //     // CONSIDER INCLUDE ORDERS AND USERS FOR ADMIN PANEL
  // }

  if (allData) {
    return await prisma.address.findMany();
  }

  if (id && userId) {
    return await prisma.address.findUnique({
      where: { id, userId },
    });
  }

  if (id) {
    return await prisma.address.findUnique({
      where: { id },
    });
  }

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  if (userId) {
    const totalCount = await prisma.address.count({
      where: {
        userId,
      },
    });

    const totalPages = Math.ceil(totalCount / take);

    const addresses = await prisma.address.findMany({
      where: {
        userId,
      },
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      addresses,
      totalPages,
    };
  }
}

export async function updateAddress({
  id,
  data,
}: {
  id: string;
  data: (typeof prisma.address.update)["arguments"]["data"];
}) {
  return await prisma.address.update({
    where: {
      id,
    },
    data,
  });
}

export async function updateManyAddresses({
  userId,
  data,
}: {
  userId: string;
  data: (typeof prisma.address.updateMany)["arguments"]["data"];
}) {
  return await prisma.address.updateMany({
    where: {
      userId,
    },
    data,
  });
}

export async function deleteAddress({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  return await prisma.address.delete({
    where: {
      id,
      userId,
    },
  });
}
