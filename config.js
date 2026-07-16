// Configuração do Supabase v2 com verificação de segurança
const SUPABASE_URL = "https://ukxylcyenryhzvjlzyaz.supabase.co";
const SUPABASE_ANON_KEY = "SUA_ANON_KEY_AQUI"; // coloque aqui a sua anon key real

let supabase;

if (window.supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    console.error("Erro: A biblioteca do Supabase não foi carregada a tempo.");
}
