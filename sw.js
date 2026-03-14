// sw.js (Basit Service Worker)

// Önbellek sürümünü artır!
const CACHE_NAME = 'aydin-portfolio-cache-v4'; // Sürüm v4 oldu
// Önbelleğe alınacak temel dosyaların listesi (offline.html eklendi)
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.js',   
  '/images/profile_placeholder.png', // Profil resmi (gerçek dosya adını yaz)
  '/images/icons/icon-192x192.png', // PWA ikonu (gerçek yolu yaz)
  '/images/icons/icon-512x512.png', // PWA ikonu (gerçek yolu yaz)
  '/A.ico', // Favicon
  '/offline.html' // Çevrimdışı sayfası eklendi
];

// 1. Install Olayı: Service Worker kurulduğunda tetiklenir
self.addEventListener('install', event => {
  console.log('Service Worker: Installing v2...'); // Sürüm bilgisi eklendi
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching app shell including offline page');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: App shell cached successfully v2');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Caching failed v2', error);
      })
  );
});

// 2. Activate Olayı: Service Worker aktifleştiğinde tetiklenir
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating v2...'); // Sürüm bilgisi eklendi
  // Eski önbellekleri temizle
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          // Eğer mevcut önbellek adı, yeni CACHE_NAME (v2) ile aynı değilse sil
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activated successfully v2');
      return self.clients.claim();
    })
  );
});

// 3. Fetch Olayı: Tarayıcı bir kaynak istediğinde tetiklenir
self.addEventListener('fetch', event => {
  // Sadece GET isteklerini işle
  if (event.request.method !== 'GET') {
    return;
  }

  // İstek navigasyon ise (sayfa yüklemesi) -> Önce Ağı Dene (Network First), başarısız olursa offline sayfasını göster
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request) // Önce ağdan istemeyi dene
        .catch(() => {
          // Ağ başarısız olursa önbellekten offline.html sayfasını döndür
          console.log('Fetch failed; returning offline page from cache.');
          return caches.match('/offline.html'); // <<< DEĞİŞİKLİK BURADA YAPILDI
        })
    );
  }
  // Diğer tüm istekler (CSS, JS, Resimler vb.) -> Önce Önbelleğe Bak (Cache First)
  else {
    event.respondWith(
      caches.match(event.request) // Önce önbellekte ara
        .then(response => {
          // Önbellekte varsa oradan döndür, yoksa ağdan iste ve dinamik olarak önbelleğe al
          return response || fetch(event.request).then(fetchResponse => {
            return caches.open(CACHE_NAME).then(cache => {
              // Yanıt geçerliyse ve klonlanabilirse önbelleğe koy
              if (fetchResponse.ok && fetchResponse.type !== 'opaque') {
                 cache.put(event.request, fetchResponse.clone());
              }
              return fetchResponse;
            });
          });
        })
        .catch(error => {
          console.error('Fetching asset failed:', error);
          // Burada da bir fallback döndürülebilir, örneğin bozuk resim ikonu vb.
        })
    );
  }
});