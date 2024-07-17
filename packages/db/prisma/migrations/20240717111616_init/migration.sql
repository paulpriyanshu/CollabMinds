-- CreateEnum
CREATE TYPE "Role" AS ENUM ('None', 'Editor', 'User');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Role" "Role" NOT NULL DEFAULT 'None';
