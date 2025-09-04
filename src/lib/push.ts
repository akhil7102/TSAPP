import { supabaseClient } from './supabase';

export function isPushSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

export async function registerServiceWorker() {
  if (!isPushSupported()) return null;
  try {
    const reg = await navigator.serviceWorker.register('/sw.js');
    await navigator.serviceWorker.ready;
    return reg;
  } catch {
    return null;
  }
}

export async function getPermission(): Promise<NotificationPermission> {
  try {
    return Notification.permission;
  } catch {
    return 'default';
  }
}

export async function requestPermission(): Promise<NotificationPermission> {
  if (!isPushSupported()) return 'denied';
  try {
    const p = await Notification.requestPermission();
    return p;
  } catch {
    return 'denied';
  }
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

export async function subscribeToPush(userEmail?: string | null) {
  const reg = await registerServiceWorker();
  if (!reg) throw new Error('Service worker not available');
  const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined;
  if (!vapidPublicKey) throw new Error('Missing VAPID public key');
  const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) });
  await saveSubscription(sub, userEmail ?? null);
  return sub;
}

export async function getExistingSubscription() {
  const reg = await registerServiceWorker();
  if (!reg) return null;
  return await reg.pushManager.getSubscription();
}

export async function unsubscribeFromPush() {
  const sub = await getExistingSubscription();
  if (!sub) return false;
  const ok = await sub.unsubscribe();
  try { await removeSubscription(sub); } catch {}
  return ok;
}

async function saveSubscription(sub: PushSubscription, userEmail: string | null) {
  if (!supabaseClient) return;
  const json = sub.toJSON() as any;
  const p256dh = json.keys?.p256dh || null;
  const auth = json.keys?.auth || null;
  const endpoint = sub.endpoint;
  await supabaseClient.from('push_subscriptions').upsert({ endpoint, p256dh, auth, user_email: userEmail || null }, { onConflict: 'endpoint' });
}

async function removeSubscription(sub: PushSubscription) {
  if (!supabaseClient) return;
  const endpoint = sub.endpoint;
  await supabaseClient.from('push_subscriptions').delete().eq('endpoint', endpoint);
}
