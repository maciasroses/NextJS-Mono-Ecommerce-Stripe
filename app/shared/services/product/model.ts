"use server";

import prisma from "@/app/shared/services/prisma";
import type {
  IProductSearchParams,
  IProductVariantSearchParams,
} from "@/app/shared/interfaces";

export async function create({
  data,
}: {
  data: (typeof prisma.product.create)["arguments"]["data"];
}) {
  return await prisma.product.create({
    data,
  });
}

export async function createProductVariant({
  productId,
  data,
}: {
  productId: string;
  data: (typeof prisma.productVariant.create)["arguments"]["data"];
}) {
  return await prisma.productVariant.create({
    data: {
      ...data,
      product: { connect: { id: productId } },
    },
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
    reviews: true,
    variants: {
      include: {
        customProductsList: true,
        orders: isAdminRequest ? true : false,
        inventoryTransactions: isAdminRequest ? true : false,
      },
    },
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
      category?: object;
      variants?: object;
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
      where.category = { equals: category };
    }

    if (priceFrom || priceTo) {
      where.variants = {
        some: {
          priceInCents: {
            gte: priceFrom ? Number(priceFrom) : undefined,
            lte: priceTo ? Number(priceTo) : undefined,
          },
        },
      };
    }

    if (quantityFrom || quantityTo) {
      where.variants = {
        some: {
          quantity: {
            gte: quantityFrom ? Number(quantityFrom) : undefined,
            lte: quantityTo ? Number(quantityTo) : undefined,
          },
        },
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

export async function readProductVariant({
  q,
  id,
  sku,
  slug,
  size,
  page = 1,
  color,
  limit = 6,
  allData = false,
  category,
  quantityTo = undefined,
  quantityFrom = undefined,
  priceInCentsTo = undefined,
  priceInCentsFrom = undefined,
  isAdminRequest = false,
}: IProductVariantSearchParams) {
  const globalInclude = {
    product: {
      include: {
        files: true,
        reviews: true,
      },
    },
    customProductsList: true,
    orders: isAdminRequest ? true : false,
    inventoryTransactions: isAdminRequest ? true : false,
  };

  if (allData) {
    return await prisma.productVariant.findMany({
      include: globalInclude,
    });
  } else {
    if (id) {
      return await prisma.productVariant.findUnique({
        where: { id },
        include: globalInclude,
      });
    }

    if (sku) {
      return await prisma.productVariant.findUnique({
        where: { sku },
        include: globalInclude,
      });
    }

    interface Where {
      OR?: {
        [key: string]: {
          [key: string]: { contains: string; mode: "insensitive" };
        };
      }[];
      // slug?: object;
      size?: object;
      color?: object;
      quantity?: object;
      // category?: object;
      priceInCents?: object;
      product?: object;
    }

    const where: Where = {};

    if (q) {
      where.OR = [
        { product: { name: { contains: q, mode: "insensitive" } } },
        { product: { slug: { contains: q, mode: "insensitive" } } },
        { product: { description: { contains: q, mode: "insensitive" } } },
      ];
    }

    if (slug) {
      where.product = { slug: { contains: slug, mode: "insensitive" } };
    }

    if (size) {
      where.size = { equals: size };
    }

    if (color) {
      where.color = { equals: color };
    }

    if (category) {
      where.product = { category: { equals: category } };
    }

    if (priceInCentsFrom || priceInCentsTo) {
      console.log(priceInCentsFrom, priceInCentsTo);
      where.priceInCents = {
        gte: priceInCentsFrom ? Number(priceInCentsFrom) * 100 : undefined,
        lte: priceInCentsTo ? Number(priceInCentsTo) * 100 : undefined,
      };
    }

    if (quantityFrom || quantityTo) {
      where.quantity = {
        gte: quantityFrom ? Number(quantityFrom) : undefined,
        lte: quantityTo ? Number(quantityTo) : undefined,
      };
    }

    const totalCount = await prisma.productVariant.count({ where });
    const totalPages = Math.ceil(totalCount / Number(limit));
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const products = await prisma.productVariant.findMany({
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

export async function updateProductVariant({
  id,
  data,
}: {
  id: string;
  data: (typeof prisma.productVariant.update)["arguments"]["data"];
}) {
  return await prisma.productVariant.update({ where: { id }, data });
}

export async function deleteById({ id }: { id: string }) {
  return await prisma.product.delete({ where: { id } });
}

export async function deleteProductVariantById({ id }: { id: string }) {
  return await prisma.productVariant.delete({ where: { id } });
}
