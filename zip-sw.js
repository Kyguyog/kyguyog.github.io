self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const marker = '/__zip_runtime/';
  const idx = url.pathname.indexOf(marker);
  if (idx === -1) return;

  event.respondWith((async () => {
    const runtimeRoot = url.pathname.slice(0, idx + marker.length);
    const cache = await caches.open('zip-runtime');

    const cached = await cache.match(event.request, { ignoreSearch: true });
    if (cached) return cached;

    // SPA-like fallback inside runtime: try index.html in same runtime folder.
    const fallbackReq = new Request(`${self.location.origin}${runtimeRoot}index.html`);
    const fallback = await cache.match(fallbackReq, { ignoreSearch: true });
    if (fallback) return fallback;

    return new Response('File not found in zip runtime.', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  })());
});
