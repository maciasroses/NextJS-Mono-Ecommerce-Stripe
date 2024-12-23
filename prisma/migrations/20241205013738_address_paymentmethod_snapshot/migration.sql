/*
  Warnings:

  - You are about to drop the column `type` on the `PaymentMethod` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "addressSnapshotId" TEXT,
ADD COLUMN     "paymentMethodSnapshotId" TEXT;

-- AlterTable
ALTER TABLE "PaymentMethod" DROP COLUMN "type";

-- CreateTable
CREATE TABLE "PaymentMethodSnapshot" (
    "id" TEXT NOT NULL,
    "last4Digits" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "expiryMonth" INTEGER NOT NULL,
    "expiryYear" INTEGER NOT NULL,

    CONSTRAINT "PaymentMethodSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddressSnapshot" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "phoneNumber" TEXT,

    CONSTRAINT "AddressSnapshot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressSnapshotId_fkey" FOREIGN KEY ("addressSnapshotId") REFERENCES "AddressSnapshot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_paymentMethodSnapshotId_fkey" FOREIGN KEY ("paymentMethodSnapshotId") REFERENCES "PaymentMethodSnapshot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
