// Small helpers shared by the data/*.js graph files for building bilingual HTML
// table snippets (headers translated, cell content left invariant — it's the
// French being taught, or an English gloss of it).
window.APP = window.APP || {};

APP.dataHelpers = (function () {
  function tr(x, lang) {
    if (x == null) return '';
    if (typeof x === 'string') return x;
    return x[lang] != null ? x[lang] : (x.en || x.fr || '');
  }

  // headers: array of string | {en,fr} | null (null => empty <th>)
  // rows: array of arrays of cell strings (invariant HTML, same both languages)
  // opts.glossCols: column indices to exclude from auto phoneme-coloring —
  // for the rare table that pairs a French word with a plain-string English
  // gloss (an {en,fr} object cell is never marked, since that's already
  // known chrome/label text; only bare strings need this opt-out).
  function table(headers, rows, opts) {
    opts = opts || {};
    var glossCols = opts.glossCols || [];
    function build(lang) {
      var h = '<tr>' + headers.map(function (x) { return '<th>' + tr(x, lang) + '</th>'; }).join('') + '</tr>';
      var b = rows.map(function (r) {
        return '<tr>' + r.map(function (c, ci) {
          var content = tr(c, lang);
          var markFrench = typeof c === 'string' && glossCols.indexOf(ci) === -1;
          return '<td>' + (markFrench ? '<span class="fr-auto">' + content + '</span>' : content) + '</td>';
        }).join('') + '</tr>';
      }).join('');
      var cls = 'mini-table' + (opts.style ? '' : '');
      var style = opts.style ? ' style="' + opts.style + '"' : '';
      return '<table class="' + cls + '"' + style + '>' + h + b + '</table>';
    }
    return { en: build('en'), fr: build('fr') };
  }

  // combine(...parts) — parts are strings (invariant) or {en,fr} objects; returns {en,fr}
  function combine() {
    var parts = Array.prototype.slice.call(arguments);
    function build(lang) {
      return parts.map(function (p) { return tr(p, lang); }).join('');
    }
    return { en: build('en'), fr: build('fr') };
  }

  // say(label, phrase) — label (invariant HTML, e.g. "<code>venu</code>") plus a
  // speaker button that reads `phrase` aloud (plain text, ideally with a little
  // context — "il est venu" rather than the bare word — so the TTS voice doesn't
  // mangle an isolated form).
  function say(label, phrase) {
    return label + ' <button class="say" data-say="' + phrase.replace(/"/g, '&quot;') + '" title="hear it">▶</button>';
  }

  // ipa(str) — auto color-codes a raw IPA string, character by character.
  // Only vowels (oral and nasal) get a color, each its own fixed shade from
  // APP.phonemePalette; consonants, glides, and the rhotic stay plain.
  // Nasal vowels are written as base+combining tilde (e.g. 'ɔ' + '̃') and
  // colored as one unit.
  var NASAL_BASE = 'ɔɑɛœ';
  var TILDE = '̃';

  // IPA punctuation that carries no phoneme color of its own — stress marks,
  // length marks, syllable/word-boundary separators (espeak-ng emits these;
  // the site's own hand-authored IPA doesn't, but this keeps both safe)
  var NEUTRAL = ' .\'’ˈˌː-‿|';

  function ipa(str) {
    var out = '';
    for (var i = 0; i < str.length; i++) {
      var ch = str[i];
      if (NEUTRAL.indexOf(ch) !== -1) { out += ch; continue; }
      var next = str[i + 1];
      if (NASAL_BASE.indexOf(ch) !== -1 && next === TILDE) {
        var nasalColor = APP.phonemePalette.colorFor(ch + next);
        out += nasalColor ? '<span style="color:' + nasalColor + '">' + ch + next + '</span>' : (ch + next);
        i++;
        continue;
      }
      var color = APP.phonemePalette.colorFor(ch);
      out += color ? '<span style="color:' + color + '">' + ch + '</span>' : ch;
    }
    return '<span class="ipa">' + out + '</span>';
  }

  return { tr: tr, table: table, combine: combine, say: say, ipa: ipa };
})();
