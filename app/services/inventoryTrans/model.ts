"use server";

import prisma from "@/app/services/prisma";

export async function create({
  data,
}: {
  data: (typeof prisma.inventoryTransaction.create)["arguments"]["data"];
}) {
  return await prisma.inventoryTransaction.create({
    data,
  });
}

export async function read({
  where,
}: {
  where: (typeof prisma.inventoryTransaction.findUnique)["arguments"]["where"];
}) {
  return await prisma.inventoryTransaction.findUnique({
    where,
  });
}

export async function update({
  where,
  data,
}: {
  where: (typeof prisma.inventoryTransaction.update)["arguments"]["where"];
  data: (typeof prisma.inventoryTransaction.update)["arguments"]["data"];
}) {
  return await prisma.inventoryTransaction.update({
    where,
    data,
  });
}

export async function deleteById({ id }: { id: string }) {
  return await prisma.inventoryTransaction.delete({
    where: {
      id,
    },
  });
}
