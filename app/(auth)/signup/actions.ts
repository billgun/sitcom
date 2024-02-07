'use server';

import { createClient } from '@/lib/supabase/actions';
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function signUp(credentials: SignUpWithPasswordCredentials) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.signUp(credentials);
  return { data, error };
}
