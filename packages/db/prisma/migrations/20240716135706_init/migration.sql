/*
  Warnings:

  - A unique constraint covering the columns `[accessCode]` on the table `Projects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessCode` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "accessCode" TEXT NOT NULL,
ADD COLUMN     "editorEmail" TEXT;

-- CreateTable
CREATE TABLE "Editor" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Editor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Editor_email_key" ON "Editor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Editor_role_key" ON "Editor"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Projects_accessCode_key" ON "Projects"("accessCode");

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_editorEmail_fkey" FOREIGN KEY ("editorEmail") REFERENCES "Editor"("email") ON DELETE SET NULL ON UPDATE CASCADE;
