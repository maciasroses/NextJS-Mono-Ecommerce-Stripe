/*
  Warnings:

  - The values [PAID] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [FOOD] on the enum `ProductCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'SHIPPED', 'DELIVERED');
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ProductCategory_new" AS ENUM ('ELECTRONICS', 'CLOTHING', 'BOOKS', 'TOYS');
ALTER TABLE "Product" ALTER COLUMN "category" TYPE "ProductCategory_new" USING ("category"::text::"ProductCategory_new");
ALTER TYPE "ProductCategory" RENAME TO "ProductCategory_old";
ALTER TYPE "ProductCategory_new" RENAME TO "ProductCategory";
DROP TYPE "ProductCategory_old";
COMMIT;
