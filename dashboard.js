import { observarSessao, logoutUsuario } from './auth.js';

async function buscarAnaliseMercado() {
    const display = document.getElementById('analiseIA');
    try {
        // Busca preço do Bitcoin em USD
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        const preco = data.bitcoin.usd;

        // Lógica de IA simples: Baseada em "thresholds"
        // Em um projeto real, aqui você conectaria com um modelo de machine learning ou indicadores complexos
        let sinal = preco < 65000 ? "COMPRA INDICADA (Preço atrativo)" : "AGUARDE (Mercado sobrecomprado)";
        
        display.innerHTML = `<strong>Bitcoin (BTC):</strong> $${preco.toLocaleString()}<br><br>
                             <strong>Sinal da IA:</strong> ${sinal}`;
    } catch (error) {
        display.innerText = "Erro ao conectar com o mercado. Tente novamente mais tarde.";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    observarSessao((session) => {
        if (!session) {
            window.location.href = 'index.html';
        } else {
            document.getElementById('statusUsuario').innerText = `Logado como: ${session.user.email}`;
            buscarAnaliseMercado();
        }
    });

    document.getElementById('btnSair').addEventListener('click', async () => {
        await logoutUsuario();
        window.location.href = 'index.html';
    });
});
