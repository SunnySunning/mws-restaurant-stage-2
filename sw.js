self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function (responseNew) {
                const responseClone = responseNew.clone();
                caches.open('nws-cache-v1').then(function (cache) {
                    cache.put(event.request, responseClone);
                })
                return responseNew;
            })
        })
    );
});