/*
  Warnings:

  - You are about to drop the `_pagetopost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pageId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_pagetopost` DROP FOREIGN KEY `_PageToPost_A_fkey`;

-- DropForeignKey
ALTER TABLE `_pagetopost` DROP FOREIGN KEY `_PageToPost_B_fkey`;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `pageId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_pagetopost`;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
