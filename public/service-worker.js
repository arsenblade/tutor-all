const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/static/js/bundle.js',
    '/static/js/1.chunk.js',
    '/static/js/main.chunk.js',
    '/static/css/main.css',
    '/manifest.json',
    '/favicon.ico',
    '/logo192.png',
    '/logo512.png',
];

// Установка service worker и кэширование всех статических ресурсов
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        }),
    );
});

// Активирование service worker и удаление старых кэшей
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                }),
            );
        }),
    );
});

// Обработка запросов, если ресурс найден в кэше, возвращаем его, иначе делаем запрос к сети
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }),
    );
});
