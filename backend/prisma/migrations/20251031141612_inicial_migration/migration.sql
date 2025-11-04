-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FamiliaBaixaRenda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chefeFamiliaCPF" TEXT NOT NULL,
    "nomeChefe" TEXT NOT NULL,
    "rendaFamiliar" REAL NOT NULL,
    "membros" INTEGER NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CadUnico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "nis" TEXT NOT NULL,
    "situacao" TEXT NOT NULL,
    "ultimaAtualizacao" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "FamiliaBaixaRenda_chefeFamiliaCPF_key" ON "FamiliaBaixaRenda"("chefeFamiliaCPF");

-- CreateIndex
CREATE UNIQUE INDEX "CadUnico_cpf_key" ON "CadUnico"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "CadUnico_nis_key" ON "CadUnico"("nis");
