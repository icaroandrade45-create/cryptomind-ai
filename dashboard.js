import { logout, obterSessao } from "./auth.js";

const botaoSair = document.getElementById("logoutBtn");

// Verifica se existe uma sessão ativa
const sessao = await obterSessao();

if (!sessao) {
    window.location.href = "index.html";
    }

    // Logout
    botaoSair.addEventListener("click", async () => {
        try {
                await logout();
                        window.location.href = "index.html";
                            } catch (error) {
                                    alert(error.message);
                                        }
                                        });