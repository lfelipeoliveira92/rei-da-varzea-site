// Define um nome e versão para o cache do seu aplicativo.
const CACHE_NAME = 'rei-da-varzea-v1';

// Lista de todos os arquivos que o seu aplicativo precisa para funcionar offline.
// Os links dos ícones foram CORRIGIDOS para apontar para os links do Imgur.
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://i.imgur.com/VErPYOl.png', // Corrigido
  'https://i.imgur.com/xdidfQa.png'  // Corrigido
];

// Evento de Instalação: Executado quando o Service Worker é registrado pela primeira vez.
self.addEventListener('install', event => {
  // Espera até que o cache seja aberto e todos os arquivos da lista sejam salvos.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto, salvando arquivos essenciais...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de Fetch: Executado toda vez que a página faz uma requisição de rede (ex: imagem, script).
self.addEventListener('fetch', event => {
  // Responde à requisição com uma estratégia "Cache-First".
  event.respondWith(
    // Tenta encontrar a requisição no cache primeiro.
    caches.match(event.request)
      .then(response => {
        // Se a resposta for encontrada no cache, a retorna imediatamente, sem usar a rede.
        if (response) {
          return response;
        }
        // Se não for encontrada no cache, busca na rede normalmente.
        return fetch(event.request);
      })
  );
});