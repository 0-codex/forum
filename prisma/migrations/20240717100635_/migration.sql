-- CreateTable
CREATE TABLE `User` (
    `uuid` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `admin` BOOLEAN NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `uuid` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `authorUUID` VARCHAR(191) NOT NULL,
    `pageUUID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Page` (
    `uuid` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `authorUUID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorUUID_fkey` FOREIGN KEY (`authorUUID`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_pageUUID_fkey` FOREIGN KEY (`pageUUID`) REFERENCES `Page`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Page` ADD CONSTRAINT `Page_authorUUID_fkey` FOREIGN KEY (`authorUUID`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
