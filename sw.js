const urlsToCache = ["/index.html", "styles.css"]

self.addEventListener("install", event => {
  console.log("Service worker instalado")
  event.waitUntil(
    async () => {
      const cache = await caches.open("pwa-assets")
      return cache.addAll(urlsToCache)
    }
  )
})

self.addEventListener("activate", event => {
  console.log("Service Worker ativado")
})

self.addEventListener("fetch", event => {
  event.respondWith(
    (async () => {
      const match = await caches.match(event.request)
      return match || fetch(event.request)
    })()
  )
})