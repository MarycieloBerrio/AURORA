-- Reemplaza la tabla snies_programs para usar el dataset 5wck-szir
-- (matriculados por programa) en lugar del upr9-nkiz.
-- Se elimina la tabla completa porque la estructura de columnas cambia
-- completamente. Los datos se repueblan via el boton "Actualizar SNIES".

DROP TABLE IF EXISTS "snies_programs";

CREATE TABLE "snies_programs" (
    "id"                         SERIAL       NOT NULL,
    "codigoprograma"             TEXT,
    "codigoinstitucion"          INTEGER,
    "iespadre"                   TEXT,
    "nombreinstitucion"          TEXT,
    "principaloseccional"        TEXT,
    "idsector"                   INTEGER,
    "idcaracter"                 INTEGER,
    "codigodepartinstitucion"    INTEGER,
    "nombredepartinstitucion"    TEXT,
    "codigomunicipioinstitucion" TEXT,
    "nombremunicipioinstitucion" TEXT,
    "nombreprograma"             TEXT,
    "idnivel"                    INTEGER,
    "idnivelformacion"           INTEGER,
    "codigometodologia"          INTEGER,
    "nombremetodologia"          TEXT,
    "nombrecaracteracademico"    TEXT,
    "idarea"                     INTEGER,
    "idnucleo"                   INTEGER,
    "nombrenbc"                  TEXT,
    "codigodepartprograma"       TEXT,
    "nombredepartprograma"       TEXT,
    "codigomunicipioprograma"    TEXT,
    "nombremunicipioprograma"    TEXT,
    "fetchedAt"                  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "snies_programs_pkey" PRIMARY KEY ("id")
);

-- codigoprograma es el codigo SNIES del programa, unico por oferta
CREATE UNIQUE INDEX "snies_programs_codigoprograma_key"          ON "snies_programs"("codigoprograma");
CREATE INDEX        "snies_programs_nombreprograma_idx"           ON "snies_programs"("nombreprograma");
CREATE INDEX        "snies_programs_codigomunicipioprograma_idx"  ON "snies_programs"("codigomunicipioprograma");
