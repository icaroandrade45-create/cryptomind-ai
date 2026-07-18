// CryptoMind AI - Controlador Principal da Interface (UI)
import { loginUsuario, cadastrarUsuario, observarSessao, logoutUsuario } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // Captura dos elementos do formulário na tela
    const emailInput = document.getElementById('email') || document.querySelector('input[type="email"]');
    const senhaInput = document.getElementById('senha') || document.querySelector('input[type="password"]');
    const btnEntrar = document.getElementById('btnEntrar');
    const btnCadastrar = document.getElementById('btnCadastrar') || document.getElementById('btnRegistrar');

    // 1. Monitoramento ativo do Estado da Sessão (Persistência)
    observarSessao((session) => {
        if (session) {
            console.log("Usuário autenticado com sucesso:", session.user.email);
            // Aqui podemos redirecionar para a tela interna no futuro:
            // window.location.href = 'dashboard.html';
        } else {
            console.log("Nenhum usuário logado no momento.");
        }
    });

    // 2. Ação do Botão de Entrar (Login)
    if (btnEntrar) {
        btnEntrar.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const email = emailInput?.value?.trim();
            const senha = senhaInput?.value;

            if (!email || !senha) {
                alert("Por favor, preencha todos os campos para fazer login.");
                return;
            }

            try {
                btnEntrar.disabled = true;
                btnEntrar.innerText = "Conectando...";
                
                await loginUsuario(email, senha);
                alert("Login realizado com sucesso!");
                
            } catch (error) {
                alert("Erro ao realizar login: " + (error.message || error));
            } finally {
                btnEntrar.disabled = false;
                btnEntrar.innerText = "Entrar";
            }
        });
    }

    // 3. Ação do Botão de Cadastrar
    if (btnCadastrar) {
        btnCadastrar.addEventListener('click', async (e) => {
            e.preventDefault();

            const email = emailInput?.value?.trim();
            const senha = senhaInput?.value;

            if (!email || !senha) {
                alert("Por favor, preencha todos os campos para criar uma conta.");
                return;
            }

            try {
                btnCadastrar.disabled = true;
                await cadastrarUsuario(email, senha);
                alert("Cadastro realizado! Verifique seu e-mail se a confirmação estiver ativa.");
            } catch (error) {
                alert("Erro ao realizar cadastro: " + (error.message || error));
            } finally {
                btnCadastrar.disabled = false;
            }
        });
    }
});
