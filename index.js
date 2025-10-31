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
        senha: senha, // NUNCA faça isso em produção. Use hash e salt.
      },
    });

    if (user) {
      // Retorna o usuário encontrado (sem a senha)
      const { senha, ...userData } = user;
      res.json(userData);
    } else {
      // Usuário não encontrado ou senha incorreta
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
      res.status(404).json({ error: 'Cadastro não encontrado.' });
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

app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});