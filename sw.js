// 人体の構造と機能｜試験対策クイズ v2 Service Worker
// - アプリ本体（HTML/CSS/JS/アイコン/manifest）と問題データはあらかじめキャッシュし、
//   2回目以降のアクセスやオフライン時にも利用できるようにする。
// - 問題データ(JSON)は更新が入る可能性があるため network-first（オンライン時は常に最新を取得）。
// - 画像(assets/images/)はまだ用意されていないものも多いため、
//   取得に失敗しても何もキャッシュしない（＝画面側の「画像準備中」表示に任せる）。
var CACHE = 'anatomy-quiz-v2-2026-08';
var PRECACHE_ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.webmanifest',
  './icon-180.png',
  './icon-512.png',
  './data/questions_v1.json'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(PRECACHE_ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (k) {
          if (k !== CACHE) return caches.delete(k);
        }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

function isDataRequest(url) {
  return url.pathname.indexOf('/data/') !== -1 && url.pathname.endsWith('.json');
}

function isImageRequest(url) {
  return url.pathname.indexOf('/assets/images/') !== -1;
}

// 問題データ: オンライン時は常に最新を取得し、キャッシュも更新する。オフライン時は最後にキャッシュした版を返す。
// キャッシュにも無い場合（初回アクセスをオフラインで行った等）は、respondWith()にundefinedを
// 渡して曖昧なネットワークエラーにしないよう、確実に何らかのResponseかrejectionを返す。
function networkFirst(request) {
  return fetch(request)
    .then(function (resp) {
      if (resp && resp.ok) {
        var copy = resp.clone();
        caches.open(CACHE).then(function (c) { c.put(request, copy); });
      }
      return resp;
    })
    .catch(function () {
      return caches.match(request).then(function (cached) {
        if (cached) return cached;
        return Response.error();
      });
    });
}

// 画像: キャッシュにあれば即返す。無ければ取得を試み、成功時のみキャッシュする。
// 画像がまだ配置されておらず404等になった場合はキャッシュせず、そのまま失敗を返す
// （画面側の <img onerror> が「画像準備中」表示に切り替える）。
function imageCacheFirst(request) {
  return caches.match(request).then(function (cached) {
    if (cached) return cached;
    return fetch(request).then(function (resp) {
      if (resp && resp.ok) {
        var copy = resp.clone();
        caches.open(CACHE).then(function (c) { c.put(request, copy); });
      }
      return resp;
    });
  });
}

// それ以外（HTML/CSS/JS/アイコン等）: キャッシュ優先、裏でネットワークからも取得してキャッシュを更新。
// キャッシュ・ネットワークの両方が失敗した場合は index.html（キャッシュ済みのはず）へフォールバックする。
function cacheFirst(request) {
  return caches.match(request).then(function (cached) {
    var network = fetch(request).then(function (resp) {
      if (resp && resp.ok) {
        var copy = resp.clone();
        caches.open(CACHE).then(function (c) { c.put(request, copy); });
      }
      return resp;
    }).catch(function () {
      return cached || caches.match('./index.html');
    });
    return cached || network;
  });
}

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  if (isDataRequest(url)) {
    e.respondWith(networkFirst(e.request));
  } else if (isImageRequest(url)) {
    e.respondWith(imageCacheFirst(e.request));
  } else {
    e.respondWith(cacheFirst(e.request));
  }
});
