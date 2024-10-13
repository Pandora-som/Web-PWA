const staticCacheName = 'site-static-v1'
const assets = [
    '.',
    'index.html',
    'app.js',
    'IMG/Calc.jpg',
    'CSS/style.css',
    'images/icons/icon-128x128.png',
    'images/icons/icon-192x192.png'
]
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('Кэширование ресурсов')
            cache.addAll(assets)
        })
    )
})
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => cashes.delete(key))
            );
        })
    )
})
self.addEventListener('fetch', evt => {
    evt.respondWith(
        cashes.match(evt.request).then(casheRes => {
            return casheRes || fetch(evt.request)
        })
    )
})