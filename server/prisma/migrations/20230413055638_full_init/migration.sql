/*
  Warnings:

  - You are about to alter the column `name_short` on the `Profession` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(10)`.
  - A unique constraint covering the columns `[name,professionId]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "accountId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Profession" ALTER COLUMN "name_short" SET DATA TYPE VARCHAR(10);

-- CreateTable
CREATE TABLE "BuildType" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "name_short" VARCHAR(10) NOT NULL,

    CONSTRAINT "BuildType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatType" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "name_short" VARCHAR(10) NOT NULL,

    CONSTRAINT "StatType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValueType" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "name_short" VARCHAR(10) NOT NULL,

    CONSTRAINT "ValueType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Raid" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "min_allies" INTEGER NOT NULL,
    "max_allies" INTEGER NOT NULL,
    "mean_allies" DOUBLE PRECISION NOT NULL,
    "min_enemies" INTEGER NOT NULL,
    "max_enemies" INTEGER NOT NULL,
    "mean_enemies" DOUBLE PRECISION NOT NULL,
    "total_kills" INTEGER NOT NULL,

    CONSTRAINT "Raid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaidStat" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "raidId" INTEGER NOT NULL,
    "statTypeId" INTEGER NOT NULL,
    "valueTypeId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "RaidStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fight" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "raidId" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "allies" INTEGER NOT NULL,
    "enemies" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "kills" INTEGER NOT NULL,
    "skipped" BOOLEAN NOT NULL,

    CONSTRAINT "Fight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FightStat" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "fightId" INTEGER NOT NULL,
    "statTypeId" INTEGER NOT NULL,
    "valueTypeId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "FightStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterFightStat" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "fightId" INTEGER NOT NULL,
    "statTypeId" INTEGER NOT NULL,
    "valueTypeId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "CharacterFightStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterFightInfo" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "fightId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "group" INTEGER NOT NULL,
    "time_active" INTEGER NOT NULL,
    "time_in_combat" INTEGER NOT NULL,

    CONSTRAINT "CharacterFightInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterRaidStat" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "raidId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "statTypeId" INTEGER NOT NULL,
    "valueTypeId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "CharacterRaidStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterRaidInfo" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "raidId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "attendance_percentage" INTEGER NOT NULL,
    "duration_active" INTEGER NOT NULL,
    "duration_fights_present" INTEGER NOT NULL,
    "duration_in_combat" INTEGER NOT NULL,
    "normalization_time_allies" INTEGER NOT NULL,
    "num_fights_present" INTEGER NOT NULL,
    "swapped_builds" BOOLEAN NOT NULL,

    CONSTRAINT "CharacterRaidInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_professionId_key" ON "Character"("name", "professionId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaidStat" ADD CONSTRAINT "RaidStat_raidId_fkey" FOREIGN KEY ("raidId") REFERENCES "Raid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaidStat" ADD CONSTRAINT "RaidStat_statTypeId_fkey" FOREIGN KEY ("statTypeId") REFERENCES "StatType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaidStat" ADD CONSTRAINT "RaidStat_valueTypeId_fkey" FOREIGN KEY ("valueTypeId") REFERENCES "ValueType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fight" ADD CONSTRAINT "Fight_raidId_fkey" FOREIGN KEY ("raidId") REFERENCES "Raid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FightStat" ADD CONSTRAINT "FightStat_fightId_fkey" FOREIGN KEY ("fightId") REFERENCES "Fight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FightStat" ADD CONSTRAINT "FightStat_statTypeId_fkey" FOREIGN KEY ("statTypeId") REFERENCES "StatType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FightStat" ADD CONSTRAINT "FightStat_valueTypeId_fkey" FOREIGN KEY ("valueTypeId") REFERENCES "ValueType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFightStat" ADD CONSTRAINT "CharacterFightStat_fightId_fkey" FOREIGN KEY ("fightId") REFERENCES "Fight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFightStat" ADD CONSTRAINT "CharacterFightStat_statTypeId_fkey" FOREIGN KEY ("statTypeId") REFERENCES "StatType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFightStat" ADD CONSTRAINT "CharacterFightStat_valueTypeId_fkey" FOREIGN KEY ("valueTypeId") REFERENCES "ValueType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFightInfo" ADD CONSTRAINT "CharacterFightInfo_fightId_fkey" FOREIGN KEY ("fightId") REFERENCES "Fight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFightInfo" ADD CONSTRAINT "CharacterFightInfo_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterRaidStat" ADD CONSTRAINT "CharacterRaidStat_raidId_fkey" FOREIGN KEY ("raidId") REFERENCES "Raid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterRaidStat" ADD CONSTRAINT "CharacterRaidStat_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterRaidStat" ADD CONSTRAINT "CharacterRaidStat_statTypeId_fkey" FOREIGN KEY ("statTypeId") REFERENCES "StatType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterRaidStat" ADD CONSTRAINT "CharacterRaidStat_valueTypeId_fkey" FOREIGN KEY ("valueTypeId") REFERENCES "ValueType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterRaidInfo" ADD CONSTRAINT "CharacterRaidInfo_raidId_fkey" FOREIGN KEY ("raidId") REFERENCES "Raid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterRaidInfo" ADD CONSTRAINT "CharacterRaidInfo_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
