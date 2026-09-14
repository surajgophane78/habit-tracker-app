const CACHE = 'momentum-shell-v6';
const ASSETS = ['./', './index.html', './styles.css', './updates.css', './task-updates.css', './achievement-updates.css', './achievement-data.js', './python-achievement-data.js', './app.js', './manifest.json'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS))));
self.addEventListener('fetch', event => event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).catch(() => caches.match('./index.html')))));
