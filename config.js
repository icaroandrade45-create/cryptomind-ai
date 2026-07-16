const SUPABASE_URL =" https://ukxylcyenryhzvjlzyaz.supabase.co/rest/v1/";
const SUPABASE_KEY =" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreHlsY3llbnJ5aHp2amx6eWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzEyOTksImV4cCI6MjA5OTIwNzI5OX0.wpU9LQscvrCFqK5vBDrL1nlhZMYer5DA-F6vWyamt6I";

// Inicializa o cliente do Supabase globalmente se a biblioteca estiver carregada
let supabase = null;
if (typeof supabase !== 'undefined' && window.supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
} else {
    console.warn("A biblioteca do Supabase ainda não foi carregada no HTML.");
}
