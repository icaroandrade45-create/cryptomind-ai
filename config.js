const SUPABASE_URL = "https://ukxylcyenryhzvjlzyaz.supabase.co";

const SUPABASE_ANON_KEY = "COLE_A_CHAVE_COMPLETA_AQUI";

window.supabaseCliente = window.supabase.createClient(
  SUPABASE_URL,
    SUPABASE_ANON_KEY
    );