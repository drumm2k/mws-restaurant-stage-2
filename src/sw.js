'use strict';

let cacheAppName = 'rest-reviews-v5';
let cacheAppFiles = [
  './',
  './index.html',
  './restaurant.html',
  './css/styles.min.css',
  './js/main.js',
  './js/restaurant_info.js',
  './js/dbhelper.js',
  './js/idb.js',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
  './img/1-400.jpg',
  './img/2-400.jpg',
  './img/3-400.jpg',
  './img/4-400.jpg',
  './img/5-400.jpg',
  './img/6-400.jpg',
  './img/7-400.jpg',
  './img/8-400.jpg',
  './img/9-400.jpg',
  './img/10-400.jpg',
  './icons/favicon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheAppName).then(cache => {
      return cache.addAll(cacheAppFiles);
    })
  )
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cachesNames => {
      return Promise.all(
        cachesNames.filter(cachesName => {
          return cachesName.startsWith('rest-reviews-') && cachesName != cacheAppName;
        }).map(cachesName => {
          return caches.delete(cachesName);
        })
      )
    })
  )
})

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request, {ignoreSearch: true}).then(response => {
      if (response) return response;
      return fetch(e.request);
    })
    .catch(err => {
      console.log('[SW] Fetch Error', err);
    })
  )
})
