import { supabase } from "./config.js";

// Login
export async function fazerLogin(email, senha) {
    const { data, error } = await supabase.auth.signInWithPassword({
            email,
                    password: senha
                        });

                            if (error) throw error;

                                return data;
                                }

                                // Cadastro
                                export async function cadastrar(email, senha) {
                                    const { data, error } = await supabase.auth.signUp({
                                            email,
                                                    password: senha
                                                        });

                                                            if (error) throw error;

                                                                return data;
                                                                }

                                                                // Logout
                                                                export async function logout() {
                                                                    const { error } = await supabase.auth.signOut();

                                                                        if (error) throw error;
                                                                        }

                                                                        // Usuário atual
                                                                        export async function obterUsuario() {
                                                                            const {
                                                                                    data: { user }
                                                                                        } = await supabase.auth.getUser();

                                                                                            return user;
                                                                                            }

                                                                                            // Sessão atual
                                                                                            export async function obterSessao() {
                                                                                                const {
                                                                                                        data: { session }
                                                                                                            } = await supabase.auth.getSession();

                                                                                                                return session;
                                                                                                                }

                                                                                                                // Escutar alterações na autenticação
                                                                                                                export function observarAutenticacao(callback) {
                                                                                                                    return supabase.auth.onAuthStateChange((event, session) => {
                                                                                                                            callback(event, session);
                                                                                                                                });
                                                                                                                                }