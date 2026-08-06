import { fazerLogin, cadastrar } from "./auth.js";

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const cadastroBtn = document.getElementById("cadastroBtn");
const mensagem = document.getElementById("mensagem");

function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
        mensagem.style.color = erro ? "#ff4d4f" : "#22c55e";
        }

        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

                const email = emailInput.value.trim();
                    const senha = senhaInput.value;

                        if (!email || !senha) {
                                mostrarMensagem("Preencha e-mail e senha.", true);
                                        return;
                                            }

                                                try {
                                                        mostrarMensagem("Entrando...");

                                                                await fazerLogin(email, senha);

                                                                        mostrarMensagem("Login realizado com sucesso!");

                                                                                setTimeout(() => {
                                                                                            window.location.href = "dashboard.html";
                                                                                                    }, 800);

                                                                                                        } catch (error) {
                                                                                                                mostrarMensagem(error.message, true);
                                                                                                                    }
                                                                                                                    });

                                                                                                                    cadastroBtn.addEventListener("click", async () => {

                                                                                                                        const email = emailInput.value.trim();
                                                                                                                            const senha = senhaInput.value;

                                                                                                                                if (!email || !senha) {
                                                                                                                                        mostrarMensagem("Preencha e-mail e senha.", true);
                                                                                                                                                return;
                                                                                                                                                    }

                                                                                                                                                        try {
                                                                                                                                                                mostrarMensagem("Criando conta...");

                                                                                                                                                                        await cadastrar(email, senha);

                                                                                                                                                                                mostrarMensagem(
                                                                                                                                                                                            "Conta criada! Verifique seu e-mail para confirmar o cadastro."
                                                                                                                                                                                                    );

                                                                                                                                                                                                        } catch (error) {
                                                                                                                                                                                                                mostrarMensagem(error.message, true);
                                                                                                                                                                                                                    }

                                                                                                                                                                                                                    });