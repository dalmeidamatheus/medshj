const TOKEN_KEY = 'token';
const USER_KEY = 'user';
const url = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

export async function login(values) {
  try {
    // Simulando uma requisição ao servidor (substitua pelo seu código real)
    const userFromLocalStorage = JSON.parse(localStorage.getItem(USER_KEY));

    if (
      userFromLocalStorage &&
      userFromLocalStorage.cpf === values.cpf &&
      userFromLocalStorage.senha === values.senha
    ) {
      // Armazena o token no sessionStorage (simulando um login bem-sucedido)
      sessionStorage.setItem(TOKEN_KEY, 'token_simulado');

      // Redireciona para a página desejada após o login
      // Substitua '/calendario' pelo caminho correto
      router.push('/calendario');
    } else {
      throw new Error('Failed to login. Please try again.');
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    throw new Error('Failed to login. Please try again.');
  }
}