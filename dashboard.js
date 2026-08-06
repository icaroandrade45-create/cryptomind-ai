import { logout, obterSessao } from "./auth.js";

const botaoLogout = document.getElementById("logoutBtn");

// Verifica se o usuário está logado
const sessao = await obterSessao();

if (!sessao) {
    window.location.href = "index.html";
    }

    // Logout
    botaoLogout.addEventListener("click", async () => {
        try {
                await logout();
                        window.location.href = "index.html";
                            } catch (error) {
                                    alert(error.message);
                                        }
                                        });