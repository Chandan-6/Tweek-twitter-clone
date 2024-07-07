/*
  Warnings:

  - You are about to drop the column `likes` on the `Tweek` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tweek" DROP COLUMN "likes";

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "liker" TEXT NOT NULL,
    "tweekID" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_tweekID_fkey" FOREIGN KEY ("tweekID") REFERENCES "Tweek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
