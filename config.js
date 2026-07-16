// Configuração do Supabase
const SUPABASE_URL = "https://ukxylcyenryhzvjlzyaz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhYmdjOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Coloca aquieyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreHlsY3llbnJ5aHp2amx6eWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzEyOTksImV4cCI6MjA5OTIwNzI5OX0.wpU9LQscvrCFqK5vBDrL1nlhZMYer5DA-F6vWyamt6I a tua chave real completa

// Esta linha garante a criação de uma variável global direta chamada 'supabase'
var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
