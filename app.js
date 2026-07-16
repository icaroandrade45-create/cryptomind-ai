// Diagnóstico para sabermos que o script arrancou
alert("O script app.js carregou com sucesso!");

const supabase = window.supabaseCliente;

if (!supabase) {
    alert("ERRO: O Supabase não iniciou. Verifica o teu config.js ou index.html.");
    }

    // Elementos do DOM
    const areaAuth = document.getElementById('areaAuth');
    const areaCarteira = document.getElementById('areaCarteira');
    const areaAnalise = document.getElementById('areaAnalise'); 
    const btnEntrar = document.getElementById('btnEntrar');
    const btnCadastrar = document.getElementById('btnCadastrar');
    const btnSair = document.getElementById('btnSair');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const msgAuth = document.getElementById('msgAuth');

    function exibirMensagem(texto, tipo) {
        msgAuth.textContent = texto;
            msgAuth.className = `feedback-msg ${tipo}`;
            }

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
                                                    alert("Botão Cadastrar clicado!");
                                                        const email = emailInput.value.trim();
                                                            const password = senhaInput.value.trim();

                                                                if (!email || !password) {
                                                                        alert("Preenche os campos!");
                                                                                return;
                                                                                    }

                                                                                        const { data, error } = await supabase.auth.signUp({ email, password });

                                                                                            if (error) {
                                                                                                    alert("Erro no cadastro: " + error.message);
                                                                                                        } else {
                                                                                                                alert("Cadastro feito! Confirma o teu e-mail.");
                                                                                                                    }
                                                                                                                    });

                                                                                                                    // LOGIN
                                                                                                                    btnEntrar.addEventListener('click', async (e) => {
                                                                                                                        e.preventDefault();
                                                                                                                            alert("Botão Entrar clicado!");
                                                                                                                                const email = emailInput.value.trim();
                                                                                                                                    const password = senhaInput.value.trim();

                                                                                                                                        if (!email || !password) {
                                                                                                                                                alert("Preenche os campos!");
                                                                                                                                                        return;
                                                                                                                                                            }

                                                                                                                                                                const { data, error } = await supabase.auth.signInWithPassword({ email, password });

                                                                                                                                                                    if (error) {
                                                                                                                                                                            alert("Erro no login: " + error.message);
                                                                                                                                                                                } else {
                                                                                                                                                                                        alert("Sucesso! A entrar...");
                                                                                                                                                                                                mostrarPainelPrivado(data.user);
                                                                                                                                                                                                    }
                                                                                                                                                                                                    });

                                                                                                                                                                                                    // LOGOUT
                                                                                                                                                                                                    btnSair.addEventListener('click', async () => {
                                                                                                                                                                                                        await supabase.auth.signOut();
                                                                                                                                                                                                            mostrarAreaLogin();
                                                                                                                                                                                                            });

                                                                                                                                                                                                            // Verificar sessão
                                                                                                                                                                                                            window.addEventListener('DOMContentLoaded', async () => {
                                                                                                                                                                                                                const { data: { session } } = await supabase.auth.getSession();
                                                                                                                                                                                                                    if (session && session.user) {
                                                                                                                                                                                                                            mostrarPainelPrivado(session.user);
                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                        mostrarAreaLogin();
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                            