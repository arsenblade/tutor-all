const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/favicon.ico',
    '/logo32x32.png',
    '/logo64x64.png',
    '/logo256x256.png',
    '/logo528x528.png',
    '/logo128x128.png',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache)
                .then(() => {
                    // Кэшируем все файлы сгенерированные сборкой
                    return self.skipWaiting();
                })
                .catch((error) => {
                    console.error('Failed to cache resources during install:', error);
                });
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
    return self.clients.claim();
});

// Обработка запросов, если ресурс найден в кэше, возвращаем его, иначе делаем запрос к сети
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request).then((response) => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return response;
            });
        }),
    );
});
