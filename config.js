// Configuração de Inicialização do Supabase v2
const SUPABASE_URL = "https://ukxylcyenryhzvjlzyaz.supabase.co";
// Substitua pela sua chave pública REAL (anon key) se for diferente desta:
const SUPABASE_ANON_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreHlsY3llbnJ5aHp2amx6eWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzEyOTksImV4cCI6MjA5OTIwNzI5OX0.wpU9LQscvrCFqK5vBDrL1nlhZMYer5DA-F6vWyamt6I"; 

// Inicializa o cliente do Supabase e o expõe globalmente como 'supabase'
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
