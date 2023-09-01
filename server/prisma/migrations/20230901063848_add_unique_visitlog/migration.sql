/*
  Warnings:

  - A unique constraint covering the columns `[created_at,accountId]` on the table `VisitLog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VisitLog_created_at_accountId_key" ON "VisitLog"("created_at", "accountId");
