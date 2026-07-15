const areaAuth = document.getElementById("areaAuth");
const areaCarteira = document.getElementById("areaCarteira");
const valorCarteira = document.getElementById("valorCarteira");
const scoreDestaque = document.getElementById("score");
const buscaAtivo = document.getElementById("buscaAtivo");
const btnAnalisar = document.getElementById("btnAnalisar");
const resultadoAnalise = document.getElementById("resultadoAnalise");

function init() {
    if (areaAuth) areaAuth.style.display = "none";
    if (areaCarteira) areaCarteira.style.display = "block";
    if (valorCarteira) valorCarteira.innerText = "US$ 0.00";
    if (scoreDestaque) scoreDestaque.innerText = "---";
}

if (btnAnalisar) {
    btnAnalisar.addEventListener("click", async () => {
        const moeda = buscaAtivo.value.trim().toLowerCase();
        if (!moeda) return alert("Digite o nome ou sigla de uma criptomoeda!");

        btnAnalisar.disabled = true;
        btnAnalisar.innerText = "Analisando...";
        resultadoAnalise.style.display = "block";
        resultadoAnalise.innerHTML = "<p style='color: #888;'>Buscando dados de mercado...</p>";

        try {
            const sRes = await fetch(`https://api.coingecko.com/api/v3/search?query=${moeda}`);
            if (!sRes.ok) throw new Error("A API limitou as requisições. Tente em 1 minuto.");
            const sData = await sRes.json();

            if (!sData.coins || sData.coins.length === 0) {
                resultadoAnalise.innerHTML = "<p style='color: #e74c3c;'>Moeda não localizada.</p>";
                return;
            }

            const coin = sData.coins[0];
            const pRes = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin.id}`);
            if (!pRes.ok) throw new Error("Erro ao carregar preços.");
            const pData = await pRes.json();

            if (!pData || pData.length === 0) {
                resultadoAnalise.innerHTML = "<p style='color: #e74c3c;'>Dados indisponíveis.</p>";
                return;
            }

            const info = pData[0];
            const price = info.current_price;
            const var24h = info.price_change_percentage_24h || 0;

            let score = Math.max(0, Math.min(100, Math.round(50 + (var24h * 1.5))));
            let rec = "NEUTRO / AGUARDAR";
            let color = "#f1c40f";

            if (score >= 65) { rec = "COMPRA FORTE"; color = "#10b981"; }
            else if (score <= 35) { rec = "VENDA / EVITAR"; color = "#e74c3c"; }

            resultadoAnalise.innerHTML = `
                <h3 style="color: #fff; margin-bottom: 8px;">📊 Relatório IA: <span style="color: ${color}">${coin.name} (${coin.symbol.toUpperCase()})</span></h3>
                <p><strong>Preço:</strong> US$ ${price.toLocaleString('en-US')}</p>
                <p><strong>Variação 24h:</strong> <span style="color: ${var24h >= 0 ? '#10b981' : '#e74c3c'}">${var24h.toFixed(2)}%</span></p>
                <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; border-left: 4px solid ${color}; margin-top: 10px;">
                    <p style="font-weight: bold; color: ${color}; margin-bottom: 4px;">Recomendação: ${rec}</p>
                    <p style="color: #ccc; font-size: 0.85rem;">Cálculo baseado na volatilidade recente do mercado.</p>
                </div>
            `;

            if (scoreDestaque) {
                scoreDestaque.innerText = `${score}/100`;
                scoreDestaque.style.color = color;
            }
        } catch (err) {
            resultadoAnalise.innerHTML = `<p style='color: #e74c3c;'>Erro: ${err.message}</p>`;
        } finally {
            btnAnalisar.disabled = false;
            btnAnalisar.innerText = "Analisar com IA";
        }
    });
}

document.addEventListener("DOMContentLoaded", init);
init();
