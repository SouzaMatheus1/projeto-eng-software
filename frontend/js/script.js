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

viewCidadao.style.display = 'none';
viewAssistente.style.display = 'none';
viewAdmin.style.display = 'none';
const viewConsultas = document.getElementById('view-consultas');
// mostra a visualização correta com base no tipo de usuário
if (currentUser.tipo === 'Cidadão') {
  viewCidadao.style.display = 'block';

  // const numFila = document.getElementById('num-fila');
  // let posicaoNaFila = 23;
  // numFila.textContent = '#' + posicaoNaFila;
  // 
  // const btnFila = document.getElementById('btn-fila-espera');
  // btnFila.disabled = true;
// 
  // const atualizaFila = setInterval(() => {
  //   if (posicaoNaFila > 1) {
  //     posicaoNaFila--;
  //     numFila.textContent = '#' + posicaoNaFila;
  //   } else {
  //     numFila.textContent = "Sua vez!";
  //     btnFila.disabled = false;
  //     clearInterval(atualizaFila);
  //   }
  // }, 5000);
} else if (currentUser.tipo === 'Assistente Social') {
  viewAssistente.style.display = 'block';
  viewConsultas.style.display = 'block';
} else if (currentUser.tipo === 'Administrador') {
  viewAdmin.style.display = 'block';
  viewConsultas.style.display = 'block';
}

// --- FUNCIONALIDADES ---

// Consultar CadÚnico
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

const formFamiliaGeral = document.getElementById('form-consulta-familia-geral');
const resultFamilia = document.getElementById('result-familia');

// Consultar Família
formFamiliaGeral.addEventListener('submit', async (e) => {
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

// Consultar Família (Visão Assistente)
const formFamiliaAssistente = document.getElementById('form-consulta-familia-assistente');
const resultFamiliaAssistente = document.getElementById('result-familia-assistente');

formFamiliaAssistente.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cpf = document.getElementById('cpf-chefe-assistente').value;
  resultFamiliaAssistente.innerHTML = '';

  try {
    const response = await fetch(`http://localhost:3000/familia/${cpf}`);
    if (response.ok) {
      const familia = await response.json();
      resultFamiliaAssistente.innerHTML = `
                <p><strong>Chefe:</strong> ${familia.nomeChefe}</p>
                <p><strong>Renda:</strong> R$ ${familia.rendaFamiliar.toFixed(2)}</p>
                <p><strong>Membros:</strong> ${familia.membros}</p>
                <p><strong>Status:</strong> ${familia.status}</p>
            `;
    } else {
      const errorData = await response.json();
      resultFamiliaAssistente.innerHTML = `<p class="error-message">${errorData.error || 'Nenhuma família encontrada para este CPF.'}</p>`;
    }
  } catch (error) {
    console.error('Erro ao consultar família:', error);
    resultFamiliaAssistente.innerHTML = `<p class="error-message">Erro de conexão ao consultar a família.</p>`;
  }
});

// Consultar Identificação
const formIdentificacao = document.getElementById('form-consulta-identificacao');
const resultIdentificacao = document.getElementById('result-identificacao');

formIdentificacao.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cpf = document.getElementById('cpf-identificacao').value;
  resultIdentificacao.innerHTML = '';

  try {
    const response = await fetch(`http://localhost:3000/identificacao/${cpf}`);
    if (response.ok) {
      const data = await response.json();
      resultIdentificacao.innerHTML = `
        <p><strong>Nome:</strong> ${data.nome}</p>
        <p><strong>Data de Nascimento:</strong> ${new Date(data.dataNascimento).toLocaleDateString('pt-BR')}</p>
        <p><strong>Nome da Mãe:</strong> ${data.nomeMae}</p>
        <p><strong>RG:</strong> ${data.rg || 'Não informado'}</p>
      `;
    } else {
      const errorData = await response.json();
      resultIdentificacao.innerHTML = `<p class="error-message">${errorData.error || 'Nenhum dado encontrado.'}</p>`;
    }
  } catch (error) {
    resultIdentificacao.innerHTML = `<p class="error-message">Erro de conexão ao consultar identificação.</p>`;
  }
});

// Consultar Bolsa Família
const formBolsaFamilia = document.getElementById('form-consulta-bolsafamilia');
const resultBolsaFamilia = document.getElementById('result-bolsafamilia');

formBolsaFamilia.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cpf = document.getElementById('cpf-bolsafamilia').value;
  resultBolsaFamilia.innerHTML = '';

  try {
    const response = await fetch(`http://localhost:3000/bolsafamilia/${cpf}`);
    if (response.ok) {
      const data = await response.json();
      resultBolsaFamilia.innerHTML = `
        <p><strong>NIS:</strong> ${data.nis}</p>
        <p><strong>Status:</strong> ${data.status}</p>
        <p><strong>Valor:</strong> R$ ${data.valorBeneficio.toFixed(2)}</p>
        <p><strong>Último Pagamento:</strong> ${data.dataUltimoPagamento ? new Date(data.dataUltimoPagamento).toLocaleDateString('pt-BR') : 'N/A'}</p>
      `;
    } else {
      const errorData = await response.json();
      resultBolsaFamilia.innerHTML = `<p class="error-message">${errorData.error || 'Nenhum dado encontrado.'}</p>`;
    }
  } catch (error) {
    resultBolsaFamilia.innerHTML = `<p class="error-message">Erro de conexão ao consultar Bolsa Família.</p>`;
  }
});

// Consultar Naturalidade
const formNaturalidade = document.getElementById('form-consulta-naturalidade');
const resultNaturalidade = document.getElementById('result-naturalidade');

formNaturalidade.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cpf = document.getElementById('cpf-naturalidade').value;
  resultNaturalidade.innerHTML = '';

  try {
    const response = await fetch(`http://localhost:3000/naturalidade/${cpf}`);
    if (response.ok) {
      const data = await response.json();
      resultNaturalidade.innerHTML = `
        <p><strong>País:</strong> ${data.paisNascimento}</p>
        <p><strong>Estado:</strong> ${data.estadoNascimento || 'Não informado'}</p>
        <p><strong>Município:</strong> ${data.municipioNascimento || 'Não informado'}</p>
      `;
    } else {
      const errorData = await response.json();
      resultNaturalidade.innerHTML = `<p class="error-message">${errorData.error || 'Nenhum dado encontrado.'}</p>`;
    }
  } catch (error) {
    resultNaturalidade.innerHTML = `<p class="error-message">Erro de conexão ao consultar naturalidade.</p>`;
  }
});

// Consultar Relação Trabalhista
const formTrabalho = document.getElementById('form-consulta-trabalho');
const resultTrabalho = document.getElementById('result-trabalho');

formTrabalho.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cpf = document.getElementById('cpf-trabalho').value;
  resultTrabalho.innerHTML = '';

  try {
    const response = await fetch(`http://localhost:3000/trabalho/${cpf}`);
    if (response.ok) {
      const data = await response.json();
      resultTrabalho.innerHTML = `
        <p><strong>Empresa:</strong> ${data.nomeEmpresa}</p>
        <p><strong>Cargo:</strong> ${data.cargo}</p>
        <p><strong>Remuneração:</strong> R$ ${data.remuneracao.toFixed(2)}</p>
        <p><strong>Admissão:</strong> ${new Date(data.dataAdmissao).toLocaleDateString('pt-BR')}</p>
      `;
    } else {
      const errorData = await response.json();
      resultTrabalho.innerHTML = `<p class="error-message">${errorData.error || 'Nenhum dado encontrado.'}</p>`;
    }
  } catch (error) {
    resultTrabalho.innerHTML = `<p class="error-message">Erro de conexão ao consultar relação de trabalho.</p>`;
  }
});

// Consultar PCD
const formPCD = document.getElementById('form-consulta-pcd');
const resultPCD = document.getElementById('result-pcd');

formPCD.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cpf = document.getElementById('cpf-pcd').value;
  resultPCD.innerHTML = '';

  try {
    const response = await fetch(`http://localhost:3000/pcd/${cpf}`);
    if (response.ok) {
      const data = await response.json();
      resultPCD.innerHTML = `
        <p><strong>Tipo de Deficiência:</strong> ${data.tipoDeficiencia}</p>
        <p><strong>Laudo:</strong> ${data.descricaoLaudo || 'Não informado'}</p>
        <p><strong>Status Benefício:</strong> ${data.statusBeneficio || 'Não informado'}</p>
      `;
    } else {
      const errorData = await response.json();
      resultPCD.innerHTML = `<p class="error-message">${errorData.error || 'Nenhum dado encontrado.'}</p>`;
    }
  } catch (error) {
    resultPCD.innerHTML = `<p class="error-message">Erro de conexão ao consultar base PCD.</p>`;
  }
});

// Consultar Município
const formMunicipio = document.getElementById('form-consulta-municipio');
const resultMunicipio = document.getElementById('result-municipio');

formMunicipio.addEventListener('submit', async (e) => {
  e.preventDefault();
  const ibge = document.getElementById('ibge-municipio').value;
  resultMunicipio.innerHTML = '';

  try {
    const response = await fetch(`http://localhost:3000/municipio/${ibge}`);
    if (response.ok) {
      const data = await response.json();
      resultMunicipio.innerHTML = `
        <p><strong>Município:</strong> ${data.nomeMunicipio} - ${data.uf}</p>
        <p><strong>População:</strong> ${data.populacao || 'Não informada'}</p>
        <p><strong>Região:</strong> ${data.regiao || 'Não informada'}</p>
      `;
    } else {
      const errorData = await response.json();
      resultMunicipio.innerHTML = `<p class="error-message">${errorData.error || 'Nenhum dado encontrado.'}</p>`;
    }
  } catch (error) {
    resultMunicipio.innerHTML = `<p class="error-message">Erro de conexão ao consultar município.</p>`;
  }
});