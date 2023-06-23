/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `BuildType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_short]` on the table `BuildType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BuildType_name_key" ON "BuildType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BuildType_name_short_key" ON "BuildType"("name_short");
