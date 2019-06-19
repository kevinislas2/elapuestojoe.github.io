var cacheName = 'kevin-islas-v1';
var filesToCache = [
    '/index.html',
    '/dist/bundle-index.css',
    '/dist/bundle-index.js',
    '/assets/3dViz.webp',
    '/assets/CappuccinoLogo.webp',
    '/assets/cdc.webp',
    '/assets/googleLatam2017.webp',
    '/assets/googleLatam2018.webp',
    '/assets/Heterogeneous.webp',
    '/assets/itesm.webp',
    '/assets/julia.webp',
    '/assets/kevinislas.webp',
    '/assets/Microsoft.webp',
    '/assets/praxis-logo.webp',
    '/assets/Ziknet-Trends.webp'
]

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});