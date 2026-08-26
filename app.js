/*
 * 人体の構造と機能｜試験対策クイズ v2
 * 画面ロジック（本ファイル）と問題データ（data/questions_v1.json）を分離した構成。
 * 問題を追加・変更する場合は data/questions_v1.json のみを編集すればよい
 * （本ファイルの改修は不要、というのが基本方針）。
 *
 * 将来 standalone（単一HTML）版が必要になった場合は、
 * loadQuestions() が呼び出す fetch() を、埋め込みJSONを直接読む処理に
 * 差し替えるだけで済むよう、データ取得とレンダリングを分離している。
 */
(function () {
  'use strict';

  var DATA_URL = './data/questions_v1.json';
  var STORAGE_KEY = 'anatomyQuizV2History';
  var CATEGORY_ALL = '__ALL__';
  var COUNT_STEPS = [5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 150, 200, 250, 300];
  // アプリ本体（このapp.js/index.html）自体のビルド識別子。data/questions_v1.jsonの
  // versionとは別物 -- 「古いapp.jsのキャッシュ＋新しいdataset」のようなずれを
  // 画面右下の表示で即座に見分けられるようにするための値。リリース時に更新する。
  var APP_BUILD = 'v2.0.1-rc';

  // 画像再制作candidate（docs/v2.0.1_candidate_assets.jsonと対応）。
  // data/questions_v1.jsonはここを一切参照しない -- candidateはreview modeでの
  // 見比べにのみ使われ、正式採用（accepted）されるまで学生向け通常クイズには
  // 一切影響しない。現時点でcandidate状態のassetは無し
  // （circulation_circuit.webpは高品質差し替えが完了しaccepted済み）。
  var CANDIDATE_ASSETS = {};

  var el = {};

  var app = {
    allQuestions: [],
    categories: [],
    meta: null,
    ready: false,
    selectedCategory: CATEGORY_ALL,
    mode: 'idle', // idle | quiz | result
    queue: [],
    index: 0,
    correct: 0,
    answered: false,
    wrong: [],
    sessionByCategory: {},
    // 「順番どおり」モードの継続位置。カテゴリごとに独立して保持する
    // （例: {"__ALL__": 40, "循環器": 15}）。同一条件で再挑戦すると前回の
    // 続きから出題し、末尾に達したら先頭へ循環する。ページ内メモリのみで
    // 保持し、リロードやlocalStorageへの永続化はしない
    // （selectedCategory等、他のセッション状態と同じ扱い）。
    sequentialCursor: {}
  };

  // ---------- utilities ----------

  function byId(id) { return document.getElementById(id); }

  function escapeHtml(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

  function getQueryParam(name) {
    var m = new RegExp('[?&]' + name + '=([^&]*)').exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
  }

  function pct(correct, total) {
    if (!total) return 0;
    return Math.round((correct / total) * 100);
  }

  // ---------- data loading ----------

  function loadQuestions() {
    fetch(DATA_URL, { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        validateData(data);
        app.meta = data;
        app.allQuestions = data.questions;
        app.categories = uniqueCategories(data.questions);
        onDataReady();
      })
      .catch(function (err) {
        showLoadError(err);
      });
  }

  function validateData(data) {
    if (!data || typeof data !== 'object') throw new Error('invalid root');
    if (!Array.isArray(data.questions) || data.questions.length === 0) {
      throw new Error('no questions');
    }
    data.questions.forEach(function (q, i) {
      if (!q.id || !q.category || !q.type || !Array.isArray(q.choices) || !q.answer) {
        throw new Error('malformed question at index ' + i);
      }
    });
  }

  function uniqueCategories(questions) {
    var seen = {};
    var out = [];
    questions.forEach(function (q) {
      if (!seen[q.category]) {
        seen[q.category] = true;
        out.push(q.category);
      }
    });
    return out;
  }

  function showLoadError(err) {
    console.error('[anatomy-quiz] failed to load question data:', err);
    byId('initialLoading').style.display = 'none';
    el.loadError.classList.add('show');
    el.loadError.innerHTML =
      '<strong>問題データを読み込めませんでした。</strong><br>' +
      '通信環境をご確認のうえ、ページを再読み込みしてください。この画面が表示されている間もアプリ自体は壊れていません。' +
      '<br><button type="button" class="btn secondary small" id="retryLoadBtn" style="margin-top:8px;width:auto">再読み込み</button>';
    var retryBtn = byId('retryLoadBtn');
    if (retryBtn) {
      retryBtn.addEventListener('click', function () { location.reload(); });
    }
    el.subtitle.textContent = '総論・循環器・呼吸器・泌尿器　問題データの読み込みに失敗しました';
  }

  function onDataReady() {
    app.ready = true;
    byId('initialLoading').style.display = 'none';
    el.subtitle.textContent = '総論・循環器・呼吸器・泌尿器　全' + app.allQuestions.length + '問';
    updateVersionBadge();

    // レビュー用モード（開発・教員向け、学生向け通常クイズとは分離）。
    // URLクエリで直接指定された場合のみ発動し、通常導線には一切影響しない。
    var reviewMode = getQueryParam('review');
    if (reviewMode === 'images') { renderImageReview(); return; }
    if (reviewMode === 'assets') { renderAssetReview(); return; }

    setupChips();
    adjustCountOptions();
    el.orderSelect.disabled = false;
    el.startBtn.disabled = false;
    el.startBtn.textContent = 'この条件で開始';
    renderIdle();
    renderHistoryPanel();
  }

  function updateVersionBadge() {
    if (!el.versionBadge) return;
    var datasetVersion = (app.meta && app.meta.version) ? app.meta.version : '?';
    el.versionBadge.textContent = 'app ' + APP_BUILD + ' ／ dataset ' + datasetVersion;
    el.versionBadge.style.display = 'block';
  }

  // ---------- settings ----------

  function setupChips() {
    var wrap = el.chapterChips;
    wrap.innerHTML = '';
    var entries = [{ value: CATEGORY_ALL, label: '全分野からランダム' }].concat(
      app.categories.map(function (c) { return { value: c, label: c }; })
    );
    entries.forEach(function (entry) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (entry.value === app.selectedCategory ? ' active' : '');
      b.textContent = entry.label;
      b.setAttribute('data-value', entry.value);
      b.addEventListener('click', function () {
        app.selectedCategory = entry.value;
        setupChips();
        adjustCountOptions();
      });
      wrap.appendChild(b);
    });
  }

  function getPool(category) {
    var cat = category === undefined ? app.selectedCategory : category;
    if (cat === CATEGORY_ALL) return app.allQuestions;
    return app.allQuestions.filter(function (q) { return q.category === cat; });
  }

  function adjustCountOptions() {
    var s = el.countSelect;
    var n = getPool().length;
    var current = parseInt(s.value || '0', 10);
    var opts = COUNT_STEPS.filter(function (step) { return step < n; });
    opts.push(n);
    s.innerHTML = '';
    var matched = false;
    opts.forEach(function (n2) {
      var o = document.createElement('option');
      o.value = String(n2);
      o.textContent = n2 === n ? (n2 + '問（全問）') : (n2 + '問');
      s.appendChild(o);
      if (n2 === current) matched = true;
    });
    s.value = matched ? String(current) : String(opts[Math.min(1, opts.length - 1)] || n);
    s.disabled = false;
  }

  function getRequestedCount(poolSize) {
    var raw = parseInt(el.countSelect.value, 10);
    if (!raw || isNaN(raw)) return poolSize;
    return clamp(raw, 1, poolSize);
  }

  // ---------- quiz flow ----------

  function makeShuffledChoices(q) {
    return shuffle(q.choices.map(function (c) { return { id: c.id, text: c.text }; }));
  }

  function buildQueue(sourceOverride) {
    var pool = sourceOverride ? sourceOverride.slice() : getPool();
    var order = el.orderSelect.value;
    var count = getRequestedCount(pool.length);
    var picked;
    if (order === 'random') {
      picked = shuffle(pool).slice(0, Math.min(count, pool.length));
    } else {
      var sorted = pool.slice().sort(function (a, b) {
        return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
      });
      if (sourceOverride) {
        // 「間違えた問題だけ復習」等の固定リストには継続位置の概念を適用しない
        // （毎回そのリスト全体を、常に先頭から出題する）。
        picked = sorted.slice(0, Math.min(count, sorted.length));
      } else {
        // 「順番どおり」は、同一カテゴリで再挑戦したとき前回の続きから出題し、
        // 末尾に達したら先頭へ循環する。カテゴリごとに継続位置を独立管理する。
        var cursorKey = app.selectedCategory;
        var start = app.sequentialCursor[cursorKey] || 0;
        if (start >= sorted.length) start = 0;
        var n = Math.min(count, sorted.length);
        picked = sorted.slice(start, start + n);
        if (picked.length < n) picked = picked.concat(sorted.slice(0, n - picked.length));
        app.sequentialCursor[cursorKey] = (start + n) % sorted.length;
      }
    }
    app.queue = picked.map(function (q) {
      return {
        source: q,
        shuffledChoices: makeShuffledChoices(q)
      };
    });
    app.index = 0;
    app.correct = 0;
    app.answered = false;
    app.wrong = [];
    app.sessionByCategory = {};
    app.mode = 'quiz';
    updateSettingsVisibility();
    window.scrollTo(0, 0);
  }

  function updateSettingsVisibility() {
    var full = el.settingsFull;
    var collapsed = el.settingsCollapsed;
    if (app.mode === 'quiz') {
      full.style.display = 'none';
      collapsed.style.display = 'flex';
      var catLabel = app.selectedCategory === CATEGORY_ALL ? '全分野' : app.selectedCategory;
      el.settingsSummary.textContent = '出題中：' + catLabel + '　' + app.queue.length + '問';
      el.progressWrap.style.display = 'block';
    } else {
      full.style.display = 'block';
      collapsed.style.display = 'none';
      el.progressWrap.style.display = app.mode === 'result' ? 'block' : 'none';
    }
  }

  function updateTop() {
    var total = app.queue.length;
    var current = 0;
    var progressPct = 0;
    if (total) {
      current = Math.min(app.index + 1, total);
      progressPct = clamp((app.index / total) * 100, 0, 100);
      el.miniScore.textContent = '正解 ' + app.correct + ' / ' + app.index + '　｜　' + current + ' / ' + total;
    } else {
      el.miniScore.textContent = '';
    }
    el.progressFill.style.width = progressPct + '%';
  }

  function scrollQuestionTop() {
    var card = byId('questionCard');
    if (card && card.scrollIntoView) {
      try { card.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      catch (e) { card.scrollIntoView(true); }
    }
  }

  function renderIdle() {
    app.mode = 'idle';
    updateSettingsVisibility();
    el.progressFill.style.width = '0%';
    el.miniScore.textContent = '';
    el.mainArea.innerHTML =
      '<section class="card"><div class="result"><div class="result-msg">出題範囲と出題数を選び、「この条件で開始」を押してください。</div></div></section>';
  }

  function renderQuestion() {
    updateTop();
    if (!app.queue.length) { renderIdle(); return; }
    if (app.index >= app.queue.length) { renderResult(); return; }

    var item = app.queue[app.index];
    var q = item.source;
    var labels = ['A', 'B', 'C', 'D', 'E', 'F'];
    var html = '<section class="card" id="questionCard">';
    html += '<div class="qtop"><span>分野：' + escapeHtml(q.category) + (q.subcategory ? '（' + escapeHtml(q.subcategory) + '）' : '') + '</span><span>問題番号：' + escapeHtml(q.id) + '</span></div>';
    html += '<div class="qcount">問題 ' + (app.index + 1) + ' / ' + app.queue.length + '</div>';
    html += '<p class="question">' + escapeHtml(q.question) + '</p>';
    html += renderImageBlock(q);
    html += '<div class="options" id="options">';
    item.shuffledChoices.forEach(function (c, i) {
      html += '<button type="button" class="option" data-choice-id="' + escapeHtml(c.id) + '">' +
        '<span class="badge">' + labels[i] + '</span>' +
        '<span class="option-text">' + escapeHtml(c.text) + '</span>' +
        '</button>';
    });
    html += '</div><div id="feedbackArea"></div><div class="actions" id="actionArea"></div></section>';
    el.mainArea.innerHTML = html;

    if (q.type === 'image_mcq' && q.image) {
      attachImageHandlers(byId('questionCard'), q.image);
    }

    var buttons = document.querySelectorAll('#options .option');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        answerQuestion(btn.getAttribute('data-choice-id'));
      });
    });

    scrollQuestionTop();
  }

  function answerQuestion(choiceId) {
    if (app.answered) return;
    app.answered = true;
    var item = app.queue[app.index];
    var q = item.source;
    var buttons = document.querySelectorAll('#options .option');
    var isCorrect = choiceId === q.answer;

    buttons.forEach(function (btn) {
      var id = btn.getAttribute('data-choice-id');
      btn.disabled = true;
      if (id === q.answer) {
        btn.classList.add('correct');
        btn.querySelector('.option-text').insertAdjacentHTML('afterend', '<span class="state-icon" aria-hidden="true">✓</span>');
      } else if (id === choiceId) {
        btn.classList.add('wrong');
        btn.querySelector('.option-text').insertAdjacentHTML('afterend', '<span class="state-icon" aria-hidden="true">✗</span>');
      }
    });

    if (isCorrect) app.correct++;
    else app.wrong.push(item);

    recordCategoryResult(app.sessionByCategory, q.category, isCorrect);
    recordHistory(q.category, isCorrect);

    app.index++;

    var correctChoice = q.choices.filter(function (c) { return c.id === q.answer; })[0];
    var feedbackHtml = '<div class="feedback ' + (isCorrect ? 'ok' : 'ng') + '">' +
      '<div class="feedback-head">' + (isCorrect ? '✓ 正解' : '✗ 不正解') + '</div>' +
      '<div class="correct-answer">正答：' + escapeHtml(correctChoice ? correctChoice.text : '') + '</div>' +
      '<div>' + escapeHtml(q.explanation || '') + '</div>' +
      '</div>';
    byId('feedbackArea').innerHTML = feedbackHtml;

    byId('actionArea').innerHTML = '<button type="button" class="btn primary" id="nextBtn">' +
      (app.index >= app.queue.length ? '結果を見る' : '次の問題へ') + '</button>';
    byId('nextBtn').addEventListener('click', function () {
      app.answered = false;
      renderQuestion();
    });

    updateTop();
  }

  function recordCategoryResult(map, category, isCorrect) {
    if (!map[category]) map[category] = { answered: 0, correct: 0 };
    map[category].answered++;
    if (isCorrect) map[category].correct++;
  }

  function renderResult() {
    app.mode = 'result';
    updateSettingsVisibility();
    updateTop();
    el.progressFill.style.width = '100%';

    var total = app.queue.length || 1;
    var scorePct = pct(app.correct, total);
    var msg = 'もう一度確認しましょう。';
    if (scorePct >= 90) msg = 'よく理解できています。';
    else if (scorePct >= 80) msg = '概ね理解できています。';
    else if (scorePct >= 60) msg = '基礎事項をもう一度確認するとよいでしょう。';

    var html = '<section class="card"><div class="result">' +
      '<div class="score">' + scorePct + '%</div>' +
      '<div class="result-msg">' + escapeHtml(msg) + '</div>' +
      '<div class="stats">' +
      '<div class="stat"><strong>' + app.correct + '</strong><span>正解</span></div>' +
      '<div class="stat"><strong>' + (total - app.correct) + '</strong><span>不正解</span></div>' +
      '<div class="stat"><strong>' + total + '</strong><span>出題数</span></div>' +
      '</div>';

    html += renderCategoryTable(app.sessionByCategory, '今回の分野別正答率');

    html += '<div class="actions">' +
      '<button type="button" class="btn primary" id="retryBtn">同じ条件で再挑戦</button>' +
      (app.wrong.length ? '<button type="button" class="btn secondary" id="wrongBtn">間違えた問題だけ復習</button>' : '') +
      '<button type="button" class="btn ghost" id="resetBtn">条件を変える</button>' +
      '</div>';

    if (app.wrong.length) {
      html += '<div class="review"><h3>間違えた問題の確認</h3>';
      app.wrong.forEach(function (item) {
        var q = item.source;
        var correctChoice = q.choices.filter(function (c) { return c.id === q.answer; })[0];
        html += '<details><summary>' + escapeHtml(q.id) + '｜' + escapeHtml(q.category) + '</summary>' +
          '<div class="review-q">' + escapeHtml(q.question) + '</div>' +
          '<div class="review-a"><strong>正答：</strong>' + escapeHtml(correctChoice ? correctChoice.text : '') +
          '<br>' + escapeHtml(q.explanation || '') + '</div></details>';
      });
      html += '</div>';
    }

    html += '</div></section>';
    el.mainArea.innerHTML = html;

    byId('retryBtn').addEventListener('click', function () { buildQueue(); renderQuestion(); });
    var wrongBtn = byId('wrongBtn');
    if (wrongBtn) {
      wrongBtn.addEventListener('click', function () {
        var wrongSources = app.wrong.map(function (item) { return item.source; });
        buildQueue(wrongSources);
        // 復習では選んだ全問を出題する
        app.queue = wrongSources.map(function (q) {
          return { source: q, shuffledChoices: makeShuffledChoices(q) };
        });
        app.mode = 'quiz';
        updateSettingsVisibility();
        renderQuestion();
      });
    }
    byId('resetBtn').addEventListener('click', function () { resetToIdle(); });

    renderHistoryPanel();
    window.scrollTo(0, 0);
  }

  function resetToIdle() {
    app.queue = [];
    app.index = 0;
    app.correct = 0;
    app.answered = false;
    app.wrong = [];
    renderIdle();
  }

  // ---------- images ----------

  function overlaysOf(image) {
    var overlays = [];
    if (image.overlay) overlays.push(image.overlay);
    if (Array.isArray(image.overlays)) overlays = overlays.concat(image.overlays);
    return overlays.filter(function (o) {
      return o && typeof o.x === 'number' && typeof o.y === 'number';
    });
  }

  function renderMarkers(image) {
    return overlaysOf(image).map(function (o) {
      var x = clamp(o.x, 0, 1) * 100;
      var y = clamp(o.y, 0, 1) * 100;
      return '<span class="marker" style="left:' + x + '%;top:' + y + '%">' + escapeHtml(o.label || '') + '</span>';
    }).join('');
  }

  function renderImageBlock(q) {
    if (q.type !== 'image_mcq' || !q.image) return '';
    var image = q.image;
    return '<div class="img-wrap" tabindex="0" role="button" aria-label="' + escapeHtml(image.alt || '画像を拡大表示') + '（タップで拡大）">' +
      '<img src="' + escapeHtml(image.asset) + '" alt="' + escapeHtml(image.alt || '') + '">' +
      renderMarkers(image) +
      '<span class="zoom-hint" aria-hidden="true">タップで拡大</span>' +
      '</div>';
  }

  function attachImageHandlers(container, image) {
    var wrap = container.querySelector('.img-wrap');
    if (!wrap) return;
    var img = wrap.querySelector('img');
    img.addEventListener('error', function () { showImagePlaceholder(wrap, image); }, { once: true });
    var open = function () {
      if (wrap.classList.contains('is-placeholder')) return;
      openZoom(image);
    };
    wrap.addEventListener('click', open);
    wrap.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  }

  function showImagePlaceholder(wrap, image) {
    wrap.classList.add('is-placeholder');
    wrap.removeAttribute('role');
    wrap.removeAttribute('tabindex');
    wrap.setAttribute('aria-label', '画像は準備中です');
    wrap.innerHTML = '<div class="img-placeholder">' +
      '<div class="ph-title">画像準備中</div>' +
      '<div class="ph-alt">' + escapeHtml(image.alt || 'この設問の図はまだ用意されていません。') + '</div>' +
      '</div>';
  }

  function openZoom(image) {
    el.zoomImgWrap.innerHTML = '<img src="' + escapeHtml(image.asset) + '" alt="' + escapeHtml(image.alt || '') + '">' + renderMarkers(image);
    var zoomImg = el.zoomImgWrap.querySelector('img');
    zoomImg.addEventListener('error', function () {
      el.zoomImgWrap.innerHTML = '<div class="img-placeholder"><div class="ph-title">画像準備中</div><div class="ph-alt">' + escapeHtml(image.alt || '') + '</div></div>';
    }, { once: true });
    el.zoomCaption.textContent = image.alt || '';
    el.zoomModal.style.display = 'flex';
    el.zoomClose.focus();
    document.addEventListener('keydown', onZoomKeydown);
  }

  function closeZoom() {
    el.zoomModal.style.display = 'none';
    el.zoomImgWrap.innerHTML = '';
    document.removeEventListener('keydown', onZoomKeydown);
  }

  function onZoomKeydown(e) {
    if (e.key === 'Escape') closeZoom();
  }

  // ---------- image credits（v2.0.1で導入したオープンライセンス画像の出典表示） ----------
  // CC BY / CC BY-SA の帰属表示要件を満たすための最小限の一覧。
  // 詳細な出典URL・取得経緯は docs/v2.0.1_asset_source_log.md を正本とする
  // （このアプリ内表示は要約であり、両者は内容を一致させて保守すること）。
  var IMAGE_CREDITS = [
    {
      title: 'Servier Medical Art',
      meta: 'License: CC BY 4.0　｜　喉頭・心臓外形（前面／後面）・刺激伝導系・心臓弁（弁輪面）・肺胞嚢・血管壁（動脈／静脈）の各画像に使用',
      url: 'https://smart.servier.com/'
    },
    {
      title: 'AnatomyTOOL.org（Servier Medical Art の "no labels" 版の再配布）',
      meta: 'License: CC BY 4.0　｜　上記Servier由来画像の一部は本サイト経由で取得',
      url: 'https://anatomytool.org/'
    },
    {
      title: 'Patrick J. Lynch（医学イラストレーター）／ C. Carl Jaffe, MD',
      meta: 'License: CC BY-SA 4.0　｜　冠状動脈の走行を示す画像に使用（AnatomyTOOL.org経由）',
      url: 'https://anatomytool.org/'
    },
    {
      title: 'OpenStax（Anatomy and Physiology 2e）',
      meta: 'License: CC BY 4.0　｜　人体の3断面（矢状面・冠状面・水平面）を示す画像に使用（元図の文字ラベルは除去のうえ改変。AnatomyTOOL.org経由で取得）',
      url: 'https://openstax.org/details/books/anatomy-and-physiology-2e'
    }
  ];

  function renderCreditsList() {
    if (!el.creditsList) return;
    el.creditsList.innerHTML = IMAGE_CREDITS.map(function (c) {
      return '<div class="credit-item"><div class="credit-title">' + escapeHtml(c.title) + '</div>' +
        '<div class="credit-meta">' + escapeHtml(c.meta) + '　｜　<a href="' + escapeHtml(c.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(c.url) + '</a></div></div>';
    }).join('');
  }

  function openCredits() {
    renderCreditsList();
    el.creditsModal.style.display = 'flex';
    el.creditsClose.focus();
    document.addEventListener('keydown', onCreditsKeydown);
  }

  function closeCredits() {
    el.creditsModal.style.display = 'none';
    document.removeEventListener('keydown', onCreditsKeydown);
  }

  function onCreditsKeydown(e) {
    if (e.key === 'Escape') closeCredits();
  }

  // ---------- review modes (開発・教員用。学生向け通常クイズとは別導線) ----------
  //
  // ?review=images : 75問のimage_mcqを1問ずつ前後送りで確認する。
  // ?review=assets  : 26種のunique asset単位で、そのassetを使う全QIDとmarker配置を確認する。
  //
  // どちらも renderImageBlock()/renderMarkers()/attachImageHandlers() をそのまま呼び出す
  // （通常クイズと完全に同じ関数）ため、レビュー画面だけmarker位置がずれる、といったことは
  // 起こり得ない。zoom拡大時も既存の #zoomModal をそのまま使う。

  function reviewBackLink() {
    return '<div style="margin-bottom:10px"><a href="./" style="font-size:13px;color:var(--muted)">← 通常クイズに戻る</a></div>';
  }

  function renderImageReview() {
    app.mode = 'review-images';
    if (el.settingsFull) el.settingsFull.style.display = 'none';
    if (el.settingsCollapsed) el.settingsCollapsed.style.display = 'none';
    el.progressWrap.style.display = 'none';
    if (!app.reviewList) {
      app.reviewList = app.allQuestions
        .filter(function (q) { return q.type === 'image_mcq'; })
        .slice()
        .sort(function (a, b) { return a.id < b.id ? -1 : a.id > b.id ? 1 : 0; });
      app.reviewIndex = 0;
    }
    renderReviewImageCard();
  }

  function renderReviewImageCard() {
    var list = app.reviewList;
    var i = app.reviewIndex;
    var q = list[i];
    var labels = ['A', 'B', 'C', 'D', 'E', 'F'];
    el.miniScore.textContent = 'image_mcq review ' + (i + 1) + ' / ' + list.length;

    var correctChoice = q.choices.filter(function (c) { return c.id === q.answer; })[0];
    var choicesHtml = q.choices.map(function (c, idx) {
      var isCorrect = c.id === q.answer;
      return '<div class="option' + (isCorrect ? ' correct' : '') + '" style="cursor:default">' +
        '<span class="badge">' + labels[idx] + '</span>' +
        '<span class="option-text">' + escapeHtml(c.text) + '</span>' +
        (isCorrect ? '<span class="state-icon" aria-hidden="true">✓</span>' : '') +
        '</div>';
    }).join('');

    var overlays = overlaysOf(q.image);
    var html = reviewBackLink() + '<section class="card" id="questionCard">';
    html += '<div class="qtop"><span>image_mcq review：' + (i + 1) + ' / ' + list.length + '</span><span>QID：' + escapeHtml(q.id) + '</span></div>';
    html += '<div class="qcount">分野：' + escapeHtml(q.category) + (q.subcategory ? '（' + escapeHtml(q.subcategory) + '）' : '') +
      '　｜　asset：' + escapeHtml(q.image.asset) + '　｜　marker数：' + overlays.length + '</div>';
    html += '<p class="question">' + escapeHtml(q.question) + '</p>';
    html += renderImageBlock(q);
    html += '<div class="options">' + choicesHtml + '</div>';
    html += '<div id="feedbackArea"><div class="feedback ok">' +
      '<div class="feedback-head">正答：' + escapeHtml(correctChoice ? correctChoice.text : '') + '</div>' +
      '<div>' + escapeHtml(q.explanation || '') + '</div></div></div>';
    html += '<div class="actions" id="actionArea">' +
      '<button type="button" class="btn secondary" id="reviewPrevBtn"' + (i === 0 ? ' disabled' : '') + '>← 前へ</button>' +
      '<button type="button" class="btn primary" id="reviewNextBtn"' + (i >= list.length - 1 ? ' disabled' : '') + '>次へ →</button>' +
      '</div>';
    html += '</section>';
    el.mainArea.innerHTML = html;

    attachImageHandlers(byId('questionCard'), q.image);
    var prevBtn = byId('reviewPrevBtn');
    if (prevBtn) prevBtn.addEventListener('click', function () { app.reviewIndex = Math.max(0, app.reviewIndex - 1); renderReviewImageCard(); scrollQuestionTop(); });
    var nextBtn = byId('reviewNextBtn');
    if (nextBtn) nextBtn.addEventListener('click', function () { app.reviewIndex = Math.min(list.length - 1, app.reviewIndex + 1); renderReviewImageCard(); scrollQuestionTop(); });
  }

  function renderAssetReview() {
    app.mode = 'review-assets';
    if (el.settingsFull) el.settingsFull.style.display = 'none';
    if (el.settingsCollapsed) el.settingsCollapsed.style.display = 'none';
    el.progressWrap.style.display = 'none';
    if (!app.assetReviewList) {
      var byAsset = {};
      app.allQuestions.filter(function (q) { return q.type === 'image_mcq'; }).forEach(function (q) {
        var key = q.image.asset;
        if (!byAsset[key]) byAsset[key] = [];
        byAsset[key].push(q);
      });
      app.assetReviewList = Object.keys(byAsset).sort().map(function (asset) {
        return { asset: asset, questions: byAsset[asset] };
      });
      app.assetReviewIndex = 0;
    }
    renderAssetReviewCard();
  }

  function renderAssetReviewCard() {
    var list = app.assetReviewList;
    var i = app.assetReviewIndex;
    var entry = list[i];
    el.miniScore.textContent = 'asset review ' + (i + 1) + ' / ' + list.length;

    // 再制作candidateがあるassetのみ、旧画像／candidateを切り替えて見比べられる
    // ボタンを出す。data/questions_v1.jsonはcandidateパスを一切参照しないため、
    // ここで何を選んでも通常クイズには影響しない。
    var candidatePath = CANDIDATE_ASSETS[entry.asset];
    if (app.assetReviewShowCandidate === undefined) app.assetReviewShowCandidate = false;
    var showCandidate = !!candidatePath && app.assetReviewShowCandidate;
    var displayAsset = showCandidate ? candidatePath : entry.asset;

    // 同じassetを使う全QIDのoverlay/overlaysを1枚の画像上に統合表示する
    // （renderMarkers()自体は変更せず、同じ関数にそのまま渡すだけ）。
    // candidate表示時もmarker座標は現行データのものをそのまま重ねる
    // （正式採用前の見比べ目的であり、まだ座標調整は行っていないため
    // ズレがあり得る点に留意 -- 座標再調整はcandidate正式採用時の別作業）。
    var combinedImage = { asset: displayAsset, alt: entry.questions[0].image.alt, overlays: [] };
    entry.questions.forEach(function (q) {
      overlaysOf(q.image).forEach(function (o) {
        combinedImage.overlays.push({ x: o.x, y: o.y, label: (o.label || '?') + '(' + q.id + ')' });
      });
    });

    var qListHtml = entry.questions.map(function (q) {
      return '<li><strong>' + escapeHtml(q.id) + '</strong>｜' + escapeHtml(q.category) + '｜' + escapeHtml(q.question) + '</li>';
    }).join('');

    var candidateToggleHtml = candidatePath
      ? '<button type="button" class="btn secondary" id="assetCandidateToggle" style="margin-bottom:10px">' +
        (showCandidate ? '← 現行版（accepted）を表示' : 'candidate版を表示 →') + '</button>'
      : '';

    var html = reviewBackLink() + '<section class="card" id="questionCard">';
    html += '<div class="qtop"><span>asset review：' + (i + 1) + ' / ' + list.length + '</span><span>filename：' + escapeHtml(displayAsset) +
      (showCandidate ? '（candidate）' : '') + '</span></div>';
    html += '<div class="qcount">この画像を使用するQID：' + entry.questions.length + '問（差し替え時の影響範囲）</div>';
    html += candidateToggleHtml;
    html += renderImageBlock({ type: 'image_mcq', image: combinedImage });
    html += '<div style="margin-top:14px"><div class="settings-title">使用QID一覧</div><ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.8">' + qListHtml + '</ul></div>';
    html += '<div class="actions" id="actionArea">' +
      '<button type="button" class="btn secondary" id="assetPrevBtn"' + (i === 0 ? ' disabled' : '') + '>← 前へ</button>' +
      '<button type="button" class="btn primary" id="assetNextBtn"' + (i >= list.length - 1 ? ' disabled' : '') + '>次へ →</button>' +
      '</div>';
    html += '</section>';
    el.mainArea.innerHTML = html;

    attachImageHandlers(byId('questionCard'), combinedImage);
    var prevBtn = byId('assetPrevBtn');
    if (prevBtn) prevBtn.addEventListener('click', function () { app.assetReviewIndex = Math.max(0, app.assetReviewIndex - 1); app.assetReviewShowCandidate = false; renderAssetReviewCard(); scrollQuestionTop(); });
    var nextBtn = byId('assetNextBtn');
    if (nextBtn) nextBtn.addEventListener('click', function () { app.assetReviewIndex = Math.min(list.length - 1, app.assetReviewIndex + 1); app.assetReviewShowCandidate = false; renderAssetReviewCard(); scrollQuestionTop(); });
    var toggleBtn = byId('assetCandidateToggle');
    if (toggleBtn) toggleBtn.addEventListener('click', function () { app.assetReviewShowCandidate = !app.assetReviewShowCandidate; renderAssetReviewCard(); });
  }

  // ---------- history (localStorage) ----------

  function defaultHistory() {
    return { version: 1, totalAnswered: 0, totalCorrect: 0, byCategory: {}, updatedAt: null };
  }

  function loadHistory() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultHistory();
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return defaultHistory();
      var base = defaultHistory();
      base.totalAnswered = parsed.totalAnswered || 0;
      base.totalCorrect = parsed.totalCorrect || 0;
      base.byCategory = parsed.byCategory || {};
      base.updatedAt = parsed.updatedAt || null;
      return base;
    } catch (e) {
      return defaultHistory();
    }
  }

  function saveHistory(h) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(h)); }
    catch (e) { /* 端末のストレージが使えない場合は履歴保存のみ諦める */ }
  }

  function recordHistory(category, isCorrect) {
    var h = loadHistory();
    h.totalAnswered++;
    if (isCorrect) h.totalCorrect++;
    recordCategoryResult(h.byCategory, category, isCorrect);
    h.updatedAt = new Date().toISOString();
    saveHistory(h);
  }

  function renderCategoryTable(map, heading) {
    var categories = Object.keys(map);
    if (!categories.length) {
      return '<div class="history-panel-inner"><div class="settings-title">' + escapeHtml(heading) + '</div>' +
        '<div class="history-empty">まだ記録がありません。</div></div>';
    }
    var rows = categories.map(function (c) {
      var v = map[c];
      return '<tr><td>' + escapeHtml(c) + '</td><td>' + v.correct + ' / ' + v.answered + '（' + pct(v.correct, v.answered) + '%）</td></tr>';
    }).join('');
    return '<div class="history-panel-inner"><div class="settings-title">' + escapeHtml(heading) + '</div>' +
      '<table class="history-table"><thead><tr><th>分野</th><th>正答率</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
  }

  function renderHistoryPanel() {
    var h = loadHistory();
    var summary = '<div class="history-summary"><span>累計正答率</span><strong>' +
      pct(h.totalCorrect, h.totalAnswered) + '%</strong><span>（' + h.totalCorrect + ' / ' + h.totalAnswered + '問）</span></div>';
    var table = renderCategoryTable(h.byCategory, '分野別正答率（累計）');
    var resetBtn = '<button type="button" class="btn ghost small" id="historyResetBtn">学習履歴をリセット</button>';
    el.historyPanel.innerHTML = summary + table + resetBtn;
    var btn = byId('historyResetBtn');
    if (btn) {
      btn.addEventListener('click', function () {
        if (window.confirm('保存されている学習履歴（累計正答率など）をリセットします。よろしいですか？')) {
          try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* noop */ }
          renderHistoryPanel();
        }
      });
    }
  }

  function toggleHistoryPanel() {
    var open = el.historyPanel.style.display !== 'none';
    el.historyPanel.style.display = open ? 'none' : 'block';
    el.historyToggleBtn.setAttribute('aria-expanded', String(!open));
    el.historyToggleBtn.textContent = open ? '学習履歴を見る' : '学習履歴を閉じる';
    if (!open) renderHistoryPanel();
  }

  // ---------- keyboard ----------

  function onGlobalKeydown(e) {
    if (app.mode !== 'quiz') return;
    if (!app.answered) {
      var idx = { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5 }[e.key];
      if (idx !== undefined) {
        var buttons = document.querySelectorAll('#options .option');
        if (buttons[idx]) { e.preventDefault(); buttons[idx].click(); }
      }
    } else if (e.key === 'Enter') {
      var nextBtn = byId('nextBtn');
      if (nextBtn) { e.preventDefault(); nextBtn.click(); }
    }
  }

  // ---------- wiring ----------

  function cacheEls() {
    el.subtitle = byId('subtitle');
    el.miniScore = byId('miniScore');
    el.fileNotice = byId('fileNotice');
    el.loadError = byId('loadError');
    el.settingsFull = byId('settingsFull');
    el.settingsCollapsed = byId('settingsCollapsed');
    el.settingsSummary = byId('settingsSummary');
    el.changeSettingsBtn = byId('changeSettingsBtn');
    el.chapterChips = byId('chapterChips');
    el.countSelect = byId('countSelect');
    el.orderSelect = byId('orderSelect');
    el.startBtn = byId('startBtn');
    el.historyToggleBtn = byId('historyToggleBtn');
    el.historyPanel = byId('historyPanel');
    el.progressWrap = byId('progressWrap');
    el.progressFill = byId('progressFill');
    el.mainArea = byId('mainArea');
    el.zoomModal = byId('zoomModal');
    el.zoomImgWrap = byId('zoomImgWrap');
    el.zoomCaption = byId('zoomCaption');
    el.zoomClose = byId('zoomClose');
    el.versionBadge = byId('versionBadge');
    el.updateBanner = byId('updateBanner');
    el.updateReloadBtn = byId('updateReloadBtn');
    el.creditsOpenBtn = byId('creditsOpenBtn');
    el.creditsModal = byId('creditsModal');
    el.creditsClose = byId('creditsClose');
    el.creditsList = byId('creditsList');
  }

  function bindStaticEvents() {
    el.startBtn.addEventListener('click', function () { buildQueue(); renderQuestion(); });
    el.changeSettingsBtn.addEventListener('click', function () { resetToIdle(); });
    el.historyToggleBtn.addEventListener('click', toggleHistoryPanel);
    el.zoomClose.addEventListener('click', closeZoom);
    el.zoomModal.addEventListener('click', function (e) {
      if (e.target === el.zoomModal) closeZoom();
    });
    if (el.creditsOpenBtn) el.creditsOpenBtn.addEventListener('click', openCredits);
    if (el.creditsClose) el.creditsClose.addEventListener('click', closeCredits);
    if (el.creditsModal) el.creditsModal.addEventListener('click', function (e) {
      if (e.target === el.creditsModal) closeCredits();
    });
    document.addEventListener('keydown', onGlobalKeydown);

    if (location.protocol === 'file:') {
      el.fileNotice.classList.add('show');
    } else {
      el.fileNotice.classList.remove('show');
    }
  }

  // installed PWA（特にiOS Safariのホーム画面追加）では、新しいsw.js/index.html/app.jsが
  // 実際にはproductionへ公開済みでも、ブラウザ側の更新チェックが走るまで古い版が表示され続ける
  // ことがある。ここでは既存のキャッシュ戦略（sw.jsのCORE_ASSETS/IMAGE_ASSETS precache、
  // networkFirst/cacheFirst）には一切手を触れず、「新しい版が用意できた」ことをユーザーへ
  // 知らせる軽量な通知バーのみを追加する。自動リロードは行わない
  // （進行中のクイズ回答が消える事故を避けるため。無限リロードループの回避にもなる）。
  function showUpdateBanner() {
    if (!el.updateBanner) return;
    el.updateBanner.style.display = 'flex';
  }

  function watchForServiceWorkerUpdate(registration) {
    if (!registration) return;
    // すでにinstalling中のワーカーがいる場合（ページ読込直後にupdatefoundが先に発火していた場合）にも対応
    function trackInstalling(worker) {
      if (!worker) return;
      worker.addEventListener('statechange', function () {
        // controllerが既に存在する = 初回インストールではなく「更新」であるケースのみ通知する
        if (worker.state === 'installed' && navigator.serviceWorker.controller) {
          showUpdateBanner();
        }
      });
    }
    trackInstalling(registration.installing);
    registration.addEventListener('updatefound', function () {
      trackInstalling(registration.installing);
    });

    // 起動時と、タブがバックグラウンドから復帰したタイミングで能動的に更新確認する
    // （sw.jsのfetchハンドラやCache Storageの中身には一切影響しない、registration.update()のみ）。
    registration.update().catch(function () { /* オフライン等で失敗しても致命的ではない */ });
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        registration.update().catch(function () { /* noop */ });
      }
    });
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    var isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    if (location.protocol !== 'https:' && !isLocalhost) return;
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js')
        .then(function (registration) { watchForServiceWorkerUpdate(registration); })
        .catch(function () { /* PWA機能が使えないだけで、アプリ自体は動作継続 */ });
    });
    if (el.updateReloadBtn) {
      el.updateReloadBtn.addEventListener('click', function () { location.reload(); });
    }
  }

  function init() {
    cacheEls();
    bindStaticEvents();
    registerServiceWorker();
    loadQuestions();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
