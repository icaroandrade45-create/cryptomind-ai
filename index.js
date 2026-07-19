import { fazerLogin } from './auth.js';

document.getElementById('btnLogin').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
            
                try {
                        await fazerLogin(email, senha);
                                // Esconde o login e mostra o dashboard na mesma página
                                        document.getElementById('login-container').style.display = 'none';
                                                document.getElementById('dashboard-container').style.display = 'block';
                                                        console.log("Login validado, interface trocada.");
                                                            } catch (error) {
                                                                    alert("Erro no login: " + error.message);
                                                                        }
                                                                        });
                                                                        