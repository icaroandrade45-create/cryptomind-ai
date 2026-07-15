const SUPABASE_URL = "https://ukxylcyenryhzvjlzyaz.supabase.co"; 
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreHlsY3llbnJ5aHp2amx6eWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzEyOTksImV4cCI6MjA5OTIwNzI5OX0.wpU9LQscvrCFqK5vBDrL1nlhZMYer5DA-F6vWyamt6I";

async function carregarCarteira() {
    try {
        const resposta = await fetch(`${SUPABASE_URL}/rest/v1/carteira?select=*`, {
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`
            }
        });
        if (!resposta.ok) throw new Error("Erro ao conectar");
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
        const valorCarteiraEl = document.getElementById("valorCarteira");
        if (valorCarteiraEl) valorCarteiraEl.innerHTML = `US$ ${total.toFixed(2)}`;
        const scoreEl = document.getElementById("score");
        if (scoreEl) scoreEl.innerHTML = `${dados.length * 10}/100`;
    } catch (erro) {
        console.error(erro);
    }
}
carregarCarteira();
