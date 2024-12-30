import { PrismaClient } from "@prisma/client";
import hashPassword from "../app/shared/utils/hash-password";

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
    TOYS = "TOYS",
    BOOKS = "BOOKS",
    CLOTHING = "CLOTHING",
    ELECTRONICS = "ELECTRONICS",
  }

  enum FileType {
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
  }

  const products = [
    {
      name: "iPhone 16",
      slug: "iphone-16",
      category: ProductCategory.ELECTRONICS,
      description:
        "The iPhone 16 is the latest and greatest iPhone model. It has a 6.7-inch Super Retina XDR display, 5G connectivity, and the A16 Bionic chip. Finally, the iPhone 16 is ready for the future with Apple Intelligence.",
      esDescription:
        "El iPhone 16 es el último y mejor modelo de iPhone. Tiene una pantalla Super Retina XDR de 6.7 pulgadas, conectividad 5G y el chip A16 Bionic. Finalmente, el iPhone 16 está listo para el futuro con Apple Intelligence.",
      files: [
        {
          url: "/assets/products/electronics/iphone-16/black_0.jpg",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/iphone-16/black_1.jpg",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/iphone-16/black_2.jpg",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/iphone-16/black_3.jpg",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/iphone-16/white_0.jpg",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/iphone-16/white_1.jpg",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/iphone-16/white_2.jpg",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/iphone-16/white_3.jpg",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/iphone-16/generic_0.jpg",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/iphone-16/generic_1.jpg",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/iphone-16/generic_3.mp4",
          type: FileType.VIDEO,
        },
      ],
      variants: [
        {
          sku: "IPH16-BLACK-128",
          size: "128 GB",
          color: "Black",
          esColor: "Negro",
          quantity: 10,
          priceInCents: 1989900,
          maximumQuantityPerOrder: 2,
        },
        {
          sku: "IPH16-BLACK-256",
          size: "256 GB",
          color: "Black",
          esColor: "Negro",
          quantity: 10,
          priceInCents: 2129900,
          maximumQuantityPerOrder: 2,
        },
        {
          sku: "IPH16-WHITE-128",
          size: "128 GB",
          color: "White",
          esColor: "Blanco",
          quantity: 10,
          priceInCents: 1989900,
          maximumQuantityPerOrder: 2,
        },
        {
          sku: "IPH16-WHITE-256",
          size: "256 GB",
          color: "White",
          esColor: "Blanco",
          quantity: 10,
          priceInCents: 2129900,
          maximumQuantityPerOrder: 2,
        },
        {
          sku: "IPH16-WHITE-512",
          size: "512 GB",
          color: "White",
          esColor: "Blanco",
          quantity: 10,
          priceInCents: 2690000,
          maximumQuantityPerOrder: 2,
        },
      ],
    },
    {
      name: "Apple Watch Series 10 GPS",
      slug: "apple-watch-series-10-gps",
      category: ProductCategory.ELECTRONICS,
      description:
        "The Apple Watch Series 10 GPS is the latest and greatest Apple Watch model. It has a 42mm Retina display, GPS connectivity, and the S10 chip.",
      esDescription:
        "El Apple Watch Series 10 GPS es el último y mejor modelo de Apple Watch. Tiene una pantalla retina de 42mm, conectividad GPS y el chip S10",
      files: [
        {
          url: "/assets/products/electronics/apple-watch-series-10-gps/pink_gold_0.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/apple-watch-series-10-gps/pink_gold_1.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/apple-watch-series-10-gps/pink_gold_2.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/apple-watch-series-10-gps/pink_gold_3.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/apple-watch-series-10-gps/black_0.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/apple-watch-series-10-gps/black_1.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/apple-watch-series-10-gps/black_2.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/apple-watch-series-10-gps/black_3.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/apple-watch-series-10-gps/generic_0.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/apple-watch-series-10-gps/generic_1.webp",
          type: FileType.IMAGE,
        },
      ],
      variants: [
        {
          sku: "AWS10GPS-PINK-42",
          size: "42mm",
          color: "Pink Gold",
          esColor: "Oro Rosa",
          quantity: 10,
          priceInCents: 949900,
          maximumQuantityPerOrder: 2,
        },
        {
          sku: "AWS10GPS-BLACK-42",
          size: "42mm",
          color: "Black",
          esColor: "Negro",
          quantity: 10,
          priceInCents: 949900,
          maximumQuantityPerOrder: 2,
        },
      ],
    },
    {
      name: "iPad Air 11' Wifi",
      slug: "ipad-air-11-wifi",
      category: ProductCategory.ELECTRONICS,
      description: "asd",
      esDescription: "asd",
      files: [
        {
          url: "/assets/products/electronics/ipad-air-11-wifi/white_0.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/ipad-air-11-wifi/white_1.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/ipad-air-11-wifi/white_2.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/ipad-air-11-wifi/white_3.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/ipad-air-11-wifi/purple_0.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/ipad-air-11-wifi/purple_1.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/ipad-air-11-wifi/purple_2.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/ipad-air-11-wifi/purple_3.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/ipad-air-11-wifi/generic_0.webp",
          type: FileType.IMAGE,
        },
      ],
      variants: [
        {
          sku: "IPD11-WHITE-WIFI-1TB",
          size: "1 TB",
          color: "White",
          esColor: "Blanco",
          quantity: 10,
          priceInCents: 2699900,
          maximumQuantityPerOrder: 2,
        },
        {
          sku: "IPD11-PURPLE-WIFI-1TB",
          size: "1 TB",
          color: "Purple",
          esColor: "Púrpura",
          quantity: 10,
          priceInCents: 2699900,
          maximumQuantityPerOrder: 2,
        },
      ],
    },
    {
      name: "AirPods Pro 2",
      slug: "airpods-pro-2",
      category: ProductCategory.ELECTRONICS,
      description: "asd",
      esDescription: "asd",
      files: [
        {
          url: "/assets/products/electronics/airpods-pro-2/white_0.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/airpods-pro-2/white_1.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/airpods-pro-2/white_2.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/airpods-pro-2/white_3.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/airpods-pro-2/white_4.webp",
          type: FileType.IMAGE,
        },
        {
          url: "/assets/products/electronics/airpods-pro-2/white_5.webp",
          type: FileType.IMAGE,
        },
      ],
      variants: [
        {
          sku: "APPRO2-USBC",
          size: "USB-C",
          color: "",
          esColor: "",
          quantity: 10,
          priceInCents: 529900,
          maximumQuantityPerOrder: 2,
        },
      ],
    },
  ];

  products.forEach(async (product) => {
    // const productCreated = await prisma.product.create({
    //   data: {
    //     name: product.name,
    //     slug: product.slug,
    //     category: product.category,
    //     description: product.description,
    //   },
    // });
    // await prisma.productFile.createMany({
    //   data: product.files.map((file) => ({
    //     url: file.url,
    //     type: file.type,
    //     productId: productCreated.id,
    //   })),
    // });
    // await prisma.productVariant.createMany({
    //   data: product.variants.map((variant) => ({
    //     sku: variant.sku,
    //     size: variant.size,
    //     color: variant.color,
    //     quantity: variant.quantity,
    //     priceInCents: variant.priceInCents,
    //     maximumQuantityPerOrder: variant.maximumQuantityPerOrder,
    //     productId: productCreated.id,
    //   })),
    // });
    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        category: product.category,
        description: product.description,
        esDescription: product.esDescription,
        files: {
          create: product.files,
        },
        variants: {
          create: product.variants,
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
