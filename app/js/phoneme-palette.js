// The site's one color-coding system: a fixed, hand-picked color per vowel
// phoneme — every oral vowel, nasal vowel, and glide-vowel combination the
// Sounds page teaches as its own spelling unit (oi, ien, ail...). Those
// combinations keep their color even though the spelling includes a glide
// or a silent consonant letter (oin, tion's nasal ending, etc.) — the
// letters together spell a vowel sound, so the whole unit counts as one.
// Bare consonants, bare glides (j, w, ɥ on their own), and the rhotic are
// never colored. Chosen for contrast against its neighbors, not an even hue
// sweep, which put too many similar colors next to each other once there
// were more than a handful.
window.APP = window.APP || {};

APP.phonemePalette = (function () {
  var COLORS = {
    // oral vowels
    'i': '#e6194b',
    'e': '#f58231',
    'ɛ': '#ffe119',
    'a': '#3cb44b',
    'ɑ': '#aaffc3',
    'ɔ': '#46f0f0',
    'o': '#4363d8',
    'u': '#911eb4',
    'y': '#f032e6',
    'ø': '#fabebe',
    'œ': '#9a6324',
    'ə': '#a9a9a9',
    // nasal vowels
    'ɑ̃': '#bcf60c',
    'ɛ̃': '#e6beff',
    'ɔ̃': '#2dd4bf',
    'œ̃': '#ffd8b1',
    // glide-vowel combinations (a glide onset plus a vowel, taught and
    // spelled as one unit — aille, oi, ien, oin...)
    'aj': '#ff6347',
    'ɛj': '#20b2aa',
    'œj': '#ba55d3',
    'uj': '#7cfc00',
    'jø': '#ff1493',
    'wa': '#1e90ff',
    'wɛ̃': '#add8e6',
    'jɛ̃': '#f0e68c',
    'jɔ̃': '#8b4513',
    'jɑ̃': '#da70d6',
    'je': '#00ced1'
  };

  function colorFor(symbol) {
    return COLORS[symbol] || null;
  }

  return { colorFor: colorFor, COLORS: COLORS };
})();
