// Configuração do Supabase
const SUPABASE_URL = "https://ukxylcyernyhzkwhgqkd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreHlsY3llcm55aHprd2hncWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5NjU0NDIsImV4cCI6MjAzMTU0MTQ0Mn0.e30DMZmzEyOTksImV4cCI6WJA5OTIwNzI1OX0.wpU9LqscvrCFqk5vDDrLnlhZWYer5DA-F6vwyamt6I";

const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Garante escopo global estável
window.supabase = client;
window.supabaseClient = client;
window.supabaseCliente = client;
