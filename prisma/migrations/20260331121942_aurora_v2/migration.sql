-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activeTestId" TEXT,
ADD COLUMN     "activeTestStartedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "careers" (
    "onetsoc_code" CHAR(10) NOT NULL,
    "level" CHAR(2) NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" VARCHAR(1500) NOT NULL,

    CONSTRAINT "careers_pkey" PRIMARY KEY ("onetsoc_code")
);

-- CreateTable
CREATE TABLE "content_model_reference" (
    "element_id" VARCHAR(20) NOT NULL,
    "element_name" VARCHAR(150) NOT NULL,
    "description" VARCHAR(1500) NOT NULL,

    CONSTRAINT "content_model_reference_pkey" PRIMARY KEY ("element_id")
);

-- CreateTable
CREATE TABLE "scales_reference" (
    "scale_id" VARCHAR(3) NOT NULL,
    "scale_name" VARCHAR(50) NOT NULL,
    "minimum" INTEGER NOT NULL,
    "maximum" INTEGER NOT NULL,

    CONSTRAINT "scales_reference_pkey" PRIMARY KEY ("scale_id")
);

-- CreateTable
CREATE TABLE "onet_interests" (
    "id" SERIAL NOT NULL,
    "onetsoc_code" CHAR(10) NOT NULL,
    "element_id" VARCHAR(20) NOT NULL,
    "scale_id" VARCHAR(3) NOT NULL,
    "data_value" DECIMAL(5,2) NOT NULL,
    "date_updated" DATE NOT NULL,
    "domain_source" VARCHAR(30) NOT NULL,

    CONSTRAINT "onet_interests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_styles" (
    "id" SERIAL NOT NULL,
    "onetsoc_code" CHAR(10) NOT NULL,
    "element_id" VARCHAR(20) NOT NULL,
    "scale_id" VARCHAR(3) NOT NULL,
    "data_value" DECIMAL(5,2) NOT NULL,
    "date_updated" DATE NOT NULL,
    "domain_source" VARCHAR(30) NOT NULL,

    CONSTRAINT "work_styles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "onet_interests" ADD CONSTRAINT "onet_interests_onetsoc_code_fkey" FOREIGN KEY ("onetsoc_code") REFERENCES "careers"("onetsoc_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "onet_interests" ADD CONSTRAINT "onet_interests_element_id_fkey" FOREIGN KEY ("element_id") REFERENCES "content_model_reference"("element_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "onet_interests" ADD CONSTRAINT "onet_interests_scale_id_fkey" FOREIGN KEY ("scale_id") REFERENCES "scales_reference"("scale_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_styles" ADD CONSTRAINT "work_styles_onetsoc_code_fkey" FOREIGN KEY ("onetsoc_code") REFERENCES "careers"("onetsoc_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_styles" ADD CONSTRAINT "work_styles_element_id_fkey" FOREIGN KEY ("element_id") REFERENCES "content_model_reference"("element_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_styles" ADD CONSTRAINT "work_styles_scale_id_fkey" FOREIGN KEY ("scale_id") REFERENCES "scales_reference"("scale_id") ON DELETE CASCADE ON UPDATE CASCADE;
