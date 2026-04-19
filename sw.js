const CACHE_NAME = 'daily-bible-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png' // تأكد إن اسم الصورة صح
];

// تثبيت ملفات الكاش (للعمل بدون إنترنت)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// استرجاع الملفات من الكاش
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// --- الجزء الخاص باستقبال الإشعارات ---
self.addEventListener('push', function(event) {
    let body = event.data ? event.data.text() : 'آية جديدة في انتظارك';
    
    const options = {
        body: body,
        icon: 'logo.png',
        badge: 'logo.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('مع المسيح كل يوم', options)
    );
});

// فتح التطبيق عند الضغط على الإشعار
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});

