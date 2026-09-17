// Rule-based French grapheme-to-phoneme (spelling -> IPA) converter.
// Exact-word lookups (APP.data.wordIPA) are tried first; this engine is the
// fallback for anything not already known. It is a teaching approximation,
// not a dictionary: French pronunciation has real exceptions no ruleset this
// size can capture, so this is disclosed in the Analyzer tool's own UI.
window.APP = window.APP || {};

APP.g2p = (function () {
  // Ordered longest-match-first. Each rule: [pattern, phoneme] or
  // [pattern, phoneme, testFn] where testFn(word, i) gates the match — tested
  // against the FULL original word, so lookahead (e.g. "ge" needs the e) still
  // works even though that trailing e is later silenced.
  // A nasal digraph only nasalizes when its final letter (m/n) isn't itself
  // doubled (pomme, bonne, femme stay oral) and isn't followed by a vowel
  // (amie, inutile stay oral) — both signal the vowel was never nasal.
  function nasalGuard(pattern) {
    var consonant = pattern[pattern.length - 1];
    return function (w, i) {
      var next = w[i + pattern.length];
      if (!next) return true;
      if (next === consonant) return false;
      if (/[aeiouyəɛɔœ]/.test(next)) return false;
      return true;
    };
  }
  function nasal(pattern, phoneme) { return [pattern, phoneme, nasalGuard(pattern)]; }

  var RULES = [
    // nasal vowels (longest digraphs/trigraphs first)
    ['eaux', 'o'], ['aux', 'o'], ['eau', 'o'],
    nasal('ain', 'ɛ̃'), nasal('aim', 'ɛ̃'), nasal('ein', 'ɛ̃'), nasal('eim', 'ɛ̃'), nasal('yn', 'ɛ̃'), nasal('ym', 'ɛ̃'),
    nasal('ien', 'jɛ̃'), nasal('oin', 'wɛ̃'),
    nasal('un', 'œ̃'), nasal('um', 'œ̃'),
    nasal('an', 'ɑ̃'), nasal('am', 'ɑ̃'), nasal('en', 'ɑ̃'), nasal('em', 'ɑ̃'),
    nasal('on', 'ɔ̃'), nasal('om', 'ɔ̃'), nasal('in', 'ɛ̃'), nasal('im', 'ɛ̃'),

    // oral vowel digraphs / glide combinations
    ['ille', 'ij'], ['ail', 'aj'], ['eil', 'ɛj'], ['euil', 'œj'], ['ouil', 'uj'],
    ['oi', 'wa'], ['oy', 'waj'], ['ou', 'u'], ['où', 'u'],
    ['ai', 'ɛ'], ['ei', 'ɛ'], ['œu', 'ø'], ['eu', 'ø'],
    ['é', 'e'], ['è', 'ɛ'], ['ê', 'ɛ'], ['ë', 'ɛ'], ['à', 'a'], ['â', 'a'], ['ô', 'o'], ['î', 'i'], ['ï', 'i'], ['û', 'y'], ['ù', 'u'], ['ü', 'y'],
    ['œ', 'œ'],

    // word-final digraphs that are always /e/ (matches the Sounds page data:
    // -er -ez -é -ed -ef all group under /e/, with the consonant silent)
    ['er', 'e', function (w, i) { return i + 2 === w.length; }],
    ['ez', 'e', function (w, i) { return i + 2 === w.length; }],
    ['ed', 'e', function (w, i) { return i + 2 === w.length; }],
    ['ef', 'e', function (w, i) { return i + 2 === w.length; }],
    ['et', 'e', function (w, i) { return i + 2 === w.length; }],

    // consonant digraphs
    ['ch', 'ʃ'], ['ph', 'f'], ['gn', 'ɲ'],
    ['qu', 'k'], ['gu', 'g'],
    ['th', 't'],

    // context-sensitive c/g/s (tested against the full word, so a trailing
    // silent e still counts as "next character" for softening purposes)
    ['c', 's', function (w, i) { return /[eiy]/.test(w[i + 1] || ''); }],
    ['ç', 's'],
    ['g', 'ʒ', function (w, i) { return /[eiy]/.test(w[i + 1] || ''); }],
    ['s', 'z', function (w, i) { return i > 0 && /[aeiouyəɛɔ]/.test(w[i - 1] || '') && /[aeiouyh]/.test(w[i + 1] || ''); }],

    // single letters (defaults)
    ['a', 'a'], ['e', 'ə'], ['i', 'i'], ['o', 'ɔ'], ['u', 'y'], ['y', 'i'],
    ['b', 'b'], ['c', 'k'], ['d', 'd'], ['f', 'f'], ['g', 'g'], ['h', ''],
    ['j', 'ʒ'], ['k', 'k'], ['l', 'l'], ['m', 'm'], ['n', 'n'], ['p', 'p'],
    ['q', 'k'], ['r', 'ʁ'], ['s', 's'], ['t', 't'], ['v', 'v'], ['w', 'w'],
    ['x', 'ks'], ['z', 'z']
  ];

  // stable sort: longer patterns first, ties keep insertion order (so the
  // context-sensitive c/g/s rules above stay ahead of their bare defaults)
  RULES.sort(function (a, b) { return b[0].length - a[0].length; });

  var SILENT_FINAL_CONSONANT = /^[sxzpdtg]$/;

  // word -> [{ src, ipa }] covering every character, in order
  function segments(word) {
    var w = word.toLowerCase();
    var out = [];
    var i = 0;
    while (i < w.length) {
      var matched = false;
      for (var r = 0; r < RULES.length; r++) {
        var pattern = RULES[r][0], phoneme = RULES[r][1], test = RULES[r][2];
        if (w.substr(i, pattern.length) === pattern && (!test || test(w, i))) {
          out.push({ src: w.substr(i, pattern.length), ipa: phoneme });
          i += pattern.length;
          matched = true;
          break;
        }
      }
      if (!matched) i++; // unrecognized char (digit, stray punctuation) — skip
    }

    // collapse a doubled consonant letter (bonne, pomme, belle) into the one
    // sound it represents, once the nasal guard above has already ruled out
    // it being part of a nasal digraph
    for (var k = out.length - 1; k > 0; k--) {
      if (out[k].src.length === 1 && out[k].src === out[k - 1].src && out[k].ipa === out[k - 1].ipa) {
        out.splice(k, 1);
      }
    }
    return out;
  }

  // Pop complete trailing segments until at least `chars` source characters
  // have been removed from the end (used for the verb -ent special case).
  function popTrailingChars(segs, chars) {
    var removed = 0;
    while (removed < chars && segs.length) {
      removed += segs[segs.length - 1].src.length;
      segs.pop();
    }
  }

  // transcribe(word, posHint) -> ipa string. posHint === 'verb' silences a
  // trailing -ent (parlent -> /paʁl/) instead of reading it as nasal ɑ̃.
  function transcribe(word, posHint) {
    var clean = word.replace(/[^a-zA-ZÀ-ÿœŒ'’]/g, '');
    if (!clean) return '';
    var key = clean.toLowerCase();

    if (APP.data.wordIPA && APP.data.wordIPA[key]) return APP.data.wordIPA[key];

    // -ment adverbs: the suffix is a fixed /mɑ̃/, but greedy left-to-right
    // matching on the whole word treats the "e" before it and the "en" of
    // "ment" as two separate nasal digraphs, doubling the nasal vowel. Split
    // the suffix off and transcribe the stem on its own.
    if (/ment$/i.test(clean) && clean.length > 4) {
      var stemSegs = segments(clean.slice(0, -4));
      var stemLast = stemSegs[stemSegs.length - 1];
      if (stemLast && stemLast.src === 'e' && stemSegs.length > 1) stemSegs.pop();
      return stemSegs.map(function (s) { return s.ipa; }).join('') + 'mɑ̃';
    }

    var segs = segments(clean);
    if (!segs.length) return '';

    if (posHint === 'verb' && /ent$/i.test(clean) && clean.length > 3) {
      popTrailingChars(segs, 3);
    } else {
      var last = segs[segs.length - 1];
      if (last && last.src.length === 1 && SILENT_FINAL_CONSONANT.test(last.src) && segs.length > 1) {
        segs.pop();
        last = segs[segs.length - 1];
      }
      if (last && last.src === 'e' && segs.length > 1) {
        segs.pop();
      }
    }

    return segs.map(function (s) { return s.ipa; }).join('');
  }

  return { transcribe: transcribe };
})();
