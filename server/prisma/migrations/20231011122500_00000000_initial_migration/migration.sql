-- CreateTable
CREATE TABLE `Character` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `professionId` INTEGER NULL,
    `accountId` INTEGER NOT NULL,

    UNIQUE INDEX `Character_name_professionId_key`(`name`, `professionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `name_short` VARCHAR(10) NOT NULL,
    `color` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Profession_name_key`(`name`),
    UNIQUE INDEX `Profession_name_short_key`(`name_short`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BuildType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `name_short` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `BuildType_name_key`(`name`),
    UNIQUE INDEX `BuildType_name_short_key`(`name_short`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `name_short` VARCHAR(10) NOT NULL,
    `name_json` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `StatType_name_key`(`name`),
    UNIQUE INDEX `StatType_name_short_key`(`name_short`),
    UNIQUE INDEX `StatType_name_json_key`(`name_json`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ValueType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `name_short` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `ValueType_name_key`(`name`),
    UNIQUE INDEX `ValueType_name_short_key`(`name_short`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apiId` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `accountRoleId` INTEGER NULL,

    UNIQUE INDEX `Account_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Raid` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `min_allies` INTEGER NOT NULL,
    `max_allies` INTEGER NOT NULL,
    `mean_allies` DOUBLE NOT NULL,
    `min_enemies` INTEGER NOT NULL,
    `max_enemies` INTEGER NOT NULL,
    `mean_enemies` DOUBLE NOT NULL,
    `total_kills` INTEGER NOT NULL,
    `total_deaths` INTEGER NOT NULL DEFAULT 0,
    `raidTypeId` INTEGER NULL,

    UNIQUE INDEX `Raid_start_date_start_time_end_time_key`(`start_date`, `start_time`, `end_time`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RaidType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RaidType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RaidStat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `raidId` INTEGER NOT NULL,
    `statTypeId` INTEGER NOT NULL,
    `valueTypeId` INTEGER NOT NULL,
    `value` DOUBLE NOT NULL,

    UNIQUE INDEX `RaidStat_raidId_statTypeId_valueTypeId_key`(`raidId`, `statTypeId`, `valueTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fight` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `raidId` INTEGER NOT NULL,
    `fight_number` INTEGER NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `allies` INTEGER NOT NULL,
    `enemies` INTEGER NOT NULL,
    `duration` INTEGER NOT NULL,
    `kills` INTEGER NOT NULL,
    `deaths` INTEGER NOT NULL DEFAULT 0,
    `skipped` BOOLEAN NOT NULL,

    UNIQUE INDEX `Fight_raidId_start_time_end_time_key`(`raidId`, `start_time`, `end_time`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FightStat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `fightId` INTEGER NOT NULL,
    `statTypeId` INTEGER NOT NULL,
    `valueTypeId` INTEGER NOT NULL,
    `value` DOUBLE NOT NULL,

    UNIQUE INDEX `FightStat_fightId_statTypeId_valueTypeId_key`(`fightId`, `statTypeId`, `valueTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CharacterFightStat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `characterId` INTEGER NOT NULL,
    `fightId` INTEGER NOT NULL,
    `statTypeId` INTEGER NOT NULL,
    `valueTypeId` INTEGER NOT NULL,
    `value` DOUBLE NOT NULL,

    UNIQUE INDEX `CharacterFightStat_characterId_fightId_statTypeId_valueTypeI_key`(`characterId`, `fightId`, `statTypeId`, `valueTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CharacterFightInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `fightId` INTEGER NOT NULL,
    `characterId` INTEGER NOT NULL,
    `buildTypeId` INTEGER NULL,
    `group` INTEGER NOT NULL,
    `time_active` INTEGER NOT NULL,
    `time_in_combat` INTEGER NOT NULL,

    UNIQUE INDEX `CharacterFightInfo_characterId_fightId_key`(`characterId`, `fightId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CharacterRaidStat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `raidId` INTEGER NOT NULL,
    `characterId` INTEGER NOT NULL,
    `statTypeId` INTEGER NOT NULL,
    `valueTypeId` INTEGER NOT NULL,
    `times_top` INTEGER NOT NULL DEFAULT 0,
    `value` DOUBLE NOT NULL,

    UNIQUE INDEX `CharacterRaidStat_characterId_raidId_statTypeId_valueTypeId_key`(`characterId`, `raidId`, `statTypeId`, `valueTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CharacterRaidInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `raidId` INTEGER NOT NULL,
    `characterId` INTEGER NOT NULL,
    `attendance_percentage` DOUBLE NOT NULL,
    `duration_active` INTEGER NOT NULL,
    `duration_fights_present` INTEGER NOT NULL,
    `duration_in_combat` INTEGER NOT NULL,
    `normalization_time_allies` DOUBLE NOT NULL,
    `num_fights_present` INTEGER NOT NULL,
    `swapped_builds` BOOLEAN NOT NULL,

    UNIQUE INDEX `CharacterRaidInfo_raidId_characterId_key`(`raidId`, `characterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountRole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `power` INTEGER NOT NULL,

    UNIQUE INDEX `AccountRole_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guild` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `apiId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Guild_name_key`(`name`),
    UNIQUE INDEX `Guild_apiId_key`(`apiId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VisitLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `accountId` INTEGER NOT NULL,

    UNIQUE INDEX `VisitLog_created_at_accountId_key`(`created_at`, `accountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AccountToGuild` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AccountToGuild_AB_unique`(`A`, `B`),
    INDEX `_AccountToGuild_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Character` ADD CONSTRAINT `Character_professionId_fkey` FOREIGN KEY (`professionId`) REFERENCES `Profession`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Character` ADD CONSTRAINT `Character_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_accountRoleId_fkey` FOREIGN KEY (`accountRoleId`) REFERENCES `AccountRole`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Raid` ADD CONSTRAINT `Raid_raidTypeId_fkey` FOREIGN KEY (`raidTypeId`) REFERENCES `RaidType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RaidStat` ADD CONSTRAINT `RaidStat_raidId_fkey` FOREIGN KEY (`raidId`) REFERENCES `Raid`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RaidStat` ADD CONSTRAINT `RaidStat_statTypeId_fkey` FOREIGN KEY (`statTypeId`) REFERENCES `StatType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RaidStat` ADD CONSTRAINT `RaidStat_valueTypeId_fkey` FOREIGN KEY (`valueTypeId`) REFERENCES `ValueType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fight` ADD CONSTRAINT `Fight_raidId_fkey` FOREIGN KEY (`raidId`) REFERENCES `Raid`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FightStat` ADD CONSTRAINT `FightStat_fightId_fkey` FOREIGN KEY (`fightId`) REFERENCES `Fight`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FightStat` ADD CONSTRAINT `FightStat_statTypeId_fkey` FOREIGN KEY (`statTypeId`) REFERENCES `StatType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FightStat` ADD CONSTRAINT `FightStat_valueTypeId_fkey` FOREIGN KEY (`valueTypeId`) REFERENCES `ValueType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterFightStat` ADD CONSTRAINT `CharacterFightStat_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `Character`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterFightStat` ADD CONSTRAINT `CharacterFightStat_fightId_fkey` FOREIGN KEY (`fightId`) REFERENCES `Fight`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterFightStat` ADD CONSTRAINT `CharacterFightStat_statTypeId_fkey` FOREIGN KEY (`statTypeId`) REFERENCES `StatType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterFightStat` ADD CONSTRAINT `CharacterFightStat_valueTypeId_fkey` FOREIGN KEY (`valueTypeId`) REFERENCES `ValueType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterFightInfo` ADD CONSTRAINT `CharacterFightInfo_fightId_fkey` FOREIGN KEY (`fightId`) REFERENCES `Fight`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterFightInfo` ADD CONSTRAINT `CharacterFightInfo_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `Character`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterFightInfo` ADD CONSTRAINT `CharacterFightInfo_buildTypeId_fkey` FOREIGN KEY (`buildTypeId`) REFERENCES `BuildType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterRaidStat` ADD CONSTRAINT `CharacterRaidStat_raidId_fkey` FOREIGN KEY (`raidId`) REFERENCES `Raid`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterRaidStat` ADD CONSTRAINT `CharacterRaidStat_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `Character`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterRaidStat` ADD CONSTRAINT `CharacterRaidStat_statTypeId_fkey` FOREIGN KEY (`statTypeId`) REFERENCES `StatType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterRaidStat` ADD CONSTRAINT `CharacterRaidStat_valueTypeId_fkey` FOREIGN KEY (`valueTypeId`) REFERENCES `ValueType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterRaidInfo` ADD CONSTRAINT `CharacterRaidInfo_raidId_fkey` FOREIGN KEY (`raidId`) REFERENCES `Raid`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterRaidInfo` ADD CONSTRAINT `CharacterRaidInfo_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `Character`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VisitLog` ADD CONSTRAINT `VisitLog_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AccountToGuild` ADD CONSTRAINT `_AccountToGuild_A_fkey` FOREIGN KEY (`A`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AccountToGuild` ADD CONSTRAINT `_AccountToGuild_B_fkey` FOREIGN KEY (`B`) REFERENCES `Guild`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
