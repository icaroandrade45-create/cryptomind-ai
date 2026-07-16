// Diagnóstico inicial
alert("O script app.js carregou!");

// Captura exatamente a variável configurada no teu config.js
const supabase = window.supabaseCliente;

if (!supabase) {
    alert("ERRO: window.supabaseCliente não foi encontrado! Verifica o config.js.");
    } else {
        alert("Supabase mapeado com sucesso!");
        }

        const areaAuth = document.getElementById('areaAuth');
        const areaCarteira = document.getElementById('areaCarteira');
        const areaAnalise = document.getElementById('areaAnalise'); 
        const btnEntrar = document.getElementById('btnEntrar');
        const btnCadastrar = document.getElementById('btnCadastrar');
        const btnSair = document.getElementById('btnSair');
        const emailInput = document.getElementById('email');
        const senhaInput = document.getElementById('senha');

        function mostrarPainelPrivado(user) {
            if(areaAuth) areaAuth.style.display = 'none';
                if(areaCarteira) areaCarteira.style.display = 'block';
                    if(areaAnalise) areaAnalise.style.display = 'block';
                        if(btnSair) btnSair.style.display = 'inline-block';
                        }

                        function mostrarAreaLogin() {
                            if(areaAuth) areaAuth.style.display = 'block';
                                if(areaCarteira) areaCarteira.style.display = 'none';
                                    if(areaAnalise) areaAnalise.style.display = 'none';
                                        if(btnSair) btnSair.style.display = 'none';
                                        }

                                        // CADASTRO
                                        if (btnCadastrar) {
                                            btnCadastrar.addEventListener('click', async (e) => {
                                                    e.preventDefault();
                                                            const email = emailInput.value.trim();
                                                                    const password = senhaInput.value.trim();
                                                                            if (!email || !password) { alert("Preenche todos os campos!"); return; }

                                                                                    const { data, error } = await supabase.auth.signUp({ email, password });
                                                                                            if (error) { alert("Erro: " + error.message); } 
                                                                                                    else { alert("Cadastro realizado com sucesso!"); }
                                                                                                        });
                                                                                                        }

                                                                                                        // LOGIN
                                                                                                        if (btnEntrar) {
                                                                                                            btnEntrar.addEventListener('click', async (e) => {
                                                                                                                    e.preventDefault();
                                                                                                                            const email = emailInput.value.trim();
                                                                                                                                    const password = senhaInput.value.trim();
                                                                                                                                            if (!email || !password) { alert("Preenche todos os campos!"); return; }

                                                                                                                                                    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                                                                                                                                                            if (error) { alert("Erro no login: " + error.message); } 
                                                                                                                                                                    else { alert("Sucesso!"); mostrarPainelPrivado(data.user); }
                                                                                                                                                                        });
                                                                                                                                                                        }

                                                                                                                                                                        // SAIR
                                                                                                                                                                        if (btnSair) {
                                                                                                                                                                            btnSair.addEventListener('click', async () => {
                                                                                                                                                                                    await supabase.auth.signOut();
                                                                                                                                                                                            mostrarAreaLogin();
                                                                                                                                                                                                });
                                                                                                                                                                                                }

                                                                                                                                                                                                // VERIFICAR SESSÃO EXISTENTE
                                                                                                                                                                                                window.addEventListener('DOMContentLoaded', async () => {
                                                                                                                                                                                                    setTimeout(async () => {
                                                                                                                                                                                                            if (supabase && supabase.auth) {
                                                                                                                                                                                                                        const { data: { session } } = await supabase.auth.getSession();
                                                                                                                                                                                                                                    if (session && session.user) { mostrarPainelPrivado(session.user); } 
                                                                                                                                                                                                                                                else { mostrarAreaLogin(); }
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                            }, 500);
                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                            