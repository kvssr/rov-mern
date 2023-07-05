-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "professionId" INTEGER,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profession" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "name_short" VARCHAR(10) NOT NULL,
    "color" VARCHAR(100) NOT NULL,

    CONSTRAINT "Profession_pkey" PRIMARY KEY ("id")
);

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
    "name_json" VARCHAR(50) NOT NULL,

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
    "apiId" TEXT,
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
    "raidTypeId" INTEGER,

    CONSTRAINT "Raid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaidType" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RaidType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaidStat" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "raidId" INTEGER NOT NULL,
    "statTypeId" INTEGER NOT NULL,
    "valueTypeId" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RaidStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fight" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "raidId" INTEGER NOT NULL,
    "fight_number" INTEGER NOT NULL,
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
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FightStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterFightStat" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "characterId" INTEGER NOT NULL,
    "fightId" INTEGER NOT NULL,
    "statTypeId" INTEGER NOT NULL,
    "valueTypeId" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CharacterFightStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterFightInfo" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "fightId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "buildTypeId" INTEGER,
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
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CharacterRaidStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterRaidInfo" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "raidId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "attendance_percentage" DOUBLE PRECISION NOT NULL,
    "duration_active" INTEGER NOT NULL,
    "duration_fights_present" INTEGER NOT NULL,
    "duration_in_combat" INTEGER NOT NULL,
    "normalization_time_allies" DOUBLE PRECISION NOT NULL,
    "num_fights_present" INTEGER NOT NULL,
    "swapped_builds" BOOLEAN NOT NULL,

    CONSTRAINT "CharacterRaidInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_professionId_key" ON "Character"("name", "professionId");

-- CreateIndex
CREATE UNIQUE INDEX "Profession_name_key" ON "Profession"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Profession_name_short_key" ON "Profession"("name_short");

-- CreateIndex
CREATE UNIQUE INDEX "BuildType_name_key" ON "BuildType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BuildType_name_short_key" ON "BuildType"("name_short");

-- CreateIndex
CREATE UNIQUE INDEX "StatType_name_key" ON "StatType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "StatType_name_short_key" ON "StatType"("name_short");

-- CreateIndex
CREATE UNIQUE INDEX "StatType_name_json_key" ON "StatType"("name_json");

-- CreateIndex
CREATE UNIQUE INDEX "ValueType_name_key" ON "ValueType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ValueType_name_short_key" ON "ValueType"("name_short");

-- CreateIndex
CREATE UNIQUE INDEX "Account_name_key" ON "Account"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Raid_start_date_start_time_end_time_key" ON "Raid"("start_date", "start_time", "end_time");

-- CreateIndex
CREATE UNIQUE INDEX "RaidType_name_key" ON "RaidType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RaidStat_raidId_statTypeId_valueTypeId_key" ON "RaidStat"("raidId", "statTypeId", "valueTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "Fight_raidId_start_time_end_time_key" ON "Fight"("raidId", "start_time", "end_time");

-- CreateIndex
CREATE UNIQUE INDEX "FightStat_fightId_statTypeId_valueTypeId_key" ON "FightStat"("fightId", "statTypeId", "valueTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterFightStat_characterId_fightId_statTypeId_valueType_key" ON "CharacterFightStat"("characterId", "fightId", "statTypeId", "valueTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterFightInfo_characterId_fightId_key" ON "CharacterFightInfo"("characterId", "fightId");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterRaidStat_characterId_raidId_statTypeId_valueTypeId_key" ON "CharacterRaidStat"("characterId", "raidId", "statTypeId", "valueTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterRaidInfo_raidId_characterId_key" ON "CharacterRaidInfo"("raidId", "characterId");

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
ALTER TABLE "CharacterFightStat" ADD CONSTRAINT "CharacterFightStat_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFightStat" ADD CONSTRAINT "CharacterFightStat_fightId_fkey" FOREIGN KEY ("fightId") REFERENCES "Fight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFightStat" ADD CONSTRAINT "CharacterFightStat_statTypeId_fkey" FOREIGN KEY ("statTypeId") REFERENCES "StatType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFightStat" ADD CONSTRAINT "CharacterFightStat_valueTypeId_fkey" FOREIGN KEY ("valueTypeId") REFERENCES "ValueType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFightInfo" ADD CONSTRAINT "CharacterFightInfo_fightId_fkey" FOREIGN KEY ("fightId") REFERENCES "Fight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFightInfo" ADD CONSTRAINT "CharacterFightInfo_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFightInfo" ADD CONSTRAINT "CharacterFightInfo_buildTypeId_fkey" FOREIGN KEY ("buildTypeId") REFERENCES "BuildType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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

