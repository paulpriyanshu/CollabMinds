/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Projects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Projects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_userEmail_fkey";

-- DropIndex
DROP INDEX "Projects_userEmail_key";

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "userEmail",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Projects_userId_key" ON "Projects"("userId");

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
