/*
  Warnings:

  - You are about to drop the column `invoiceUrl` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `reservedAt` on the `StockReservation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `StockReservation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,productId]` on the table `StockReservation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "invoiceUrl",
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "StockReservation" DROP COLUMN "reservedAt",
DROP COLUMN "updatedAt";

-- CreateIndex
CREATE UNIQUE INDEX "StockReservation_userId_productId_key" ON "StockReservation"("userId", "productId");
