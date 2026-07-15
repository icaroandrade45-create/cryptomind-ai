// CONFIGURAÇÃO DO SUPABASE
const SUPABASE_URL = "https://your-supabase-url.supabase.co"; 
const SUPABASE_KEY = "your-supabase-anon-key";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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

// Campos de Ativos
const addNomeAtivo = document.getElementById("addNomeAtivo");
const addValorAtivo = document.getElementById("addValorAtivo");
const btnSalvarAtivo = document.getElementById("btnSalvarAtivo");
const listaAtivos = document.getElementById("listaAtivos");
const msgAddAtivo = document.getElementById("msgAddAtivo");

// Campos do Analisador IA
const buscaAtivo = document.getElementById("buscaAtivo");
const btnAnalisar = document.getElementById("btnAnalisar");
const resultadoAnalise = document.getElementById("resultadoAnalise");

// CONTROLO DE SESSÃO
async function verificarUsuario() {
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
}

// VALIDAÇÃO DE LOGIN
function validarCampos() {
    const email = emailInput.value.trim();
    const senha = senhaInput.value;
    if (!email || !senha) {
        msgAuth.style.color = "#e74c3c";
        msgAuth.innerText = "Por favor, preencha o e-mail e a senha.";
        return false;
    }
    return true;
}

btnCadastrar.addEventListener("click", async () => {
    if (!validarCampos()) return;
    const { error } = await supabaseClient.auth.signUp({ email: emailInput.value.trim(), password: senhaInput.value });
    if (error) { msgAuth.style.color = "#e74c3c"; msgAuth.innerText = error.message; }
    else { msgAuth.style.color = "#10b981"; msgAuth.innerText = "Conta criada!"; }
});

btnEntrar.addEventListener("click", async () => {
    if (!validarCampos()) return;
    const { error } = await supabaseClient.auth.signInWithPassword({ email: emailInput.value.trim(), password: senhaInput.value });
    if (error) { msgAuth.style.color = "#e74c3c"; msgAuth.innerText = error.message; }
    else { msgAuth.innerText = ""; verificarUsuario(); }
});

btnSair.addEventListener("click", async () => { await supabaseClient.auth.signOut(); verificarUsuario(); });

// ==========================================
// MOTOR DO ANALISADOR DE SINAIS COM IA (COINGECKO)
// ==========================================
btnAnalisar.addEventListener("click", async () => {
    const moeda = buscaAtivo.value.trim().toLowerCase();
    if (!moeda) {
        alert("Por favor, digite o código de uma moeda (ex: btc, eth).");
        return;
    }

    btnAnalisar.disabled = true;
    btnAnalisar.innerText = "Analisando...";
    resultadoAnalise.style.display = "block";
    resultadoAnalise.innerHTML = "<p style='color: #888;'>A consultar inteligência artificial...</p>";

    try {
        const buscaResponse = await fetch(`https://api.coingecko.com/api/v3/search?query=${moeda}`);
        const buscaDados = await buscaResponse.json();

        if (!buscaDados.coins || buscaDados.coins.length === 0) {
            resultadoAnalise.innerHTML = `<p style='color: #e74c3c;'>❌ Criptomoeda não encontrada.</p>`;
            return;
        }

        const coinId = buscaDados.coins[0].id;
        const coinName = buscaDados.coins[0].name;
        const coinSymbol = buscaDados.coins[0].symbol.toUpperCase();

        const mercadoResponse = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`);
        const mercadoDados = await mercadoResponse.json();

        if (!mercadoDados || mercadoDados.length === 0) {
            resultadoAnalise.innerHTML = `<p style='color: #e74c3c;'>❌ Erro ao carregar dados de mercado.</p>`;
            return;
        }

        const info = mercadoDados[0];
        const preco = info.current_price;
        const var24h = info.price_change_percentage_24h || 0;

        let score = 50 + (var24h * 1.5);
        if (score > 100) score = 100;
        if (score < 0) score = 0;

        let recomendacao = "NEUTRO / AGUARDAR";
        let corRecomendacao = "#f1c40f";
        let explicacao = `A moeda ${coinSymbol} está estável hoje. Indicado aguardar o mercado definir direção.`;

        if (score >= 65) {
            recomendacao = "COMPRA FORTE (BULLISH)";
            corRecomendacao = "#10b981";
            explicacao = `A moeda ${coinSymbol} demonstra forte tração com alta recente de ${var24h.toFixed(2)}% em 24h.`;
        } else if (score <= 35) {
            recomendacao = "VENDA / EVITAR (BEARISH)";
            corRecomendacao = "#e74c3c";
            explicacao = `Cuidado! A moeda ${coinSymbol} está sob forte pressão vendedora, caindo ${var24h.toFixed(2)}% em 24h.`;
        }

        resultadoAnalise.innerHTML = `
            <h3 style="color: #fff; margin-bottom: 10px;">📊 Relatório IA: <span style="color: ${corRecomendacao}">${coinName} (${coinSymbol})</span></h3>
            <p><strong>Preço Atual:</strong> US$ ${preco.toLocaleString('en-US')}</p>
            <p><strong>Variação (24h):</strong> <span style="color: ${var24h >= 0 ? '#10b981' : '#e74c3c'}">${var24h.toFixed(2)}%</span></p>
            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border-left: 5px solid ${corRecomendacao}; margin-top: 10px;">
                <p style="font-weight: bold; color: ${corRecomendacao};">Recomendação: ${recomendacao}</p>
                <p style="color: #ccc; font-size: 0.95rem;">${explicacao}</p>
                <p style="font-size: 0.85rem; color: #888; margin-top: 10px;">Score de Risco: ${score.toFixed(0)}/100</p>
            </div>
        `;

        scoreDestaque.innerText = `${score.toFixed(0)}/100`;
        scoreDestaque.style.color = corRecomendacao;

    } catch (erro) {
        resultadoAnalise.innerHTML = "<p style='color: #e74c3c;'>❌ Erro de ligação com a API de mercado.</p>";
    } finally {
        btnAnalisar.disabled = false;
        btnAnalisar.innerText = "Analisar com IA";
    }
});

function carregarCarteira() { valorCarteira.innerText = "US$ 0.00"; }
