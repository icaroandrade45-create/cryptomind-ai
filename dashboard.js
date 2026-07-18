import { observarSessao, logoutUsuario } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // Proteção de rota: se não estiver logado, volta para index.html
    observarSessao((session) => {
        if (!session) {
            window.location.href = 'index.html';
        } else {
            document.getElementById('statusUsuario').innerText = `Logado como: ${session.user.email}`;
        }
    });

    // Botão de Sair
    document.getElementById('btnSair').addEventListener('click', async () => {
        await logoutUsuario();
        window.location.href = 'index.html';
    });
});
