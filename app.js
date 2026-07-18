import { cadastrarUsuario, loginUsuario, logoutUsuario, observarSessao } from './auth.js';

// Elementos do DOM
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const btnCadastrar = document.getElementById('btnCadastrar');
const btnEntrar = document.getElementById('btnEntrar');
const btnSair = document.getElementById('btnSair');

// 1. Monitorar o estado da sessão (Persistência)
observarSessao((session) => {
    gerenciarInterface(session);
});

// 2. Evento de Cadastro
if (btnCadastrar) {
    btnCadastrar.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = emailInput?.value.trim();
        const senha = senhaInput?.value.trim();

        if (!email || !senha) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            await cadastrarUsuario(email, senha);
            alert("Cadastro realizado! Verifique seu e-mail se necessário.");
        } catch (error) {
            alert("Erro no cadastro: " + error.message);
        }
    });
}

// 3. Evento de Login
if (btnEntrar) {
    btnEntrar.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = emailInput?.value.trim();
        const senha = senhaInput?.value.trim();

        if (!email || !senha) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            await loginUsuario(email, senha);
            alert("Login realizado com sucesso!");
        } catch (error) {
            alert("Erro no login: " + error.message);
        }
    });
}

// 4. Evento de Sair
if (btnSair) {
    btnSair.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            await logoutUsuario();
            alert("Você saiu da conta.");
        } catch (error) {
            alert("Erro ao sair: " + error.message);
        }
    });
}

// Função auxiliar para gerenciar elementos na tela
function gerenciarInterface(session) {
    if (session) {
        if (btnSair) btnSair.style.display = 'block';
        if (btnEntrar) btnEntrar.style.display = 'none';
        if (btnCadastrar) btnCadastrar.style.display = 'none';
    } else {
        if (btnSair) btnSair.style.display = 'none';
        if (btnEntrar) btnEntrar.style.display = 'block';
        if (btnCadastrar) btnCadastrar.style.display = 'block';
    }
}
