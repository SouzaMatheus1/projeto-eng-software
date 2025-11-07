-- CreateTable
CREATE TABLE "Identificacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" DATETIME NOT NULL,
    "nomeMae" TEXT NOT NULL,
    "rg" TEXT,
    "orgaoEmissor" TEXT,
    "ufEmissor" TEXT,
    "dataEmissao" DATETIME
);

-- CreateTable
CREATE TABLE "BolsaFamilia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "nis" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "valorBeneficio" REAL NOT NULL,
    "dataUltimoPagamento" DATETIME
);

-- CreateTable
CREATE TABLE "Naturalidade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "paisNascimento" TEXT NOT NULL,
    "estadoNascimento" TEXT,
    "municipioNascimento" TEXT
);

-- CreateTable
CREATE TABLE "RelacaoTrabalhista" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "nomeEmpresa" TEXT NOT NULL,
    "dataAdmissao" DATETIME NOT NULL,
    "dataDemissao" DATETIME,
    "cargo" TEXT NOT NULL,
    "remuneracao" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "PCD" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "tipoDeficiencia" TEXT NOT NULL,
    "descricaoLaudo" TEXT,
    "statusBeneficio" TEXT
);

-- CreateTable
CREATE TABLE "Municipio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoIBGE" TEXT NOT NULL,
    "nomeMunicipio" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "populacao" INTEGER,
    "regiao" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Identificacao_cpf_key" ON "Identificacao"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "BolsaFamilia_cpf_key" ON "BolsaFamilia"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "BolsaFamilia_nis_key" ON "BolsaFamilia"("nis");

-- CreateIndex
CREATE UNIQUE INDEX "Naturalidade_cpf_key" ON "Naturalidade"("cpf");

-- CreateIndex
CREATE INDEX "RelacaoTrabalhista_cpf_idx" ON "RelacaoTrabalhista"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "PCD_cpf_key" ON "PCD"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Municipio_codigoIBGE_key" ON "Municipio"("codigoIBGE");
