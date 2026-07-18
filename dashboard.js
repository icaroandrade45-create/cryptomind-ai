import { observarSessao, logoutUsuario } from './auth.js';

console.log("Dashboard JS carregado com sucesso!");

async function buscarAnaliseMercado() {
    const display = document.getElementById('analiseIA');
    display.innerText = "Conectando ao mercado...";
    try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        const data = await response.json();
        const preco = parseFloat(data.price);
        
        let sinal = preco < 65000 ? "COMPRA INDICADA" : "AGUARDE";
        display.innerHTML = `<strong>BTC:</strong> $${preco.toLocaleString()}<br><br><strong>Sinal:</strong> ${sinal}`;
    } catch (error) {
        display.innerText = "Falha ao carregar dados.";
        console.error("Erro:", error);
    }
}

observarSessao((session) => {
    if (!session) {
        window.location.href = 'index.html';
    } else {
        buscarAnaliseMercado();
    }
});

document.getElementById('btnSair').addEventListener('click', logoutUsuario);
