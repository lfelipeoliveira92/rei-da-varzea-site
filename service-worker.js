const CACHE_NAME = 'rei-da-varzea-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json', // <-- Adicionamos o manifesto
  '/images/icons/icon-192.png',
  '/images/icons/icon-512.png'
  // Se você tiver um arquivo de CSS, adicione a linha aqui. Ex: '/css/style.css'
  // Se você tiver um arquivo de JS, adicione a linha aqui. Ex: '/js/main.js'
];

// Evento de Instalação: Salva os arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de Fetch: Intercepta as requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se encontrar no cache, retorna do cache.
        if (response) {
          return response;
        }
        // Senão, busca na rede.
        return fetch(event.request);
      })
  );
});
