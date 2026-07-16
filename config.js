// Configuração do Supabase v2
const SUPABASE_URL = "https://ukxylcyenryhzvjlzyaz.supabase.co";
const SUPABASE_ANON_KEY "=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreHlsY3llbnJ5aHp2amx6eWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzEyOTksImV4cCI6MjA5OTIwNzI5OX0.wpU9LQscvrCFqK5vBDrL1nlhZMYer5DA-F6vWyamt6I "; // Coloca aqui a tua chave real do Supabase sem aspas duplicadas

// Inicializa o cliente na variável global window.supabase
if (window.supabase && typeof window.supabase.createClient === 'function') {
    window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } else {
        console.error("Erro: A biblioteca do Supabase não foi carregada no window.");
        }