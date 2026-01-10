/*
  Warnings:

  - The values [AI] on the enum `MessageRole` will be removed. If these variants are still used in the database, this will fail.
  - The values [CONFIRMED,ARCHIVED] on the enum `TripStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `days` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `budgetAmount` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `planningState` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `preferences` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Trip` table. All the data in the column will be lost.
  - The `budget` column on the `Trip` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pace` column on the `Trip` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ItineraryItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Made the column `destination` on table `Trip` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MessageRole_new" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM');
ALTER TABLE "Message" ALTER COLUMN "role" TYPE "MessageRole_new" USING ("role"::text::"MessageRole_new");
ALTER TYPE "MessageRole" RENAME TO "MessageRole_old";
ALTER TYPE "MessageRole_new" RENAME TO "MessageRole";
DROP TYPE "public"."MessageRole_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TripStatus_new" AS ENUM ('DRAFT', 'GENERATED', 'FINALIZED');
ALTER TABLE "public"."Trip" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Trip" ALTER COLUMN "status" TYPE "TripStatus_new" USING ("status"::text::"TripStatus_new");
ALTER TYPE "TripStatus" RENAME TO "TripStatus_old";
ALTER TYPE "TripStatus_new" RENAME TO "TripStatus";
DROP TYPE "public"."TripStatus_old";
ALTER TABLE "Trip" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- DropForeignKey
ALTER TABLE "ItineraryItem" DROP CONSTRAINT "ItineraryItem_itineraryId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_userId_fkey";

-- DropIndex
DROP INDEX "Message_tripId_idx";

-- DropIndex
DROP INDEX "Trip_planningState_idx";

-- DropIndex
DROP INDEX "Trip_userId_idx";

-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "days",
ADD COLUMN     "content" JSONB NOT NULL,
ADD COLUMN     "generatedByAI" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "mapsEnriched" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pdfExportedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "budgetAmount",
DROP COLUMN "createdAt",
DROP COLUMN "endDate",
DROP COLUMN "planningState",
DROP COLUMN "preferences",
DROP COLUMN "startDate",
DROP COLUMN "updatedAt",
ADD COLUMN     "groupType" TEXT,
DROP COLUMN "budget",
ADD COLUMN     "budget" INTEGER,
ALTER COLUMN "destination" SET NOT NULL,
DROP COLUMN "pace",
ADD COLUMN     "pace" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "onboarded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "preferences" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "ItineraryItem";

-- DropEnum
DROP TYPE "BudgetType";

-- DropEnum
DROP TYPE "ItineraryCategory";

-- DropEnum
DROP TYPE "TripPace";

-- DropEnum
DROP TYPE "TripPlanningStatus";

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
