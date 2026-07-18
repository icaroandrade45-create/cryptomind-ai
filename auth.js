// CryptoMind AI - Módulo de Autenticação Modular
import { getSupabase } from './config.js';

export async function loginUsuario(email, senha) {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha
    });
    if (error) throw error;
    return data;
}

export async function cadastrarUsuario(email, senha) {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: senha
    });
    if (error) throw error;
    return data;
}

export async function logoutUsuario() {
    const supabase = getSupabase();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

export function observarSessao(callback) {
    try {
        const supabase = getSupabase();
        supabase.auth.onAuthStateChange((event, session) => {
            callback(session);
        });
    } catch (e) {
        // Se o Supabase ainda não carregou, tenta novamente em 300ms
        setTimeout(() => observarSessao(callback), 300);
    }
}
