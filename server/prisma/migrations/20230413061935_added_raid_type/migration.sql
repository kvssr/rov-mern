/*
  Warnings:

  - Added the required column `raidTypeId` to the `Raid` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Raid" ADD COLUMN     "raidTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "RaidType" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RaidType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Raid" ADD CONSTRAINT "Raid_raidTypeId_fkey" FOREIGN KEY ("raidTypeId") REFERENCES "RaidType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
