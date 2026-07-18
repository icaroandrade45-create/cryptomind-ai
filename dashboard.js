import { observarSessao, logoutUsuario } from './auth.js';

async function buscarAnaliseMercado() {
    const display = document.getElementById('analiseIA');
    try {
        // Mudando para a API da Binance, que é extremamente rápida e amigável ao navegador
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        
        if (!response.ok) throw new Error("Erro na API Binance");
        
        const data = await response.json();
        const preco = parseFloat(data.price);
        
        let sinal = preco < 65000 ? "COMPRA INDICADA" : "AGUARDE";
        display.innerHTML = `<strong>Bitcoin (BTC):</strong> $${preco.toLocaleString(undefined, {minimumFractionDigits: 2})}<br><br>
                             <strong>Sinal da IA:</strong> ${sinal}`;
    } catch (error) {
        display.innerHTML = `Erro de conexão. Tente novamente.<br><small>${error.message}</small>`;
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
