/*
  Warnings:

  - You are about to drop the column `budget` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `groupSize` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `days` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "budget",
DROP COLUMN "groupSize",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'INR',
ADD COLUMN     "days" INTEGER NOT NULL,
ADD COLUMN     "maxBudget" INTEGER,
ADD COLUMN     "minBudget" INTEGER,
ALTER COLUMN "status" SET DEFAULT 'GENERATED';
