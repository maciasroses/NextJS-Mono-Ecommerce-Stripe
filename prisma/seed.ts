import { PrismaClient } from "@prisma/client";
import hashPassword from "../app/utils/hash-password";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "admin@mail.com",
      password: await hashPassword("secretpass"),
      username: "admin",
      role: "ADMIN",
    },
  });

  await prisma.user.create({
    data: {
      email: "user1@example.com",
      password: await hashPassword("password1"),
      username: "user1",
    },
  });

  await prisma.user.create({
    data: {
      email: "user2@example.com",
      password: await hashPassword("password2"),
      username: "user2",
    },
  });

  enum ProductCategory {
    BOOKS = "BOOKS",
    CLOTHING = "CLOTHING",
    TOYS = "TOYS",
    ELECTRONICS = "ELECTRONICS",
  }

  const productsEntries = [
    {
      name: "Book",
      slug: "book",
      description: "A book",
      priceInCents: 10000,
      category: ProductCategory.BOOKS,
      quantity: 10,
      maximumQuantityPerOrder: 3,
      files: [
        { url: "/products/books/book/book-0.webp" },
        { url: "/products/books/book/book-1.webp" },
        { url: "/products/books/book/book-2.webp" },
      ],
    },
    {
      name: "Coat",
      slug: "coat",
      description: "A coat",
      priceInCents: 50000,
      category: ProductCategory.CLOTHING,
      quantity: 5,
      maximumQuantityPerOrder: 5,
      files: [
        { url: "/products/clothing/coat/coat-0.webp" },
        { url: "/products/clothing/coat/coat-1.webp" },
        { url: "/products/clothing/coat/coat-2.webp" },
      ],
    },
    {
      name: "Jeans",
      slug: "jeans",
      description: "A jeans",
      priceInCents: 30000,
      category: ProductCategory.CLOTHING,
      quantity: 7,
      maximumQuantityPerOrder: 5,
      files: [
        { url: "/products/clothing/jeans/jeans-0.webp" },
        { url: "/products/clothing/jeans/jeans-1.webp" },
        { url: "/products/clothing/jeans/jeans-2.webp" },
      ],
    },
    {
      name: "House",
      slug: "house",
      description: "A house",
      priceInCents: 30000,
      category: ProductCategory.TOYS,
      quantity: 7,
      maximumQuantityPerOrder: 5,
      files: [
        { url: "/products/toys/house/house-0.webp" },
        { url: "/products/toys/house/house-1.webp" },
        { url: "/products/toys/house/house-2.webp" },
      ],
    },
    {
      name: "Car",
      slug: "car",
      description: "A car",
      priceInCents: 30000,
      category: ProductCategory.TOYS,
      quantity: 7,
      maximumQuantityPerOrder: 5,
      files: [
        { url: "/products/toys/car/car-0.webp" },
        { url: "/products/toys/car/car-1.webp" },
        { url: "/products/toys/car/car-2.webp" },
      ],
    },
    {
      name: "Lego",
      slug: "lego",
      description: "A lego",
      priceInCents: 30000,
      category: ProductCategory.TOYS,
      quantity: 2,
      maximumQuantityPerOrder: 5,
      files: [
        { url: "/products/toys/lego/lego-0.webp" },
        { url: "/products/toys/lego/lego-1.webp" },
        { url: "/products/toys/lego/lego-2.webp" },
      ],
    },
    {
      name: "Ship",
      slug: "ship",
      description: "A ship",
      priceInCents: 95000,
      category: ProductCategory.TOYS,
      quantity: 10,
      maximumQuantityPerOrder: 3,
      files: [
        { url: "/products/toys/ship/ship-0.webp" },
        { url: "/products/toys/ship/ship-1.webp" },
        { url: "/products/toys/ship/ship-2.webp" },
      ],
    },
    {
      name: "AirPods",
      slug: "airpods",
      description: "A airpods",
      priceInCents: 500000,
      category: ProductCategory.ELECTRONICS,
      quantity: 2,
      maximumQuantityPerOrder: 2,
      files: [
        { url: "/products/electronics/airpods/airpods-0.webp" },
        { url: "/products/electronics/airpods/airpods-1.webp" },
        { url: "/products/electronics/airpods/airpods-2.webp" },
      ],
    },
    {
      name: "iPhone",
      slug: "iphone",
      description: "A iPhone",
      priceInCents: 1999900,
      category: ProductCategory.ELECTRONICS,
      quantity: 8,
      maximumQuantityPerOrder: 2,
      files: [
        { url: "/products/electronics/iphone/iphone-0.webp" },
        { url: "/products/electronics/iphone/iphone-1.webp" },
        { url: "/products/electronics/iphone/iphone-2.webp" },
      ],
    },
    {
      name: "iPad",
      slug: "ipad",
      description: "A iPad",
      priceInCents: 2599900,
      category: ProductCategory.ELECTRONICS,
      quantity: 5,
      maximumQuantityPerOrder: 2,
      files: [
        { url: "/products/electronics/ipad/ipad-0.webp" },
        { url: "/products/electronics/ipad/ipad-1.webp" },
        { url: "/products/electronics/ipad/ipad-2.webp" },
      ],
    },
    {
      name: "MacBook",
      slug: "macbook",
      description: "A MacBook",
      priceInCents: 5499900,
      category: ProductCategory.ELECTRONICS,
      quantity: 3,
      maximumQuantityPerOrder: 1,
      files: [
        { url: "/products/electronics/macbook/macbook-0.webp" },
        { url: "/products/electronics/macbook/macbook-1.webp" },
        { url: "/products/electronics/macbook/macbook-2.webp" },
      ],
    },
    {
      name: "Apple Watch",
      slug: "apple-watch",
      description: "A Apple Watch",
      priceInCents: 999900,
      category: ProductCategory.ELECTRONICS,
      quantity: 6,
      maximumQuantityPerOrder: 2,
      files: [
        { url: "/products/electronics/apple-watch/apple-watch-0.webp" },
        { url: "/products/electronics/apple-watch/apple-watch-1.webp" },
        { url: "/products/electronics/apple-watch/apple-watch-2.webp" },
      ],
    },
  ];

  productsEntries.forEach(async (product) => {
    await prisma.product.create({
      data: {
        ...product,
        files: {
          create: product.files,
        },
      },
    });
  });
}

main()
  .then(() => {
    console.log("Seeding finished.");
  })
  .catch((e) => {
    console.error("Seeding error: ", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
