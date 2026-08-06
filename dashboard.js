import { obterSessao, logout } from "./auth.js";

async function iniciarDashboard() {
    try {
            const sessao = await obterSessao();

                    if (!sessao) {
                                window.location.href = "index.html";
                                            return;
                                                    }

                                                            const botaoLogout = document.getElementById("logoutBtn");

                                                                    botaoLogout.addEventListener("click", async () => {
                                                                                try {
                                                                                                await logout();
                                                                                                                window.location.href = "index.html";
                                                                                                                            } catch (error) {
                                                                                                                                            alert(error.message);
                                                                                                                                                        }
                                                                                                                                                                });

                                                                                                                                                                    } catch (error) {
                                                                                                                                                                            console.error("Erro ao iniciar dashboard:", error);
                                                                                                                                                                                    window.location.href = "index.html";
                                                                                                                                                                                        }
                                                                                                                                                                                        }

                                                                                                                                                                                        iniciarDashboard();