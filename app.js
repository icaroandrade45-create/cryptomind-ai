const SUPABASE_URL = "https://ukxylcyenryhzvjlzyaz.supabase.co"; 
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreHlsY3llbnJ5aHp2amx6eWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzEyOTksImV4cCI6MjA5OTIwNzI5OX0.wpU9LQscvrCFqK5vBDrL1nlhZMYer5DA-F6vWyamt6I";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Elementos de Autenticação
const areaAuth = document.getElementById("areaAuth");
const areaCarteira = document.getElementById("areaCarteira");
const btnSair = document.getElementById("btnSair");
const btnEntrar = document.getElementById("btnEntrar");
const btnCadastrar = document.getElementById("btnCadastrar");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const msgAuth = document.getElementById("msgAuth");

// Elementos do Analisador com IA
const buscaAtivo = document.getElementById("buscaAtivo");
const btnAnalisar = document.getElementById("btnAnalisar");
const resultadoAnalise = document.getElementById("resultadoAnalise");

// Elementos do Consultor de Investimentos
const capitalInvestir = document.getElementById("capitalInvestir");
const perfilRisco = document.getElementById("perfilRisco");
const btnCalcularAlocacao = document.getElementById("btnCalcularAlocacao");
const resultadoAlocacao = document.getElementById("resultadoAlocacao");

// Elementos de Cadastro de Ativos
const addNomeAtivo = document.getElementById("addNomeAtivo");
const addValorAtivo = document.getElementById("addValorAtivo");
const btnSalvarAtivo = document.getElementById("btnSalvarAtivo");
const msgAddAtivo = document.getElementById("msgAddAtivo");

async function verificarUsuario() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
        areaAuth.style.display = "none";
        areaCarteira.style.display = "block";
        btnSair.style.display = "block";
        carregarCarteira(session.user.id);
    } else {
        areaAuth.style.display = "block";
        areaCarteira.style.display = "none";
        btnSair.style.display = "none";
    }
}

function validarCampos() {
    const email = emailInput.value.trim();
    const senha = senhaInput.value;

    if (!email || !senha) {
        msgAuth.style.color = "#e74c3c";
        msgAuth.innerText = "Por favor, preencha o e-mail e a senha.";
        return false;
    }
    if (senha.length < 6) {
        msgAuth.style.color = "#e74c3c";
        msgAuth.innerText = "A senha deve ter pelo menos 6 caracteres.";
        return false;
    }
    return true;
}

btnCadastrar.addEventListener("click", async () => {
    msgAuth.style.color = "#ffffff";
    if (!validarCampos()) return;

    msgAuth.innerText = "Criando conta...";
    const { data, error } = await supabaseClient.auth.signUp({
        email: emailInput.value.trim(),
        password: senhaInput.value,
    });
    if (error) {
        msgAuth.style.color = "#e74c3c";
        msgAuth.innerText = "Erro ao cadastrar: " + error.message;
    } else {
        msgAuth.style.color = "#10b981";
        msgAuth.innerText = "Conta criada com sucesso! Faça o login agora.";
    }
});

btnEntrar.addEventListener("click", async () => {
    msgAuth.style.color = "#ffffff";
    if (!validarCampos()) return;

    msgAuth.innerText = "Entrando...";
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: emailInput.value.trim(),
        password: senhaInput.value,
    });
    if (error) {
        msgAuth.style.color = "#e74c3c";
        msgAuth.innerText = "Erro ao entrar: " + error.message;
    } else {
        msgAuth.innerText = "";
        verificarUsuario();
    }
});

btnSair.addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    verificarUsuario();
});

// MOTOR DE ALOCAÇÃO DE CAPITAL INTELIGENTE
btnCalcularAlocacao.addEventListener("click", async () => {
    const valor = parseFloat(capitalInvestir.value);
    const perfil = perfilRisco.value;

    if (isNaN(valor) || valor <= 0) {
        alert("Por favor, digite um valor de investimento válido maior que zero!");
        return;
    }

    resultadoAlocacao.style.display = "block";
    resultadoAlocacao.innerHTML = "<p>🧠 IA analisando os fundamentos de mercado e montando o teu portfólio...</p>";

    try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1");
        if (!res.ok) throw new Error("Erro de conexão com o banco de preços globais.");
        const dados = await res.json();

        const btc = dados.find(c => c.id === 'bitcoin') || { current_price: 90000, name: "Bitcoin", symbol: "btc" };
        const eth = dados.find(c => c.id === 'ethereum') || { current_price: 3500, name: "Ethereum", symbol: "eth" };
        const sol = dados.find(c => c.id === 'solana') || { current_price: 150, name: "Solana", symbol: "sol" };
        const ada = dados.find(c => c.id === 'cardano') || { current_price: 0.6, name: "Cardano", symbol: "ada" };

        let divisao = [];
        let justificativa = "";

        if (perfil === "conservador") {
            divisao = [
                { moeda: "BTC", percentual: 70, valorAlocado: valor * 0.7, preco: btc.current_price, motivo: "Maior reserva de valor do ecossistema cripto, ideal para tempos de volatilidade." },
                { moeda: "ETH", percentual: 30, valorAlocado: valor * 0.3, preco: eth.current_price, motivo: "Líder de contratos inteligentes com forte adoção institucional." }
            ];
            justificativa = "🛡️ O perfil conservador prioriza a segurança e sobrevivência do portfólio no longo prazo. Focamos 100% no topo do mercado.";
        } else if (perfil === "moderado") {
            divisao = [
                { moeda: "BTC", percentual: 50, valorAlocado: valor * 0.5, preco: btc.current_price, motivo: "Base sólida para garantir liquidez e menor volatilidade geral." },
                { moeda: "ETH", percentual: 30, valorAlocado: valor * 0.3, preco: eth.current_price, motivo: "Garante exposição à maior infraestrutura descentralizada do mundo." },
                { moeda: "SOL", percentual: 20, valorAlocado: valor * 0.2, preco: sol.current_price, motivo: "Rede de alta velocidade que vem capturando fatia de mercado considerável." }
            ];
            justificativa = "⚖️ O perfil moderado busca o equilíbrio perfeito entre a proteção de capital do BTC e a aceleração de lucros com altcoins estruturadas.";
        } else {
            divisao = [
                { moeda: "BTC", percentual: 30, valorAlocado: valor * 0.3, preco: btc.current_price, motivo: "Reserva de segurança obrigatória da carteira." },
                { moeda: "ETH", percentual: 20, valorAlocado: valor * 0.2, preco: eth.current_price, motivo: "Participação no coração da Web3." },
                { moeda: "SOL", percentual: 30, valorAlocado: valor * 0.3, preco: sol.current_price, motivo: "Exposição agressiva à velocidade e dApps em forte expansão." },
                { moeda: "ADA", percentual: 20, valorAlocado: valor * 0.2, preco: ada.current_price, motivo: "Aposta em recuperação técnica de moedas alternativas consolidadas." }
            ];
            justificativa = "⚡ O perfil agressivo acelera a exposição a ecossistemas mais rápidos (L1s) em detrimento da estabilidade. O objetivo é a máxima assimetria de lucros.";
        }

        let htmlResultado = `
            <div style="border-left: 4px solid #10b981; padding-left: 15px;">
                <h3 style="color: #10b981; text-transform: uppercase; margin-bottom: 5px;">Distribuição de Portfolio Recomendada</h3>
                <p style="font-size: 0.9rem; color: #888; font-style: italic; margin-bottom: 20px;">${justificativa}</p>
                <div style="display: flex; flex-direction: column; gap: 15px;">
        `;

        divisao.forEach(item => {
            const quantidadeMoedas = item.valorAlocado / item.preco;
            htmlResultado += `
                <div style="background: rgba(255,255,255,0.02); padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <span style="font-size: 1.1rem;"><strong>${item.moeda}</strong> (${item.percentual}%)</span>
                        <strong style="color: #10b981;">Alocado: US$ ${item.valorAlocado.toFixed(2)}</strong>
                    </div>
                    <p style="margin: 3px 0; font-size: 0.85rem; color: #aaa;"><strong>Quantidade estimada:</strong> ${quantidadeMoedas.toFixed(6)} unidades</p>
                    <p style="margin: 5px 0 0 0; font-size: 0.8rem; color: #888; line-height: 1.3;"><em>"${item.motivo}"</em></p>
                </div>
            `;
        });

        htmlResultado += `</div></div>`;
        resultadoAlocacao.innerHTML = htmlResultado;

    } catch (erro) {
        resultadoAlocacao.innerHTML = `<p style="color: #e74c3c;">Erro ao rodar IA: ${erro.message}</p>`;
    }
});

// MOTOR DE ANÁLISE DE RISCO INDIVIDUAL
btnAnalisar.addEventListener("click", async () => {
    const ativo = buscaAtivo.value.trim().toLowerCase();
    if (!ativo) {
        alert("Por favor, digite o símbolo de uma criptomoeda!");
        return;
    }

    resultadoAnalise.style.display = "block";
    resultadoAnalise.innerHTML = "<p>🧠 IA analisando ordens de mercado e volatilidade...</p>";

    try {
        const mapCoins = {
            'btc': 'bitcoin',
            'eth': 'ethereum',
            'sol': 'solana',
            'raca': 'radio-caca',
            'ada': 'cardano',
            'dot': 'polkadot',
            'near': 'near',
            'link': 'chainlink',
            'one': 'harmony'
        };

        const idCoin = mapCoins[ativo] || ativo;

        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${idCoin}`);
        if (!res.ok) throw new Error("Ativo não localizado. Tente o nome completo.");
        
        const dados = await res.json();
        const precoAtual = dados.market_data.current_price.usd;
        const variacao24h = dados.market_data.price_change_percentage_24h;
        
        let statusRisco = "";
        let corStatus = "";
        let acaoRecomendada = "";
        
        const scoreRiscoCalculado = Math.min(Math.max(Math.round(50 - (variacao24h * 2.5)), 5), 99);

        if (scoreRiscoCalculado >= 75) {
            statusRisco = "BAIXO RISCO";
            corStatus = "#10b981"; 
            acaoRecomendada = "🟢 Ótimo momento para comprar.";
        } else if (scoreRiscoCalculado <= 30) {
            statusRisco = "ALTO RISCO";
            corStatus = "#e74c3c"; 
            acaoRecomendada = "🔴 Risco elevado de correção.";
        } else {
            statusRisco = "RISCO MODERADO";
            corStatus = "#f59e0b"; 
            acaoRecomendada = "🟡 Aguarde uma definição de tendência.";
        }

        resultadoAnalise.innerHTML = `
            <div style="border-left: 4px solid ${corStatus}; padding-left: 15px;">
                <h3 style="margin-top: 0; color: ${corStatus}; text-transform: uppercase;">${dados.name} (${dados.symbol.toUpperCase()}) - ${statusRisco}</h3>
                <p><strong>Preço Atual:</strong> US$ ${precoAtual.toLocaleString('en-US')}</p>
                <p><strong>Variação 24h:</strong> <span style="color: ${variacao24h >= 0 ? '#10b981' : '#e74c3c'}">${variacao24h.toFixed(2)}%</span></p>
                <p><strong>Score CryptoMind:</strong> <strong>${scoreRiscoCalculado}/100</strong></p>
                <p style="margin-top: 15px; font-style: italic;">${acaoRecomendada}</p>
            </div>
        `;

    } catch (erro) {
        resultadoAnalise.innerHTML = `<p style="color: #e74c3c;">Erro: ${erro.message}</p>`;
    }
});

// SALVAR ATIVO NO SUPABASE
btnSalvarAtivo.addEventListener("click", async () => {
    msgAddAtivo.innerText = "";
    const ativo = addNomeAtivo.value.trim().toUpperCase();
    const valor = parseFloat(addValorAtivo.value);

    if (!ativo || isNaN(valor) || valor <= 0) {
        msgAddAtivo.style.color = "#e74c3c";
        msgAddAtivo.innerText = "Por favor, preencha o nome do ativo e um valor válido.";
        return;
    }

    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
            alert("Sessão expirada. Faça login novamente.");
            return;
        }

        msgAddAtivo.style.color = "#ffffff";
        msgAddAtivo.innerText = "Salvando...";

        const { error } = await supabaseClient
            .from('carteira')
            .insert([{ 
                ativo: ativo, 
                valor_usd: valor, 
                user_id: session.user.id 
            }]);

        if (error) throw error;

        msgAddAtivo.style.color = "#10b981";
        msgAddAtivo.innerText = "Ativo adicionado com sucesso!";
        
        addNomeAtivo.value = "";
        addValorAtivo.value = "";

        carregarCarteira(session.user.id);

    } catch (erro) {
        msgAddAtivo.style.color = "#e74c3c";
        msgAddAtivo.innerText = "Erro ao salvar: " + erro.message;
    }
});

async function carregarCarteira(userId) {
    try {
        const resposta = await fetch(`${SUPABASE_URL}/rest/v1/carteira?select=*&user_id=eq.${userId}`, {
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`
            }
        });
        const dados = await resposta.json();
        let total = 0;
        const lista = document.getElementById("listaAtivos");
        if (lista) {
            lista.innerHTML = "";
            
            const ativosAgrupados = {};
            dados.forEach((item) => {
                const ativoNome = item.ativo.toUpperCase(); 
                const valor = Number(item.valor_usd);
                if (ativosAgrupados[ativoNome]) {
                    ativosAgrupados[ativoNome] += valor;
                } else {
                    ativosAgrupados[ativoNome] = valor;
                }
            });

            const keys = Object.keys(ativosAgrupados);
            if (keys.length === 0) {
                lista.innerHTML = "<p class='loading-text' style='color: #888;'>Nenhum ativo cadastrado.</p>";
            } else {
                keys.forEach((ativo) => {
                    const valorAtivo = ativosAgrupados[ativo];
                    total += valorAtivo;
                    lista.innerHTML += `
                        <div class="ativo" style="display: flex; justify-content: space-between; margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 5px;">
                            <span>${ativo}</span>
                            <strong>US$ ${valorAtivo.toFixed(2)}</strong>
                        </div>`;
                });
            }
        }
        document.getElementById("valorCarteira").innerHTML = `US$ ${total.toFixed(2)}`;
        
        const numAtivosUnicos = Object.keys(ativosAgrupados || {}).length;
        const scoreSaude = Math.min(numAtivosUnicos * 15, 100);
        document.getElementById("score").innerHTML = `${scoreSaude}/100`;
        
    } catch (erro) { console.error(erro); }
}
verificarUsuario();
