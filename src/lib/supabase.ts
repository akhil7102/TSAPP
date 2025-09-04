import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let _supabase: SupabaseClient | null = null;

function getProjectRef(url?: string) {
  if (!url) return null;
  try {
    const u = new URL(url);
    const sub = u.hostname.split('.')[0];
    return sub || null;
  } catch {
    return null;
  }
}

export const AUTH_STORAGE_KEY = `templesanathan-auth-${getProjectRef(supabaseUrl) ?? 'default'}`;

if (supabaseUrl && supabaseKey) {
  // Safe fetch wrapper to avoid unhandled errors from instrumented fetch (e.g., analytics) and offline states
  const safeFetch: typeof fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    try {
      if (typeof navigator !== 'undefined' && navigator && 'onLine' in navigator && !navigator.onLine) {
        return new Response(JSON.stringify({ error: 'offline' }), { status: 503, headers: { 'content-type': 'application/json' } });
      }
      const realFetch = (typeof window !== 'undefined' && window.fetch ? window.fetch : fetch).bind(window ?? globalThis);
      const controller = new AbortController();
      const timeoutMs = 15000;
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      const signal = init?.signal ?? controller.signal;
      try {
        const res = await realFetch(input as any, { ...init, signal });
        clearTimeout(timer);
        return res;
      } catch (_err) {
        clearTimeout(timer);
        return new Response(JSON.stringify({ error: 'network_failed' }), { status: 503, headers: { 'content-type': 'application/json' } });
      }
    } catch {
      return new Response(JSON.stringify({ error: 'unexpected_fetch_error' }), { status: 503, headers: { 'content-type': 'application/json' } });
    }
  };

  _supabase = createClient(supabaseUrl, supabaseKey, {
    global: { fetch: safeFetch },
    auth: {
      storageKey: AUTH_STORAGE_KEY,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });

  // Clean up corrupted or partial auth storage (missing refresh token, invalid JSON)
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        const rt = parsed?.currentSession?.refresh_token || parsed?.refresh_token;
        if (!rt || typeof rt !== 'string') {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  } catch {}

  // Ensure we clear all auth storage if Supabase signs us out for any reason
  _supabase.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_OUT') {
      try { clearAuthStorage(); } catch {}
    }
  });

  // Proactively resolve the "Invalid Refresh Token" state by clearing storage and signing out
  (async () => {
    try {
      const { error } = await _supabase!.auth.getSession();
      if (error && /Invalid Refresh Token|Refresh Token Not Found|invalid_grant/i.test(String(error.message))) {
        try { clearAuthStorage(); } catch {}
        try { await _supabase!.auth.signOut(); } catch {}
      }
    } catch {}
  })();
} else {
  console.warn(
    'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.'
  );
}

export const supabaseClient = _supabase;

export function clearAuthStorage() {
  try {
    // Remove our custom storage and any supabase default keys
    Object.keys(localStorage).forEach((k) => {
      if (k === AUTH_STORAGE_KEY || k.startsWith('sb-')) localStorage.removeItem(k);
    });
  } catch {}
}

export type User = {
  id: string;
  email: string;
  created_at: string;
};

export type DbResult<T> = { data: T | null; error: Error | null };

function notConfiguredError() {
  return new Error(
    'Backend not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY and reload.'
  );
}

export async function signUp(email: string, password: string) {
  if (!supabaseClient) {
    return { data: null, error: notConfiguredError() } as const;
  }
  const redirectTo = (import.meta.env.VITE_EMAIL_REDIRECT_URL as string) || window.location.origin;
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: redirectTo }
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  if (!supabaseClient) {
    return { data: null, error: notConfiguredError() } as const;
  }
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  if (!supabaseClient) {
    return { error: notConfiguredError() } as const;
  }
  const { error } = await supabaseClient.auth.signOut();
  clearAuthStorage();
  return { error };
}

export async function getCurrentUser() {
  if (!supabaseClient) return null;
  if (typeof navigator !== 'undefined' && !navigator.onLine) return null;
  try {
    const { data, error } = await supabaseClient.auth.getUser();
    if (error) return null;
    return data.user ?? null;
  } catch {
    return null;
  }
}

export async function submitTempleSubmission(templeData: any) {
  if (!supabaseClient) {
    return { data: null, error: notConfiguredError() } as const;
  }
  const { data: userRes } = await supabaseClient.auth.getUser();
  const submitted_by = userRes.user?.id || null;
  if (!submitted_by) {
    return { data: null, error: new Error('Please sign in to submit a temple.') } as const;
  }
  const { data, error } = await supabaseClient
    .from('temple_submissions')
    .insert([{ temple_data: templeData, status: 'pending', submitted_by }])
    .select()
    .single();
  return { data, error };
}

// Profiles
export type Profile = {
  id?: string;
  user_id: string;
  username: string;
  display_name: string;
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
};

export async function getProfile(userId: string): Promise<DbResult<Profile>> {
  if (!supabaseClient) return { data: null, error: notConfiguredError() };
  const { data, error } = await supabaseClient
    .from('profiles')
    .select('user_id, username, display_name, avatar_url')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) return { data: null, error };
  return { data: (data as any) || null, error: null };
}

export async function isUsernameAvailable(username: string): Promise<boolean> {
  if (!supabaseClient) return false;
  const { data, error } = await supabaseClient.from('profiles').select('username').eq('username', username).limit(1);
  if (error) return false;
  return (data || []).length === 0;
}

export async function ensureProfile(userId: string, email?: string | null, desired?: { username?: string; display_name?: string }): Promise<DbResult<Profile>> {
  if (!supabaseClient) return { data: null, error: notConfiguredError() };
  // Try to get existing
  const existing = await getProfile(userId);
  if (existing.data) return existing;

  // Build defaults
  const baseName = (desired?.username || (email ? String(email).split('@')[0] : 'user')).replace(/[^a-z0-9_]/gi, '').toLowerCase() || `user${String(Date.now()).slice(-6)}`;
  let candidate = baseName;
  try {
    const available = await isUsernameAvailable(candidate);
    if (!available) candidate = `${baseName}${Math.floor(Math.random() * 10000)}`;
  } catch {}
  const display = desired?.display_name || (email ? String(email).split('@')[0] : candidate);
  const { data, error } = await supabaseClient
    .from('profiles')
    .insert([{ user_id: userId, username: candidate, display_name: display }])
    .select('user_id, username, display_name, avatar_url')
    .single();
  if (error) return { data: null, error };
  return { data: data as any, error: null };
}

export async function updateProfile(userId: string, patch: Partial<Pick<Profile, 'username' | 'display_name' | 'avatar_url'>>): Promise<DbResult<Profile>> {
  if (!supabaseClient) return { data: null, error: notConfiguredError() };
  const { data, error } = await supabaseClient
    .from('profiles')
    .upsert({ user_id: userId, ...patch }, { onConflict: 'user_id' })
    .select('user_id, username, display_name, avatar_url')
    .single();
  if (error) return { data: null, error };
  return { data: data as any, error: null };
}

export async function uploadAvatar(userId: string, file: File): Promise<DbResult<string>> {
  if (!supabaseClient) return { data: null, error: notConfiguredError() };
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${userId}/${Date.now()}.${ext}`;
  const { error: upErr } = await supabaseClient.storage.from('avatars').upload(path, file, { upsert: true, cacheControl: '3600' });
  if (upErr) return { data: null, error: upErr as any };
  let publicUrl: string | null = null;
  try {
    const { data } = supabaseClient.storage.from('avatars').getPublicUrl(path);
    publicUrl = data.publicUrl;
  } catch {}
  if (!publicUrl) {
    const { data: signed, error: sErr } = await supabaseClient.storage.from('avatars').createSignedUrl(path, 60 * 60 * 24 * 365);
    if (sErr) return { data: null, error: sErr as any };
    publicUrl = signed?.signedUrl || null;
  }
  return { data: publicUrl!, error: null };
}

export async function updatePassword(newPassword: string) {
  if (!supabaseClient) return { data: null, error: notConfiguredError() } as const;
  const { data, error } = await supabaseClient.auth.updateUser({ password: newPassword });
  return { data, error } as const;
}
