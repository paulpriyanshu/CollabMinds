/*
  Warnings:

  - You are about to drop the column `role` on the `Editor` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Editor_role_key";

-- AlterTable
ALTER TABLE "Editor" DROP COLUMN "role";
