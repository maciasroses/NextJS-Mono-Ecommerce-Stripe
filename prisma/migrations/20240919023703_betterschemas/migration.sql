/*
  Warnings:

  - The primary key for the `CustomList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `CustomList` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,name]` on the table `CustomList` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `CustomList` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "CustomList" DROP CONSTRAINT "CustomList_productId_fkey";

-- DropIndex
DROP INDEX "CustomList_name_userId_key";

-- AlterTable
ALTER TABLE "CustomList" DROP CONSTRAINT "CustomList_pkey",
DROP COLUMN "productId",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "CustomList_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "CustomListProduct" (
    "customListId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomListProduct_pkey" PRIMARY KEY ("customListId","productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomList_userId_name_key" ON "CustomList"("userId", "name");

-- AddForeignKey
ALTER TABLE "CustomListProduct" ADD CONSTRAINT "CustomListProduct_customListId_fkey" FOREIGN KEY ("customListId") REFERENCES "CustomList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomListProduct" ADD CONSTRAINT "CustomListProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
