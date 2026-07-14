// CONFIGURAÇÃO DO SUPABASE
const SUPABASE_URL = "https://SEU-PROJETO.supabase.co";
const SUPABASE_KEY = "COLE_SUA_CHAVE_ANON_AQUI";eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreHlsY3llbnJ5aHp2amx6eWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzEyOTksImV4cCI6MjA5OTIwNzI5OX0.wpU9LQscvrCFqK5vBDrL1nlhZMYer5DA-F6vWyamt6I

async function carregarCarteira() {
            try {
                        const resposta = await fetch(
                                            `${SUPABASE_URL}/rest/v1/carteira?select=*`,
                                                        {
                                                                                headers: {
                                                                                                            "apikey": SUPABASE_KEY,
                                                                                                                                "Authorization": `Bearer ${SUPABASE_KEY}`
                                                                                }
                                                                        }
                                                                );

                                                                        if (!resposta.ok) {
                                                                                            throw new Error("Erro ao conectar ao Supabase");
                                                                        }

                                                                                const dados = await resposta.json();
                                                                                        let total = 0;

                                                                                                const lista = document.getElementById("listaAtivos");
                                                                                                        if (lista) {
                                                                                                                            lista.innerHTML = "";

                                                                                                                                        dados.forEach((item) => {
                                                                                                                                                                total += Number(item.valor_usd);

                                                                                                                                                                                lista.innerHTML += `
                                                                                                                                                                                                    <div class="ativo">
                                                                                                                                                                                                                            <span>${item.ativo}</span>
                                                                                                                                                                                                                                                    <strong>US$ ${Number(item.valor_usd).toFixed(2)}</strong>
                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                        `;
                                                                                                                                        });
                                                                                                                                }

                                                                                                                                        const valorCarteiraEl = document.getElementById("valorCarteira");
                                                                                                                                                if (valorCarteiraEl) {
                                                                                                                                                                    valorCarteiraEl.innerHTML = `US$ ${total.toFixed(2)}`;
                                                                                                                                                }

                                                                                                                                                        const scoreEl = document.getElementById("score");
                                                                                                                                                                if (scoreEl) {
                                                                                                                                                                                    // Calcula o score com base no número de ativos (ex: 3 ativos = 30/100)
                                                                                                                                                                                                scoreEl.innerHTML = `${dados.length * 10}/100`;
                                                                                                                                                                }

                                                                                                                                                        } catch (erro) {
                                                                                                                                                                        console.error("Erro na requisição do Supabase:", erro);
                                                                                                                                                                                
                                                                                                                                                                                const valorCarteiraEl = document.getElementById("valorCarteira");
                                                                                                                                                                                        if (valorCarteiraEl) {
                                                                                                                                                                                                            valorCarteiraEl.innerHTML = "Erro ao carregar";
                                                                                                                                                                                        }
                                                                                                                                                                                }
                                                                                                                                                                        }

                                                                                                                                                                        // Executa a função assim que a página carrega
                                                                                                                                                                        carregarCarteira();
                                                                                                                                                                        
                                                                                                                                                                                        }
                                                                                                                                                        }
                                                                                                                                                                }
                                                                                                                                                }
                                                                                                                                        })
                                                                                                        }
                                                                        }
                                                                                }
                                                        }
                        )
            }
}