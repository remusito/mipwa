const CACHE_NAME = 'semaforo-app-v8';
const urlsToCache = [
    './',
    './index.html',
    './styles.css',
    './script.js',
    './manifest.json'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Cacheando archivos');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.error('Service Worker: Error al cachear:', error);
            })
    );
    // Forzar activación inmediata
    self.skipWaiting();
});

// Interceptar peticiones
self.addEventListener('fetch', (event) => {
    // Solo manejar peticiones HTTP/HTTPS
    if (!event.request.url.startsWith('http')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Si está en cache, devolverlo
                if (response) {
                    console.log('Service Worker: Desde cache:', event.request.url);
                    return response;
                }
                
                // Si no está en cache, intentar descargar
                return fetch(event.request)
                    .then((response) => {
                        // Si la respuesta es válida, guardarla en cache
                        if (response && response.status === 200) {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseClone);
                                });
                        }
                        return response;
                    })
                    .catch((error) => {
                        console.log('Service Worker: Offline, buscando en cache:', event.request.url);
                        
                        // Si es la página principal, devolver index.html desde cache
                        if (event.request.mode === 'navigate') {
                            return caches.match('/index.html') || caches.match('./index.html');
                        }
                        
                        // Para otros recursos, devolver error offline
                        return new Response('Offline - Recurso no disponible', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: { 'Content-Type': 'text/plain' }
                        });
                    });
            })
    );
});

// Actualizar Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activando...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Tomar control inmediato
    return self.clients.claim();
});