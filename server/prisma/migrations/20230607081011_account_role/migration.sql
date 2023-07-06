-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "accountRoleId" INTEGER;

-- CreateTable
CREATE TABLE "AccountRole" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "power" INTEGER NOT NULL,

    CONSTRAINT "AccountRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountRole_name_key" ON "AccountRole"("name");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_accountRoleId_fkey" FOREIGN KEY ("accountRoleId") REFERENCES "AccountRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;
