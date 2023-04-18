/*
  Warnings:

  - A unique constraint covering the columns `[characterId,fightId]` on the table `CharacterFightInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[characterId,fightId,statTypeId,valueTypeId]` on the table `CharacterFightStat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[raidId,characterId]` on the table `CharacterRaidInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[characterId,raidId,statTypeId,valueTypeId]` on the table `CharacterRaidStat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[raidId,start_time,end_time]` on the table `Fight` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fightId,statTypeId,valueTypeId]` on the table `FightStat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[start_date,start_time,end_time]` on the table `Raid` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[raidId,statTypeId,valueTypeId]` on the table `RaidStat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `characterId` to the `CharacterFightStat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CharacterFightStat" ADD COLUMN     "characterId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CharacterFightInfo_characterId_fightId_key" ON "CharacterFightInfo"("characterId", "fightId");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterFightStat_characterId_fightId_statTypeId_valueType_key" ON "CharacterFightStat"("characterId", "fightId", "statTypeId", "valueTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterRaidInfo_raidId_characterId_key" ON "CharacterRaidInfo"("raidId", "characterId");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterRaidStat_characterId_raidId_statTypeId_valueTypeId_key" ON "CharacterRaidStat"("characterId", "raidId", "statTypeId", "valueTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "Fight_raidId_start_time_end_time_key" ON "Fight"("raidId", "start_time", "end_time");

-- CreateIndex
CREATE UNIQUE INDEX "FightStat_fightId_statTypeId_valueTypeId_key" ON "FightStat"("fightId", "statTypeId", "valueTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "Raid_start_date_start_time_end_time_key" ON "Raid"("start_date", "start_time", "end_time");

-- CreateIndex
CREATE UNIQUE INDEX "RaidStat_raidId_statTypeId_valueTypeId_key" ON "RaidStat"("raidId", "statTypeId", "valueTypeId");

-- AddForeignKey
ALTER TABLE "CharacterFightStat" ADD CONSTRAINT "CharacterFightStat_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
