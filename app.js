// Diagnóstico para termos a certeza absoluta
alert("O script app.js carregou com sucesso!");

const supabase = window.supabaseCliente || window.supabaseClient || window.supabase;

if (!supabase) {
    alert("ERRO: O Supabase não iniciou. Verifica o teu config.js.");
    } else {
        alert("Conexão ao Supabase estabelecida com sucesso!");
        }

        const areaAuth = document.getElementById('areaAuth');
        const areaCarteira = document.getElementById('areaCarteira');
        const areaAnalise = document.getElementById('areaAnalise'); 
        const btnEntrar = document.getElementById('btnEntrar');
        const btnCadastrar = document.getElementById('btnCadastrar');
        const btnSair = document.getElementById('btnSair');
        const emailInput = document.getElementById('email');
        const senhaInput = document.getElementById('senha');
        const msgAuth = document.getElementById('msgAuth');

        function mostrarPainelPrivado(user) {
            areaAuth.style.display = 'none';
                areaCarteira.style.display = 'block';
                    areaAnalise.style.display = 'block';
                        btnSair.style.display = 'inline-block';
                        }

                        function mostrarAreaLogin() {
                            areaAuth.style.display = 'block';
                                areaCarteira.style.display = 'none';
                                    areaAnalise.style.display = 'none';
                                        btnSair.style.display = 'none';
                                        }

                                        // CADASTRO
                                        btnCadastrar.addEventListener('click', async (e) => {
                                            e.preventDefault();
                                                const email = emailInput.value.trim();
                                                    const password = senhaInput.value.trim();
                                                        if (!email || !password) { alert("Preenche todos os campos!"); return; }

                                                            const { data, error } = await supabase.auth.signUp({ email, password });
                                                                if (error) { alert("Erro: " + error.message); } 
                                                                    else { alert("Cadastro realizado! Podes fazer login."); }
                                                                    });

                                                                    // ENTRAR
                                                                    btnEntrar.addEventListener('click', async (e) => {
                                                                        e.preventDefault();
                                                                            const email = emailInput.value.trim();
                                                                                const password = senhaInput.value.trim();
                                                                                    if (!email || !password) { alert("Preenche todos os campos!"); return; }

                                                                                        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                                                                                            if (error) { alert("Erro no login: " + error.message); } 
                                                                                                else { alert("Sucesso!"); mostrarPainelPrivado(data.user); }
                                                                                                });

                                                                                                // SAIR
                                                                                                btnSair.addEventListener('click', async () => {
                                                                                                    await supabase.auth.signOut();
                                                                                                        mostrarAreaLogin();
                                                                                                        });

                                                                                                        // VERIFICAR SESSÃO AO ENTRAR
                                                                                                        window.addEventListener('DOMContentLoaded', async () => {
                                                                                                            if (supabase) {
                                                                                                                    const { data: { session } } = await supabase.auth.getSession();
                                                                                                                            if (session && session.user) { mostrarPainelPrivado(session.user); } 
                                                                                                                                    else { mostrarAreaLogin(); }
                                                                                                                                        }
                                                                                                                                        });
                                                                                                                                        