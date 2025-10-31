const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');
  await prisma.user.deleteMany();
  await prisma.familiaBaixaRenda.deleteMany();
  await prisma.cadUnico.deleteMany();

  // Criar Usuários
  await prisma.user.createMany({
    data: [
      { cpf: '11122233344', senha: '123', nome: 'Maria (Cidadã)', tipo: 'Cidadão' },
      { cpf: '55566677788', senha: '123', nome: 'João (Assistente)', tipo: 'Assistente Social' },
      { cpf: '99988877766', senha: '123', nome: 'Ana (Admin)', tipo: 'Administrador' },
    ],
  });

  // Criar Famílias 
  await prisma.familiaBaixaRenda.createMany({
    data: [
      { chefeFamiliaCPF: '12345678900', nomeChefe: 'José da Silva', rendaFamiliar: 450.0, membros: 4, status: 'Aprovado' },
      { chefeFamiliaCPF: '00987654321', nomeChefe: 'Maria Antônia', rendaFamiliar: 800.0, membros: 2, status: 'Em Análise' },
    ],
  });

  // Criar CadÚnico
  await prisma.cadUnico.createMany({
    data: [
      { cpf: '11122233344', nis: '12345678910', situacao: 'Cadastrado', ultimaAtualizacao: new Date('2025-09-15') },
      { cpf: '12345678900', nis: '98765432100', situacao: 'Atualizado', ultimaAtualizacao: new Date('2025-10-01') },
    ],
  });
  console.log('Seeding finished.');
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });