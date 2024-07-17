/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
