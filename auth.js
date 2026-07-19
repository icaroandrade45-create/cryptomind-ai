import { supabase } from './supabaseClient.js';

export async function login(email, senha){
    const { data, error } = await supabase.auth.signInWithPassword({
            email,
                    password: senha
                        });

                            if(error){
                                    throw error;
                                        }

                                            return data;
                                            }


                                            export async function obterUsuarioAtual(){
                                                const {
                                                        data: {
                                                                    user
                                                                            }
                                                                                } = await supabase.auth.getUser();

                                                                                    return user;
                                                                                    }


                                                                                    export async function obterSessao(){
                                                                                        const {
                                                                                                data: {
                                                                                                            session
                                                                                                                    }
                                                                                                                        } = await supabase.auth.getSession();

                                                                                                                            return session;
                                                                                                                            }


                                                                                                                            export async function verificarSessao(){

                                                                                                                                const session = await obterSessao();

                                                                                                                                    if(session){
                                                                                                                                            console.log("Usuário logado:", session.user.email);
                                                                                                                                                    return session;
                                                                                                                                                        }

                                                                                                                                                            console.log("Nenhum usuário logado");
                                                                                                                                                                return null;
                                                                                                                                                                }