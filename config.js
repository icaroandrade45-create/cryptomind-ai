console.log("Iniciando config.js...");
const SUPABASE_URL = "https://ukxylcyenryhzvjlzyaz.supabase.co";
const SUPABASE_ANON_KEY = "EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreHlsY3llbnJ5aHp2amx6eWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzEyOTksImV4cCI6MjA5OTIwNzI5OX0.wpU9LQscvrCFqK5vBDrL1nlhZMYer5DA-F6vWyamt6I";

// Verifica se o Supabase (da CDN) carregou
if (typeof supabase === 'undefined') {
    console.error("ERRO: A biblioteca Supabase não carregou!");
} else {
    window.supabaseCliente = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase configurado com sucesso no window.supabaseCliente");
}
