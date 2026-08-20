import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if credentials exist and create client
export const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your-supabase-project-url'
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
