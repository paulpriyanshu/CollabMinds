-- CreateTable
CREATE TABLE "Google_auth_user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Google_auth_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Google_auth_user_email_key" ON "Google_auth_user"("email");
