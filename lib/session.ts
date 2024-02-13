'use server';

import { createClient } from '@/lib/supabase/actions';
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function getCurrentUser() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
}
