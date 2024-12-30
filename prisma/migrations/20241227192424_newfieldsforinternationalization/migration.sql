/*
  Warnings:

  - Added the required column `esDescription` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "esDescription" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "esColor" TEXT;
