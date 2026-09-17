// Rule-based French part-of-speech tagger. Dictionary lookup first
// (APP.data.wordPOS), then suffix heuristics for open-class words the
// dictionary doesn't cover, then a 'noun' default. Approximate by design —
// disclosed in the Analyzer tool's own UI rather than presented as certain.
window.APP = window.APP || {};

APP.posTagger = (function () {
  var SUFFIX_RULES = [
    [/ment$/i, 'adv'],
    [/(tion|sion|té|tié|ure|ude|ance|ence|ette|elle|esse|age|isme|oir|eau|ie)$/i, 'noun'],
    [/(eux|euse|if|ive|al|el|ible|able|ant|ent|ain|ois|ain)$/i, 'adj'],
    [/(er|ir|re)$/i, 'verb']
  ];

  function tag(word, isSentenceStart) {
    var clean = word.replace(/[^a-zA-ZÀ-ÿœŒ'’-]/g, '');
    if (!clean) return null;
    var key = clean.toLowerCase();

    if (APP.data.wordPOS && APP.data.wordPOS[key]) return APP.data.wordPOS[key];

    if (/^\d+$/.test(clean)) return 'num';

    if (!isSentenceStart && /^[A-ZÀ-Þ]/.test(clean)) return 'propnoun';

    for (var i = 0; i < SUFFIX_RULES.length; i++) {
      if (SUFFIX_RULES[i][0].test(key)) return SUFFIX_RULES[i][1];
    }

    return 'noun';
  }

  return { tag: tag };
})();
