// The site's one color-coding system: a fixed, hand-picked color per
// phoneme — every oral vowel, nasal vowel, glide, the rhotic, every
// consonant, and every glide/cluster combination the Sounds page teaches
// as its own spelling unit (oi, tion, ail...). Grouped into hue families
// below for orientation, but every individual entry has its own distinct
// color, chosen for contrast rather than an even hue sweep.
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
    // glides
    'j': '#f3c300',
    'ɥ': '#875692',
    'w': '#f38400',
    // rhotic
    'ʁ': '#a1caf1',
    // consonants
    'p': '#be0032',
    'b': '#c2b280',
    'd': '#0067a5',
    't': '#e68fac',
    'k': '#f99379',
    'g': '#604e97',
    'f': '#f6a600',
    'v': '#b3446c',
    's': '#dcd300',
    'z': '#882d17',
    'ʃ': '#8db600',
    'ʒ': '#654522',
    'm': '#e25822',
    'n': '#2b3d26',
    'ɲ': '#6699cc',
    'ŋ': '#cc6699',
    'l': '#99cc33',
    // glide/cluster combinations, taught as their own single spelling unit
    'ks': '#708090',
    'gz': '#4b0082',
    'sj': '#daa520',
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
