const CACHE='cq-v9';
const ASSETS=['https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(()=>{})).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const isHtml = e.request.mode === 'navigate' || (e.request.method === 'GET' && e.request.headers.get('accept').includes('text/html'));
  if (isHtml) {
    // Network first for HTML to always get the latest language buttons and updates
    e.respondWith(
      fetch(e.request).then(r=>{
        if(r.ok){const c=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c)).catch(()=>{})}
        return r;
      }).catch(()=>{
        return caches.match(e.request).then(cached=>cached||new Response('Offline',{status:503}));
      })
    );
  } else {
    // Cache first, fallback to network for images, JS, CSS
    e.respondWith(
      caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{
        if(r.ok){const c=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c)).catch(()=>{})}
        return r;
      }).catch(()=>cached || new Response('Offline',{status:503})))
    );
  }
});
