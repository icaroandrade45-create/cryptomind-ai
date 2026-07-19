import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { SUPABASE_URL, SUPABASE_KEY } from './config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function fazerLogin(email, senha) {
    const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
                    password: senha,
                        });
                            
                                if (error) throw error;
                                    return data;
                                    }
                                    