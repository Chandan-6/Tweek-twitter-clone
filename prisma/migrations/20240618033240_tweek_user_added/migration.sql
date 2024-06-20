-- CreateTable
CREATE TABLE "TweekUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "password" TEXT NOT NULL,
    "joinedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bio" TEXT NOT NULL,

    CONSTRAINT "TweekUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TweekUser_email_key" ON "TweekUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TweekUser_userName_key" ON "TweekUser"("userName");
