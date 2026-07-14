// ===== CONFIGURAÇÃO DO SUPABASE =====
const SUPABASE_URL = "https://ukxylcyenryhzvjlzyaz.supabase.co";
const SUPABASE_KEY = "COLE_SUA_CHAVE_ANON_AQUI";eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreHlsY3llbnJ5aHp2amx6eWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzEyOTksImV4cCI6MjA5OTIwNzI5OX0.wpU9LQscvrCFqK5vBDrL1nlhZMYer5DA-F6vWyamt6I

// ===== CARREGA A CARTEIRA =====
async function carregarCarteira() {
  try {
      const resposta = await fetch(
            `${SUPABASE_URL}/rest/v1/carteira?select=*`,
                  {
                          headers: {
                                    apikey: SUPABASE_KEY,
                                              Authorization: `Bearer ${SUPABASE_KEY}`,
                                                      },
                                                            }
                                                                );

                                                                    if (!resposta.ok) {
                                                                          throw new Error("Erro ao acessar o Supabase.");
                                                                              }

                                                                                  const carteira = await resposta.json();

                                                                                      let total = 0;
                                                                                          const lista = document.getElementById("listaAtivos");
                                                                                              lista.innerHTML = "";

                                                                                                  carteira.forEach((ativo) => {
                                                                                                        const valor = Number(ativo.valor_usd || 0);
                                                                                                              total += valor;

                                                                                                                    lista.innerHTML += `
                                                                                                                            <div class="ativo">
                                                                                                                                      <span>${ativo.ativo}</span>
                                                                                                                                                <strong>US$ ${valor.toFixed(2)}</strong>
                                                                                                                                                        </div>
                                                                                                                                                              `;
                                                                                                                                                                  });

                                                                                                                                                                      document.getElementById("valorTotal").innerHTML =
                                                                                                                                                                            `US$ ${total.toFixed(2)}`;

                                                                                                                                                                                document.getElementById("score").innerHTML =
                                                                                                                                                                                      carteira.length > 0 ? "86/100" : "--";

                                                                                                                                                                                        } catch (erro) {
                                                                                                                                                                                            console.error(erro);
                                                                                                                                                                                                document.getElementById("valorTotal").innerHTML = "Erro na conexão";
                                                                                                                                                                                                  }
                                                                                                                                                                                                  }

                                                                                                                                                                                                  carregarCarteira();