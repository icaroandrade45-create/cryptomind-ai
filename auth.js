// Funções de Autenticação Requeridas pelo app.js
const SUPABASE_URL = "https://ukxylcyenryhzvjlzyaz.supabase.co";
const SUPABASE_ANON_KEY = "EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreHlsY3llbnJ5aHp2amx6eWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzEyOTksImV4cCI6MjA5OTIwNzI5OX0.wpU9LQscvrCFqK5vBDrL1nlhZMYer5DA-F6vWyamt6I";

// Inicializa o cliente se a biblioteca global existir
const supabaseClient = typeof supabase !== 'undefined' ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

export async function loginUsuario(email, senha) {
    if (!supabaseClient) throw new Error("Supabase não carregado.");
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password: senha });
    if (error) throw error;
    return data;
}

export async function cadastrarUsuario(email, senha) {
    if (!supabaseClient) throw new Error("Supabase não carregado.");
    const { data, error } = await supabaseClient.auth.signUp({ email, password: senha });
    if (error) throw error;
    return data;
}

export async function logoutUsuario() {
    if (!supabaseClient) throw new Error("Supabase não carregado.");
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
}

export function observarSessao(callback) {
    if (!supabaseClient) return;
    supabaseClient.auth.onAuthStateChange((event, session) => {
        callback(session);
    });
}
