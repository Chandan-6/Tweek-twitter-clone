/*
  Warnings:

  - A unique constraint covering the columns `[liker,tweekID]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like_liker_tweekID_key" ON "Like"("liker", "tweekID");
