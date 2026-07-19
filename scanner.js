// CryptoMind AI
// scanner.js - Monitoramento de mercado


let intervaloScanner = null;



export async function iniciarScanner(){

    if(intervaloScanner){
            return;
                }


                    await atualizarMercado();


                        intervaloScanner = setInterval(
                                atualizarMercado,
                                        30000
                                            );

                                            }





                                            async function atualizarMercado(){


                                                const container =
                                                    document.getElementById(
                                                            'conteudo-scanner'
                                                                );



                                                                    if(!container) return;



                                                                        try{


                                                                                container.innerHTML = `
                                                                                            <p>🔄 Atualizando mercado...</p>
                                                                                                    `;



                                                                                                            const resposta =
                                                                                                                    await fetch(
                                                                                                                            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true"
                                                                                                                                    );



                                                                                                                                            const dados =
                                                                                                                                                    await resposta.json();




                                                                                                                                                            container.innerHTML = `

                                                                                                                                                                    <div class="scanner-card">

                                                                                                                                                                                <h2>
                                                                                                                                                                                            📊 Scanner de Mercado
                                                                                                                                                                                                        </h2>


                                                                                                                                                                                                                    <p>
                                                                                                                                                                                                                                🟢 Conectado
                                                                                                                                                                                                                                            </p>


                                                                                                                                                                                                                                                        <hr>


                                                                                                                                                                                                                                                                    <p>
                                                                                                                                                                                                                                                                                Bitcoin:
                                                                                                                                                                                                                                                                                            $${dados.bitcoin.usd}
                                                                                                                                                                                                                                                                                                        (${dados.bitcoin.usd_24h_change.toFixed(2)}%)
                                                                                                                                                                                                                                                                                                                    </p>


                                                                                                                                                                                                                                                                                                                                <p>
                                                                                                                                                                                                                                                                                                                                            Ethereum:
                                                                                                                                                                                                                                                                                                                                                        $${dados.ethereum.usd}
                                                                                                                                                                                                                                                                                                                                                                    (${dados.ethereum.usd_24h_change.toFixed(2)}%)
                                                                                                                                                                                                                                                                                                                                                                                </p>


                                                                                                                                                                                                                                                                                                                                                                                            <p>
                                                                                                                                                                                                                                                                                                                                                                                                        Solana:
                                                                                                                                                                                                                                                                                                                                                                                                                    $${dados.solana.usd}
                                                                                                                                                                                                                                                                                                                                                                                                                                (${dados.solana.usd_24h_change.toFixed(2)}%)
                                                                                                                                                                                                                                                                                                                                                                                                                                            </p>


                                                                                                                                                                                                                                                                                                                                                                                                                                                        <small>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Última atualização:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ${new Date().toLocaleTimeString()}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </small>


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            `;



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }catch(error){


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        console.error(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    "Erro scanner:",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                error
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        );



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                container.innerHTML = `

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ❌ Erro ao carregar dados do mercado.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </p>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                `;


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }





                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    export function pararScanner(){


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        if(intervaloScanner){


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                clearInterval(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            intervaloScanner
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    );


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            intervaloScanner = null;


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }