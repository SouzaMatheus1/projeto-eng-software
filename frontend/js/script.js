// --- CONTROLE DE AUTENTICAÇÃO ---
const welcomeMessage = document.getElementById('welcome-message');
const logoutBtn = document.getElementById('logout-btn');
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Verifica se o usuário está logado
if (!currentUser) {
  window.location.href = 'index.html';
} else {
  welcomeMessage.textContent = `Olá, ${currentUser.nome}`;
}

// Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
});

// --- CONTROLE DE VISUALIZAÇÃO POR PAPEL ---
const viewCidadao = document.getElementById('view-cidadao');
const viewAssistente = document.getElementById('view-assistente');
const viewAdmin = document.getElementById('view-admin');
const numFila = document.getElementById('num-fila');

viewCidadao.style.display = 'none';
viewAssistente.style.display = 'none';
viewAdmin.style.display = 'none';

// mostra a visualização correta com base no tipo de usuário
if (currentUser.tipo === 'Cidadão') {
  viewCidadao.style.display = 'block';

  const numFila = document.getElementById('num-fila');
  let posicaoNaFila = 23;
  numFila.textContent = posicaoNaFila;

  const atualizaFila = setInterval(() => {
    if (posicaoNaFila > 1) {
      posicaoNaFila--;
      numFila.textContent = '#' + posicaoNaFila;
    } else {
      numFila.textContent = "Sua vez!";
      clearInterval(atualizaFila);
    }
  }, 5000);
} else if (currentUser.tipo === 'Assistente Social') {
  viewAssistente.style.display = 'block';
} else if (currentUser.tipo === 'Administrador') {
  viewAdmin.style.display = 'block';
}

// --- FUNCIONALIDADES ---

// Consultar CadÚnico (Visão Cidadão) 
const formCadUnico = document.getElementById('form-consulta-cadunico');
const resultCadUnico = document.getElementById('result-cadunico');

formCadUnico.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cpf = document.getElementById('cpf-cadunico').value;
  resultCadUnico.innerHTML = '';

  try {
    const response = await fetch(`http://localhost:3000/cadunico/${cpf}`);
    if (response.ok) {
      const cadastro = await response.json();
      resultCadUnico.innerHTML = `
        <p><strong>Situação:</strong> ${cadastro.situacao}</p>
        <p><strong>NIS:</strong> ${cadastro.nis}</p>
        <p><strong>Última Atualização:</strong> ${new Date(cadastro.ultimaAtualizacao).toLocaleDateString('pt-BR')}</p>
      `;
    } else {
      const errorData = await response.json();
      resultCadUnico.innerHTML = `<p class="error-message">${errorData.error || 'Nenhum cadastro encontrado para este CPF.'}</p>`;
    }
  } catch (error) {
    console.error('Erro ao consultar CadÚnico:', error);
    resultCadUnico.innerHTML = `<p class="error-message">Erro de conexão ao consultar o CadÚnico.</p>`;
  }
});


// Consultar Família (Visão Assistente Social) 
const formFamilia = document.getElementById('form-consulta-familia');
const resultFamilia = document.getElementById('result-familia');

formFamilia.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cpf = document.getElementById('cpf-chefe').value;
  resultFamilia.innerHTML = '';

  try {
    const response = await fetch(`http://localhost:3000/familia/${cpf}`);
    if (response.ok) {
      const familia = await response.json();
      resultFamilia.innerHTML = `
            <p><strong>Chefe:</strong> ${familia.nomeChefe}</p>
            <p><strong>Renda:</strong> R$ ${familia.rendaFamiliar.toFixed(2)}</p>
            <p><strong>Membros:</strong> ${familia.membros}</p>
            <p><strong>Status:</strong> ${familia.status}</p>
        `;
    } else {
      const errorData = await response.json();
      resultFamilia.innerHTML = `<p class="error-message">${errorData.error || 'Nenhuma família encontrada para este CPF.'}</p>`;
    }
  } catch (error) {
    console.error('Erro ao consultar família:', error);
    resultFamilia.innerHTML = `<p class="error-message">Erro de conexão ao consultar a família.</p>`;
  }
});