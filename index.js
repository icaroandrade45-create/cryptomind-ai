document.getElementById('btnLogin').addEventListener('click', () => {
            // Pula a verificação do Supabase e força a abertura do dashboard
                document.getElementById('login-container').style.display = 'none';
                    document.getElementById('dashboard-container').style.display = 'block';
                        console.log("Teste de acesso forçado aplicado.");
                        });
                        
})