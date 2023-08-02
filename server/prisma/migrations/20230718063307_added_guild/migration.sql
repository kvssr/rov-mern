-- CreateTable
CREATE TABLE "Guild" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "apiId" TEXT NOT NULL,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccountToGuild" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Guild_name_key" ON "Guild"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Guild_apiId_key" ON "Guild"("apiId");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToGuild_AB_unique" ON "_AccountToGuild"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToGuild_B_index" ON "_AccountToGuild"("B");

-- AddForeignKey
ALTER TABLE "_AccountToGuild" ADD CONSTRAINT "_AccountToGuild_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToGuild" ADD CONSTRAINT "_AccountToGuild_B_fkey" FOREIGN KEY ("B") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;
