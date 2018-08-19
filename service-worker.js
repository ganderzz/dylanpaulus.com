var cacheName = "dylanpaulus-sw";
var filesToCache = [
  "index.html",
  "about/index.html",
  "images/android-chrome-192x192.png",
  "images/android-chrome-256x256.png",
  "images/favicon-16x16.png",
  "images/favicon-32x32.png",
  "images/favicon.ico",
  "search.json"
];

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches
      .match(e.request)
      .then(function(response) {
        return response || fetch(e.request);
      })
      .catch(console.error)
  );
});
