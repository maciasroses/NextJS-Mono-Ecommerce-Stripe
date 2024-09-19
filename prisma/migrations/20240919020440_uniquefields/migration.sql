/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `CustomList` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CustomList_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "CustomList_name_userId_key" ON "CustomList"("name", "userId");
