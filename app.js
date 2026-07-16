// 1. Obter a instância global com segurança
const supabase = window.supabaseCliente;

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

const buscaAtivo = document.getElementById('buscaAtivo');
const btnAnalisar = document.getElementById('btnAnalisar');
const resultadoAnalise = document.getElementById('resultadoAnalise');
const scoreDestaque = document.getElementById('score');

// Função auxiliar para exibir mensagens de feedback
function exibirMensagem(texto, tipo) {
    msgAuth.textContent = texto;
        msgAuth.className = `feedback-msg ${tipo}`;
        }

        // Funções para alternar as telas
        function mostrarPainelPrivado(user) {
            areaAuth.style.display = 'none';
                areaCarteira.style.display = 'block';
                    areaAnalise.style.display = 'block'; // Mostra o analisador
                        btnSair.style.display = 'inline-block';
                            limparFormularios();
                            }

                            function mostrarAreaLogin() {
                                areaAuth.style.display = 'block';
                                    areaCarteira.style.display = 'none';
                                        areaAnalise.style.display = 'none';
                                            btnSair.style.display = 'none';
                                                limparFormularios();
                                                }

                                                function limparFormularios() {
                                                    emailInput.value = '';
                                                        senhaInput.value = '';
                                                            msgAuth.textContent = '';
                                                                msgAuth.className = 'feedback-msg';
                                                                }

                                                                // ==========================================
                                                                // AÇÃO DE CADASTRO
                                                                // ==========================================
                                                                btnCadastrar.addEventListener('click', async (e) => {
                                                                    e.preventDefault();
                                                                        const email = emailInput.value.trim();
                                                                            const password = senhaInput.value.trim();

                                                                                if (!email || !password) {
                                                                                        exibirMensagem("Preencha todos os campos para cadastrar.", "erro");
                                                                                                return;
                                                                                                    }

                                                                                                        exibirMensagem("A processar cadastro...", "info");

                                                                                                            try {
                                                                                                                    const { data, error } = await supabase.auth.signUp({
                                                                                                                                email: email,
                                                                                                                                            password: password,
                                                                                                                                                    });

                                                                                                                                                            if (error) {
                                                                                                                                                                        exibirMensagem(`Erro no cadastro: ${error.message}`, "erro");
                                                                                                                                                                                } else if (data.user) {
                                                                                                                                                                                            exibirMensagem("Cadastro realizado! Verifica o teu e-mail para confirmar a conta.", "sucesso");
                                                                                                                                                                                                    }
                                                                                                                                                                                                        } catch (err) {
                                                                                                                                                                                                                exibirMensagem("Erro inesperado ao cadastrar.", "erro");
                                                                                                                                                                                                                        console.error(err);
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                            });

                                                                                                                                                                                                                            // ==========================================
                                                                                                                                                                                                                            // AÇÃO DE LOGIN
                                                                                                                                                                                                                            // ==========================================
                                                                                                                                                                                                                            btnEntrar.addEventListener('click', async (e) => {
                                                                                                                                                                                                                                e.preventDefault();
                                                                                                                                                                                                                                    const email = emailInput.value.trim();
                                                                                                                                                                                                                                        const password = senhaInput.value.trim();

                                                                                                                                                                                                                                            if (!email || !password) {
                                                                                                                                                                                                                                                    exibirMensagem("Preencha todos os campos para entrar.", "erro");
                                                                                                                                                                                                                                                            return;
                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                    exibirMensagem("A entrar...", "info");

                                                                                                                                                                                                                                                                        try {
                                                                                                                                                                                                                                                                                const { data, error } = await supabase.auth.signInWithPassword({
                                                                                                                                                                                                                                                                                            email: email,
                                                                                                                                                                                                                                                                                                        password: password,
                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                        if (error) {
                                                                                                                                                                                                                                                                                                                                    exibirMensagem(`Erro ao entrar: ${error.message}`, "erro");
                                                                                                                                                                                                                                                                                                                                            } else if (data.user) {
                                                                                                                                                                                                                                                                                                                                                        exibirMensagem("Login efetuado com sucesso!", "sucesso");
                                                                                                                                                                                                                                                                                                                                                                    setTimeout(() => {
                                                                                                                                                                                                                                                                                                                                                                                    mostrarPainelPrivado(data.user);
                                                                                                                                                                                                                                                                                                                                                                                                }, 1000);
                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                            } catch (err) {
                                                                                                                                                                                                                                                                                                                                                                                                                    exibirMensagem("Erro de ligação ao servidor.", "erro");
                                                                                                                                                                                                                                                                                                                                                                                                                            console.error(err);
                                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                                                                // ==========================================
                                                                                                                                                                                                                                                                                                                                                                                                                                // AÇÃO DE LOGOUT (SAIR)
                                                                                                                                                                                                                                                                                                                                                                                                                                // ==========================================
                                                                                                                                                                                                                                                                                                                                                                                                                                btnSair.addEventListener('click', async () => {
                                                                                                                                                                                                                                                                                                                                                                                                                                    await supabase.auth.signOut();
                                                                                                                                                                                                                                                                                                                                                                                                                                        mostrarAreaLogin();
                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                        // Verificar se o utilizador já está logado ao carregar a página
                                                                                                                                                                                                                                                                                                                                                                                                                                        window.addEventListener('DOMContentLoaded', async () => {
                                                                                                                                                                                                                                                                                                                                                                                                                                            const { data: { session } } = await supabase.auth.getSession();
                                                                                                                                                                                                                                                                                                                                                                                                                                                if (session && session.user) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                        mostrarPainelPrivado(session.user);
                                                                                                                                                                                                                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    mostrarAreaLogin();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        