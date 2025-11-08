const CACHE_NAME = 'followup-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/add.html',
  '/list.html',
  '/settings.html',
  '/about.html',
  '/style.css',
  '/app.js',
  '/manifest.json'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then(resp => resp || fetch(evt.request))
  );
});

self.addEventListener('message', (evt) => {
  try {
    const data = evt.data;
    if(data && data.type === 'SHOW_NOTIFICATION'){
      const p = data.payload || {};
      self.registration.showNotification(p.title || 'Reminder', p.options || {});
    }
  } catch(e){}
});
