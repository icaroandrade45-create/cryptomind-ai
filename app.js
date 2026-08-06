import { login } from "./auth.js";

const form = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

        mensagem.textContent = "";

            const email = document.getElementById("email").value.trim();
                const senha = document.getElementById("senha").value;

                    try {
                            await login(email, senha);

                                    mensagem.style.color = "#22c55e";
                                            mensagem.textContent = "Login realizado com sucesso!";

                                                    setTimeout(() => {
                                                                window.location.href = "dashboard.html";
                                                                        }, 1000);

                                                                            } catch (error) {
                                                                                    mensagem.style.color = "#ef4444";
                                                                                            mensagem.textContent = error.message;
                                                                                                }
                                                                                                });