// Funções de Autenticação com Inicialização Sob Demanda - CryptoMind AI
const SUPABASE_URL = "https://ukxylcyenryhzvjlzyaz.supabase.co";
const SUPABASE_ANON_KEY = "EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreHlsY3llbnJ5aHp2amx6eWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzEyOTksImV4cCI6MjA5OTIwNzI5OX0.wpU9LQscvrCFqK5vBDrL1nlhZMYer5DA-F6vWyamt6I";

// Função auxiliar que garante pegar o Supabase apenas quando chamado
function obterSupabase() {
    const instanciaGlobal = window.supabase || (typeof supabase !== 'undefined' ? supabase : null);
    if (!instanciaGlobal) {
        throw new Error("A biblioteca Supabase ainda não foi carregada pelo navegador. Aguarde um instante.");
    }
    return instanciaGlobal.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export async function loginUsuario(email, senha) {
    const client = obterSupabase();
    const { data, error } = await client.auth.signInWithPassword({ email, password: senha });
    if (error) throw error;
    return data;
}

export async function cadastrarUsuario(email, senha) {
    const client = obterSupabase();
    const { data, error } = await client.auth.signUp({ email, password: senha });
    if (error) throw error;
    return data;
}

export async function logoutUsuario() {
    const client = obterSupabase();
    const { error } = await client.auth.signOut();
    if (error) throw error;
}

export function observarSessao(callback) {
    // Tenta observar a sessão, se não estiver pronto agora, tenta novamente em 500ms
    try {
        const client = obterSupabase();
        client.auth.onAuthStateChange((event, session) => {
            callback(session);
        });
    } catch (e) {
        setTimeout(() => {
            try {
                const client = obterSupabase();
                client.auth.onAuthStateChange((event, session) => {
                    callback(session);
                });
            } catch (err) {
                console.warn("Aguardando carregamento do Supabase para observar sessão...");
            }
        }, 500);
    }
}
