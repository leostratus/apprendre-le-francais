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

  return { tr: tr, table: table, combine: combine, say: say };
})();
