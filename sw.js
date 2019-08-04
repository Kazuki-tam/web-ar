var CACHE_NAME = 'cash-v1';
var urlsToCache = [
  './',
  'manifest.json',
  'iPhoneXs.usdz',
  'iphone.gltf',
  'https://unpkg.com/@google/model-viewer/dist/model-viewer.js',
  'https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js',
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css',
  'iphone_binary.bin',
  '/iphone_images/image_0.jpg',
  '/iphone_images/phone_16_10_metal_normal.png',
  '/iphone_images/phone_16_10_screen_normal.png',
  '/iphone_images/image_3.jpg',
  '/iphone_images/phone_16_10_shell_normal.png',
  '/css/style.css'
];
//Install
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {  
      return cache.addAll(urlsToCache);
    })
  );
});

//Activate
self.addEventListener('activate', function(event) {  
  event.waitUntil(
    caches.keys().then(function(cache) {
      cache.map(function(name) {
        if(CACHE_NAME !== name) caches.delete(name);
      })
    })
  );
});

//Request
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(res) {
      if(res) return res;
      return fetch(event.request);
    })
  );
});