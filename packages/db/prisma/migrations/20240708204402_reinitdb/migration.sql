/*
  Warnings:

  - You are about to drop the column `userId` on the `Projects` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_userId_fkey";

-- DropIndex
DROP INDEX "Projects_userId_key";

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "userId";
