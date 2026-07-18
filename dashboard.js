import { observarSessao, logoutUsuario } from './auth.js';

async function buscarAnaliseMercado() {
    const display = document.getElementById('analiseIA');
    try {
        // Usando o endpoint oficial com uma abordagem de fetch mais robusta
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) throw new Error(`Erro ${response.status}`);
        
        const data = await response.json();
        const preco = data.bitcoin.usd;
        
        let sinal = preco < 65000 ? "COMPRA INDICADA" : "AGUARDE";
        display.innerHTML = `<strong>BTC:</strong> $${preco.toLocaleString()}<br><strong>Sinal:</strong> ${sinal}`;
        
    } catch (error) {
        // Se a API principal falhar, mostramos o preço fixo para não travar a experiência
        display.innerHTML = `Mercado em ajuste. Tente novamente em instantes.<br><small>(Erro: ${error.message})</small>`;
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
