// 人体の構造と機能｜試験対策クイズ v2 Service Worker
// - アプリ本体（HTML/CSS/JS/アイコン/manifest）と問題データはあらかじめキャッシュし、
//   2回目以降のアクセスやオフライン時にも利用できるようにする。
// - 問題データ(JSON)は更新が入る可能性があるため network-first（オンライン時は常に最新を取得）。
// - 300問版で全65 image_mcqの画像(27種類、合計約1.4MB)が出揃ったため、初回install時に
//   まとめてprecacheし、初回オンライン起動後はオフラインでも全image_mcqを利用可能にする。
//   ただしCORE_ASSETS（アプリ本体）とは別のPromise.allで、1枚ずつ個別にcatchする
//   （＝どれか1枚の取得に失敗してもinstall全体を失敗させない。取得できなかった分は
//   従来どおりimageCacheFirst()が実行時に個別取得を試み、それでも失敗すれば画面側の
//   「画像準備中」表示に任せる）。
var CACHE = 'anatomy-quiz-v2-2026-08-300q-img';
var CORE_ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.webmanifest',
  './icon-180.png',
  './icon-512.png',
  './data/questions_v1.json'
];
var IMAGE_ASSETS = [
  './assets/images/anatomical_position.webp',
  './assets/images/circulation_circuit.webp',
  './assets/images/direction_terms.webp',
  './assets/images/heart_exterior_anterior.webp',
  './assets/images/heart_exterior_posterior.webp',
  './assets/images/heart_valves_schematic.webp',
  './assets/images/pleura_cross_section.webp',
  './assets/images/q002_hierarchy.webp',
  './assets/images/q004_epithelium.webp',
  './assets/images/q008_body_planes.webp',
  './assets/images/q011_germ_layers.webp',
  './assets/images/q016_apex.webp',
  './assets/images/q017_heart_chambers.webp',
  './assets/images/q019_pulmonary_vein.webp',
  './assets/images/q021_vessel_cross_sections.webp',
  './assets/images/q025_conduction_system.webp',
  './assets/images/q032_larynx.webp',
  './assets/images/q035_right_middle_lobe.webp',
  './assets/images/q037_alveolar_gas_exchange.webp',
  './assets/images/q040_airway_branching.webp',
  './assets/images/q041_alveolar_sac.webp',
  './assets/images/q045_renal_hilum.webp',
  './assets/images/q048_nephron.webp',
  './assets/images/q050_urinary_system.webp',
  './assets/images/q068_ecg_waveform.webp',
  './assets/images/q073_coronary_arteries.webp',
  './assets/images/q091_kidney_cross_section.webp'
];
// 後方互換のため残す（他コードから参照されていた場合に備え、CORE+IMAGEの合成とする）。
var PRECACHE_ASSETS = CORE_ASSETS.concat(IMAGE_ASSETS);

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) {
        // アプリ本体は従来どおりaddAll()で全件必須（1つでも欠けたらinstall失敗とする）。
        return c.addAll(CORE_ASSETS).then(function () {
          // 画像は1枚ずつbest-effortで取得し、失敗しても他の画像・install自体には影響しない。
          return Promise.all(IMAGE_ASSETS.map(function (url) {
            return c.add(url).catch(function () { /* 実行時のimageCacheFirst()に委ねる */ });
          }));
        });
      })
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
