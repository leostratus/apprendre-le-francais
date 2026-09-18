// Colors the vowels in ordinary French words wherever they appear in a
// table cell — not just where a page already shows an IPA transcription.
// Every wizard result table (adverbs, adjectives, nouns, passé composé)
// shows plain French vocabulary with no phonemic data attached at all, so
// this fetches real pronunciations from espeak-ng at render time and
// reuses the same spelling-pattern catalog and alignment approach built for
// the Sounds page, instead of duplicating per-page data.
window.APP = window.APP || {};

APP.wordPhonemeColor = (function () {
  var NEUTRAL = ' .\'’ˈˌː-‿|';
  var NASAL_BASE = 'ɔɑɛœ';
  var TILDE = '̃';
  var COMBO2 = ['wa', 'aj', 'ɛj', 'œj', 'uj', 'jø', 'wɛ̃', 'jɛ̃', 'jɔ̃', 'jɑ̃', 'ks', 'gz', 'sj'];
  // Reverse of COMBO2: lets align() split a merged combo back into its two
  // original phonemes on demand, for words that spell them separately
  // (watt: w+a) rather than as the fused digraph (oi/oê).
  var COMBO_PARTS = {};
  COMBO2.forEach(function (combo) { COMBO_PARTS[combo] = [combo.slice(0, 1), combo.slice(1)]; });

  var IPA_OVERRIDE = {
    'fils': 'fis'
  };
  var BREAKDOWN_OVERRIDE = {
    'décembre': [['d', 'd'], ['é', 'e'], ['c', 's'], ['em', 'ɑ̃'], ['b', 'b'], ['r', 'ʁ'], ['e', null]],
    'compter': [['c', 'k'], ['om', 'ɔ̃'], ['p', null], ['t', 't'], ['er', 'e']],
    'camping': [['c', 'k'], ['am', 'ɑ̃'], ['p', 'p'], ['ing', 'ŋ']],
    'action': [['a', 'a'], ['c', 'k'], ['tion', 'sj']],
    'distinct': [['d', 'd'], ['i', 'i'], ['s', 's'], ['t', 't'], ['in', 'ɛ̃'], ['ct', null]],
    'caillou': [['c', 'k'], ['a', 'a'], ['ill', 'j'], ['ou', 'u']],
    'fille': [['f', 'f'], ['ill', 'j'], ['e', null]],
    'yacht': [['y', 'j'], ['ach', 'ɔ'], ['t', 't']],
    'watt': [['w', null], ['a', 'a'], ['tt', 't']],
    'poulet': [['p', 'p'], ['ou', 'u'], ['l', 'l'], ['et', 'ɛ']],
    'ticket': [['t', 't'], ['i', 'i'], ['ck', 'k'], ['e', 'ɛ'], ['t', null]],
    'femme': [['f', 'f'], ['e', 'a'], ['mm', 'm'], ['e', null]]
  };

  var RULES_BY_IPA = null;
  var ALL_RULES = null;

  function bareIpa(ipa) { return ipa.replace(/\//g, ''); }

  function buildCatalog() {
    if (RULES_BY_IPA) return;
    RULES_BY_IPA = {};
    ALL_RULES = [
      { spelling: 'c', ipa: 'k' },
      { spelling: 'g', ipa: 'g' },
      { spelling: 'cé', ipa: 's' }
    ];
    (APP.data.sons || []).forEach(function (entry) {
      var ipa = bareIpa(entry.ipa);
      RULES_BY_IPA[ipa] = RULES_BY_IPA[ipa] || [];
      entry.items.forEach(function (it) {
        if (it.spelling === 'e+CC') return;
        RULES_BY_IPA[ipa].push(it.spelling.toLowerCase());
        ALL_RULES.push({ spelling: it.spelling.toLowerCase(), ipa: ipa });
      });
    });
    Object.keys(RULES_BY_IPA).forEach(function (k) {
      RULES_BY_IPA[k] = Array.from(new Set(RULES_BY_IPA[k])).sort(function (a, b) { return b.length - a.length; });
    });
    ALL_RULES.sort(function (a, b) { return b.spelling.length - a.spelling.length; });
  }

  function tokenizePhonemes(raw) {
    raw = raw.replace(/ɡ/g, 'g');
    var chars = [];
    for (var i = 0; i < raw.length; i++) { if (NEUTRAL.indexOf(raw[i]) === -1) chars.push(raw[i]); }
    var toks = [];
    for (var i = 0; i < chars.length; i++) {
      if (NASAL_BASE.indexOf(chars[i]) !== -1 && chars[i + 1] === TILDE) { toks.push(chars[i] + chars[i + 1]); i++; }
      else toks.push(chars[i]);
    }
    var out = [];
    for (var j = 0; j < toks.length; j++) {
      if (j + 1 < toks.length && COMBO2.indexOf(toks[j] + toks[j + 1]) !== -1) { out.push(toks[j] + toks[j + 1]); j++; }
      else out.push(toks[j]);
    }
    return out;
  }

  function align(letters, rawIpa) {
    buildCatalog();
    var phonemes = tokenizePhonemes(rawIpa);
    var pos = 0, pi = 0, segs = [], guard = 0;
    while (pos < letters.length && guard++ < 500) {
      var advanced = false;
      if (pi < phonemes.length) {
        var target = phonemes[pi];
        if (target === 'ɛ') {
          var m = letters.slice(pos).match(/^e([bcdfgjklmnpqrstvz])\1/i);
          if (m) { segs.push({ text: letters.slice(pos, pos + m[0].length), ipa: target }); pos += m[0].length; pi++; advanced = true; }
          else if (/^e(?=x)/i.test(letters.slice(pos))) {
            segs.push({ text: letters[pos], ipa: target }); pos += 1; pi++; advanced = true;
          }
        }
        var cands = RULES_BY_IPA[target] || [];
        for (var c = 0; !advanced && c < cands.length; c++) {
          var sp = cands[c];
          if (letters.slice(pos, pos + sp.length).toLowerCase() === sp) {
            segs.push({ text: letters.slice(pos, pos + sp.length), ipa: target });
            pos += sp.length; pi++; advanced = true; break;
          }
        }
      }
      if (advanced) continue;
      if (pi < phonemes.length && COMBO_PARTS[phonemes[pi]]) {
        var parts = COMBO_PARTS[phonemes[pi]];
        phonemes.splice(pi, 1, parts[0], parts[1]);
        continue;
      }
      var remaining = {};
      for (var k = pi; k < phonemes.length; k++) remaining[phonemes[k]] = true;
      var found = null;
      for (var r = 0; r < ALL_RULES.length; r++) {
        var rule = ALL_RULES[r];
        if (!remaining[rule.ipa]) continue;
        if (letters.slice(pos, pos + rule.spelling.length).toLowerCase() === rule.spelling) { found = rule; break; }
      }
      if (found) {
        segs.push({ text: letters.slice(pos, pos + found.spelling.length), ipa: found.ipa });
        pos += found.spelling.length;
        if (pi < phonemes.length && phonemes[pi] === found.ipa) pi++;
        continue;
      }
      segs.push({ text: letters[pos], ipa: null });
      pos++;
    }
    return segs;
  }

  // Each transcribeSentence() call re-instantiates an ~18MB WASM module, so
  // firing one per word in parallel (Promise.all over dozens of words) can
  // stall or crash the tab. colorWords() batches every word a page needs
  // into a single call instead.
  var wordCache = {};

  function segsForOverride(word, core) {
    var segs = BREAKDOWN_OVERRIDE[core].map(function (p) { return { text: p[0], ipa: p[1] }; });
    var suffix = word.slice(core.length);
    if (suffix) segs.push({ text: suffix, ipa: null });
    return segs;
  }

  // colorWords(words) -> Promise<{word: segs|null}>
  function colorWords(words) {
    var result = {};
    var pending = [];
    var toQuery = [];
    words.forEach(function (word) {
      var key = word.toLowerCase();
      if (key in wordCache) { result[word] = wordCache[key]; return; }
      var core = word.replace(/\s*\([^)]*\)\s*$/, '').replace(/\*$/, '');
      if (BREAKDOWN_OVERRIDE[core]) {
        var segs = segsForOverride(word, core);
        wordCache[key] = segs;
        result[word] = segs;
        return;
      }
      toQuery.push({ word: word, core: core, query: IPA_OVERRIDE[core] || core });
    });
    if (!toQuery.length) return Promise.resolve(result);

    var queryString = toQuery.map(function (x) { return x.query; }).join(' ');
    return APP.nlpEngines.transcribeSentence(queryString, 'fr').then(function (ipaStr) {
      var ipaParts = ipaStr.trim().split(/\s+/);
      if (ipaParts.length !== toQuery.length) return result; // can't safely align, skip these
      toQuery.forEach(function (x, i) {
        var segs = align(x.core, ipaParts[i]);
        var suffix = x.word.slice(x.core.length);
        if (suffix) segs.push({ text: suffix, ipa: null });
        wordCache[x.word.toLowerCase()] = segs;
        result[x.word] = segs;
      });
      return result;
    }).catch(function () { return result; });
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function segsToHtml(segs) {
    return segs.map(function (s) {
      var color = s.ipa && APP.phonemePalette.colorFor(s.ipa);
      return color ? '<span style="color:' + color + '">' + escapeHtml(s.text) + '</span>' : escapeHtml(s.text);
    }).join('');
  }

  var WORD_RE = /[A-Za-zÀ-ÖØ-öø-ÿŒœ]+/g;

  // A table cell often holds French vocabulary in one column and an
  // English gloss in the next (e.g. "très" | "very"), and nothing in the
  // rendered DOM distinguishes them — so this never scans table cells at
  // large. It only colors text the site's own markup already vouches for as
  // French: inside a <code> tag, or immediately in front of a `.say`
  // speaker button (say()'s own contract is that its label is always the
  // French word being spoken).
  function collectFrenchTextNodes(root) {
    var out = [];
    var seen = new Set();

    root.querySelectorAll('code').forEach(function (code) {
      if (code.closest('script, style')) return;
      var walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT, null, false);
      var node;
      while ((node = walker.nextNode())) { if (!seen.has(node)) { seen.add(node); out.push(node); } }
    });

    root.querySelectorAll('.say').forEach(function (btn) {
      var parent = btn.parentNode;
      if (!parent) return;
      var kids = Array.prototype.slice.call(parent.childNodes);
      var btnIdx = kids.indexOf(btn);
      var start = 0;
      for (var i = btnIdx - 1; i >= 0; i--) {
        if (kids[i].nodeType === 1 && kids[i].classList && kids[i].classList.contains('say')) { start = i + 1; break; }
      }
      for (var i = start; i < btnIdx; i++) {
        var kid = kids[i];
        if (kid.nodeType === 3) { if (!seen.has(kid)) { seen.add(kid); out.push(kid); } }
        else if (kid.nodeType === 1) {
          var walker2 = document.createTreeWalker(kid, NodeFilter.SHOW_TEXT, null, false);
          var n2;
          while ((n2 = walker2.nextNode())) { if (!seen.has(n2)) { seen.add(n2); out.push(n2); } }
        }
      }
    });

    return out;
  }

  function applyToTables(root) {
    if (!root || !APP.nlpEngines) return;
    var textNodes = collectFrenchTextNodes(root).filter(function (node) {
      var has = WORD_RE.test(node.nodeValue);
      WORD_RE.lastIndex = 0;
      return has;
    });
    if (!textNodes.length) return;

    var words = {};
    textNodes.forEach(function (node) {
      var m;
      WORD_RE.lastIndex = 0;
      while ((m = WORD_RE.exec(node.nodeValue))) words[m[0]] = true;
    });

    colorWords(Object.keys(words))
      .then(function (byWord) {
        textNodes.forEach(function (node) {
          if (!node.parentNode) return; // already replaced via an earlier node in the same cell
          var text = node.nodeValue;
          var frag = document.createDocumentFragment();
          var last = 0;
          var m;
          WORD_RE.lastIndex = 0;
          var any = false;
          while ((m = WORD_RE.exec(text))) {
            var segs = byWord[m[0]];
            if (!segs) continue;
            any = true;
            if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
            var span = document.createElement('span');
            span.innerHTML = segsToHtml(segs);
            frag.appendChild(span);
            last = m.index + m[0].length;
          }
          if (!any) return;
          if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
          node.parentNode.replaceChild(frag, node);
        });
      });
  }

  return { applyToTables: applyToTables, colorWords: colorWords };
})();
