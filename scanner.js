export function carregarScanner() {
        const container = document.getElementById('dashboard-container');
            
                // Adiciona uma área de conteúdo dentro do dashboard
                    container.innerHTML += `
                            <div id="conteudo-scanner" style="margin-top: 20px; padding: 15px; border: 1px solid #ccc;">
                                        <h3>Scanner de Mercado</h3>
                                                    <ul id="lista-moedas">
                                                                    <li>BTC/USDT: Analisando...</li>
                                                                                    <li>ETH/USDT: Analisando...</li>
                                                                                                </ul>
                                                                                                            <button onclick="alert('Buscando novos sinais...')">Atualizar Sinais</button>
                                                                                                                    </div>
                                                                                                                        `;
                                                                                                                            
                                                                                                                                // Simula uma busca de dados
                                                                                                                                    setTimeout(() => {
                                                                                                                                            document.getElementById('lista-moedas').innerHTML = `
                                                                                                                                                        <li>BTC/USDT: <span style="color: green;">Compra Forte</span></li>
                                                                                                                                                                    <li>ETH/USDT: <span style="color: orange;">Aguardando</span></li>
                                                                                                                                                                            `;
                                                                                                                                                                                }, 2000);
                                                                                                                                                                                }
                                                                                                                                                                                
}