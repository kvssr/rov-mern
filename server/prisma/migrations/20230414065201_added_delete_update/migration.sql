/*
  Warnings:

  - You are about to drop the column `buildTypeId` on the `Fight` table. All the data in the column will be lost.
  - Added the required column `name_json` to the `StatType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_professionId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterFightInfo" DROP CONSTRAINT "CharacterFightInfo_characterId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterFightInfo" DROP CONSTRAINT "CharacterFightInfo_fightId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterFightStat" DROP CONSTRAINT "CharacterFightStat_fightId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterFightStat" DROP CONSTRAINT "CharacterFightStat_statTypeId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterFightStat" DROP CONSTRAINT "CharacterFightStat_valueTypeId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterRaidInfo" DROP CONSTRAINT "CharacterRaidInfo_characterId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterRaidInfo" DROP CONSTRAINT "CharacterRaidInfo_raidId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterRaidStat" DROP CONSTRAINT "CharacterRaidStat_characterId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterRaidStat" DROP CONSTRAINT "CharacterRaidStat_raidId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterRaidStat" DROP CONSTRAINT "CharacterRaidStat_statTypeId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterRaidStat" DROP CONSTRAINT "CharacterRaidStat_valueTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Fight" DROP CONSTRAINT "Fight_buildTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Fight" DROP CONSTRAINT "Fight_raidId_fkey";

-- DropForeignKey
ALTER TABLE "FightStat" DROP CONSTRAINT "FightStat_fightId_fkey";

-- DropForeignKey
ALTER TABLE "FightStat" DROP CONSTRAINT "FightStat_statTypeId_fkey";

-- DropForeignKey
ALTER TABLE "FightStat" DROP CONSTRAINT "FightStat_valueTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Raid" DROP CONSTRAINT "Raid_raidTypeId_fkey";

-- DropForeignKey
ALTER TABLE "RaidStat" DROP CONSTRAINT "RaidStat_raidId_fkey";

-- DropForeignKey
ALTER TABLE "RaidStat" DROP CONSTRAINT "RaidStat_statTypeId_fkey";

-- DropForeignKey
ALTER TABLE "RaidStat" DROP CONSTRAINT "RaidStat_valueTypeId_fkey";

-- AlterTable
ALTER TABLE "Character" ALTER COLUMN "professionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CharacterFightStat" ADD COLUMN     "buildTypeId" INTEGER;

-- AlterTable
ALTER TABLE "Fight" DROP COLUMN "buildTypeId";

-- AlterTable
ALTER TABLE "Raid" ALTER COLUMN "raidTypeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "StatType" ADD COLUMN     "name_json" VARCHAR(50) NOT NULL;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Profession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Raid" ADD CONSTRAINT "Raid_raidTypeId_fkey" FOREIGN KEY ("raidTypeId") REFERENCES "RaidType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaidStat" ADD CONSTRAINT "RaidStat_raidId_fkey" FOREIGN KEY ("raidId") REFERENCES "Raid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaidStat" ADD CONSTRAINT "RaidStat_statTypeId_fkey" FOREIGN KEY ("statTypeId") REFERENCES "StatType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaidStat" ADD CONSTRAINT "RaidStat_valueTypeId_fkey" FOREIGN KEY ("valueTypeId") REFERENCES "ValueType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fight" ADD CONSTRAINT "Fight_raidId_fkey" FOREIGN KEY ("raidId") REFERENCES "Raid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FightStat" ADD CONSTRAINT "FightStat_fightId_fkey" FOREIGN KEY ("fightId") REFERENCES "Fight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FightStat" ADD CONSTRAINT "FightStat_statTypeId_fkey" FOREIGN KEY ("statTypeId") REFERENCES "StatType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FightStat" ADD CONSTRAINT "FightStat_valueTypeId_fkey" FOREIGN KEY ("valueTypeId") REFERENCES "ValueType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFightStat" ADD CONSTRAINT "CharacterFightStat_fightId_fkey" FOREIGN KEY ("fightId") REFERENCES "Fight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFightStat" ADD CONSTRAINT "CharacterFightStat_statTypeId_fkey" FOREIGN KEY ("statTypeId") REFERENCES "StatType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFightStat" ADD CONSTRAINT "CharacterFightStat_valueTypeId_fkey" FOREIGN KEY ("valueTypeId") REFERENCES "ValueType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFightStat" ADD CONSTRAINT "CharacterFightStat_buildTypeId_fkey" FOREIGN KEY ("buildTypeId") REFERENCES "BuildType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFightInfo" ADD CONSTRAINT "CharacterFightInfo_fightId_fkey" FOREIGN KEY ("fightId") REFERENCES "Fight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFightInfo" ADD CONSTRAINT "CharacterFightInfo_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterRaidStat" ADD CONSTRAINT "CharacterRaidStat_raidId_fkey" FOREIGN KEY ("raidId") REFERENCES "Raid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterRaidStat" ADD CONSTRAINT "CharacterRaidStat_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterRaidStat" ADD CONSTRAINT "CharacterRaidStat_statTypeId_fkey" FOREIGN KEY ("statTypeId") REFERENCES "StatType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterRaidStat" ADD CONSTRAINT "CharacterRaidStat_valueTypeId_fkey" FOREIGN KEY ("valueTypeId") REFERENCES "ValueType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterRaidInfo" ADD CONSTRAINT "CharacterRaidInfo_raidId_fkey" FOREIGN KEY ("raidId") REFERENCES "Raid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterRaidInfo" ADD CONSTRAINT "CharacterRaidInfo_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
