"use server";

import prisma from "@/app/services/prisma";

export async function createCustomList({
  data,
}: {
  data: (typeof prisma.customList.create)["arguments"]["data"];
}) {
  return await prisma.customList.create({
    data,
  });
}

export async function createCustomProductsList({
  data,
}: {
  data: (typeof prisma.customProductsList.create)["arguments"]["data"];
}) {
  return await prisma.customProductsList.create({
    data,
  });
}

interface IReadNDeleteCustomList {
  id?: string;
  name?: string;
  userId?: string;
}

interface IReadNDeleteCustomProductsList {
  userId?: string;
  productId?: string;
  customListId?: string;
}

export async function readCustomList({
  id,
  name,
  userId,
}: IReadNDeleteCustomList) {
  const globalInclude = {
    // products: true,
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

  if (id) {
    return await prisma.customList.findUnique({
      where: { id },
      include: globalInclude,
    });
  }

  if (userId && name) {
    return await prisma.customList.findUnique({
      where: {
        userId_name: {
          name: decodeURIComponent(name),
          userId,
        },
      },
      include: globalInclude,
    });
  }

  if (userId) {
    return await prisma.customList.findMany({
      where: { userId },
      include: globalInclude,
    });
  }

  return await prisma.customList.findMany({
    include: globalInclude,
  });
}

export async function readCustomProductsList({
  productId,
  customListId,
}: IReadNDeleteCustomProductsList) {
  const globalInclude = {
    product: true,
    customList: true,
  };

  if (productId && customListId) {
    return await prisma.customProductsList.findUnique({
      where: {
        customListId_productId: {
          productId,
          customListId,
        },
      },
    });
  }

  if (productId) {
    return await prisma.customProductsList.findMany({
      where: { productId },
      include: {
        customList: true,
      },
    });
  }

  if (customListId) {
    return await prisma.customProductsList.findMany({
      where: { customListId },
      include: {
        product: true,
      },
    });
  }

  return await prisma.customProductsList.findMany({
    include: globalInclude,
  });
}

export async function updateCustomList({
  id,
  data,
}: {
  id: string;
  data: (typeof prisma.customList.update)["arguments"]["data"];
}) {
  return await prisma.customList.update({ where: { id }, data });
}

export async function deleteCustomList({
  id,
  name,
  userId,
}: IReadNDeleteCustomList) {
  if (id) {
    return await prisma.customList.delete({
      where: { id },
    });
  }

  if (userId && name) {
    return await prisma.customList.delete({
      where: {
        userId_name: {
          name,
          userId,
        },
      },
    });
  }
}

export async function deleteCustomProductList({
  userId,
  productId,
  customListId,
}: IReadNDeleteCustomProductsList) {
  if (customListId && productId) {
    return await prisma.customProductsList.delete({
      where: {
        customListId_productId: {
          productId,
          customListId,
        },
      },
    });
  }

  if (userId && productId) {
    return await prisma.customProductsList.deleteMany({
      where: {
        productId,
        customList: {
          userId,
        },
      },
    });
  }

  return await prisma.customProductsList.deleteMany({
    where: {
      productId,
      customListId,
    },
  });
}
