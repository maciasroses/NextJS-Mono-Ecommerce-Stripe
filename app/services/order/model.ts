"use server";

import prisma from "@/app/services/prisma";

export async function create({
  data,
}: {
  data: (typeof prisma.order.create)["arguments"]["data"];
}) {
  return await prisma.order.create({
    data,
  });
}

export async function read({ id, userId }: { id?: string; userId?: string }) {
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

  if (userId) {
    return await prisma.order.findMany({
      where: { userId },
      include: globalInclude,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return await prisma.order.findMany({
    include: globalInclude,
    orderBy: {
      createdAt: "desc",
    },
  });
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
