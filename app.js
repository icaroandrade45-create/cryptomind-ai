const SUPABASE_URL = "https://ukxylcyenryhzvjlzyaz.supabase.co"; 
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreHlsY3llbnJ5aHp2amx6eWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzEyOTksImV4cCI6MjA5OTIwNzI5OX0.wpU9LQscvrCFqK5vBDrL1nlhZMYer5DA-F6vWyamt6I";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const areaAuth = document.getElementById("areaAuth");
const areaCarteira = document.getElementById("areaCarteira");
const btnSair = document.getElementById("btnSair");
const btnEntrar = document.getElementById("btnEntrar");
const btnCadastrar = document.getElementById("btnCadastrar");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const msgAuth = document.getElementById("msgAuth");

async function verificarUsuario() {
    const { data: { session } } = await supabase.auth.getSession();
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

btnCadastrar.addEventListener("click", async () => {
    msgAuth.innerText = "Criando conta...";
    const { data, error } = await supabase.auth.signUp({
        email: emailInput.value,
        password: senhaInput.value,
    });
    if (error) {
        msgAuth.innerText = "Erro: " + error.message;
    } else {
        msgAuth.style.color = "#10b981";
        msgAuth.innerText = "Conta criada! Faça o login agora.";
    }
});

btnEntrar.addEventListener("click", async () => {
    msgAuth.style.color = "#e74c3c";
    msgAuth.innerText = "Entrando...";
    const { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput.value,
        password: senhaInput.value,
    });
    if (error) {
        msgAuth.innerText = "Erro: " + error.message;
    } else {
        msgAuth.innerText = "";
        verificarUsuario();
    }
});

btnSair.addEventListener("click", async () => {
    await supabase.auth.signOut();
    verificarUsuario();
});

async function carregarCarteira(userId) {
    try {
        const resposta = await fetch(`${SUPABASE_URL}/rest/v1/carteira?select=*`, {
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
            dados.forEach((item) => {
                total += Number(item.valor_usd);
                lista.innerHTML += `
                    <div class="ativo" style="display: flex; justify-content: space-between; margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 5px;">
                        <span>${item.ativo}</span>
                        <strong>US$ ${Number(item.valor_usd).toFixed(2)}</strong>
                    </div>`;
            });
        }
        document.getElementById("valorCarteira").innerHTML = `US$ ${total.toFixed(2)}`;
        document.getElementById("score").innerHTML = `${dados.length * 10}/100`;
    } catch (erro) { console.error(erro); }
}
verificarUsuario();
