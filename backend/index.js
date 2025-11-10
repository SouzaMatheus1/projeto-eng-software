const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

// Middlewares
app.use(cors()); // Permite que o frontend acesse esta API
app.use(express.json()); // Permite ler o corpo (body) de requisições POST

const PORT = 3000;

// --- ROTAS DA API ---

//login
app.post('/login', async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        cpf: cpf,
        senha: senha
      },
    });

    if (user) {
      const { senha, ...userData } = user;
      res.json(userData);
    } else {
      res.status(401).json({ error: 'CPF ou senha inválidos.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao tentar fazer login.' });
  }
});

// Consultar Cadastro Único
app.get('/cadunico/:cpf', async (req, res) => {
  const { cpf } = req.params;

  try {
    const cadastro = await prisma.cadUnico.findUnique({
      where: { cpf: cpf },
    });
    if (cadastro) {
      res.json(cadastro);
    } else {
      res.status(404).json({ error: 'Cidadão não encontrado na base do Cadastro Único.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar o Cadastro Único.' });
  }
});

// Consultar Família de Baixa Renda
app.get('/familia/:cpf', async (req, res) => {
  const { cpf } = req.params;

  try {
    const familia = await prisma.familiaBaixaRenda.findUnique({
      where: { chefeFamiliaCPF: cpf },
    });
    if (familia) {
      res.json(familia);
    } else {
      res.status(404).json({ error: 'Família não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar a família.' });
  }
});

// Consultar Identificação
app.get('/identificacao/:cpf', async (req, res) => {
  const { cpf } = req.params;

  try {
    const identificacao = await prisma.identificacao.findUnique({
      where: { cpf: cpf },
    });
    if (identificacao) {
      res.json(identificacao);
    } else {
      res.status(404).json({ error: 'Dados de identificação não encontrados.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar dados de identificação.' });
  }
});

// Consultar Bolsa Família
app.get('/bolsafamilia/:cpf', async (req, res) => {
  const { cpf } = req.params;

  try {
    const bolsaFamilia = await prisma.bolsaFamilia.findUnique({
      where: { cpf: cpf },
    });
    if (bolsaFamilia) {
      res.json(bolsaFamilia);
    } else {
      res.status(404).json({ error: 'Dados do Bolsa Família não encontrados.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar dados do Bolsa Família.' });
  }
});

// Consultar Naturalidade
app.get('/naturalidade/:cpf', async (req, res) => {
  const { cpf } = req.params;

  try {
    const naturalidade = await prisma.naturalidade.findUnique({
      where: { cpf: cpf },
    });
    if (naturalidade) {
      res.json(naturalidade);
    } else {
      res.status(404).json({ error: 'Dados de naturalidade não encontrados.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar dados de naturalidade.' });
  }
});

// Consultar Relação Trabalhista
app.get('/trabalho/:cpf', async (req, res) => {
  const { cpf } = req.params;

  try {
    const relacaoTrabalhista = await prisma.relacaoTrabalhista.findFirst({
      where: { cpf: cpf },
    });
    if (relacaoTrabalhista) {
      res.json(relacaoTrabalhista);
    } else {
      res.status(404).json({ error: 'Relação trabalhista não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar relação trabalhista.' });
  }
});

// Consultar PCD
app.get('/pcd/:cpf', async (req, res) => {
  const { cpf } = req.params;

  try {
    const pcd = await prisma.pCD.findUnique({
      where: { cpf: cpf },
    });

    if (pcd) {
      res.json(pcd);
    } else {
      res.status(404).json({ error: 'Dados de PCD não encontrados.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar dados de PCD.' });
  }
});

// Consultar Município por Código IBGE
app.get('/municipio/:ibge', async (req, res) => {
  const { ibge } = req.params;

  try {
    const municipio = await prisma.municipio.findUnique({
      where: { codigoIBGE: ibge },
    });
    if (municipio) {
      res.json(municipio);
    } else {
      res.status(404).json({ error: 'Município não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar município.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});