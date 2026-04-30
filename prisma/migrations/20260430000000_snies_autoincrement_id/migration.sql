-- codigoprograma en el dataset upr9-nkiz NO es un identificador unico de
-- programa: tiene solo 34 valores distintos para ~14.000 registros activos.
-- Usar String @id causaba que createMany(skipDuplicates:true) descartara
-- silenciosamente todos los duplicados, dejando solo 34 filas en la tabla.
--
-- Fix: reemplazar codigoprograma como PK por un id SERIAL autogenerado,
-- y hacer codigoprograma un campo de dato regular (nullable).

-- 1. Eliminar constraint de PK actual
ALTER TABLE "snies_programs" DROP CONSTRAINT "snies_programs_pkey";

-- 2. Liberar la restriccion NOT NULL que tenia codigoprograma por ser @id
ALTER TABLE "snies_programs" ALTER COLUMN "codigoprograma" DROP NOT NULL;

-- 3. Agregar columna id autoincrement y hacerla la nueva PK
ALTER TABLE "snies_programs" ADD COLUMN "id" SERIAL;
ALTER TABLE "snies_programs" ADD CONSTRAINT "snies_programs_pkey" PRIMARY KEY ("id");
