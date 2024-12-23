/*
  Warnings:

  - You are about to drop the column `phone` on the `Address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "phone",
ADD COLUMN     "additionalInfo" TEXT,
ADD COLUMN     "phoneNumber" TEXT;
