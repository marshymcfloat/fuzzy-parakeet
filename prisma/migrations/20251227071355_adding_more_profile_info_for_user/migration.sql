-- AlterTable
ALTER TABLE "User" ADD COLUMN     "canSell" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "name" TEXT;
