import { fazerLogin } from './auth.js';

document.getElementById('btnLogin').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    try {
        await fazerLogin(email, senha);
        alert("Login realizado com sucesso!");
        // Redirecionamento forçado via location.href
        window.location.href = 'dashboard.html';
    } catch (error) {
        alert("Erro no login: " + error.message);
    }
});
