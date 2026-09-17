window.APP = window.APP || {};
APP.tools = APP.tools || {};

APP.tools.analyzer = (function () {
  var i18n = APP.i18n;
  var H = APP.dataHelpers;
  var STORE_KEY = 'sft.analyzer.text';
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

  function analyzeWord(word, isSentenceStart) {
    var pos = APP.posTagger.tag(word, isSentenceStart);
    var ipa = APP.g2p.transcribe(word, pos);
    return { word: word, pos: pos, ipa: ipa };
  }

  function renderTokens(container, text) {
    container.innerHTML = '';
    if (!text.trim()) {
      container.appendChild(el('div', 'ws-empty', i18n.s('analyzer_placeholder_empty')));
      return;
    }

    var tokens = tokenize(text);
    var wrap = el('div', 'analyzer-tokens');
    var seenWord = false;
    tokens.forEach(function (t) {
      if (t.type === 'space') { wrap.appendChild(document.createTextNode(' ')); return; }
      if (t.type === 'punct') { wrap.appendChild(el('span', 'analyzer-punct', t.text)); return; }

      var isStart = !seenWord;
      seenWord = true;
      var a = analyzeWord(t.text, isStart);
      var card = el('div', 'token-card');
      card.innerHTML =
        '<div class="token-word">' + H.say(t.text, t.text) + '</div>' +
        '<div class="token-pos">' + i18n.t(POS_LABEL[a.pos] || { en: a.pos, fr: a.pos }) + '</div>' +
        '<div class="token-ipa">' + (a.ipa ? '/' + H.ipa(a.ipa) + '/' : '') + '</div>';
      wrap.appendChild(card);
    });
    container.appendChild(wrap);
    APP.speech.wireSpeakers(container);
  }

  function updateTranslateLinks(root, text) {
    var q = encodeURIComponent(text.trim());
    var gt = root.querySelector('.analyzer-gt');
    var dl = root.querySelector('.analyzer-dl');
    var has = !!text.trim();
    if (gt) {
      gt.href = has ? 'https://translate.google.com/?sl=fr&tl=en&text=' + q + '&op=translate' : '#';
      gt.setAttribute('aria-disabled', String(!has));
      gt.classList.toggle('is-disabled', !has);
    }
    if (dl) {
      dl.href = has ? 'https://www.deepl.com/translator#fr/en/' + q : '#';
      dl.setAttribute('aria-disabled', String(!has));
      dl.classList.toggle('is-disabled', !has);
    }
  }

  function saveText(text) {
    try { localStorage.setItem(STORE_KEY, text); } catch (e) {}
  }
  function loadText() {
    try { return localStorage.getItem(STORE_KEY) || ''; } catch (e) { return ''; }
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

    var actions = el('div', 'analyzer-actions');
    actions.innerHTML =
      '<a class="nav-btn analyzer-gt" target="_blank" rel="noopener">' + i18n.s('analyzer_google') + '</a>' +
      '<a class="nav-btn analyzer-dl" target="_blank" rel="noopener">' + i18n.s('analyzer_deepl') + '</a>';
    root.appendChild(actions);

    var sh = el('div', 'sh');
    sh.innerHTML = '<div class="sh-marker">§</div><h2>' + i18n.s('analyzer_breakdown') + '</h2>';
    root.appendChild(sh);

    var tokensContainer = el('div');
    root.appendChild(tokensContainer);

    var legendSh = el('div', 'sh');
    legendSh.innerHTML = '<div class="sh-marker">§</div><h2>' + i18n.s('analyzer_legend_title') + '</h2>';
    root.appendChild(legendSh);
    var legend = el('div', 'analyzer-legend');
    legend.innerHTML = POS_ORDER.map(function (p) {
      return '<span class="analyzer-legend-item"><code>' + p + '</code> ' + i18n.t(POS_LABEL[p]) + '</span>';
    }).join('');
    root.appendChild(legend);

    function refresh() {
      renderTokens(tokensContainer, textarea.value);
      updateTranslateLinks(root, textarea.value);
      APP.phonemeColor.apply(tokensContainer);
    }

    textarea.addEventListener('input', function () {
      saveText(textarea.value);
      refresh();
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
