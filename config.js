// Carrega dinamicamente a biblioteca do Supabase caso ela não esteja no HTML
if (!window.supabase) {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    script.async = false;
    document.head.appendChild(script);
}

// Configuração do Supabase
const SUPABASE_URL = "https://ukxylcyernyhzkwhgqkd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreHlsY3llcm55aHprd2hncWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5NjU0NDIsImV4cCI6MjAzMTU0MTQ0Mn0.e30DMZmzEyOTksImV4cCI6WJA5OTIwNzI1OX0.wpU9LqscvrCFqk5vDDrLnlhZWYer5DA-F6vwyamt6I";

// Aguarda a biblioteca carregar para inicializar o cliente global
const initSupabase = () => {
    if (window.supabase && !window.supabaseCliente) {
        const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        window.supabase = client;
        window.supabaseClient = client;
        window.supabaseCliente = client;
    }
};

// Executa imediatamente ou assim que o script carregar
if (window.supabase) {
    initSupabase();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initSupabase, 500);
    });
}
