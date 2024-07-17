/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `Projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "thumbnail",
DROP COLUMN "video";
