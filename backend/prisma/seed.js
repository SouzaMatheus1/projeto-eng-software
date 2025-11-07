const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // --- 1. DADOS ORIGINAIS ---

  // Criar Usuários
  await prisma.user.createMany({
    data: [
      { cpf: '11122233344', senha: '123', nome: 'Maria Silva (Cidadã)', tipo: 'Cidadão' },
      { cpf: '55566677788', senha: '123', nome: 'João Costa (Assistente)', tipo: 'Assistente Social' },
      { cpf: '99988877766', senha: '123', nome: 'Ana Souza (Admin)', tipo: 'Administrador' },
      { cpf: '12345678900', senha: '123', nome: 'José da Silva (Cidadão)', tipo: 'Cidadão' },
      { cpf: '00987654321', senha: '123', nome: 'Maria Antônia (Cidadã)', tipo: 'Cidadão' },
    ],
  });

  // Criar Famílias Baixa Renda (RF3)
  await prisma.familiaBaixaRenda.createMany({
    data: [
      { chefeFamiliaCPF: '12345678900', nomeChefe: 'José da Silva', rendaFamiliar: 450.0, membros: 4, status: 'Aprovado' },
      { chefeFamiliaCPF: '00987654321', nomeChefe: 'Maria Antônia', rendaFamiliar: 800.0, membros: 2, status: 'Em Análise' },
      { chefeFamiliaCPF: '11122233344', nomeChefe: 'Maria Silva', rendaFamiliar: 1200.0, membros: 3, status: 'Aprovado' },
    ],
  });

  // Criar CadÚnico (RF5)
  await prisma.cadUnico.createMany({
    data: [
      { cpf: '11122233344', nis: '12345678910', situacao: 'Cadastrado', ultimaAtualizacao: new Date('2025-09-15T03:00:00Z') },
      { cpf: '12345678900', nis: '98765432100', situacao: 'Atualizado', ultimaAtualizacao: new Date('2025-10-01T03:00:00Z') },
    ],
  });

  // --- 2. NOVAS TABELAS ---

  // Criar Municípios (RF14)
  await prisma.municipio.createMany({
    data: [
      { codigoIBGE: "3550308", nomeMunicipio: "São Paulo", uf: "SP", populacao: 12396372, regiao: "Sudeste" },
      { codigoIBGE: "3304557", nomeMunicipio: "Rio de Janeiro", uf: "RJ", populacao: 6775561, regiao: "Sudeste" },
      { codigoIBGE: "4106902", nomeMunicipio: "Curitiba", uf: "PR", populacao: 1963726, regiao: "Sul" }
    ],
  });

  // Criar Identificação (RF6)
  await prisma.identificacao.createMany({
    data: [
      { cpf: "11122233344", nome: "Maria Silva (Cidadã)", dataNascimento: new Date("1990-05-15T03:00:00Z"), nomeMae: "Joana Pereira da Silva", rg: "123456789", orgaoEmissor: "SSP", ufEmissor: "SP" },
      { cpf: "55566677788", nome: "João Costa (Assistente)", dataNascimento: new Date("1985-11-20T03:00:00Z"), nomeMae: "Joana Dias Costa", rg: "111111111", orgaoEmissor: "SSP", ufEmissor: "RJ" },
      { cpf: "99988877766", nome: "Ana Souza (Admin)", dataNascimento: new Date("2001-02-10T03:00:00Z"), nomeMae: "Beatriz Almeida Santos", rg: "987654321", orgaoEmissor: "SSP", ufEmissor: "PR" },
      { cpf: "12345678900", nome: "José da Silva (Cidadão)", dataNascimento: new Date("1980-03-25T03:00:00Z"), nomeMae: "Benedita da Silva" },
    ],
  });

  // Criar Bolsa Família (RF8)
  await prisma.bolsaFamilia.createMany({
    data: [
      { cpf: "11122233344", nis: "12345678910", status: "Ativo", valorBeneficio: 650.00, dataUltimoPagamento: new Date("2025-10-28T03:00:00Z") },
      { cpf: "12345678900", nis: "98765432100", status: "Ativo", valorBeneficio: 720.00, dataUltimoPagamento: new Date("2025-10-25T03:00:00Z") },
      { cpf: "55566677788", nis: "98765432101", status: "Bloqueado", valorBeneficio: 600.00 }, // Assistente social com NIS, para teste
    ],
  });

  // Criar Naturalidade (RF9)
  await prisma.naturalidade.createMany({
    data: [
      { cpf: "11122233344", paisNascimento: "Brasil", estadoNascimento: "SP", municipioNascimento: "São Paulo" },
      { cpf: "55566677788", paisNascimento: "Brasil", estadoNascimento: "RJ", municipioNascimento: "Rio de Janeiro" },
      { cpf: "99988877766", paisNascimento: "Brasil", estadoNascimento: "PR", municipioNascimento: "Curitiba" },
      { cpf: "12345678900", paisNascimento: "Brasil", estadoNascimento: "BA", municipioNascimento: "Salvador" },
    ],
  });

  // Criar Relação Trabalhista (RF10)
  await prisma.relacaoTrabalhista.createMany({
    data: [
      { cpf: "11122233344", cnpj: "12345678000199", nomeEmpresa: "Empresa Fictícia A", dataAdmissao: new Date("2022-01-10T03:00:00Z"), cargo: "Diarista", remuneracao: 1500.00, dataDemissao: new Date("2024-01-01T03:00:00Z") },
      { cpf: "55566677788", cnpj: "88776655000144", nomeEmpresa: "Prefeitura Municipal", dataAdmissao: new Date("2020-07-20T03:00:00Z"), cargo: "Assistente Social", remuneracao: 3800.00 },
      { cpf: "99988877766", cnpj: "88776655000144", nomeEmpresa: "Prefeitura Municipal", dataAdmissao: new Date("2024-06-01T03:00:00Z"), cargo: "Administrador de Rede", remuneracao: 5200.00 },
    ],
  });

  // Criar PCD (RF13)
  await prisma.pcd.createMany({
    data: [
      { cpf: "99988877766", tipoDeficiencia: "Física", descricaoLaudo: "CID M16 - Coxartrose", statusBeneficio: "BPC Ativo" },
      { cpf: "11122233344", tipoDeficiencia: "Visual", descricaoLaudo: "Visão monocular", statusBeneficio: "Nenhum" },
    ],
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });