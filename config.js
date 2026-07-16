// Configuração do Supabase v2
const SUPABASE_URL = "https://ukxylcyenryhzvjlzyaz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhYmdjOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Mantém a tua chave real completa aqui

// Criamos o cliente e guardamos diretamente no objeto global 'window'
window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
