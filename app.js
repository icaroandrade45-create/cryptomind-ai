console.log("CryptoMind AI app carregado");
// app.js - Controlador principal da aplicação


import { 
    supabase 
    } from './config.js';


    import { 
        fazerLogin,
            logout
            } from './auth.js';


            import { 
                iniciarScanner,
                    pararScanner
                    } from './scanner.js';





                    const elementos = {

                        loginContainer:
                                document.getElementById('login-container'),

                                    dashboardContainer:
                                            document.getElementById('dashboard-container'),

                                                email:
                                                        document.getElementById('email'),

                                                            senha:
                                                                    document.getElementById('senha'),

                                                                        btnLogin:
                                                                                document.getElementById('btnLogin'),

                                                                                    btnLogout:
                                                                                            document.getElementById('btnLogout'),

                                                                                                mensagem:
                                                                                                        document.getElementById('mensagem-login')

                                                                                                        };






                                                                                                        const app = {

                                                                                                            
                                                                                                                iniciar(){

                                                                                                                        this.configurarEventos();

                                                                                                                                this.verificarSessao();


                                                                                                                                        supabase.auth.onAuthStateChange(
                                                                                                                                                    (event, session)=>{

                                                                                                                                                                    console.log(
                                                                                                                                                                                        "Evento Auth:",
                                                                                                                                                                                                            event
                                                                                                                                                                                                                            );


                                                                                                                                                                                                                                            this.controlarSessao(session);

                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                );

                                                                                                                                                                                                                                                                    },





                                                                                                                                                                                                                                                                        configurarEventos(){


                                                                                                                                                                                                                                                                                elementos.btnLogin
                                                                                                                                                                                                                                                                                        .addEventListener(
                                                                                                                                                                                                                                                                                                    'click',
                                                                                                                                                                                                                                                                                                                async()=>{

                                                                                                                                                                                                                                                                                                                                await this.login();

                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                    );



                                                                                                                                                                                                                                                                                                                                                            elementos.btnLogout
                                                                                                                                                                                                                                                                                                                                                                    .addEventListener(
                                                                                                                                                                                                                                                                                                                                                                                'click',
                                                                                                                                                                                                                                                                                                                                                                                            async()=>{

                                                                                                                                                                                                                                                                                                                                                                                                            await logout();

                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                                );


                                                                                                                                                                                                                                                                                                                                                                                                                                    },






                                                                                                                                                                                                                                                                                                                                                                                                                                        async verificarSessao(){


                                                                                                                                                                                                                                                                                                                                                                                                                                                const {

                                                                                                                                                                                                                                                                                                                                                                                                                                                            data:{
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            session

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                } = await supabase.auth.getSession();



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        this.controlarSessao(session);


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            },






                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                controlarSessao(session){


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        if(session){


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    this.abrirDashboard(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    session.user
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                );


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }else{


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    this.abrirLogin();


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                },






                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    async login(){


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            const email =
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        elementos.email.value.trim();


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                const senha =
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            elementos.senha.value;



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    try{


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                elementos.mensagem.innerHTML =
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "Entrando...";



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        await fazerLogin(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        email,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        senha
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    );



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                elementos.mensagem.innerHTML =
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "";



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }catch(error){


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                console.error(error);


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            elementos.mensagem.innerHTML =
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        "Erro: " + error.message;


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    },







                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        abrirDashboard(user){


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                console.log(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "Usuário:",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        user.email
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                );



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        elementos.loginContainer
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                .style.display="none";



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        elementos.dashboardContainer
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                .style.display="block";



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        iniciarScanner();


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            },







                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                abrirLogin(){


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        elementos.loginContainer
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                .style.display="block";



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        elementos.dashboardContainer
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                .style.display="none";



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        pararScanner();


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            };






                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            document.addEventListener(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                'DOMContentLoaded',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ()=>{

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            app.iniciar();

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                );