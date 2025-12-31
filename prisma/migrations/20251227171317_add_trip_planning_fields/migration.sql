/*
  Warnings:

  - Added the required column `updatedAt` to the `Itinerary` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TripPlanningStatus" AS ENUM ('COLLECTING_INFO', 'READY_TO_PLAN', 'PLANNED');

-- AlterTable
ALTER TABLE "Itinerary" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "budgetAmount" INTEGER,
ADD COLUMN     "groupSize" INTEGER,
ADD COLUMN     "planningState" "TripPlanningStatus" NOT NULL DEFAULT 'COLLECTING_INFO',
ADD COLUMN     "preferences" TEXT[],
ALTER COLUMN "destination" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Trip_planningState_idx" ON "Trip"("planningState");
