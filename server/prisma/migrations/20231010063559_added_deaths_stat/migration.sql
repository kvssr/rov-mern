-- AlterTable
ALTER TABLE "CharacterRaidStat" ADD COLUMN     "times_top" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Fight" ADD COLUMN     "deaths" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Raid" ADD COLUMN     "total_deaths" INTEGER NOT NULL DEFAULT 0;
