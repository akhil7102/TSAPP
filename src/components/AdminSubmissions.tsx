import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { supabaseClient } from '../lib/supabase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

type Submission = {
  id: string;
  temple_data: any;
  status: 'pending' | 'approved' | 'rejected';
  submitted_by: string | null;
  created_at: string;
};

export function AdminSubmissions() {
  const [subs, setSubs] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [publishedTemples, setPublishedTemples] = useState<any[]>([]);
  const [templesLoading, setTemplesLoading] = useState(false);
  const [templesError, setTemplesError] = useState<string | null>(null);
  const [templeSearch, setTempleSearch] = useState('');
  const [approvedTempleNames, setApprovedTempleNames] = useState<string[]>([]);

  // Notifications state
  const [notifyAudience, setNotifyAudience] = useState<'all' | 'email'>('all');
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifyTitle, setNotifyTitle] = useState('');
  const [notifyBody, setNotifyBody] = useState('');
  const [notifySending, setNotifySending] = useState(false);

  // Local admin constants to establish a Supabase session when needed
  const ADMIN_EMAIL = 'akhilnarra02@gmail.com';
  const ADMIN_PASSWORD = '21325456';
  const LOCAL_ADMIN_FLAG = 'ts-admin';

  // Track session so we know when RLS writes will succeed
  const [authUser, setAuthUser] = useState<any>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!supabaseClient) {
        setError('Backend not configured.');
        return;
      }

      let query = supabaseClient
        .from('temple_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setSubs(data as Submission[]);
    } catch (e: any) {
      setError(e.message || 'Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [filter]);

  const loadTemples = async () => {
    setTemplesLoading(true);
    setTemplesError(null);
    try {
      if (!supabaseClient) {
        setTemplesError('Backend not configured.');
        return;
      }
      const { data, error } = await supabaseClient
        .from('temples')
        .select('id, name, district, state, temple_type, created_at')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setPublishedTemples(data || []);
    } catch (e: any) {
      setTemplesError(e.message || 'Failed to load temples');
    } finally {
      setTemplesLoading(false);
    }
  };

  useEffect(() => {
    loadTemples();
  }, []);

  // Load names of temples that originated from approved user submissions
  useEffect(() => {
    const loadApprovedNames = async () => {
      try {
        if (!supabaseClient) return;
        const { data, error } = await supabaseClient
          .from('temple_submissions')
          .select('temple_data, status')
          .eq('status', 'approved');
        if (error) throw error;
        const names = (data || [])
          .map((r: any) => r?.temple_data?.name?.english)
          .filter((n: any) => typeof n === 'string' && n.trim().length > 0)
          .map((n: string) => n.trim().toLowerCase());
        // de-duplicate
        setApprovedTempleNames(Array.from(new Set(names)));
      } catch (e) {
        // ignore silently
      }
    };
    loadApprovedNames();
  }, []);

  const toTempleRecord = (d: any) => {
    const images: string[] = Array.isArray(d.images) ? d.images : [];
    return {
      name: d.name,
      deity: d.deity,
      description: d.description,
      district: d.district,
      state: d.state,
      temple_type: d.templeType,
      location: d.address ? { address: d.address } : null,
      coordinates: d.location ? { lat: d.location.latitude, lng: d.location.longitude } : null,
      timings: d.timings ? { morning: d.timings.morning, evening: d.timings.evening, pujaTimings: d.timings.pujaTimings || [] } : null,
      is_open: true,
      image_url: images[0] || null,
      images,
      contact_info: d.contact || null,
      features: d.features || [],
      popularity: null,
    };
  };

  const isValidTempleName = (name: string): boolean => {
    const invalidPatterns = [
      /^test$/i,
      /^hello$/i,
      /test.*temple/i,
      /^[a-z]{1,5}$/i, // Very short random strings
      /^[a-z]*\d+[a-z]*$/i, // Contains numbers
      /^[a-z]{2,4}\1+/i, // Repeated patterns like "ksks"
      /^[^a-z\s]/i, // Starts with non-letter
      /^.{1,2}$/i, // Too short (1-2 chars)
    ];

    return !invalidPatterns.some(pattern => pattern.test(name.trim()));
  };

  const approve = async (row: Submission) => {
    setActionMsg('');
    setError(null);
    try {
      if (!supabaseClient) throw new Error('Backend not configured');

      const templeData = row.temple_data || {};
      const templeName = templeData.name?.english?.trim();

      if (!templeName) {
        setError('Temple name is required');
        return;
      }

      // Validate temple name to prevent fake/test submissions
      if (!isValidTempleName(templeName)) {
        setError(`"${templeName}" appears to be a test/fake temple name. Please reject this submission.`);
        return;
      }

      // Check for duplicate temple names before approving
      const { data: existingTemples, error: checkError } = await supabaseClient
        .from('temples')
        .select('name')
        .ilike('name->>english', templeName);

      if (checkError) throw checkError;

      if (existingTemples && existingTemples.length > 0) {
        setError(`Temple "${templeName}" already exists in the database. Please reject this duplicate submission.`);
        return;
      }

      // Additional validation
      if (!templeData.district || !templeData.state) {
        setError('District and State are required for temple approval');
        return;
      }

      const templeRecord = toTempleRecord(templeData);
      const { error: insertErr } = await supabaseClient.from('temples').insert([templeRecord]);
      if (insertErr) throw insertErr;
      const { error: updErr } = await supabaseClient
        .from('temple_submissions')
        .update({ status: 'approved' })
        .eq('id', row.id);
      if (updErr) throw updErr;
      setActionMsg(`Temple "${templeName}" approved and published successfully.`);
      await load();
    } catch (e: any) {
      setError(e.message || 'Approve failed');
    }
  };

  const reject = async (row: Submission) => {
    setActionMsg('');
    try {
      if (!supabaseClient) throw new Error('Backend not configured');
      const { error: updErr } = await supabaseClient
        .from('temple_submissions')
        .update({ status: 'rejected' })
        .eq('id', row.id);
      if (updErr) throw updErr;
      setActionMsg('Submission rejected.');
      await load();
    } catch (e: any) {
      setError(e.message || 'Reject failed');
    }
  };

  const deleteTemple = async (id: string, name?: string) => {
    setActionMsg('');
    setError(null);
    const canDelete = approvedTempleNames.includes((name || '').toLowerCase());
    if (!canDelete) { setError('Only temples uploaded by users (and approved) can be deleted.'); return; }
    if (!confirm(`Delete temple${name ? ` "${name}"` : ''}? This cannot be undone.`)) return;
    try {
      if (!supabaseClient) throw new Error('Backend not configured');
      const { error } = await supabaseClient.from('temples').delete().eq('id', id);
      if (error) throw error;
      setActionMsg('Temple deleted successfully.');
      await loadTemples();
    } catch (e: any) {
      setError(e.message || 'Delete failed');
    }
  };

  const sendNotification = async () => {
    if (!supabaseClient) {
      setError('Backend not configured.');
      return;
    }
    if (!notifyTitle.trim() || !notifyBody.trim()) {
      setError('Please provide title and message.');
      return;
    }
    setError(null);
    setActionMsg('');
    setNotifySending(true);
    try {
      await ensureSession(); // not strictly required for realtime, but ensures consistent identity
      const channelName = notifyAudience === 'all' ? 'notifications' : `user:${notifyEmail.trim().toLowerCase()}`;
      const ch = supabaseClient.channel(channelName, { config: { broadcast: { self: true } } });
      await new Promise<void>((resolve) => {
        ch.on('broadcast', { event: 'ack' }, () => {}).subscribe((status) => {
          if (status === 'SUBSCRIBED') resolve();
        });
      });
      const ok = await ch.send({ type: 'broadcast', event: 'new_message', payload: { title: notifyTitle.trim(), message: notifyBody.trim(), sentAt: new Date().toISOString() } });
      if (!ok) throw new Error('Failed to send notification');
      setActionMsg('Notification sent successfully.');
      setNotifyTitle('');
      setNotifyBody('');
      setNotifyEmail('');
      ch.unsubscribe();
    } catch (e: any) {
      setError(e.message || 'Failed to send notification');
    } finally {
      setNotifySending(false);
    }
  };

  // Upcoming festivals management
  type AdminFestival = { id: string; name: string | { english?: string; telugu?: string }; date: string; description?: string | null; temple_name?: string | { english?: string; telugu?: string } | null; created_at: string };
  const [festivals, setFestivals] = useState<AdminFestival[]>([]);
  const [fvName, setFvName] = useState('');
  const [fvDate, setFvDate] = useState('');
  const [fvDesc, setFvDesc] = useState('');
  const [fvTemple, setFvTemple] = useState('');
  const [fvLoading, setFvLoading] = useState(false);
  const [fvError, setFvError] = useState<string | null>(null);

  const loadFestivals = async () => {
    setFvError(null);
    try {
      if (!supabaseClient) throw new Error('Backend not configured');
      const today = new Date().toISOString().slice(0, 10);
      const { data, error } = await supabaseClient
        .from('festivals')
        .select('id, name, description, date, temple_id, created_at, temples(name)')
        .gte('date', today)
        .order('date', { ascending: true });
      if (error) throw error;
      const rows = (data || []).map((r: any) => ({ id: r.id, name: r.name, description: r.description, date: r.date, created_at: r.created_at, temple_name: r.temples?.name || null })) as AdminFestival[];
      setFestivals(rows);
    } catch (e: any) {
      setFvError(e.message || 'Failed to load festivals');
    }
  };

  useEffect(() => { loadFestivals(); }, []);

  // Track Supabase auth session and ensure one exists when local admin is active
  useEffect(() => {
    if (!supabaseClient) return;
    let mounted = true;
    const sync = async () => {
      const { data } = await supabaseClient.auth.getUser();
      if (mounted) setAuthUser(data.user || null);

      // If admin is locally authenticated but Supabase lacks a session, try to sign in silently
      let localAdmin = false;
      try { localAdmin = localStorage.getItem(LOCAL_ADMIN_FLAG) === '1'; } catch {}
      if (localAdmin && !data.user) {
        try {
          const { data: sig } = await supabaseClient.auth.signInWithPassword({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
          if (mounted && sig?.user) setAuthUser(sig.user);
        } catch {}
      }
    };
    sync();

    const { data: sub } = supabaseClient.auth.onAuthStateChange((_e, session) => {
      if (mounted) setAuthUser(session?.user || null);
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, []);

  const ensureSession = async (): Promise<boolean> => {
    if (!supabaseClient) return false;
    const { data } = await supabaseClient.auth.getSession();
    if (data.session) return true;
    let localAdmin = false;
    try { localAdmin = localStorage.getItem(LOCAL_ADMIN_FLAG) === '1'; } catch {}
    if (!localAdmin) return false;
    try {
      const { data: sig } = await supabaseClient.auth.signInWithPassword({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
      setAuthUser(sig?.user || null);
      return !!sig?.user;
    } catch {
      return false;
    }
  };

  const addFestival = async () => {
    if (!fvName.trim() || !fvDate) { setFvError('Please provide name and date'); return; }
    setFvLoading(true); setFvError(null);
    try {
      if (!supabaseClient) throw new Error('Backend not configured');
      const ok = await ensureSession();
      if (!ok) throw new Error('Database requires sign-in. Please add admin user in Supabase Auth or enable insert policy.');

      // Resolve optional temple_id from entered temple name (match by English name)
      let temple_id: string | null = null;
      const q = fvTemple.trim();
      if (q) {
        const { data: templeMatch, error: tErr } = await supabaseClient
          .from('temples')
          .select('id, name')
          .ilike('name->>english', q)
          .limit(1)
          .maybeSingle();
        if (tErr) throw tErr;
        temple_id = templeMatch?.id || null;
      }

      const { error } = await supabaseClient
        .from('upcoming_festivals')
        .insert([{ name: fvName.trim(), description: fvDesc || null, date: fvDate, temple_name: fvTemple || null }]);
      if (error) throw error;

      setFvName(''); setFvDate(''); setFvDesc(''); setFvTemple('');
      await loadFestivals();
      setActionMsg('Festival added');
    } catch (e: any) {
      const msg = (e?.message || '').toLowerCase();
      if (msg.includes('row-level security')) {
        setFvError('RLS denied insert. Sign in with Supabase (Auth) or update RLS policy to allow admin inserts.');
      } else {
        setFvError(e.message || 'Failed to add festival');
      }
    } finally { setFvLoading(false); }
  };

  const deleteFestival = async (id: string) => {
    if (!confirm('Delete this festival?')) return;
    try {
      if (!supabaseClient) throw new Error('Backend not configured');
      const { error } = await supabaseClient.from('upcoming_festivals').delete().eq('id', id);
      if (error) throw error;
      await loadFestivals();
    } catch (e: any) { setFvError(e.message || 'Failed to delete'); }
  };

  const filteredTemples = publishedTemples.filter((t) => {
    const nameEn = t?.name?.english?.toLowerCase?.() || '';
    const q = templeSearch.toLowerCase();
    return !q || nameEn.includes(q);
  });

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Admin • Temple Submissions</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={load}>Refresh</Button>
          <Button variant="destructive" size="sm" onClick={async () => { if (!supabaseClient) return; await supabaseClient.auth.signOut(); window.location.reload(); }}>Sign out</Button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {status} {status !== 'all' && `(${subs.filter(s => s.status === status).length})`}
          </Button>
        ))}
      </div>
      {actionMsg && (
        <Alert className="bg-green-50 border-green-200 text-green-800"><AlertDescription>{actionMsg}</AlertDescription></Alert>
      )}
      {error && (
        <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>
      )}
      {loading ? (
        <div className="text-sm text-muted-foreground">Loading...</div>
      ) : subs.length === 0 ? (
        <div className="text-sm text-muted-foreground">No pending submissions.</div>
      ) : (
        <div className="space-y-3">
          {subs.map((s) => {
            const templeName = s.temple_data?.name?.english || 'Untitled Temple';
            const isValidName = isValidTempleName(templeName);
            const isPending = s.status === 'pending';

            return (
              <Card key={s.id} className="bg-card/80 backdrop-blur border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-base ${!isValidName ? 'text-red-600' : ''}`}>
                      {templeName}
                      {!isValidName && <span className="text-xs text-red-500 ml-2">(⚠️ Suspicious name)</span>}
                    </CardTitle>
                    <Badge
                      variant={s.status === 'approved' ? 'default' : s.status === 'rejected' ? 'destructive' : 'secondary'}
                    >
                      {s.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Submitted: {new Date(s.created_at).toLocaleString()}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <div>District: {s.temple_data?.district || 'Not specified'}</div>
                    <div>State: {s.temple_data?.state || 'Not specified'}</div>
                    <div>Deity: {s.temple_data?.deity?.english || 'Not specified'}</div>
                    <div>Type: {s.temple_data?.templeType || 'Not specified'}</div>
                  </div>

                  {!isValidName && (
                    <div className="bg-red-50 border border-red-200 p-2 rounded text-xs text-red-700">
                      ⚠️ This submission appears to have a test/fake temple name and should likely be rejected.
                    </div>
                  )}

                  <Separator className="my-2" />

                  {isPending && (
                    <div className="flex gap-2">
                      <Button
                        className="gradient-primary text-white"
                        size="sm"
                        onClick={() => approve(s)}
                        disabled={!isValidName}
                      >
                        Approve & Publish
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => reject(s)}>
                        Reject
                      </Button>
                    </div>
                  )}

                  {!isPending && (
                    <div className="text-xs text-muted-foreground">
                      Status: {s.status.charAt(0).toUpperCase() + s.status.slice(1)} on {new Date(s.created_at).toLocaleDateString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Separator className="my-4" />

      {/* Notifications */}
      <Card className="bg-card/80 backdrop-blur border-primary/20">
        <CardHeader>
          <CardTitle className="text-base">Send Notification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Audience</Label>
              <Select value={notifyAudience} onValueChange={(v: 'all' | 'email') => setNotifyAudience(v)}>
                <SelectTrigger className="border-primary/30">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All users</SelectItem>
                  <SelectItem value="email">Specific user (email)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {notifyAudience === 'email' && (
              <div className="space-y-2">
                <Label>User Email</Label>
                <Input value={notifyEmail} onChange={(e) => setNotifyEmail(e.target.value)} placeholder="user@example.com" className="border-primary/30" />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={notifyTitle} onChange={(e) => setNotifyTitle(e.target.value)} placeholder="Update title" className="border-primary/30" />
          </div>
          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea value={notifyBody} onChange={(e) => setNotifyBody(e.target.value)} rows={3} placeholder="Type your message" className="border-primary/30" />
          </div>
          <div className="flex justify-end">
            <Button onClick={sendNotification} disabled={notifySending} className="gradient-primary text-white">
              {notifySending ? 'Sending...' : 'Send'}
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            Broadcast uses Supabase Realtime channels. Users receive messages live if the app is open. For per-user messages, the app listens on channel user:email.
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Festivals */}
      <Card className="bg-card/80 backdrop-blur border-primary/20">
        <CardHeader>
          <CardTitle className="text-base">Upcoming Festivals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {fvError && (<Alert variant="destructive"><AlertDescription>{fvError}</AlertDescription></Alert>)}
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Festival Name</Label>
              <Input value={fvName} onChange={(e) => setFvName(e.target.value)} placeholder="e.g., Maha Shivaratri" className="border-primary/30" />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" value={fvDate} onChange={(e) => setFvDate(e.target.value)} className="border-primary/30" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Description (optional)</Label>
              <Textarea value={fvDesc} onChange={(e) => setFvDesc(e.target.value)} rows={2} placeholder="Short description" className="border-primary/30" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Temple Name (optional)</Label>
              <Input value={fvTemple} onChange={(e) => setFvTemple(e.target.value)} placeholder="e.g., Kashi Vishwanath" className="border-primary/30" />
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <Button onClick={addFestival} disabled={fvLoading} className="gradient-primary text-white">{fvLoading ? 'Saving...' : 'Add Festival'}</Button>
            <Button variant="destructive" onClick={async () => { if (!supabaseClient) return; if (!confirm('Clear all upcoming festivals?')) return; const today = new Date().toISOString().slice(0,10); const { error } = await supabaseClient.from('upcoming_festivals').delete().gte('date', today); if (error) { setFvError(error.message); } else { await loadFestivals(); setActionMsg('Upcoming festivals cleared'); } }}>Clear Upcoming</Button>
          </div>
          <Separator />
          {festivals.length === 0 ? (
            <div className="text-sm text-muted-foreground">No upcoming festivals added.</div>
          ) : (
            <Table className="border rounded">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Temple</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {festivals.map((f) => {
                  const nameText = typeof f.name === 'string' ? f.name : (f.name?.english || f.name?.telugu || '');
                  const templeNameText = typeof f.temple_name === 'string' ? f.temple_name : (f.temple_name?.english || f.temple_name?.telugu || '');
                  return (
                    <TableRow key={f.id}>
                      <TableCell className="font-medium">{nameText}</TableCell>
                      <TableCell>{new Date(f.date).toLocaleDateString()}</TableCell>
                      <TableCell>{templeNameText || '-'}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="destructive" size="sm" onClick={() => deleteFestival(f.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Published Temples</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Search by name"
            value={templeSearch}
            onChange={(e) => setTempleSearch(e.target.value)}
            className="w-56 border-primary/30"
          />
          <Button variant="outline" size="sm" onClick={loadTemples}>Refresh</Button>
        </div>
      </div>
      {templesError && (
        <Alert variant="destructive" className="mt-2"><AlertDescription>{templesError}</AlertDescription></Alert>
      )}
      {templesLoading ? (
        <div className="text-sm text-muted-foreground">Loading...</div>
      ) : filteredTemples.length === 0 ? (
        <div className="text-sm text-muted-foreground">No temples found.</div>
      ) : (
        <div className="space-y-3 mt-2">
          {filteredTemples.map((t: any) => {
            const nameEn = t?.name?.english || '';
            const canDelete = approvedTempleNames.includes(nameEn.toLowerCase());
            return (
              <Card key={t.id} className="bg-card/80 backdrop-blur border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {nameEn || 'Untitled'}
                    </CardTitle>
                    <Badge variant="secondary">{t.temple_type || 'Temple'}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t.district || 'Unknown'}, {t.state || ''}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 items-center">
                    {canDelete ? (
                      <Button variant="destructive" size="sm" onClick={() => deleteTemple(t.id, nameEn)}>
                        Delete (user approved)
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">Protected temple</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

    </div>
  );
}
