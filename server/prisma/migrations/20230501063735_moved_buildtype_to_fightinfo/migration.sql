/*
  Warnings:

  - You are about to drop the column `buildTypeId` on the `CharacterFightStat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CharacterFightStat" DROP CONSTRAINT "CharacterFightStat_buildTypeId_fkey";

-- AlterTable
ALTER TABLE "CharacterFightInfo" ADD COLUMN     "buildTypeId" INTEGER;

-- AlterTable
ALTER TABLE "CharacterFightStat" DROP COLUMN "buildTypeId";

-- AddForeignKey
ALTER TABLE "CharacterFightInfo" ADD CONSTRAINT "CharacterFightInfo_buildTypeId_fkey" FOREIGN KEY ("buildTypeId") REFERENCES "BuildType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
