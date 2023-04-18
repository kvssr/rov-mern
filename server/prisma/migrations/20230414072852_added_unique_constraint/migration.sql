/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Profession` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_short]` on the table `Profession` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `RaidType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `StatType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_short]` on the table `StatType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_json]` on the table `StatType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ValueType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_short]` on the table `ValueType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account_name_key" ON "Account"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Profession_name_key" ON "Profession"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Profession_name_short_key" ON "Profession"("name_short");

-- CreateIndex
CREATE UNIQUE INDEX "RaidType_name_key" ON "RaidType"("name");

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
