'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "3a890a79106a9b26a40ebad81359fe17",
"index.html": "182bec9a544f044701bd5413d22057dd",
"/": "182bec9a544f044701bd5413d22057dd",
"main.dart.js": "c1b1cbeb08298bb4a5180af0397069ff",
"404.html": "cd42408c53f3cd4b2f8ec64dd2e8f7dc",
"flutter.js": "7d69e653079438abfbb24b82a655b0a4",
"_redirects": "ec5c809ab4b77e96308e512c6a5f8210",
"favicon.png": "1dfed340c44dae728d2b33e0a0d5cf9b",
"icons/Icon-192.png": "25fc9e028fbe5a6a21fea77392a44071",
"icons/Icon-maskable-192.png": "25fc9e028fbe5a6a21fea77392a44071",
"icons/Icon-maskable-512.png": "67951c494b20a35685e9c6d80f195822",
"icons/Icon-512.png": "67951c494b20a35685e9c6d80f195822",
"manifest.json": "f4da32469377368296b81630308e7b04",
"assets/AssetManifest.json": "058a3a3474ba98001ce6ffbe566c0865",
"assets/NOTICES": "cd438ec03499bb4860481fa2e2604fe7",
"assets/FontManifest.json": "856c77a3fd9175f047ad8b78292cccfc",
"assets/AssetManifest.bin.json": "c9ebc1b0fb23afaa6a2d9fdb80962ab0",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/glass/images/noise.png": "326f70bd3633c4bb951eac0da073485d",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"assets/AssetManifest.bin": "5f750fec919734de5bc3f01c49882457",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/images/news.png": "bb55e3ac2e2a6bc25a70090a2485d6b5",
"assets/assets/images/news.jpg": "6679ed82816d39ba90c4ea8614de36da",
"assets/assets/images/magic-poster.png": "55a20aee7ba096f9741bb89e3ed8739d",
"assets/assets/images/pole-tap.png": "4f538a727f27aa44b12c1d4d2d9fd1b4",
"assets/assets/images/gcufsd.png": "7de6f5606b067280cc8828d51e08b654",
"assets/assets/images/fgsd.jpeg": "91d84aa793cf4ad0121a32c6d17e89f9",
"assets/assets/images/syosset.png": "92c2b14df62b2ce78ac89cdbb905a1e3",
"assets/assets/images/scsd.png": "361ce29a1a7c7ec4eac6056457c42cc4",
"assets/assets/images/shufsd.png": "6f67943b9c83fa5b9d0163bc2a53e500",
"assets/assets/images/post-on.png": "52872d369aa3c55be5a44b33b2d56a09",
"assets/assets/images/hauppauge.png": "639e44d51e5b0e4699ab0036391eb229",
"assets/assets/images/student-score.png": "5becf2868588f7cf388e413c6b5126c1",
"assets/assets/images/sheet.png": "89084763a0c5c0c3137c577e8a23d3ea",
"assets/assets/images/gccsd.png": "fc83fa56901470203f8ae6f9e348f2f8",
"assets/assets/images/iphone.png": "fa46f09772d56c39886534f0c7953b30",
"assets/assets/images/moov-logo.png": "25fc9e028fbe5a6a21fea77392a44071",
"assets/assets/images/group-score.png": "4deda83428a5747b2b527315869a3c96",
"assets/assets/images/islip.png": "dc130f7a969c9730beb8c49e2886fc3d",
"assets/assets/images/homepage.png": "4bf076c53f3477aaf9755ca99831df7f",
"assets/assets/images/bus.png": "464154c87f2c94bebe9f8a76b99b8999",
"assets/assets/images/one-app.png": "d88351bbc9b0fa8129379a58ab19462f",
"assets/assets/fonts/Sf-Pro-Rounded-Regular.otf": "6720e086a89d34cb9ca424a3ba913082",
"assets/assets/fonts/Sf-Pro-Rounded-Thin.otf": "f8ab0e64878f5c5e3db454b6f89dd0cd",
"assets/assets/fonts/Sf-Pro-Rounded-Medium.otf": "137ee8cda3c7f9c388e62aca25c82744",
"assets/assets/fonts/Sf-Pro-Rounded-Heavy.otf": "43e2e246b1b021c3435c57b3dcf71e63",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
