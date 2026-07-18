// Script definitivo por clique direto - CryptoMind AI
document.addEventListener('DOMContentLoaded', () => {
    // Procura o botão pelo texto dele, não importa o ID ou formulário
    const botoes = Array.from(document.querySelectorAll('button'));
    const botaoEntrar = botoes.find(b => b.textContent.trim().toLowerCase() === 'entrar');

    const SUPABASE_URL = "https://ukxylcyenryhzvjlzyaz.supabase.co";
    const SUPABASE_ANON_KEY = "EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreHlsY3llbnJ5aHp2amx6eWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzEyOTksImV4cCI6MjA5OTIwNzI5OX0.wpU9LQscvrCFqK5vBDrL1nlhZMYer5DA-F6vWyamt6I";

    let supabaseInstance = null;
    if (typeof supabase !== 'undefined') {
        supabaseInstance = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }

    if (botaoEntrar) {
        // Altera o comportamento diretamente no clique do botão
        botaoEntrar.addEventListener('click', async (e) => {
            e.preventDefault();
            
            if (!supabaseInstance) {
                alert('Aguarde a página carregar completamente ou verifique sua conexão.');
                return;
            }

            const emailInput = document.querySelector('input[type="email"]');
            const passwordInput = document.querySelector('input[type="password"]');

            if (!emailInput || !passwordInput) {
                alert('Campos de login não encontrados na página.');
                return;
            }

            const email = emailInput.value;
            const senha = passwordInput.value;

            try {
                const { data, error } = await supabaseInstance.auth.signInWithPassword({
                    email: email,
                    password: senha,
                });

                if (error) {
                    alert('Erro no login: ' + error.message);
                } else {
                    alert('Login realizado com sucesso!');
                }
            } catch (err) {
                alert('Erro: ' + err.message);
            }
        });
    }
});
