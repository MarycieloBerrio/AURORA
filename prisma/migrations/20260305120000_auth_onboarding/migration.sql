-- CreateEnum
CREATE TYPE "AcademicLevel" AS ENUM ('SECONDARY', 'TECHNICAL', 'TECHNOLOGICAL', 'UNIVERSITY', 'OTHER');

-- CreateEnum
CREATE TYPE "TransitionStage" AS ENUM ('JUST_GRADUATED', 'ABOUT_TO_GRADUATE', 'ADMITTED_TO_UNIVERSITY', 'ALREADY_IN_UNIVERSITY');

-- AlterTable
ALTER TABLE "User"
ALTER COLUMN "passwordHash" DROP NOT NULL,
ADD COLUMN "username" TEXT,
ADD COLUMN "gender" TEXT,
ADD COLUMN "age" INTEGER,
ADD COLUMN "academicLevel" "AcademicLevel",
ADD COLUMN "transitionStage" "TransitionStage",
ADD COLUMN "profileCompleted" BOOLEAN NOT NULL DEFAULT false;

-- Keep existing credential users as completed profiles
UPDATE "User"
SET "profileCompleted" = true
WHERE "passwordHash" IS NOT NULL;
