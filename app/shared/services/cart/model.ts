"use server";

import prisma from "@/app/shared/services/prisma";

export async function createCart({
  data,
}: {
  data: (typeof prisma.cart.create)["arguments"]["data"];
}) {
  return await prisma.cart.create({
    data,
  });
}

export async function createCartItem({
  data,
}: {
  data: (typeof prisma.cartItem.create)["arguments"]["data"];
}) {
  return await prisma.cartItem.create({
    data,
  });
}

export async function upsertCart({
  where,
  create,
  update,
}: {
  where: (typeof prisma.cart.upsert)["arguments"]["where"];
  create: (typeof prisma.cart.upsert)["arguments"]["create"];
  update: (typeof prisma.cart.upsert)["arguments"]["update"];
}) {
  return await prisma.cart.upsert({
    where,
    create,
    update,
  });
}

export async function upsertItemCart({
  where,
  create,
  update,
}: {
  where: (typeof prisma.cartItem.upsert)["arguments"]["where"];
  create: (typeof prisma.cartItem.upsert)["arguments"]["create"];
  update: (typeof prisma.cartItem.upsert)["arguments"]["update"];
}) {
  return await prisma.cartItem.upsert({
    where,
    create,
    update,
  });
}

interface IReadCart {
  id?: string;
  userId?: string;
}

export async function readCart({ id, userId }: IReadCart) {
  const globalInclude = {
    items: {
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
    return await prisma.cart.findUnique({
      where: { id, userId },
      include: globalInclude,
    });
  }

  if (userId) {
    return await prisma.cart.findUnique({
      where: { userId },
      include: globalInclude,
    });
  }

  return null;
}

export async function updateCart({
  where,
  data,
}: {
  where: (typeof prisma.cart.update)["arguments"]["where"];
  data: (typeof prisma.cart.update)["arguments"]["data"];
}) {
  return await prisma.cart.update({
    where,
    data,
  });
}

export async function updateCartItem({
  where,
  data,
}: {
  where: (typeof prisma.cartItem.update)["arguments"]["where"];
  data: (typeof prisma.cartItem.update)["arguments"]["data"];
}) {
  return await prisma.cartItem.update({
    where,
    data,
  });
}

export async function deleteCart({
  where,
}: {
  where: (typeof prisma.cart.update)["arguments"]["where"];
}) {
  return await prisma.cart.delete({
    where,
  });
}

export async function deleteCartItem({
  where,
}: {
  where: (typeof prisma.cartItem.update)["arguments"]["where"];
}) {
  return await prisma.cartItem.delete({
    where,
  });
}
