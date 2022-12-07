/*
  Warnings:

  - You are about to drop the column `levelName` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `stackName` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `statusName` on the `applications` table. All the data in the column will be lost.
  - Added the required column `levelId` to the `applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stackId` to the `applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `applications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_levelName_fkey";

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_stackName_fkey";

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_statusName_fkey";

-- DropIndex
DROP INDEX "levels_level_key";

-- DropIndex
DROP INDEX "stacks_stack_key";

-- DropIndex
DROP INDEX "status_status_key";

-- AlterTable
ALTER TABLE "applications" DROP COLUMN "levelName",
DROP COLUMN "stackName",
DROP COLUMN "statusName",
ADD COLUMN     "levelId" TEXT NOT NULL,
ADD COLUMN     "stackId" TEXT NOT NULL,
ADD COLUMN     "statusId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "levels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_stackId_fkey" FOREIGN KEY ("stackId") REFERENCES "stacks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
