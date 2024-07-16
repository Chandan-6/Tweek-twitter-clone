/*
  Warnings:

  - You are about to drop the column `image` on the `TweekUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TweekUser" DROP COLUMN "image",
ADD COLUMN     "userProfile" TEXT;
