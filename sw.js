const CACHE_NAME = 'daily-bible-v1';
const urlsToCache = [
  '/',
  '/index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('push', event => {
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title || 'مع المسيح كل يوم', {
      body: data.body || 'آية جديدة من الكتاب المقدس',
      icon: 'https://cdn-icons-png.flaticon.com/512/2903/2903510.png',
      vibrate: [200, 100, 200],
      requireInteraction: true
    })
  );
});
