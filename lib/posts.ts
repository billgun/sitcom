'use server';

import { createClient } from '@/lib/supabase/server';

export async function getUserPosts() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
}
