// Elementos do DOM
const areaAuth = document.getElementById('areaAuth');
const areaCarteira = document.getElementById('areaCarteira');
const btnEntrar = document.getElementById('btnEntrar');
const btnCadastrar = document.getElementById('btnCadastrar');
const btnSair = document.getElementById('btnSair');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const msgAuth = document.getElementById('msgAuth');

const buscaAtivo = document.getElementById('buscaAtivo');
const btnAnalisar = document.getElementById('btnAnalisar');
const resultadoAnalise = document.getElementById('resultadoAnalise');
const scoreDestaque = document.getElementById('score');

// 1. Verificação do Estado da Sessão ao carregar a página
document.addEventListener("DOMContentLoaded", async () => {
    if (!supabase) {
        console.error("Supabase não foi inicializado no config.js.");
        return;
    }
    
    // Verifica se já existe um utilizador com sessão ativa
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (session) {
        mostrarPainelPrivado(session.user);
    } else {
        mostrarAreaLogin();
    }
});

// Auxiliares de Interface
function mostrarPainelPrivado(user) {
    areaAuth.style.display = 'none';
    areaCarteira.style.display = 'block';
    btnSair.style.display = 'inline-block';
    limparFormularios();
    atualizarCarteiraInterface(user.id);
}

function mostrarAreaLogin() {
    areaAuth.style.display = 'block';
    areaCarteira.style.display = 'none';
    btnSair.style.display = 'none';
    limparFormularios();
}

function limparFormularios() {
    emailInput.value = '';
    senhaInput.value = '';
    msgAuth.textContent = '';
    msgAuth.className = 'feedback-msg';
}

// 2. Fluxo de Autenticação Real com Supabase Auth
btnCadastrar.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const password = senhaInput.value.trim();

    if (!email || !password) {
        exibirMensagem("Preencha todos os campos para cadastrar.", "erro");
        return;
    }

    exibirMensagem("A cadastrar...", "info");

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        exibirMensagem(`Erro no cadastro: ${error.message}`, "erro");
    } else {
        exibirMensagem("Conta criada com sucesso! Faça login para entrar.", "sucesso");
    }
});

btnEntrar.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const password = senhaInput.value.trim();

    if (!email || !password) {
        exibirMensagem("Preencha todos os campos para entrar.", "erro");
        return;
    }

    exibirMensagem("A autenticar...", "info");

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        exibirMensagem(`Credenciais incorretas ou erro: ${error.message}`, "erro");
    } else {
        mostrarPainelPrivado(data.user);
    }
});

btnSair.addEventListener('click', async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        mostrarAreaLogin();
    }
});

function exibirMensagem(texto, tipo) {
    msgAuth.textContent = texto;
    msgAuth.className = `feedback-msg ${tipo}`;
}

// 3. Analisador de Moedas com integração API CoinGecko
btnAnalisar.addEventListener('click', async () => {
    const termo = buscaAtivo.value.trim().toLowerCase();
    if (!termo) {
        alert("Por favor, digite o nome ou sigla de uma criptomoeda.");
        return;
    }

    btnAnalisar.textContent = "A analisar...";
    btnAnalisar.disabled = true;

    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&symbols=${termo}`);
        const data = await res.json();

        if (data && data.length > 0) {
            const coin = data[0];
            const preco = coin.current_price;
            const variacao = coin.price_change_percentage_24h;
            const nome = coin.name;
            const sigla = coin.symbol.toUpperCase();

            // Algoritmo do CryptoMind Score (0 a 100)
            let scoreCalculado = 50; 
            let recomendacao = "NEUTRO / AGUARDAR";
            let corRecomendacao = "#f1c40f"; // Amarelo

            if (variacao > 5) {
                scoreCalculado = Math.min(100, Math.round(50 + (variacao * 4)));
                recomendacao = "COMPRA FORTE / ALTA TENDÊNCIA";
                corRecomendacao = "#2ecc71"; // Verde
            } else if (variacao > 1.5) {
                scoreCalculado = Math.min(85, Math.round(50 + (variacao * 3)));
                recomendacao = "COMPRA MODERADA / DCA";
                corRecomendacao = "#2ecc71"; 
            } else if (variacao < -5) {
                scoreCalculado = Math.max(0, Math.round(50 + (variacao * 4)));
                recomendacao = "VENDA / RISCO EXTREMO";
                corRecomendacao = "#e74c3c"; // Vermelho
            } else if (variacao < -1.5) {
                scoreCalculado = Math.max(15, Math.round(50 + (variacao * 3)));
                recomendacao = "AGUARDAR / QUEDA EM ANDAMENTO";
                corRecomendacao = "#e74c3c";
            }

            // Atualiza os elementos na tela
            scoreDestaque.textContent = `${scoreCalculado}/100`;
            scoreDestaque.style.color = corRecomendacao;

            resultadoAnalise.style.display = 'block';
            resultadoAnalise.innerHTML = `
                <h4 style="margin: 0 0 10px 0; color: #fff;">📊 Relatório IA: <span style="color: ${corRecomendacao};">${nome} (${sigla})</span></h4>
                <p style="margin: 5px 0;"><strong>Preço:</strong> US$ ${preco.toLocaleString('en-US')}</p>
                <p style="margin: 5px 0;"><strong>Variação 24h:</strong> <span style="color: ${variacao >= 0 ? '#2ecc71' : '#e74c3c'};">${variacao.toFixed(2)}%</span></p>
                <div style="margin-top: 15px; padding: 12px; background: rgba(255,255,255,0.02); border-left: 4px solid ${corRecomendacao}; border-radius: 4px;">
                    <strong style="color: ${corRecomendacao};">Recomendação: ${recomendacao}</strong>
                    <p style="margin: 5px 0 0 0; font-size: 0.85rem; color: #aaa;">Cálculo baseado na volatilidade recente do mercado monitorada pelo algoritmo CryptoMind.</p>
                </div>
            `;
        } else {
            alert("Moeda não encontrada. Tente usar siglas exatas (Ex: btc, eth, sol, doge).");
        }
    } catch (err) {
        console.error("Erro ao buscar dados de mercado:", err);
        alert("Erro ao conectar com a API de mercado. Tente novamente.");
    } finally {
        btnAnalisar.textContent = "Analisar com IA";
        btnAnalisar.disabled = false;
    }
});

// 4. Funções da Carteira integradas com a tabela do Supabase (para o próximo passo)
async function atualizarCarteiraInterface(userId) {
    // Por enquanto mostra a carteira vazia, faremos a gravação no próximo passo
    const valorCarteira = document.getElementById('valorCarteira');
    valorCarteira.textContent = "US$ 0.00";
}
