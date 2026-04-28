self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (!url.pathname.includes('/__zip_runtime/')) return;

  event.respondWith((async () => {
    const cache = await caches.open('zip-runtime');
    const hit = await cache.match(event.request);
    if (hit) return hit;
    return new Response('File not found in zip runtime.', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  })());
});
