/*
  Warnings:

  - You are about to drop the column `academicLevel` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileCompleted` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `transitionStage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AssessmentQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AssessmentSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionResponse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AssessmentSession" DROP CONSTRAINT "AssessmentSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionResponse" DROP CONSTRAINT "QuestionResponse_questionId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionResponse" DROP CONSTRAINT "QuestionResponse_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionResponse" DROP CONSTRAINT "QuestionResponse_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "academicLevel",
DROP COLUMN "age",
DROP COLUMN "profileCompleted",
DROP COLUMN "transitionStage",
DROP COLUMN "username",
ADD COLUMN     "birthdate" DATE,
ADD COLUMN     "educationalLevel" TEXT,
ADD COLUMN     "testDeductiveReasoning" JSONB,
ADD COLUMN     "testHexaco1" JSONB,
ADD COLUMN     "testHexaco2" JSONB,
ADD COLUMN     "testHexaco3" JSONB,
ADD COLUMN     "testInductiveReasoning" JSONB,
ADD COLUMN     "testMathematicalReasoning" JSONB,
ADD COLUMN     "testMemorization" JSONB,
ADD COLUMN     "testPerceptualSpeed" JSONB,
ADD COLUMN     "testReadingComprehension" JSONB,
ADD COLUMN     "testRiasec1" JSONB,
ADD COLUMN     "testRiasec2" JSONB,
ADD COLUMN     "testRiasec3" JSONB,
ADD COLUMN     "testRiasec4" JSONB,
ADD COLUMN     "testSelectiveAttention" JSONB,
ADD COLUMN     "testSpatialReasoning" JSONB;

-- DropTable
DROP TABLE "AssessmentQuestion";

-- DropTable
DROP TABLE "AssessmentSession";

-- DropTable
DROP TABLE "QuestionResponse";

-- DropEnum
DROP TYPE "AcademicLevel";

-- DropEnum
DROP TYPE "SessionStatus";

-- DropEnum
DROP TYPE "TransitionStage";
