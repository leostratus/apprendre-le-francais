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
  function table(headers, rows, opts) {
    opts = opts || {};
    function build(lang) {
      var h = '<tr>' + headers.map(function (x) { return '<th>' + tr(x, lang) + '</th>'; }).join('') + '</tr>';
      var b = rows.map(function (r) {
        return '<tr>' + r.map(function (c) { return '<td>' + tr(c, lang) + '</td>'; }).join('') + '</tr>';
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

  // ipa(str) — auto color-codes a raw IPA string, character by character, into
  // the site's five phoneme-type spans (v/nv/c/r/g). Nasal vowels are written
  // as base+combining tilde (e.g. 'ɔ' + '̃') and merged into one nv span.
  var NASAL_BASE = 'ɔɑɛœ';
  var ORAL_VOWEL = 'aeɛiouyøœə';
  var GLIDE = 'jwɥ';
  var RHOTIC = 'ʁ';
  var TILDE = '̃';

  function ipa(str) {
    var out = '';
    for (var i = 0; i < str.length; i++) {
      var ch = str[i];
      if (ch === ' ' || ch === '.' || ch === '’' || ch === '\'') { out += ch; continue; }
      var next = str[i + 1];
      if (NASAL_BASE.indexOf(ch) !== -1 && next === TILDE) {
        out += '<span class="nv">' + ch + next + '</span>';
        i++;
        continue;
      }
      var cls = RHOTIC.indexOf(ch) !== -1 ? 'r'
        : GLIDE.indexOf(ch) !== -1 ? 'g'
        : ORAL_VOWEL.indexOf(ch) !== -1 ? 'v'
        : 'c';
      out += '<span class="' + cls + '">' + ch + '</span>';
    }
    return '<span class="ipa">' + out + '</span>';
  }

  return { tr: tr, table: table, combine: combine, say: say, ipa: ipa };
})();
