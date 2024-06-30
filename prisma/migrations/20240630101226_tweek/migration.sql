-- CreateTable
CREATE TABLE "Tweek" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Tweek_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tweek" ADD CONSTRAINT "Tweek_userId_fkey" FOREIGN KEY ("userId") REFERENCES "TweekUser"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
