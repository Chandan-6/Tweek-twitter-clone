-- CreateTable
CREATE TABLE "Bookmarks" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "bookmarkedTweekId" TEXT NOT NULL,

    CONSTRAINT "Bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bookmarks_userId_bookmarkedTweekId_key" ON "Bookmarks"("userId", "bookmarkedTweekId");

-- AddForeignKey
ALTER TABLE "Bookmarks" ADD CONSTRAINT "Bookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "TweekUser"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmarks" ADD CONSTRAINT "Bookmarks_bookmarkedTweekId_fkey" FOREIGN KEY ("bookmarkedTweekId") REFERENCES "Tweek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
