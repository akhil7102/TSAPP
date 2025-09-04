import { supabaseClient } from './supabase';

export type AppUpdate = {
  id: string;
  version: string;
  title: string;
  description: string;
  mandatory: boolean;
  update_url?: string | null;
  created_at: string;
};

export function compareVersions(a: string, b: string): number {
  // Returns 1 if a>b, -1 if a<b, 0 if equal (semantic-like compare)
  const aParts = a.split(/\.|-/).map((p) => parseInt(p.replace(/[^0-9]/g, ''), 10) || 0);
  const bParts = b.split(/\.|-/).map((p) => parseInt(p.replace(/[^0-9]/g, ''), 10) || 0);
  const len = Math.max(aParts.length, bParts.length);
  for (let i = 0; i < len; i++) {
    const av = aParts[i] ?? 0;
    const bv = bParts[i] ?? 0;
    if (av > bv) return 1;
    if (av < bv) return -1;
  }
  return 0;
}

export async function getLatestAppUpdate(): Promise<{ data: AppUpdate | null; error: Error | null }>{
  if (!supabaseClient) return { data: null, error: new Error('Supabase not configured') };
  const { data, error } = await supabaseClient
    .from('app_updates')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) return { data: null, error };
  return { data: data as AppUpdate | null, error: null };
}
