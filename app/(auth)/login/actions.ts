'use server';

import { createClient } from '@/lib/supabase/actions';
import { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function signIn(credentials: SignInWithPasswordCredentials) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  return { error };
}
