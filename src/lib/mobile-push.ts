import { Capacitor } from '@capacitor/core';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed, PermissionStatus } from '@capacitor/push-notifications';
import { supabaseClient } from './supabase';

export function isNativeAndroid() {
  try { return Capacitor.getPlatform() === 'android'; } catch { return false; }
}

export async function ensurePushPermissions(): Promise<boolean> {
  try {
    const permissionStatus: PermissionStatus = await PushNotifications.checkPermissions();
    if (permissionStatus.receive === 'granted') return true;
    const req = await PushNotifications.requestPermissions();
    return req.receive === 'granted';
  } catch {
    return false;
  }
}

export async function registerAndroidPush(userEmail?: string | null) {
  if (!isNativeAndroid()) return null;
  const ok = await ensurePushPermissions();
  if (!ok) throw new Error('Push permission not granted');

  await PushNotifications.register();

  const token = await new Promise<string>((resolve, reject) => {
    const off = PushNotifications.addListener('registration', (t: Token) => { resolve(t.value); off.remove(); });
    const offErr = PushNotifications.addListener('registrationError', (e) => { offErr.remove(); reject(e); });
    setTimeout(() => reject(new Error('Registration timeout')), 15000);
  });

  if (supabaseClient) {
    await supabaseClient.from('push_devices').upsert({ token, platform: 'android', user_email: userEmail ?? null }, { onConflict: 'token' });
  }

  // Optional: listeners for foreground
  PushNotifications.addListener('pushNotificationReceived', (_: PushNotificationSchema) => {});
  PushNotifications.addListener('pushNotificationActionPerformed', (_: ActionPerformed) => {});

  return token;
}

export async function unregisterAndroidPush() {
  if (!isNativeAndroid()) return false;
  try { await PushNotifications.removeAllListeners(); } catch {}
  // We cannot revoke FCM token here; remove from DB so no more pushes are sent
  return true;
}
