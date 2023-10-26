self.addEventListener('install', function (event) {
    event.waitUntil(
      caches.open('mysite-static-v3').then(function (cache) {
        return cache.addAll([
          'index.html',
          'assets/css/main-style.css'
        ]);
      }),
    );
  });

  // Activate Service Worker
self.addEventListener('activate', event => {
    console.log('service worker acticated');

	event.waitUntil(
		// Rydder op i cache og sletter alle uaktuelle caches
		caches.keys().then(keys => {
            const filteredKeys =keys.filter(key => key !== staticCacheName)
            filteredKeys.map(key => caches.delete(key))
        })
    )
})

// Fetch event
self.addEventListener('fetch', event => {

  //if(!(event.request.url.indexOf('http') === 0)) return

    // Kontroller svar på request
	event.respondWith(
        // Kig efter file match i cache 
		caches.match(event.request).then(cacheRes => {
            // Returner match fra cache - ellers hent fil på server
			return (
          cacheRes || 
          fetch(event.request).then(async cacheRes => {
            
          // Tilføjer nye sider til cachen
				    return caches.open(dynamicCacheName).then(cache => {
              // Bruger put til at tilføje sider til vores cache
					    // Læg mærke til metoden clone
					    cache.put(event.request.url, cacheRes.clone())
					    // Returnerer fetch request
					    return cacheRes
				    })
			    })
          )
        }).catch(() => {
          // Hvis ovenstående giver fejl kaldes fallback siden			
          return caches.match('./pages/fallback.html');
        })
      )
        
  // Kalder limit cache funktionen
  limitCacheSize(dynamicCacheName, 20)
})


// Funktion til styring af antal filer i en given cache
const limitCacheSize = (cacheName, numberOfAllowedFiles) => {
	// Åbn den angivede cache
	caches.open(cacheName).then(cache => {
		// Hent array af cache keys 
		cache.keys().then(keys => {
			// Hvis mængden af filer overstiger det tilladte
			if(keys.length > numberOfAllowedFiles) {
				// Slet første index (ældste fil) og kør funktion igen indtil antal er nået
				cache.delete(keys[0]).then(limitCacheSize(cacheName, numberOfAllowedFiles))
			}
		})
	})
}