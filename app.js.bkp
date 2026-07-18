// CONFIGURAÇÃO DO SUPABASE (Apenas para evitar erros se as chaves forem fictícias)
const SUPABASE_URL = "https://your-supabase-url.supabase.co"; 
const SUPABASE_KEY = "your-supabase-anon-key";

let supabaseClient = null;
try {
    if (SUPABASE_URL && !SUPABASE_URL.includes("your-supabase-url")) {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
} catch (e) {
    console.warn("Supabase não configurado. Entrando em modo de demonstração local.");
}

// ELEMENTOS DA PÁGINA
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const btnEntrar = document.getElementById("btnEntrar");
const btnCadastrar = document.getElementById("btnCadastrar");
const btnSair = document.getElementById("btnSair");
const msgAuth = document.getElementById("msgAuth");

const areaAuth = document.getElementById("areaAuth");
const areaCarteira = document.getElementById("areaCarteira");
const valorCarteira = document.getElementById("valorCarteira");
const scoreDestaque = document.getElementById("score");

// Campos do Analisador IA
const buscaAtivo = document.getElementById("buscaAtivo");
const btnAnalisar = document.getElementById("btnAnalisar");
const resultadoAnalise = document.getElementById("resultadoAnalise");

// CONTROLO DE SESSÃO COM BYPASS DE SEGURANÇA
async function verificarUsuario() {
    // Se o Supabase não estiver configurado corretamente, libertamos a tela para testes do Analisador IA!
    if (!supabaseClient) {
        console.log("Modo Demo Ativo: Libertando o painel de análise.");
        if (areaAuth) areaAuth.style.display = "none";
        if (areaCarteira) areaCarteira.style.display = "block";
        if (btnSair) btnSair.style.display = "none";
        carregarCarteira();
        return;
    }

    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session) {
            areaAuth.style.display = "none";
            areaCarteira.style.display = "block";
            btnSair.style.display = "block";
            carregarCarteira();
        } else {
            areaAuth.style.display = "block";
            areaCarteira.style.display = "none";
            btnSair.style.display = "none";
        }
    } catch (e) {
        // Em caso de qualquer erro de rede do Supabase, libertamos o ecrã para não quebrar a aplicação
        if (areaAuth) areaAuth.style.display = "none";
        if (areaCarteira) areaCarteira.style.display = "block";
        carregarCarteira();
    }
}

// VALIDAÇÃO DE LOGIN (Modo Demo funcional se o botão for clicado)
function simularLoginLocal() {
    if (msgAuth) {
        msgAuth.style.color = "#10b981";
        msgAuth.innerText = "Entrando em modo de demonstração...";
    }
    setTimeout(() => {
        if (areaAuth) areaAuth.style.display = "none";
        if (areaCarteira) areaCarteira.style.display = "block";
    }, 1000);
}

if (btnEntrar) {
    btnEntrar.addEventListener("click", () => {
        if (supabaseClient) {
            // Tentativa real se configurado
            supabaseClient.auth.signInWithPassword({ email: emailInput.value.trim(), password: senhaInput.value })
                .then(({ error }) => {
                    if (error) { msgAuth.style.color = "#e74c3c"; msgAuth.innerText = error.message; }
                    else { verificarUsuario(); }
                }).catch(() => simularLoginLocal());
        } else {
            simularLoginLocal();
        }
    });
}

if (btnCadastrar) {
    btnCadastrar.addEventListener("click", () => simularLoginLocal());
}

if (btnSair) {
    btnSair.addEventListener("click", () => {
        if (areaAuth) areaAuth.style.display = "block";
        if (areaCarteira) areaCarteira.style.display = "none";
    });
}

// ==========================================
// MOTOR DO ANALISADOR DE SINAIS COM IA (COINGECKO)
// ==========================================
if (btnAnalisar) {
    btnAnalisar.addEventListener("click", async () => {
        const moeda = buscaAtivo.value.trim().toLowerCase();
        if (!moeda) {
            alert("Por favor, digite o código de uma moeda (ex: btc, eth).");
            return;
        }

        btnAnalisar.disabled = true;
        btnAnalisar.innerText = "Analisando...";
        resultadoAnalise.style.display = "block";
        resultadoAnalise.innerHTML = "<p style='color: #888;'>Consultando API de inteligência de mercado...</p>";

        try {
            // 1. Procurar moeda pelo termo de pesquisa
            const buscaResponse = await fetch(`https://api.coingecko.com/api/v3/search?query=${moeda}`);
            if (!buscaResponse.ok) throw new Error("A API CoinGecko limitou a requisição (Rate Limit). Tente novamente em 1 minuto.");
            
            const buscaDados = await buscaResponse.json();
            if (!buscaDados.coins || buscaDados.coins.length === 0) {
                resultadoAnalise.innerHTML = `<p style='color: #e74c3c;'>❌ Criptomoeda não encontrada. Tente escrever o nome completo (ex: bitcoin).</p>`;
                return;
            }

            const coinId = buscaDados.coins[0].id;
            const coinName = buscaDados.coins[0].name;
            const coinSymbol = buscaDados.coins[0].symbol.toUpperCase();

            // 2. Buscar informações de mercado em tempo real
            const mercadoResponse = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`);
            if (!mercadoResponse.ok) throw new Error("A API CoinGecko está temporariamente sobrecarregada.");
            
            const mercadoDados = await mercadoResponse.json();
            if (!mercadoDados || mercadoDados.length === 0) {
                resultadoAnalise.innerHTML = `<p style='color: #e74c3c;'>❌ Erro ao ler os dados de preço para ${coinName}.</p>`;
                return;
            }

            const info = mercadoDados[0];
            const preco = info.current_price;
            const var24h = info.price_change_percentage_24h || 0;

            // Algoritmo simples de inteligência de score
            let score = 50 + (var24h * 1.5);
            if (score > 100) score = 100;
            if (score < 0) score = 0;

            let recomendacao = "NEUTRO / AGUARDAR";
            let corRecomendacao = "#f1c40f";
            let explicacao = `A moeda ${coinSymbol} está consolidada numa faixa de preço estável nas últimas 24 horas.`;

            if (score >= 65) {
                recomendacao = "COMPRA FORTE (BULLISH)";
                corRecomendacao = "#10b981";
                explicacao = `A moeda ${coinSymbol} apresenta forte fluxo comprador com subida recente de ${var24h.toFixed(2)}% em 24h.`;
            } else if (score <= 35) {
                recomendacao = "VENDA / EVITAR (BEARISH)";
                corRecomendacao = "#e74c3c";
                explicacao = `Cuidado! Foram identificadas fortes pressões vendedoras em ${coinSymbol}, caindo ${var24h.toFixed(2)}% em 24h.`;
            }

            // Exibir o resultado final na caixa de análise
            resultadoAnalise.innerHTML = `
                <h3 style="color: #fff; margin-bottom: 12px; font-size: 1.15rem;">📊 Relatório IA: <span style="color: ${corRecomendacao}">${coinName} (${coinSymbol})</span></h3>
                <p style="margin-bottom: 6px;"><strong>Preço Atual:</strong> US$ ${preco.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                <p style="margin-bottom: 12px;"><strong>Variação (24h):</strong> <span style="color: ${var24h >= 0 ? '#10b981' : '#e74c3c'}">${var24h.toFixed(2)}%</span></p>
                <div style="background: rgba(255,255,255,0.04); padding: 12px; border-radius: 8px; border-left: 5px solid ${corRecomendacao};">
                    <p style="font-weight: bold; color: ${corRecomendacao}; margin-bottom: 5px;">Recomendação: ${recomendacao}</p>
                    <p style="color: #bbb; font-size: 0.9rem; line-height: 1.4;">${explicacao}</p>
                    <p style="font-size: 0.8rem; color: #777; margin-top: 8px;">CryptoMind Score: ${score.toFixed(0)}/100</p>
                </div>
            `;

            // Atualiza o score grande no ecrã principal
            if (scoreDestaque) {
                scoreDestaque.innerText = `${score.toFixed(0)}/100`;
                scoreDestaque.style.color = corRecomendacao;
            }

        } catch (erro) {
            resultadoAnalise.innerHTML = `<p style='color: #e74c3c;'>⚠️ Erro de Rede / Rate Limit ativo.<br><small style="color: #999;">Motivo: ${erro.message}</small></p>`;
            if (scoreDestaque) scoreDestaque.innerText = "N/A";
        } finally {
            btnAnalisar.disabled = false;
            btnAnalisar.innerText = "Analisar com IA";
        }
    });
}

function carregarCarteira() { 
    if (valorCarteira) valorCarteira.innerText = "US$ 0.00"; 
}

// Inicializa a página
verificarUsuario();
