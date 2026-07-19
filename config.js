// CryptoMind AI - Configuração Centralizada do Supabase
// config.js
export const SUPABASE_URL = 'https://xrtbtflftnjzzwfozjiy.supabase.co/rest/v1/';
export const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhydGJ0ZmxmdG5qenp3Zm96aml5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4NDczMTgsImV4cCI6MjA5OTQyMzMxOH0.YX3Ghb1HyOciVat-dUmh0FxmgpJFrp17Mo_RhuJ5hzQ';

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
