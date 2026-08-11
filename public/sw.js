const SHELL_CACHE = "terrasatch-shell-v3";
const STATIC_CACHE = "terrasatch-static-v3";
const APP_SHELL = [
  "/",
  "/index.html",
  "/site.webmanifest",
  "/favicon.ico",
  "/pwa-icon.svg",
  "/pwa-icon-maskable.svg",
  "/terralisten-sasquatch.png",
  "/robots.txt",
];
const PRIVATE_PATHS = ["/api/", "/demo-access", "/demos"];

const isPrivatePath = (pathname) => PRIVATE_PATHS.some((path) => pathname.startsWith(path));

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(SHELL_CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => ![SHELL_CACHE, STATIC_CACHE].includes(key)).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || request.headers.has("range")) return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || isPrivatePath(url.pathname)) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            caches.open(SHELL_CACHE).then((cache) => cache.put("/index.html", networkResponse.clone()));
          }
          return networkResponse;
        })
        .catch(() => caches.match("/index.html")),
    );
    return;
  }

  const cacheableDestination = ["script", "style", "image", "font", "document"].includes(request.destination);
  if (!cacheableDestination) return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const network = fetch(request).then((networkResponse) => {
        if (networkResponse.ok && networkResponse.type === "basic") {
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, networkResponse.clone()));
        }
        return networkResponse;
      });
      return cachedResponse || network;
    }),
  );
});
