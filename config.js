// CryptoMind AI
// config.js - Conexão oficial Supabase

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

export const SUPABASE_URL = 
'https://ukxylcyenryhzvjlzyaz.supabase.co';

export const SUPABASE_KEY = 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhydGJ0ZmxmdG5qenp3Zm96aml5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4NDczMTgsImV4cCI6MjA5OTQyMzMxOH0.YX3Ghb1HyOciVat-dUmh0FxmgpJFrp17Mo_RhuJ5hzQ';

export const supabase = createClient(
    SUPABASE_URL,
        SUPABASE_KEY,
            {
                    auth: {
                                persistSession: true,
                                            autoRefreshToken: true,
                                                        detectSessionInUrl: true
                                                                }
                                                                    }
                                                                    );