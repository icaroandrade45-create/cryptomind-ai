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

// MOTOR DE INTELIGÊNCIA ARTIFICIAL E ANÁLISE DE RISCO
btnAnalisar.addEventListener("click", async () => {
    const ativo = buscaAtivo.value.trim().toLowerCase();
    if (!ativo) {
        alert("Por favor, digite o símbolo de uma criptomoeda (Ex: btc, eth, sol)!");
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
        if (!res.ok) throw new Error("Ativo não localizado. Tente usar o nome completo em minúsculo (ex: solana).");
        
        const dados = await res.json();
        const precoAtual = dados.market_data.current_price.usd;
        const variacao24h = dados.market_data.price_change_percentage_24h;
        
        let statusRisco = "";
        let corStatus = "";
        let acaoRecomendada = "";
        
        const scoreRiscoCalculado = Math.min(Math.max(Math.round(50 - (variacao24h * 2.5)), 5), 99);

        if (scoreRiscoCalculado >= 75) {
            statusRisco = "BAIXO RISCO (Zona de Acumulação)";
            corStatus = "#10b981"; 
            acaoRecomendada = "🟢 Ótimo momento para comprar. O ativo está subvalorizado no curto prazo e oferece uma margem de segurança alta.";
        } else if (scoreRiscoCalculado <= 30) {
            statusRisco = "ALTO RISCO (Zona de Distribuição)";
            corStatus = "#e74c3c"; 
            acaoRecomendada = "🔴 Risco elevado de correção. Evite compras no topo histórico. Excelente momento para realizar lucros parciais.";
        } else {
            statusRisco = "RISCO MODERADO (Zona Neutra)";
            corStatus = "#f59e0b"; 
            acaoRecomendada = "🟡 Aguarde uma definição de tendência ou faça aportes pequenos (DCA). Não compre em desespero.";
        }

        resultadoAnalise.innerHTML = `
            <div style="border-left: 4px solid ${corStatus}; padding-left: 15px;">
                <h3 style="margin-top: 0; color: ${corStatus}; text-transform: uppercase;">${dados.name} (${dados.symbol.toUpperCase()}) - ${statusRisco}</h3>
                <p><strong>Preço Atual:</strong> US$ ${precoAtual.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                <p><strong>Variação 24h:</strong> <span style="color: ${variacao24h >= 0 ? '#10b981' : '#e74c3c'}">${variacao24h.toFixed(2)}%</span></p>
                <p><strong>CryptoMind Score de Entrada:</strong> <strong style="font-size: 1.2rem; color: ${corStatus}">${scoreRiscoCalculado}/100</strong></p>
                <p style="margin-top: 15px; font-style: italic; background: rgba(255,255,255,0.02); padding: 10px; border-radius: 4px;">${acaoRecomendada}</p>
            </div>
        `;

    } catch (erro) {
        resultadoAnalise.innerHTML = `<p style="color: #e74c3c;">Erro na IA: ${erro.message}</p>`;
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
            alert("Sua sessão expirou. Por favor, faça login novamente.");
            return;
        }

        msgAddAtivo.style.color = "#ffffff";
        msgAddAtivo.innerText = "Salvando no banco de dados...";

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
                lista.innerHTML = "<p class='loading-text' style='color: #888;'>Você ainda não tem ativos cadastrados. Use o formulário acima para adicionar!</p>";
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
async function buscarTopCriptos() {

        const resposta = await fetch(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
                    );

                        const moedas = await resposta.json();

                            console.log("Top moedas:", moedas);

                            }

                            buscarTopCriptos();
}