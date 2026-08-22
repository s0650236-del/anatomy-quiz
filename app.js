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
    sessionByCategory: {}
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
    setupChips();
    adjustCountOptions();
    el.orderSelect.disabled = false;
    el.startBtn.disabled = false;
    el.startBtn.textContent = 'この条件で開始';
    renderIdle();
    renderHistoryPanel();
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
    var picked = order === 'random' ? shuffle(pool) : pool.slice().sort(function (a, b) {
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });
    picked = picked.slice(0, Math.min(count, picked.length));
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
  }

  function bindStaticEvents() {
    el.startBtn.addEventListener('click', function () { buildQueue(); renderQuestion(); });
    el.changeSettingsBtn.addEventListener('click', function () { resetToIdle(); });
    el.historyToggleBtn.addEventListener('click', toggleHistoryPanel);
    el.zoomClose.addEventListener('click', closeZoom);
    el.zoomModal.addEventListener('click', function (e) {
      if (e.target === el.zoomModal) closeZoom();
    });
    document.addEventListener('keydown', onGlobalKeydown);

    if (location.protocol === 'file:') {
      el.fileNotice.classList.add('show');
    } else {
      el.fileNotice.classList.remove('show');
    }
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    var isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    if (location.protocol !== 'https:' && !isLocalhost) return;
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').catch(function () { /* PWA機能が使えないだけで、アプリ自体は動作継続 */ });
    });
  }

  function init() {
    cacheEls();
    bindStaticEvents();
    registerServiceWorker();
    loadQuestions();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
