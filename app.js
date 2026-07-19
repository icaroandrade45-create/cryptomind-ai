// CryptoMind AI
// app.js - Controlador principal da aplicação


import { 
    supabase 
    } from './config.js';


    import {
        fazerLogin,
            logout,
                obterSessao
                } from './auth.js';


                import {
                    iniciarScanner,
                        pararScanner
                        } from './scanner.js';



                        console.log("CryptoMind AI app carregado");



                        const loginContainer =
                        document.getElementById('login-container');


                        const dashboardContainer =
                        document.getElementById('dashboard-container');


                        const btnLogin =
                        document.getElementById('btnLogin');


                        const btnLogout =
                        document.getElementById('btnLogout');


                        const mensagemLogin =
                        document.getElementById('mensagem-login');



                        function abrirDashboard(){

                            if(loginContainer){

                                    loginContainer.style.display = 'none';

                                        }


                                            if(dashboardContainer){

                                                    dashboardContainer.style.display = 'block';

                                                        }


                                                            iniciarScanner();

                                                            }




                                                            function abrirLogin(){


                                                                if(loginContainer){

                                                                        loginContainer.style.display = 'block';

                                                                            }


                                                                                if(dashboardContainer){

                                                                                        dashboardContainer.style.display = 'none';

                                                                                            }


                                                                                                pararScanner();

                                                                                                }




                                                                                                async function verificarSessao(){


                                                                                                    try {


                                                                                                            const sessao = await obterSessao();


                                                                                                                    if(sessao){


                                                                                                                                console.log(
                                                                                                                                                "Usuário conectado:",
                                                                                                                                                                sessao.user.email
                                                                                                                                                                            );


                                                                                                                                                                                        abrirDashboard();


                                                                                                                                                                                                } else {


                                                                                                                                                                                                            abrirLogin();


                                                                                                                                                                                                                    }


                                                                                                                                                                                                                        } catch(error){


                                                                                                                                                                                                                                console.error(
                                                                                                                                                                                                                                            "Erro ao verificar sessão:",
                                                                                                                                                                                                                                                        error
                                                                                                                                                                                                                                                                );


                                                                                                                                                                                                                                                                        abrirLogin();


                                                                                                                                                                                                                                                                            }


                                                                                                                                                                                                                                                                            }





                                                                                                                                                                                                                                                                            if(btnLogin){


                                                                                                                                                                                                                                                                                btnLogin.addEventListener(
                                                                                                                                                                                                                                                                                        'click',
                                                                                                                                                                                                                                                                                                async ()=>{


                                                                                                                                                                                                                                                                                                        const email =
                                                                                                                                                                                                                                                                                                                document.getElementById('email').value;


                                                                                                                                                                                                                                                                                                                        const senha =
                                                                                                                                                                                                                                                                                                                                document.getElementById('senha').value;



                                                                                                                                                                                                                                                                                                                                        try {


                                                                                                                                                                                                                                                                                                                                                    if(mensagemLogin){

                                                                                                                                                                                                                                                                                                                                                                    mensagemLogin.innerHTML =
                                                                                                                                                                                                                                                                                                                                                                                    "Entrando...";

                                                                                                                                                                                                                                                                                                                                                                                                }



                                                                                                                                                                                                                                                                                                                                                                                                            await fazerLogin(
                                                                                                                                                                                                                                                                                                                                                                                                                            email,
                                                                                                                                                                                                                                                                                                                                                                                                                                            senha
                                                                                                                                                                                                                                                                                                                                                                                                                                                        );



                                                                                                                                                                                                                                                                                                                                                                                                                                                                    abrirDashboard();



                                                                                                                                                                                                                                                                                                                                                                                                                                                                            } catch(error){


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        console.error(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        "Erro login:",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        error
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    );



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if(mensagemLogin){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                mensagemLogin.innerHTML =
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                "❌ Login inválido";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }




                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        if(btnLogout){


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            btnLogout.addEventListener(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    'click',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            async ()=>{


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    await logout();


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            abrirLogin();


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                });


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }




                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                supabase.auth.onAuthStateChange(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    (evento, sessao)=>{


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            console.log(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        "Auth:",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    evento
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            );


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    if(sessao){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                abrirDashboard();

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        } else {

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    abrirLogin();

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                );




                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                document.addEventListener(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    'DOMContentLoaded',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ()=>{


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                verificarSessao();


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    );