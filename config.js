// CryptoMind AI - Configuração Centralizada do Supabase
const SUPABASE_URL = "https://ukxylcyenryhzvjlzyaz.supabase.co";
const SUPABASE_ANON_KEY = "EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreHlsY3llbnJ5aHp2amx6eWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzEyOTksImV4cCI6MjA5OTIwNzI5OX0.wpU9LQscvrCFqK5vBDrL1nlhZMYer5DA-F6vWyamt6I";

let supabaseInstance = null;

export function getSupabase() {
    if (supabaseInstance) return supabaseInstance;

    const globalSupabase = window.supabase || (typeof supabase !== 'undefined' ? supabase : null);
    
    if (!globalSupabase) {
        throw new Error("A biblioteca Supabase não foi encontrada no escopo global. Verifique a CDN no HTML.");
    }

    supabaseInstance = globalSupabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return supabaseInstance;
}
