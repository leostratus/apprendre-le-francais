window.APP = window.APP || {};
APP.tools = APP.tools || {};

APP.tools.analyzer = (function () {
  var i18n = APP.i18n;
  var H = APP.dataHelpers;
  var STORE_KEY = 'sft.analyzer.text';
  var DEEPL_KEY_STORE = 'sft.analyzer.deeplKey';
  var currentTextarea = null;

  var POS_LABEL = {
    art: { en: 'article', fr: 'article' },
    det: { en: 'determiner', fr: 'déterminant' },
    pron: { en: 'pronoun', fr: 'pronom' },
    verb: { en: 'verb', fr: 'verbe' },
    noun: { en: 'noun', fr: 'nom' },
    propnoun: { en: 'proper noun', fr: 'nom propre' },
    adj: { en: 'adjective', fr: 'adjectif' },
    adv: { en: 'adverb', fr: 'adverbe' },
    prep: { en: 'preposition', fr: 'préposition' },
    conj: { en: 'conjunction', fr: 'conjonction' },
    neg: { en: 'negation', fr: 'négation' },
    num: { en: 'number', fr: 'nombre' },
    interj: { en: 'interjection', fr: 'interjection' }
  };
  var POS_ORDER = ['art', 'det', 'pron', 'verb', 'noun', 'propnoun', 'adj', 'adv', 'prep', 'conj', 'neg', 'num', 'interj'];

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  // Split a raw sentence into displayable tokens: words (with any leading
  // elision like "l'" split off as its own token) and separators (spaces,
  // punctuation) kept verbatim so the rendered line reads exactly as typed.
  function tokenize(text) {
    var tokens = [];
    var chunks = text.split(/(\s+)/);
    chunks.forEach(function (chunk) {
      if (!chunk) return;
      if (/^\s+$/.test(chunk)) { tokens.push({ type: 'space', text: chunk }); return; }

      var rest = chunk;
      var leadPunct = rest.match(/^[«"“'’(]+/);
      if (leadPunct) { tokens.push({ type: 'punct', text: leadPunct[0] }); rest = rest.slice(leadPunct[0].length); }

      var elision = rest.match(/^([ldjnmtscLDJNMTSC]|[Qq]u|[Jj]usqu)['’]/);
      if (elision) {
        tokens.push({ type: 'word', text: elision[0] });
        rest = rest.slice(elision[0].length);
      }

      var trailPunct = rest.match(/[.,;:!?»"”')]+$/);
      var core = trailPunct ? rest.slice(0, -trailPunct[0].length) : rest;
      if (core) tokens.push({ type: 'word', text: core });
      if (trailPunct) tokens.push({ type: 'punct', text: trailPunct[0] });
    });
    return tokens;
  }

  function analyzeWord(word, isSentenceStart, extPOS, extIPA) {
    var clean = word.replace(/[^a-zA-ZÀ-ÿœŒ'’-]/g, '').toLowerCase();
    var dictPOS = APP.data.wordPOS && APP.data.wordPOS[clean];
    var dictIPA = APP.data.wordIPA && APP.data.wordIPA[clean];
    var pos = dictPOS || extPOS || (!isSentenceStart && /^[A-ZÀ-Þ]/.test(word) ? 'propnoun' : null);
    var ipa = dictIPA || extIPA || null;
    return { word: word, pos: pos, ipa: ipa };
  }

  // posArr/ipaArr, when given, are arrays parallel to the word-type tokens
  // (in order) holding fr-compromise/espeak-ng results once loaded; null
  // entries mean "not resolved yet or alignment failed", so the per-word
  // fallback in analyzeWord() is used instead.
  function renderTokens(container, text, tokens, posArr, ipaArr) {
    container.innerHTML = '';
    if (!text.trim()) {
      container.appendChild(el('div', 'ws-empty', i18n.s('analyzer_placeholder_empty')));
      return;
    }

    var wrap = el('div', 'analyzer-tokens');
    var seenWord = false;
    var wordIdx = 0;
    tokens.forEach(function (t) {
      if (t.type === 'space') { wrap.appendChild(document.createTextNode(' ')); return; }
      if (t.type === 'punct') { wrap.appendChild(el('span', 'analyzer-punct', t.text)); return; }

      var isStart = !seenWord;
      seenWord = true;
      var idx = wordIdx++;
      var extPOS = posArr ? posArr[idx] : null;
      var extIPA = ipaArr ? ipaArr[idx] : null;
      var a = analyzeWord(t.text, isStart, extPOS, extIPA);
      var card = el('div', 'token-card');
      card.innerHTML =
        '<div class="token-word">' + H.say(t.text, t.text) + '</div>' +
        '<div class="token-pos">' + (a.pos ? i18n.t(POS_LABEL[a.pos] || { en: a.pos, fr: a.pos }) : '…') + '</div>' +
        '<div class="token-ipa">' + (a.ipa ? '/' + H.ipa(a.ipa) + '/' : '…') + '</div>';
      wrap.appendChild(card);
    });
    container.appendChild(wrap);
    APP.speech.wireSpeakers(container);
  }

  // Maps fr-compromise's tag set to the site's own POS codes. Order matters:
  // a term can carry several tags (e.g. "Je" gets both Noun and Pronoun), so
  // the more specific/reliable tag is checked first.
  function mapCompromiseTags(tags) {
    var set = {};
    (tags || []).forEach(function (tg) { set[tg] = true; });
    if (set.Pronoun) return 'pron';
    if (set.Negative) return 'neg';
    if (set.Determiner) return 'det';
    if (set.Article) return 'art';
    if (set.Verb || set.Copula) return 'verb';
    if (set.Adjective) return 'adj';
    if (set.Adverb) return 'adv';
    if (set.Preposition) return 'prep';
    if (set.Conjunction) return 'conj';
    if (set.Value) return 'num';
    if (set.Noun) return 'noun';
    return null;
  }

  // Aligns fr-compromise's own term list against our word tokens by text
  // match with a small lookahead window, since fr-compromise sometimes
  // emits extra empty-text terms around elisions that would otherwise throw
  // off a strict positional zip.
  function alignCompromise(wordTokens, terms, posArr) {
    var j = 0;
    for (var i = 0; i < wordTokens.length; i++) {
      var target = wordTokens[i].text.replace(/[’]/g, "'").toLowerCase();
      var found = -1;
      for (var k = j; k < Math.min(terms.length, j + 4); k++) {
        var tt = (terms[k].text || '').replace(/[’]/g, "'").trim().toLowerCase();
        if (tt && (tt === target || tt === target.replace(/['-]$/, ''))) { found = k; break; }
      }
      if (found === -1) continue;
      var pos = mapCompromiseTags(terms[found].tags);
      if (pos) posArr[i] = pos;
      j = found + 1;
    }
  }

  function updateTranslateLinks(root, text) {
    var q = encodeURIComponent(text.trim());
    var gt = root.querySelector('.analyzer-gt');
    var dl = root.querySelector('.analyzer-dl');
    var has = !!text.trim();
    if (gt) {
      gt.href = has ? 'https://translate.google.com/?sl=fr&tl=en&text=' + q + '&op=translate' : '#';
      gt.classList.toggle('is-disabled', !has);
    }
    if (dl) {
      dl.href = has ? 'https://www.deepl.com/translator#fr/en/' + q : '#';
      dl.classList.toggle('is-disabled', !has);
    }
  }

  function saveText(text) {
    try { localStorage.setItem(STORE_KEY, text); } catch (e) {}
  }
  function loadText() {
    try { return localStorage.getItem(STORE_KEY) || ''; } catch (e) { return ''; }
  }
  function saveDeeplKey(key) {
    try { localStorage.setItem(DEEPL_KEY_STORE, key); } catch (e) {}
  }
  function loadDeeplKey() {
    try { return localStorage.getItem(DEEPL_KEY_STORE) || ''; } catch (e) { return ''; }
  }

  function setPanelState(panel, state, text) {
    panel.className = 'translate-panel translate-' + state;
    var body = panel.querySelector('.translate-body');
    if (!body) return;
    if (state === 'idle') body.innerHTML = '<span class="translate-muted">' + i18n.s('analyzer_translate_idle') + '</span>';
    else if (state === 'loading') body.innerHTML = '<span class="translate-muted">' + i18n.s('analyzer_translate_loading') + '</span>';
    else if (state === 'error') body.innerHTML = '<span class="translate-muted">' + text + '</span>';
    else body.textContent = text;
  }

  function mount(root) {
    root.innerHTML = '';

    var header = el('div', 'tool-header');
    header.innerHTML =
      '<div class="eyebrow">' + i18n.s('analyzer_eyebrow') + '</div>' +
      '<h1>' + i18n.s('analyzer_title') + '</h1>' +
      '<p class="intro">' + i18n.s('analyzer_intro') + '</p>';
    root.appendChild(header);

    var callout = el('div', 'callout neutral', i18n.s('analyzer_disclaimer'));
    root.appendChild(callout);

    var inputWrap = el('div', 'analyzer-input-wrap');
    var textarea = document.createElement('textarea');
    textarea.className = 'analyzer-input';
    textarea.rows = 3;
    textarea.placeholder = i18n.s('analyzer_placeholder');
    textarea.value = loadText();
    currentTextarea = textarea;
    inputWrap.appendChild(textarea);
    root.appendChild(inputWrap);

    // ── breakdown ──
    var sh = el('div', 'sh');
    sh.innerHTML = '<div class="sh-marker">§</div><h2>' + i18n.s('analyzer_breakdown') + '</h2>';
    root.appendChild(sh);
    var tokensContainer = el('div');
    root.appendChild(tokensContainer);

    // ── translations ──
    var shT = el('div', 'sh');
    shT.innerHTML = '<div class="sh-marker">§</div><h2>' + i18n.s('analyzer_translations') + '</h2>';
    root.appendChild(shT);

    var translateGrid = el('div', 'translate-grid');

    var gtPanel = el('div', 'translate-panel translate-idle');
    gtPanel.innerHTML =
      '<div class="translate-head"><span>Google Translate</span><a class="translate-open analyzer-gt" target="_blank" rel="noopener">' + i18n.s('analyzer_open') + '</a></div>' +
      '<div class="translate-body"></div>';
    translateGrid.appendChild(gtPanel);

    var dlPanel = el('div', 'translate-panel translate-idle');
    dlPanel.innerHTML =
      '<div class="translate-head"><span>DeepL</span><a class="translate-open analyzer-dl" target="_blank" rel="noopener">' + i18n.s('analyzer_open') + '</a></div>' +
      '<div class="translate-body"></div>' +
      '<div class="translate-key-row">' +
      '<input type="password" class="translate-key-input" placeholder="' + i18n.s('analyzer_deepl_key_placeholder') + '" autocomplete="off">' +
      '</div>' +
      '<div class="translate-key-note">' + i18n.s('analyzer_deepl_key_note') + '</div>';
    translateGrid.appendChild(dlPanel);

    root.appendChild(translateGrid);

    var keyInput = dlPanel.querySelector('.translate-key-input');
    keyInput.value = loadDeeplKey();

    setPanelState(gtPanel, 'idle');
    setPanelState(dlPanel, 'idle');

    // ── legend ──
    var legendSh = el('div', 'sh');
    legendSh.innerHTML = '<div class="sh-marker">§</div><h2>' + i18n.s('analyzer_legend_title') + '</h2>';
    root.appendChild(legendSh);
    var legend = el('div', 'analyzer-legend');
    legend.innerHTML = POS_ORDER.map(function (p) {
      return '<span class="analyzer-legend-item"><code>' + p + '</code> ' + i18n.t(POS_LABEL[p]) + '</span>';
    }).join('');
    root.appendChild(legend);

    var debounceTimer = null;
    var requestSeq = 0;
    var renderSeq = 0;

    function runTranslations(text) {
      var seq = ++requestSeq;
      var trimmed = text.trim();

      if (!trimmed) {
        setPanelState(gtPanel, 'idle');
        setPanelState(dlPanel, 'idle');
        return;
      }

      setPanelState(gtPanel, 'loading');
      APP.translate.google(trimmed, 'fr', i18n.getLang()).then(function (result) {
        if (seq !== requestSeq) return;
        setPanelState(gtPanel, 'result', result);
      }).catch(function () {
        if (seq !== requestSeq) return;
        setPanelState(gtPanel, 'error', i18n.s('analyzer_translate_error'));
      });

      var key = keyInput.value.trim();
      if (!key) {
        setPanelState(dlPanel, 'idle');
        return;
      }
      setPanelState(dlPanel, 'loading');
      APP.translate.deepl(trimmed, 'fr', i18n.getLang() === 'fr' ? 'fr' : 'en', key).then(function (result) {
        if (seq !== requestSeq) return;
        setPanelState(dlPanel, 'result', result);
      }).catch(function () {
        if (seq !== requestSeq) return;
        setPanelState(dlPanel, 'error', i18n.s('analyzer_translate_error'));
      });
    }

    // Kicks off fr-compromise (POS) and espeak-ng (IPA) in the background and
    // re-renders in place as each resolves — independently, so a slow one
    // doesn't hold back the other. Guarded by renderSeq so a stale result
    // from a since-edited sentence never overwrites a newer render.
    function runUpgrades(text, tokens, wordTokens, seq) {
      if (!wordTokens.length) return;
      var posArr = new Array(wordTokens.length).fill(null);
      var ipaArr = new Array(wordTokens.length).fill(null);

      APP.nlpEngines.loadFrCompromise().then(function (nlp) {
        if (seq !== renderSeq) return;
        var doc = nlp(text);
        var terms = ((doc.json()[0] || {}).terms) || [];
        alignCompromise(wordTokens, terms, posArr);
        renderTokens(tokensContainer, text, tokens, posArr, ipaArr);
        APP.phonemeColor.apply(tokensContainer);
      }).catch(function () {});

      APP.nlpEngines.transcribeSentence(text, 'fr').then(function (raw) {
        if (seq !== renderSeq) return;
        var parts = raw.split(/\s+/).filter(Boolean);
        if (parts.length !== wordTokens.length) return; // alignment not safe, skip
        for (var i = 0; i < parts.length; i++) ipaArr[i] = parts[i];
        renderTokens(tokensContainer, text, tokens, posArr, ipaArr);
        APP.phonemeColor.apply(tokensContainer);
      }).catch(function () {});
    }

    function refresh() {
      var text = textarea.value;
      var seq = ++renderSeq;
      var tokens = tokenize(text);
      var wordTokens = tokens.filter(function (t) { return t.type === 'word'; });

      renderTokens(tokensContainer, text, tokens, null, null);
      updateTranslateLinks(root, text);
      APP.phonemeColor.apply(tokensContainer);

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        runTranslations(text);
        runUpgrades(text, tokens, wordTokens, seq);
      }, 500);
    }

    textarea.addEventListener('input', function () {
      saveText(textarea.value);
      refresh();
    });

    keyInput.addEventListener('input', function () {
      saveDeeplKey(keyInput.value.trim());
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () { runTranslations(textarea.value); }, 500);
    });

    refresh();
  }

  function renderAll(root) { /* no-op: analyzer re-renders live on input */ }
  function clearAll() {
    saveText('');
    if (currentTextarea) {
      currentTextarea.value = '';
      currentTextarea.dispatchEvent(new Event('input'));
    }
  }

  return { mount: mount, renderAll: renderAll, clearAll: clearAll };
})();
