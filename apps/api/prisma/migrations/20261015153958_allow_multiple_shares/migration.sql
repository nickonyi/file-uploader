/*
  Warnings:

  - Made the column `expires_at` on table `shares` required. This step will fail if there are existing NULL values in that column.
  - Made the column `folder_id` on table `shares` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "shares_folder_id_key";

-- AlterTable
ALTER TABLE "shares" ALTER COLUMN "expires_at" SET NOT NULL,
ALTER COLUMN "folder_id" SET NOT NULL;

-- CreateIndex
CREATE INDEX "shares_folder_id_idx" ON "shares"("folder_id");
