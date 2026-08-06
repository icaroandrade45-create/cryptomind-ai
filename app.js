import { fazerLogin, cadastrar } from "./auth.js";

const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const cadastroBtn = document.getElementById("cadastroBtn");
const mensagem = document.getElementById("mensagem");

// LOGIN
form.addEventListener("submit", async (e) => {
    e.preventDefault();

        const email = emailInput.value.trim();
            const senha = senhaInput.value;

                try {
                        await fazerLogin(email, senha);

                                mensagem.style.color = "#00ff88";
                                        mensagem.textContent = "Login realizado com sucesso!";

                                                setTimeout(() => {
                                                            window.location.href = "dashboard.html";
                                                                    }, 1000);

                                                                        } catch (error) {
                                                                                mensagem.style.color = "#ff5555";
                                                                                        mensagem.textContent = error.message;
                                                                                            }
                                                                                            });

                                                                                            // CADASTRO
                                                                                            cadastroBtn.addEventListener("click", async () => {

                                                                                                const email = emailInput.value.trim();
                                                                                                    const senha = senhaInput.value;

                                                                                                        if (!email || !senha) {
                                                                                                                mensagem.style.color = "#ff5555";
                                                                                                                        mensagem.textContent = "Informe e-mail e senha.";
                                                                                                                                return;
                                                                                                                                    }

                                                                                                                                        try {
                                                                                                                                                await cadastrar(email, senha);

                                                                                                                                                        mensagem.style.color = "#00ff88";
                                                                                                                                                                mensagem.textContent = "Cadastro realizado! Verifique seu e-mail para confirmar a conta.";

                                                                                                                                                                    } catch (error) {
                                                                                                                                                                            mensagem.style.color = "#ff5555";
                                                                                                                                                                                    mensagem.textContent = error.message;
                                                                                                                                                                                        }

                                                                                                                                                                                        });