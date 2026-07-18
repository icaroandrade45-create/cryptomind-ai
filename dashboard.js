import { observarSessao, logoutUsuario } from './auth.js';

async function buscarAnaliseMercado() {
    const display = document.getElementById('analiseIA');
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        const data = await response.json();
        const preco = data.bitcoin.usd;
        
        let sinal = preco < 65000 ? "COMPRA INDICADA" : "AGUARDE";
        display.innerHTML = `BTC: $${preco.toLocaleString()}<br>Sinal: ${sinal}`;
        
    } catch (error) {
        // Agora o erro aparece na tela para sabermos o problema
        display.innerText = "Erro: " + error.message;
        console.error("Falha na API:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    observarSessao((session) => {
        if (!session) {
            window.location.href = 'index.html';
        } else {
            document.getElementById('statusUsuario').innerText = `Logado: ${session.user.email}`;
            buscarAnaliseMercado();
        }
    });

    document.getElementById('btnSair').addEventListener('click', async () => {
        await logoutUsuario();
        window.location.href = 'index.html';
    });
});
