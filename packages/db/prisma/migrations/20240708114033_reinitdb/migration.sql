/*
  Warnings:

  - You are about to drop the column `userId` on the `Projects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `Projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Projects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_userId_fkey";

-- DropIndex
DROP INDEX "Projects_userId_key";

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "userId",
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Projects_userEmail_key" ON "Projects"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Projects_title_key" ON "Projects"("title");

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
