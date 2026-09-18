// The site's one color-coding system: a fixed, hand-picked color per vowel
// phoneme (oral and nasal), chosen for maximum contrast against its
// neighbors — not an evenly-spaced hue sweep, which puts too many similar
// colors next to each other once there are more than a handful. Consonants,
// glides, and the rhotic are never colored.
window.APP = window.APP || {};

APP.phonemePalette = (function () {
  var COLORS = {
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
    'ɑ̃': '#bcf60c',
    'ɛ̃': '#e6beff',
    'ɔ̃': '#2dd4bf',
    'œ̃': '#ffd8b1'
  };

  function colorFor(symbol) {
    return COLORS[symbol] || null;
  }

  return { colorFor: colorFor, COLORS: COLORS };
})();
