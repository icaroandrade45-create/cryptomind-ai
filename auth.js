// CryptoMind AI
// auth.js


import { supabase } from './config.js';




export async function fazerLogin(email, senha) {


    const { data, error } =
        await supabase.auth.signInWithPassword({

                email,

                        password: senha

                            });



                                if(error){

                                        throw error;

                                            }


                                                return data;

                                                }





                                                export async function logout(){


                                                    const { error } =
                                                        await supabase.auth.signOut();



                                                            if(error){

                                                                    throw error;

                                                                        }

                                                                        }





                                                                        export async function obterUsuarioAtual(){


                                                                            const {

                                                                                    data:{
                                                                                                user

                                                                                                        }

                                                                                                            } = await supabase.auth.getUser();



                                                                                                                return user;

                                                                                                                }






                                                                                                                export async function obterSessao(){


                                                                                                                    const {

                                                                                                                            data:{
                                                                                                                                        session

                                                                                                                                                }

                                                                                                                                                    } = await supabase.auth.getSession();



                                                                                                                                                        return session;

                                                                                                                                                        }