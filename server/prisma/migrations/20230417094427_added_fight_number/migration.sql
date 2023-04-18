/*
  Warnings:

  - Added the required column `fight_number` to the `Fight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fight" ADD COLUMN     "fight_number" INTEGER NOT NULL;
