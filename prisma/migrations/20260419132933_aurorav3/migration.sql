/*
  Warnings:

  - You are about to drop the column `testMemorization` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `testPerceptualSpeed` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `careers` table. All the data in the column will be lost.
  - Added the required column `academic_level` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deductive_reasoning` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inductive_reasoning` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interests_A` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interests_C` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interests_E` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interests_I` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interests_R` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interests_S` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mathematical_reasoning` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personality_A` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personality_C` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personality_E` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personality_H` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personality_O` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personality_X` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reading_comprehension` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selective_attention` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spatial_reasoning` to the `careers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "onet_interests" DROP CONSTRAINT "onet_interests_onetsoc_code_fkey";

-- DropForeignKey
ALTER TABLE "work_styles" DROP CONSTRAINT "work_styles_onetsoc_code_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "testMemorization",
DROP COLUMN "testPerceptualSpeed";

-- AlterTable
ALTER TABLE "careers" DROP COLUMN "level",
ADD COLUMN     "academic_level" CHAR(2) NOT NULL,
ADD COLUMN     "deductive_reasoning" DECIMAL(6,3) NOT NULL,
ADD COLUMN     "inductive_reasoning" DECIMAL(6,3) NOT NULL,
ADD COLUMN     "interests_A" DECIMAL(6,3) NOT NULL,
ADD COLUMN     "interests_C" DECIMAL(6,3) NOT NULL,
ADD COLUMN     "interests_E" DECIMAL(6,3) NOT NULL,
ADD COLUMN     "interests_I" DECIMAL(6,3) NOT NULL,
ADD COLUMN     "interests_R" DECIMAL(6,3) NOT NULL,
ADD COLUMN     "interests_S" DECIMAL(6,3) NOT NULL,
ADD COLUMN     "mathematical_reasoning" DECIMAL(6,3) NOT NULL,
ADD COLUMN     "personality_A" DECIMAL(6,3) NOT NULL,
ADD COLUMN     "personality_C" DECIMAL(6,3) NOT NULL,
ADD COLUMN     "personality_E" DECIMAL(6,3) NOT NULL,
ADD COLUMN     "personality_H" DECIMAL(6,3) NOT NULL,
ADD COLUMN     "personality_O" DECIMAL(6,3) NOT NULL,
ADD COLUMN     "personality_X" DECIMAL(6,3) NOT NULL,
ADD COLUMN     "reading_comprehension" DECIMAL(6,3) NOT NULL,
ADD COLUMN     "selective_attention" DECIMAL(6,3) NOT NULL,
ADD COLUMN     "spatial_reasoning" DECIMAL(6,3) NOT NULL;

-- CreateTable
CREATE TABLE "occupation_data" (
    "onetsoc_code" CHAR(10) NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" VARCHAR(1500) NOT NULL,

    CONSTRAINT "occupation_data_pkey" PRIMARY KEY ("onetsoc_code")
);

-- CreateTable
CREATE TABLE "occupation_data_filtered_and_translated" (
    "onetsoc_code" CHAR(10) NOT NULL,
    "academic_level" CHAR(2) NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" VARCHAR(1500) NOT NULL,

    CONSTRAINT "occupation_data_filtered_and_translated_pkey" PRIMARY KEY ("onetsoc_code","academic_level")
);

-- CreateTable
CREATE TABLE "abilities" (
    "onetsoc_code" CHAR(10) NOT NULL,
    "element_id" VARCHAR(20) NOT NULL,
    "scale_id" VARCHAR(3) NOT NULL,
    "data_value" DECIMAL(5,2) NOT NULL,
    "n" DECIMAL(4,0),
    "standard_error" DECIMAL(7,4),
    "lower_ci_bound" DECIMAL(7,4),
    "upper_ci_bound" DECIMAL(7,4),
    "recommend_suppress" CHAR(1),
    "not_relevant" CHAR(1),
    "date_updated" DATE NOT NULL,
    "domain_source" VARCHAR(30) NOT NULL,

    CONSTRAINT "abilities_pkey" PRIMARY KEY ("onetsoc_code","element_id","scale_id")
);

-- AddForeignKey
ALTER TABLE "abilities" ADD CONSTRAINT "abilities_element_id_fkey" FOREIGN KEY ("element_id") REFERENCES "content_model_reference"("element_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "abilities" ADD CONSTRAINT "abilities_scale_id_fkey" FOREIGN KEY ("scale_id") REFERENCES "scales_reference"("scale_id") ON DELETE CASCADE ON UPDATE CASCADE;
