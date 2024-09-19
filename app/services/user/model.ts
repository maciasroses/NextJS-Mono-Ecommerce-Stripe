"use server";

import prisma from "@/app/services/prisma";
import hashPassword from "@/app/utils/hash-password";

export async function create({
  data,
}: {
  data: (typeof prisma.user.create)["arguments"]["data"];
}) {
  const password = data.password;
  const hashedPassword = await hashPassword(password);
  return await prisma.user.create({
    data: { ...data, password: hashedPassword },
  });
}

export async function read({ id, email }: { id?: string; email?: string }) {
  const globalInclude = {
    orders: true,
    customLists: true,
  };

  if (id) {
    return await prisma.user.findUnique({
      where: { id },
      include: globalInclude,
    });
  }

  if (email) {
    return await prisma.user.findUnique({
      where: { email },
      include: globalInclude,
    });
  }

  return await prisma.user.findMany({
    include: globalInclude,
  });
}

export async function update({
  id,
  data,
}: {
  id: string;
  data: (typeof prisma.user.update)["arguments"]["data"];
}) {
  return await prisma.user.update({ where: { id }, data });
}

export async function deleteById({ id }: { id: string }) {
  return await prisma.user.delete({ where: { id } });
}
