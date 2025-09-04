import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { supabaseClient } from '../lib/supabase';
import { MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface ChatProps {
  language: 'english' | 'telugu';
  user: any;
  isOffline: boolean;
  onKeyboardOpenChange?: (open: boolean) => void;
}

type ChatMessage = { id: string; uid?: string | null; user: string; text: string; ts: number; status?: 'sending' | 'sent' | 'failed'; edited?: boolean };

type TypingEntry = { name: string; until: number };

export function Chat({ language, user, isOffline, onKeyboardOpenChange }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [barBottom, setBarBottom] = useState<number>(64);
  const [persistenceIssue, setPersistenceIssue] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const [typing, setTyping] = useState<TypingEntry[]>([]);
  const typingChannelRef = useRef<any>(null);

  const t = useMemo(() => ({
    english: {
      title: 'Devotion Chat',
      placeholder: 'Share your devotion...',
      send: 'Send',
      offline: 'You are offline. Messages won\'t send.',
      notConfigured: 'Supabase is not configured.',
      historyWarn: 'Live chat is running without history. Connect database to persist.'
    },
    telugu: {
      title: 'భక్తి చాట్',
      placeholder: 'మీ భక్తిని ���ంచుకోండి...',
      send: 'పంపండి',
      offline: 'మీరు ఆఫ్‌లైన్‌లో ఉన్నారు. సందేశాలు పంపబడవు.',
      notConfigured: 'సుపాబేస్ కాన్ఫిగర్ చేయబడలేదు.',
      historyWarn: 'చాట్ చరిత్ర సేవ్ కావడం లేదు. డేటాబేస్ కనెక్ట్ చేయండి.'
    }
  } as const)[language], [language]);

  const displayName = useMemo(() => {
    const email = user?.email as string | undefined;
    if (email) return email.split('@')[0];
    return 'Guest';
  }, [user?.email]);

  // Load last messages from DB and subscribe to realtime INSERTs
  useEffect(() => {
    if (!supabaseClient) return;

    const loadHistory = async () => {
      try {
        const { data, error } = await supabaseClient
          .from('chat_messages')
          .select('id, uid, username, text, ts')
          .order('ts', { ascending: true })
          .limit(200);
        if (error) throw error;
        const mapped = (data || []).map((r: any) => ({ id: r.id, uid: r.uid ?? null, user: r.username, text: r.text, ts: Number(r.ts), status: 'sent' })) as ChatMessage[];
        setMessages(mapped);
        setPersistenceIssue(null);
      } catch (e: any) {
        setPersistenceIssue('no_table');
      }
    };

    loadHistory();

    const ch = supabaseClient
      .channel('devotion_chat_db')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload: any) => {
        const r = payload?.new;
        if (!r) return;
        const m: ChatMessage = { id: r.id, uid: r.uid ?? null, user: r.username, text: r.text, ts: Number(r.ts), status: 'sent' };
        setMessages((prev) => {
          const i = prev.findIndex(x => x.id === m.id);
          if (i >= 0) {
            const copy = [...prev];
            copy[i] = { ...copy[i], ...m, status: 'sent' };
            return copy.slice(-200);
          }
          return [...prev, m].slice(-200);
        });
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'chat_messages' }, (payload: any) => {
        const r = payload?.new;
        if (!r) return;
        setMessages(prev => prev.map(x => x.id === r.id ? { ...x, text: r.text, ts: Number(r.ts), status: 'sent', edited: true } : x));
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'chat_messages' }, (payload: any) => {
        const r = payload?.old;
        if (!r) return;
        setMessages(prev => prev.filter(x => x.id !== r.id));
      })
      .subscribe();

    return () => { ch.unsubscribe(); };
  }, []);

  // Fallback live broadcast so users can still see messages if DB is unavailable
  useEffect(() => {
    if (!supabaseClient) return;
    const bcast = supabaseClient.channel('devotion_chat');
    bcast.on('broadcast', { event: 'message' }, (payload: any) => {
      const p = payload?.payload || payload;
      const m: ChatMessage = { id: p.id, uid: p.uid ?? null, user: p.user, text: p.text, ts: Number(p.ts), status: 'sent' };
      setMessages((prev) => (prev.some(x => x.id === m.id) ? prev.map(x => x.id === m.id ? { ...x, status: 'sent' } : x) : [...prev, m]).slice(-200));
    })
    .on('broadcast', { event: 'typing' }, (payload: any) => {
      const p = payload?.payload || payload; // { name }
      const name = String(p?.name || 'User');
      const until = Date.now() + 2500;
      setTyping(prev => {
        const others = prev.filter(t => t.name !== name);
        return [...others, { name, until }];
      });
    })
    .subscribe();

    const ticker = setInterval(() => {
      setTyping(prev => prev.filter(t => t.until > Date.now()));
    }, 1000);

    return () => { bcast.unsubscribe(); clearInterval(ticker); };
  }, []);

  useEffect(() => {
    const vv = (window as any).visualViewport as VisualViewport | undefined;
    const NAV_H = 64;
    function handler() {
      if (!vv) { setBarBottom(NAV_H); onKeyboardOpenChange?.(false); return; }
      const delta = Math.max(0, window.innerHeight - vv.height);
      setBarBottom(NAV_H + delta);
      onKeyboardOpenChange?.(delta > 0);
    }
    handler();
    if (vv) {
      vv.addEventListener('resize', handler);
      vv.addEventListener('scroll', handler);
      return () => { vv.removeEventListener('resize', handler); vv.removeEventListener('scroll', handler); };
    }
  }, [onKeyboardOpenChange]);

  // Presence: show online users in chat
  useEffect(() => {
    if (!supabaseClient) return;
    const name = displayName || `Guest-${Math.floor(Math.random() * 9999)}`;
    const presence = supabaseClient.channel('devotion_chat_presence', { config: { presence: { key: name } } });
    presence.on('presence', { event: 'sync' }, () => {
      const state = presence.presenceState();
      const count = Object.keys(state).length;
      setOnlineUsers(count);
    });
    presence.subscribe(async (status: any) => {
      if (status === 'SUBSCRIBED') {
        await presence.track({ online_at: new Date().toISOString() });
      }
    });
    return () => { presence.unsubscribe(); };
  }, [displayName]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages.length]);

  async function send() {
    if (!supabaseClient || !text.trim() || isOffline) return;
    const msg: ChatMessage = { id: crypto.randomUUID(), uid: user?.id ?? null, user: displayName, text: text.trim(), ts: Date.now(), status: 'sending' };
    const keepFocus = inputRef.current;
    setText('');
    // Optimistic add as sending
    setMessages((prev) => (prev.some(x => x.id === msg.id) ? prev : [...prev, msg]).slice(-200));
    try {
      const { error } = await supabaseClient
        .from('chat_messages')
        .upsert([{ id: msg.id, uid: msg.uid, username: msg.user, text: msg.text, ts: msg.ts }], { onConflict: 'id' });
      if (error) throw error;
      // Mark as sent; realtime will also reconcile
      setMessages(prev => prev.map(x => x.id === msg.id ? { ...x, status: 'sent' } : x));
    } catch (_e) {
      setPersistenceIssue('no_table');
      // Broadcast so others online still see it
      supabaseClient.channel('devotion_chat').send({ type: 'broadcast', event: 'message', payload: { ...msg, status: 'sent' } });
      setMessages(prev => prev.map(x => x.id === msg.id ? { ...x, status: 'failed' } : x));
    } finally {
      keepFocus?.focus();
    }
  }

  async function editMessage(m: ChatMessage, newText: string) {
    if (!supabaseClient || !newText.trim()) return;
    const ts = Date.now();
    setMessages(prev => prev.map(x => x.id === m.id ? { ...x, text: newText, ts, status: 'sending', edited: true } : x));
    const { error } = await supabaseClient.from('chat_messages').update({ text: newText, ts }).eq('id', m.id);
    if (error) {
      setMessages(prev => prev.map(x => x.id === m.id ? { ...x, status: 'failed' } : x));
    } else {
      setMessages(prev => prev.map(x => x.id === m.id ? { ...x, status: 'sent' } : x));
    }
  }

  async function deleteMessage(m: ChatMessage) {
    if (!supabaseClient) return;
    const id = m.id;
    setMessages(prev => prev.filter(x => x.id !== id));
    const { error } = await supabaseClient.from('chat_messages').delete().eq('id', id);
    if (error) {
      // restore on failure
      setMessages(prev => [...prev, m].sort((a,b)=>a.ts-b.ts).slice(-200));
      alert('Failed to delete message');
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') send();
  }

  async function retrySend(m: ChatMessage) {
    if (!supabaseClient) return;
    setMessages(prev => prev.map(x => x.id === m.id ? { ...x, status: 'sending' } : x));
    try {
      const { error } = await supabaseClient
        .from('chat_messages')
        .upsert([{ id: m.id, uid: m.uid ?? null, username: m.user, text: m.text, ts: m.ts }], { onConflict: 'id' });
      if (error) throw error;
      setMessages(prev => prev.map(x => x.id === m.id ? { ...x, status: 'sent' } : x));
    } catch {
      setMessages(prev => prev.map(x => x.id === m.id ? { ...x, status: 'failed' } : x));
    }
  }

  // Edit/Delete helpers UI state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<string>('');
  function onStartEdit(m: ChatMessage) {
    setEditingId(m.id);
    setEditDraft(m.text);
  }
  function onDelete(m: ChatMessage) {
    if (confirm('Delete this message?')) deleteMessage(m);
  }

  async function sendTypingPing() {
    try {
      if (!supabaseClient) return;
      if (!typingChannelRef.current) typingChannelRef.current = supabaseClient.channel('devotion_chat');
      typingChannelRef.current.send({ type: 'broadcast', event: 'typing', payload: { name: displayName } });
    } catch {}
  }

  const TOP_RESERVED = 128; // 64px header + 64px top container under header
  return (
    <div className="p-4 flex flex-col gap-3 overflow-hidden" style={{ height: `calc(100vh - ${TOP_RESERVED}px - ${barBottom}px)` }}>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-foreground">{t.title}</div>
        <div className="text-xs text-muted-foreground">Online: {onlineUsers}</div>
      </div>
      {!supabaseClient && (
        <div className="text-sm text-red-600">{t.notConfigured}</div>
      )}
      {isOffline && (
        <div className="text-xs text-yellow-700 bg-yellow-100 border border-yellow-200 rounded px-2 py-1">{t.offline}</div>
      )}
      {!!persistenceIssue && supabaseClient && (
        <div className="text-xs text-blue-700 bg-blue-100 border border-blue-200 rounded px-2 py-1">{t.historyWarn}</div>
      )}
      <Card className="flex-1 min-h-0 flex flex-col overflow-hidden bg-card/80 backdrop-blur border-primary/20">
        <div ref={listRef} className="flex-1 overflow-auto p-3 space-y-3">
          {messages.map((m) => {
            if (editingId === m.id) {
              const mine = (m.uid && user?.id && m.uid === user.id) || (!m.uid && m.user === displayName);
              return (
                <div key={m.id} className={`w-full flex ${mine ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 shadow ${mine ? 'bg-primary/20 text-foreground rounded-br-sm' : 'bg-accent text-accent-foreground rounded-bl-sm'}`}>
                    <Input value={editDraft} onChange={(e)=>setEditDraft(e.target.value)} className="mb-2" />
                    <div className="flex justify-end gap-2 text-xs">
                      <Button size="sm" variant="outline" onClick={() => { setEditingId(null); setEditDraft(''); }}>Cancel</Button>
                      <Button size="sm" className="gradient-primary text-white" onClick={() => { const draft = editDraft.trim(); if (draft) { editMessage(m, draft); setEditingId(null); } }}>
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }
            const mine = (m.uid && user?.id && m.uid === user.id) || (!m.uid && m.user === displayName);
            return (
              <div key={m.id} className={`w-full flex ${mine ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 shadow ${mine ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-accent text-accent-foreground rounded-bl-sm'}`}>
                  {!mine && (
                    <div className="text-[10px] text-muted-foreground/80 mb-0.5">{m.user}</div>
                  )}
                  <div className="text-sm whitespace-pre-wrap break-words">{m.text}</div>
                  <div className="flex items-center gap-2 justify-between mt-0.5">
                    <div className="text-[10px] opacity-70">
                      {new Date(m.ts).toLocaleTimeString()} {m.edited ? '(edited)' : ''}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] opacity-90">
                      {mine && (
                        <>
                          {m.status === 'sending' && <span>⏳</span>}
                          {m.status === 'sent' && <span>✔️</span>}
                          {m.status === 'failed' && (
                            <button className="underline underline-offset-2" onClick={() => retrySend(m)}>Retry</button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button aria-label="More" className="p-1 rounded hover:bg-white/10">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => onStartEdit(m)}>Edit</DropdownMenuItem>
                              <DropdownMenuItem variant="destructive" onClick={() => onDelete(m)}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Typing indicator */}
      {typing.length > 0 && (
        <div className="fixed left-0 right-0 z-50 px-4" style={{ bottom: barBottom + 56 }}>
          <div className="mx-auto max-w-3xl text-xs text-muted-foreground bg-card/80 border border-primary/20 rounded-md px-2 py-1 w-fit">
            <span className="mr-1">•••</span>
            {typing[0].name}{typing.length > 1 ? ` +${typing.length - 1}` : ''} is typing…
          </div>
        </div>
      )}

      {/* Fixed input bar above bottom nav; moves with mobile keyboard */}
      <div className="fixed left-0 right-0 z-50 px-4" style={{ bottom: barBottom }}>
        <div className="mx-auto max-w-3xl bg-card/95 backdrop-blur border border-primary/20 rounded-lg p-2 shadow-lg">
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              value={text}
              onFocus={() => onKeyboardOpenChange?.(true)}
              onBlur={() => onKeyboardOpenChange?.(false)}
              onChange={(e) => { setText(e.target.value); sendTypingPing(); }}
              onKeyDown={handleKey}
              placeholder={t.placeholder}
              className="flex-1"
            />
            <Button onMouseDown={(e) => e.preventDefault()} onClick={send} disabled={!text.trim() || isOffline} className="gradient-primary text-white">{t.send}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
