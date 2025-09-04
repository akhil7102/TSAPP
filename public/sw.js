self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  try {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Temple Sanathan';
    const body = data.body || data.message || '';
    const url = data.url || '/';
    const icon = data.icon || '/favicon.ico';
    const tag = data.tag || 'temple-sanathan';
    event.waitUntil(self.registration.showNotification(title, { body, icon, tag, data: { url } }));
  } catch (e) {
    event.waitUntil(self.registration.showNotification('Temple Sanathan', { body: 'You have a new notification' }));
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification && event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
