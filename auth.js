// Script Unificado de Autenticação - CryptoMind AI

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    // Configuração e Inicialização Direta do Supabase para evitar erros de cache
    const SUPABASE_URL = "https://ukxylcyenryhzvjlzyaz.supabase.co";
    const SUPABASE_ANON_KEY = "EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreHlsY3llbnJ5aHp2amx6eWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzEyOTksImV4cCI6MjA5OTIwNzI5OX0.wpU9LQscvrCFqK5vBDrL1nlhZMYer5DA-F6vWyamt6I";

    let supabaseInstance = null;

    if (typeof supabase !== 'undefined') {
        supabaseInstance = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } else {
        console.error("Biblioteca Supabase da CDN não foi carregada no HTML.");
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!supabaseInstance) {
                alert('Erro crítico: A biblioteca Supabase (CDN) não foi carregada corretamente pela página.');
                return;
            }

            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            try {
                const { data, error } = await supabaseInstance.auth.signInWithPassword({
                    email: email,
                    password: senha,
                });

                if (error) {
                    alert('Erro no login: ' + error.message);
                } else {
                    alert('Login realizado com sucesso!');
                    // Caso queira redirecionar após o sucesso:
                    // window.location.href = 'dashboard.html';
                }
            } catch (err) {
                alert('Erro inesperado no processamento: ' + err.message);
            }
        });
    }
});
