// Captura o cliente Supabase injetado globalmente pelo config.js
const supabase = window.supabaseCliente;

/**
 * Cadastra um novo usuário no Supabase
 */
export async function cadastrarUsuario(email, senha) {
    if (!supabase) throw new Error("Supabase não configurado.");
    
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: senha
    });

    if (error) throw error;
    return data;
}

/**
 * Realiza o login do usuário
 */
export async function loginUsuario(email, senha) {
    if (!supabase) throw new Error("Supabase não configurado.");

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha
    });

    if (error) throw error;
    return data;
}

/**
 * Faz o logout do usuário
 */
export async function logoutUsuario() {
    if (!supabase) throw new Error("Supabase não configurado.");

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

/**
 * Verifica se existe uma sessão ativa e monitora mudanças de estado (login/logout)
 */
export function observarSessao(callback) {
    if (!supabase) return;

    // Verifica o estado atual imediatamente
    supabase.auth.getSession().then(({ data: { session } }) => {
        callback(session);
    });

    // Escuta mudanças futuras
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        callback(session);
    });

    return subscription;
}
