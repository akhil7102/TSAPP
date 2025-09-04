import React, { useEffect, useState } from 'react';
import { AdminSubmissions } from './AdminSubmissions';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { supabaseClient } from '../lib/supabase';

const ADMIN_EMAIL = 'akhilnarra02@gmail.com';
const ADMIN_PASSWORD = '21325456';
const LOCAL_ADMIN_FLAG = 'ts-admin';

export function AdminPage({ language }: { language: 'english' | 'telugu' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // If a local admin flag exists (from Auth or local sign-in), allow admin without backend
    try {
      if (localStorage.getItem(LOCAL_ADMIN_FLAG) === '1') {
        setUserEmail(ADMIN_EMAIL);
      }
    } catch {}

    if (supabaseClient) {
      // Initial user fetch
      supabaseClient.auth.getUser().then(({ data }) => {
        if (!isMounted) return;
        setUserEmail(data.user?.email || null);
      });

      // Keep in sync with auth state changes
      const { data: sub } = supabaseClient.auth.onAuthStateChange((_event, session) => {
        if (!isMounted) return;
        setUserEmail(session?.user?.email || null);
      });

      return () => {
        isMounted = false;
        sub.subscription.unsubscribe();
      };
    }

    return () => { isMounted = false; };
  }, []);

  const isAdmin = (e?: string | null) => {
    const viaEmail = (e || userEmail)?.toLowerCase() === ADMIN_EMAIL;
    let viaLocal = false;
    try { viaLocal = localStorage.getItem(LOCAL_ADMIN_FLAG) === '1'; } catch {}
    return viaEmail || viaLocal;
  };

  // Ensure Supabase session exists when using local admin access, so RLS-protected actions work
  useEffect(() => {
    const ensureBackendAuth = async () => {
      if (!supabaseClient) return;
      let localAdmin = false;
      try { localAdmin = localStorage.getItem(LOCAL_ADMIN_FLAG) === '1'; } catch {}
      if (!localAdmin) return;
      const { data } = await supabaseClient.auth.getSession();
      if (!data.session) {
        try {
          await supabaseClient.auth.signInWithPassword({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
        } catch {}
      }
    };
    ensureBackendAuth();
  }, []);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Allow direct admin login without backend when exact credentials match
      if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        try { localStorage.setItem(LOCAL_ADMIN_FLAG, '1'); } catch {}
        setUserEmail(ADMIN_EMAIL);
        return;
      }

      if (!supabaseClient) throw new Error('Backend not configured');
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const signedInEmail = (data.user?.email || '').toLowerCase();
      if (signedInEmail !== ADMIN_EMAIL) {
        await supabaseClient.auth.signOut();
        setUserEmail(null);
        throw new Error('Only the admin account can access this page');
      }

      setUserEmail(data.user?.email || null);
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  if (isAdmin()) {
    return <AdminSubmissions />;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <Card className="bg-card/80 backdrop-blur border-primary/20">
        <CardContent className="space-y-4 p-4">
          <h1 className="text-lg font-semibold">Admin Login</h1>
          <p className="text-sm text-muted-foreground">Sign in with the admin account to review submissions.</p>
          {error && (
            <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>
          )}
          <form onSubmit={signIn} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={ADMIN_EMAIL} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
            </div>
            <Button type="submit" className="w-full gradient-primary text-white" disabled={loading}>
              {loading ? '...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
