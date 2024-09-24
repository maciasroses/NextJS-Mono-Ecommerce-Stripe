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

export async function read({
  where,
}: {
  where: (typeof prisma.order.findUnique)["arguments"]["where"];
}) {
  return await prisma.order.findUnique({
    where,
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
