"use strict";

const ASSET_VERSION = "20260529-tinea-manuum";
const CACHE_NAME = "derm-explain-tool-v10";
const APP_SHELL = [
  "./",
  "./index.html",
  `./style.css?v=${ASSET_VERSION}`,
  `./app.js?v=${ASSET_VERSION}`,
  `./conditions.js?v=${ASSET_VERSION}`,
  `./manifest.json?v=${ASSET_VERSION}`
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => (
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return caches.match("./index.html");
      })
    ))
  );
});
