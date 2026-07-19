import { fazerLogin } from './auth.js';

document.getElementById('btnLogin').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
            const btn = document.getElementById('btnLogin');
                
                    btn.innerText = "Processando...";
                        console.log("Tentando login com:", email);
                            
                                try {
                                        const resultado = await fazerLogin(email, senha);
                                                console.log("Resposta do login:", resultado);
                                                        
                                                                // Se chegou aqui, o login funcionou
                                                                        document.getElementById('login-container').style.display = 'none';
                                                                                document.getElementById('dashboard-container').style.display = 'block';
                                                                                    } catch (error) {
                                                                                            // Se deu erro, o alerta vai nos contar o motivo real
                                                                                                    console.error("Erro capturado:", error);
                                                                                                            alert("Erro no login: " + error.message);
                                                                                                                    btn.innerText = "Conectando...";
                                                                                                                        }
                                                                                                                        });
                                                                                                                        