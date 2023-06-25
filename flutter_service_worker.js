'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"404.html": "0a27a4163254fc8fce870c8cc3a3f94f",
"assets/AssetManifest.json": "97f3c551ec767b9f0932fea2a1a3d686",
"assets/AssetManifest.smcbin": "9457e2c4f86dc05ca79a98ade38f256f",
"assets/assets/bg.png": "8e615e3ee377cad0c7c8f34412d276a5",
"assets/assets/contack3.png": "1716039de31c403452601f353cbb958c",
"assets/assets/contact1.png": "68e4d255247e574071c284f6f11428fa",
"assets/assets/contact2.png": "7ff70344f2ada6c4155951739298179e",
"assets/assets/email.png": "293708f5c8039cee89ef59b651393df1",
"assets/assets/fonts/Almarai-Bold.ttf": "1c7b8f3e50a7ca693dc27d3f1314167f",
"assets/assets/fonts/Almarai-ExtraBold.ttf": "5270f5e7ab01259e282604276871946f",
"assets/assets/fonts/Almarai-Light.ttf": "5b0dec05feae02fef51afd517af94d4c",
"assets/assets/fonts/Almarai-Regular.ttf": "4fcf563640cefe40b7474aec4f966c0a",
"assets/assets/home1.png": "3563e98450e745c6b6ba14f745699955",
"assets/assets/home2.png": "b7dcc82ebe161adb95693db0719c5aeb",
"assets/assets/home3.png": "8369e2e8b143b9e5246764b43193f770",
"assets/assets/home4.png": "debfbe4e9e6e1954a9484e10c8f67a08",
"assets/assets/home5.png": "9bb45d561707e8d16cae9ecaa852ddde",
"assets/assets/home6.png": "a9bf2abf47ed172b5e759be7f34ee82a",
"assets/assets/homebg.png": "9dee2a0246eabcd9725cf8c94da60c5e",
"assets/assets/Instagram-Icon.png": "a0df9184677e3883c59412b5c65f1fe2",
"assets/assets/logo.png": "473cce96eff0dff20c50516b0c1a417f",
"assets/assets/serv1.png": "7ddf486dcf36f7c9a9b77b674f8492da",
"assets/assets/serv2.png": "3afec397a9a1d033e157532d45481d9b",
"assets/assets/serv3.png": "50dcacbc364707b292f496f1b75654f5",
"assets/assets/serv4.png": "24a735d7285a8831ab86f4175dafb666",
"assets/assets/serv5.png": "7bbe35be9a3bec78f26f4622568e446c",
"assets/assets/twitter.png": "89cc80e435e964e12ea6355235470a01",
"assets/assets/youtube.png": "16f85d7ed819e16ad4c29c6844b56894",
"assets/FontManifest.json": "4ba1d3795862a82d5c795057c2a84432",
"assets/fonts/MaterialIcons-Regular.otf": "4fd503e071720fc9ff1507ed0e71cac3",
"assets/NOTICES": "2f5e6866ea69e8b64646bca4ef273113",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/logo.png": "473cce96eff0dff20c50516b0c1a417f",
"index.html": "47af134f15bb4cfc27678dbab4f35ece",
"/": "47af134f15bb4cfc27678dbab4f35ece",
"main.dart.js": "d4223f66f325bc00d92ab77e27365649",
"manifest.json": "83bf8c91e83cdfa355f628fe63c8e0f2",
"version.json": "2429f3d1f7abf36b8fbaac3442bc3d3a"};
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
