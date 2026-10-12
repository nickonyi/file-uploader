/*
  Warnings:

  - You are about to drop the column `file_id` on the `shares` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[folder_id]` on the table `shares` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "shares" DROP CONSTRAINT "fk_share_file";

-- DropIndex
DROP INDEX "idx_shares_file_id";

-- AlterTable
ALTER TABLE "shares" DROP COLUMN "file_id",
ADD COLUMN     "folder_id" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "shares_folder_id_key" ON "shares"("folder_id");

-- AddForeignKey
ALTER TABLE "shares" ADD CONSTRAINT "shares_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
