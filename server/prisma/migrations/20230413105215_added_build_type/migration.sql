/*
  Warnings:

  - Added the required column `buildTypeId` to the `Fight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fight" ADD COLUMN     "buildTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Fight" ADD CONSTRAINT "Fight_buildTypeId_fkey" FOREIGN KEY ("buildTypeId") REFERENCES "BuildType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
