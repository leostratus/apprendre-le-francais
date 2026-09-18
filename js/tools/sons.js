window.APP = window.APP || {};
APP.tools = APP.tools || {};

APP.tools.sons = (function () {
  var i18n = APP.i18n;
  var say = APP.dataHelpers.say;

  var CATS = [
    { type: 'vowel', label: { en: 'Oral vowels', fr: 'Voyelles orales' }, cls: 'v' },
    { type: 'nasal', label: { en: 'Nasal vowels', fr: 'Voyelles nasales' }, cls: 'nv' },
    { type: 'glide', label: { en: 'Glides & glide combinations', fr: 'Semi-voyelles et combinaisons' }, cls: 'g' },
    { type: 'rhotic', label: { en: 'Rhotic', fr: 'Rhotique' }, cls: 'r' },
    { type: 'cons', label: { en: 'Consonants', fr: 'Consonnes' }, cls: 'c' }
  ];

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // One distinct hue per phoneme entry, spread by the golden angle so no two
  // stay visually adjacent regardless of how many entries there are.
  function phonemeColor(i) {
    var hue = (i * 137.508) % 360;
    return 'hsl(' + hue.toFixed(1) + ', 72%, 62%)';
  }

  var COLOR_BY_IPA = {};
  APP.data.sons.forEach(function (entry, i) { COLOR_BY_IPA[entry.ipa] = phonemeColor(i); });

  // 'fils' is pronounced /fis/: the l is silent, so the letters that
  // actually carry /i/ (i and the final s) aren't contiguous.
  var SPAN_OVERRIDES = {
    'fils': [[1, 2], [3, 4]]
  };

  // Finds every non-overlapping span of `example` that the spelling pattern
  // covers. 'e+CC' means "e followed by a doubled consonant" rather than a
  // literal string.
  function findSpans(spelling, example) {
    if (SPAN_OVERRIDES[example]) return SPAN_OVERRIDES[example];
    var spans = [];
    if (spelling === 'e+CC') {
      var re = /e([bcdfgjklmnpqrstvz])\1/gi;
      var m;
      while ((m = re.exec(example))) spans.push([m.index, m.index + m[0].length]);
      return spans;
    }
    var lower = example.toLowerCase();
    var pat = spelling.toLowerCase();
    var idx = 0;
    while (true) {
      var found = lower.indexOf(pat, idx);
      if (found === -1) break;
      spans.push([found, found + pat.length]);
      idx = found + pat.length;
    }
    return spans;
  }

  function highlightExample(example, spelling, color) {
    var spans = findSpans(spelling, example);
    if (!spans.length) return escapeHtml(example);
    var out = '';
    var pos = 0;
    spans.forEach(function (sp) {
      out += escapeHtml(example.slice(pos, sp[0]));
      out += '<span style="color:' + color + '">' + escapeHtml(example.slice(sp[0], sp[1])) + '</span>';
      pos = sp[1];
    });
    out += escapeHtml(example.slice(pos));
    return out;
  }

  function phonemeCard(entry, cls) {
    var color = COLOR_BY_IPA[entry.ipa];
    var card = el('div', 'son-card');
    var head = el('div', 'son-head');
    head.innerHTML = '<span class="ipa son-ipa ' + cls + '">' + entry.ipa + '</span>';
    if (entry.soundsLike) head.innerHTML += '<div class="son-sounds-like">' + entry.soundsLike + '</div>';
    card.appendChild(head);

    if (entry.items.length) {
      var hero = entry.items[0];
      var heroRow = el('div', 'son-hero');
      heroRow.innerHTML = say('<span class="son-hero-word">' + highlightExample(hero.example, hero.spelling, color) + '</span>', hero.example);
      card.appendChild(heroRow);
    }

    var table = el('table', 'mini-table son-table');
    var thead = el('thead', '', '<tr><th>' + i18n.s('sons_spelling') + '</th><th>' + i18n.s('sons_example') + '</th></tr>');
    table.appendChild(thead);
    var tbody = el('tbody');
    entry.items.forEach(function (it) {
      var tr = el('tr');
      tr.innerHTML = '<td><code style="color:' + color + '">' + escapeHtml(it.spelling) + '</code></td>' +
        '<td>' + say(highlightExample(it.example, it.spelling, color), it.example) + '</td>';
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    card.appendChild(table);
    return card;
  }

  function mount(root) {
    root.innerHTML = '';

    var header = el('div', 'tool-header');
    header.innerHTML =
      '<div class="eyebrow">' + i18n.s('sons_eyebrow') + '</div>' +
      '<h1>' + i18n.s('sons_title') + '</h1>' +
      '<p class="intro">' + i18n.s('sons_intro') + '</p>';
    root.appendChild(header);

    CATS.forEach(function (cat, idx) {
      var entries = APP.data.sons.filter(function (e) { return e.type === cat.type; });
      if (!entries.length) return;

      var sh = el('div', 'sh');
      sh.innerHTML = '<div class="sh-marker">§' + (idx + 1) + '</div><h2>' + i18n.t(cat.label) + '</h2>';
      root.appendChild(sh);

      var grid = el('div', 'son-grid');
      entries.forEach(function (entry) { grid.appendChild(phonemeCard(entry, cat.cls)); });
      root.appendChild(grid);
    });

    APP.speech.wireSpeakers(root);
    APP.phonemeColor.apply(root);
  }

  function renderAll() {}
  function clearAll() {}

  return { mount: mount, renderAll: renderAll, clearAll: clearAll };
})();
