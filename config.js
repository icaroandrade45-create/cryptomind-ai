// Configuração do Supabase v2
const SUPABASE_URL = "https://ukxylcyenryhzvjlzyaz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhYmdjOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreHlsY3llbnJ5aHp2amx6eWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5MDU2OTIsImV4cCI6MjAzMTQ4MTY5Mn0.88V_W6RkHl9Lz7f0HlS3Z8S87pL-8vR6S7_76_y-9sE"; // Certifica-te de que esta é a tua chave completa real!

// Inicializa o cliente na variável global direta que o app.js procura
var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
