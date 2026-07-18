// ============================================
// CryptoMind AI - Configuração Central
// ============================================

// 🔑 SUPABASE (Autenticação e Banco de Dados)
// ATENÇÃO: Está escrito SUPABASE (com P, não com B)
const SUPABASE_URL = "https://ukxylcyenryhzvjlzyaz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreHlsY3llbnJ5aHp2amx6eWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzEyOTksImV4cCI6MjA5OTIwNzI5OX0.wpU9LQscvrCFqK5vBDrL1nlhZMYer5DA-F6vWyamt6I";

// 🤖 APIs de IA (armazenadas em variáveis de ambiente por segurança)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

// 📦 Exportar configurações
export default {
  SUPABASE_URL,
    SUPABASE_ANON_KEY,
      OPENAI_API_KEY,
        GEMINI_API_KEY
        };