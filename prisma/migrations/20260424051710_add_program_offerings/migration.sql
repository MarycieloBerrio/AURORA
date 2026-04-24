-- CreateTable
CREATE TABLE "program_offerings" (
    "id" SERIAL NOT NULL,
    "programKey" TEXT NOT NULL,
    "institutionName" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "character" TEXT NOT NULL,
    "methodology" TEXT NOT NULL,
    "academicLevel" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "geocodedAt" TIMESTAMP(3),
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "program_offerings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "geocoded_institutions" (
    "id" SERIAL NOT NULL,
    "institutionName" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "geocodedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "geocoded_institutions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "program_offerings_programKey_idx" ON "program_offerings"("programKey");

-- CreateIndex
CREATE UNIQUE INDEX "program_offerings_programKey_institutionName_municipality_m_key" ON "program_offerings"("programKey", "institutionName", "municipality", "methodology");

-- CreateIndex
CREATE UNIQUE INDEX "geocoded_institutions_institutionName_municipality_key" ON "geocoded_institutions"("institutionName", "municipality");
