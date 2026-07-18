console.log("Iniciando auth.js...");
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Verifica se a variável global existe
            if (typeof window.supabaseCliente === 'undefined') {
                console.error("Variável global supabaseCliente não encontrada.");
                alert('Erro no login: Supabase não configurado.');
                return;
            }

            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            try {
                const { data, error } = await window.supabaseCliente.auth.signInWithPassword({
                    email: email,
                    password: senha,
                });

                if (error) {
                    alert('Erro no login: ' + error.message);
                } else {
                    alert('Login realizado com sucesso!');
                }
            } catch (err) {
                alert('Erro inesperado: ' + err.message);
            }
        });
    } else {
        console.error("Formulário de login não encontrado.");
    }
});
