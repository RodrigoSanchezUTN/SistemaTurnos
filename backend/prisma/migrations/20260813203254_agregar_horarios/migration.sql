-- CreateTable
CREATE TABLE "public"."Horario" (
    "id" SERIAL NOT NULL,
    "dia" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "inicio" TEXT NOT NULL,
    "fin" TEXT NOT NULL,
    "inicio2" TEXT,
    "fin2" TEXT,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Horario_usuarioId_dia_key" ON "public"."Horario"("usuarioId", "dia");

-- AddForeignKey
ALTER TABLE "public"."Horario" ADD CONSTRAINT "Horario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
