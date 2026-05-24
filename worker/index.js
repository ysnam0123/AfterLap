/* eslint-disable no-undef */
// AfterLap 푸시 알림 핸들러 — next-pwa 빌드 시 sw.js에 머지됨

self.addEventListener('push', (event) => {
  if (!event.data) return;
  let data = {};
  try {
    data = event.data.json();
  } catch {
    data = { title: 'AfterLap', body: event.data.text() };
  }

  const title = data.title || 'AfterLap';
  const body = data.body || '';
  const url = data.url || '/';

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      tag: data.tag || undefined, // 같은 tag면 새 알림이 이전 알림 대체
      data: { url },
      vibrate: [120, 60, 120],
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clients) => {
        for (const client of clients) {
          if ('focus' in client) {
            client.focus();
            if ('navigate' in client) client.navigate(target);
            return;
          }
        }
        return self.clients.openWindow?.(target);
      }),
  );
});
