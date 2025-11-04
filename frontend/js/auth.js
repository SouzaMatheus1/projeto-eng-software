// Redireciona se o usuário já estiver logado
if (localStorage.getItem('currentUser')) {
  window.location.href = 'dashboard.html';
}

const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cpf = loginForm.cpf.value;
  const senha = loginForm.senha.value;
  loginError.textContent = '';

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cpf, senha }),
    });

    if (response.ok) {
      const user = await response.json();
      // Armazenamento de dados do usuário no localStorage para simular uma sessão
      console.log(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      window.location.href = 'dashboard.html';
    } else {
      const errorData = await response.json();
      loginError.textContent = errorData.error || 'CPF ou senha inválidos.';
    }
  } catch (error) {
    console.error('Erro ao tentar fazer login:', error);
    loginError.textContent = 'Erro de conexão com o servidor. Tente novamente mais tarde.';
  }
});