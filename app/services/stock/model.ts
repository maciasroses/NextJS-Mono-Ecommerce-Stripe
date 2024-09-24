"use server";

import prisma from "@/app/services/prisma";

interface ICreateStockReservation {
  userId: string;
  productId: string;
  quantity: number;
}

export async function createStockReservation({
  userId,
  productId,
  quantity,
}: ICreateStockReservation) {
  return await prisma.stockReservation.create({
    data: {
      userId,
      productId,
      quantity,
      expiresAt: new Date(Date.now() + 1000 * 60 * 15),
    },
  });
}

interface IReadStockReservation {
  userId?: string;
  expired?: boolean;
  productId?: string;
  isForSripeWebHook?: boolean;
}

export async function readStockReservation({
  userId,
  expired,
  productId,
  isForSripeWebHook,
}: IReadStockReservation) {
  const globalInclude = {
    user: true,
    product: true,
  };

  if (expired) {
    if (userId && productId) {
      return await prisma.stockReservation.findUnique({
        where: {
          userId_productId: {
            userId,
            productId,
          },
          expiresAt: {
            lt: new Date(),
          },
        },
        include: globalInclude,
      });
    } else {
      return await prisma.stockReservation.findMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
        include: globalInclude,
      });
    }
  } else {
    const expiresAt = isForSripeWebHook ? undefined : { gte: new Date() };
    if (userId && productId) {
      return await prisma.stockReservation.findUnique({
        where: {
          userId_productId: {
            userId,
            productId,
          },
          expiresAt,
        },
        include: globalInclude,
      });
    }
  }

  return await prisma.stockReservation.findMany({
    include: globalInclude,
  });
}

export async function updateStockReservation({
  id,
  data,
}: {
  id: string;
  data: (typeof prisma.stockReservation.update)["arguments"]["data"];
}) {
  return await prisma.stockReservation.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteStockReservation(id: string) {
  return await prisma.stockReservation.delete({
    where: {
      id,
    },
  });
}
