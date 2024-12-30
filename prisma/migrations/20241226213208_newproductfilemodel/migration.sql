/*
  Warnings:

  - You are about to drop the column `variantId` on the `ProductFile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductFile" DROP CONSTRAINT "ProductFile_variantId_fkey";

-- AlterTable
ALTER TABLE "ProductFile" DROP COLUMN "variantId";
