/*
  Warnings:

  - You are about to drop the `CustomListProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CustomListProduct" DROP CONSTRAINT "CustomListProduct_customListId_fkey";

-- DropForeignKey
ALTER TABLE "CustomListProduct" DROP CONSTRAINT "CustomListProduct_productId_fkey";

-- DropTable
DROP TABLE "CustomListProduct";

-- CreateTable
CREATE TABLE "CustomProductsList" (
    "customListId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomProductsList_pkey" PRIMARY KEY ("customListId","productId")
);

-- AddForeignKey
ALTER TABLE "CustomProductsList" ADD CONSTRAINT "CustomProductsList_customListId_fkey" FOREIGN KEY ("customListId") REFERENCES "CustomList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomProductsList" ADD CONSTRAINT "CustomProductsList_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
