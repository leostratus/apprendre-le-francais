window.APP = window.APP || {};
APP.tools = APP.tools || {};

APP.tools.sons = (function () {
  var i18n = APP.i18n;
  var say = APP.dataHelpers.say;

  var CATS = [
    { type: 'vowel', label: { en: 'Oral vowels', fr: 'Voyelles orales' } },
    { type: 'nasal', label: { en: 'Nasal vowels', fr: 'Voyelles nasales' } },
    { type: 'glide', label: { en: 'Glides & glide combinations', fr: 'Semi-voyelles et combinaisons' } },
    { type: 'rhotic', label: { en: 'Rhotic', fr: 'Rhotique' } },
    { type: 'cons', label: { en: 'Consonants', fr: 'Consonnes' } }
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

  // Vowels (oral and nasal) each get their own fixed color from the shared
  // palette; consonants, glides, and the rhotic are never colored, on this
  // page or anywhere else on the site.
  function bareIpa(ipa) { return ipa.replace(/\//g, ''); }

  // Renders a whole example word with every vowel it contains colored, using
  // the precomputed letter-to-phoneme breakdown (data/sons-breakdown.js).
  function renderWord(word) {
    var segs = APP.data.sonsBreakdown && APP.data.sonsBreakdown[word];
    if (!segs) return escapeHtml(word);
    return segs.map(function (s) {
      var color = s.ipa && APP.phonemePalette.colorFor(s.ipa);
      if (!color) return escapeHtml(s.text);
      return '<span style="color:' + color + '">' + escapeHtml(s.text) + '</span>';
    }).join('');
  }

  function phonemeCard(entry) {
    var color = APP.phonemePalette.colorFor(bareIpa(entry.ipa));
    var card = el('div', 'son-card');
    var head = el('div', 'son-head');
    head.innerHTML = color
      ? '<span class="ipa son-ipa" style="color:' + color + '">' + entry.ipa + '</span>'
      : '<span class="ipa son-ipa">' + entry.ipa + '</span>';
    if (entry.soundsLike) head.innerHTML += '<div class="son-sounds-like">' + entry.soundsLike + '</div>';
    card.appendChild(head);

    if (entry.items.length) {
      var hero = entry.items[0];
      var heroRow = el('div', 'son-hero');
      heroRow.innerHTML = say('<span class="son-hero-word">' + renderWord(hero.example) + '</span>', hero.example);
      card.appendChild(heroRow);
    }

    var table = el('table', 'mini-table son-table');
    var thead = el('thead', '', '<tr><th>' + i18n.s('sons_spelling') + '</th><th>' + i18n.s('sons_example') + '</th></tr>');
    table.appendChild(thead);
    var tbody = el('tbody');
    entry.items.forEach(function (it) {
      var tr = el('tr');
      var spellingCode = color
        ? '<code style="color:' + color + '">' + escapeHtml(it.spelling) + '</code>'
        : '<code>' + escapeHtml(it.spelling) + '</code>';
      tr.innerHTML = '<td>' + spellingCode + '</td>' +
        '<td>' + say(renderWord(it.example), it.example) + '</td>';
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
      entries.forEach(function (entry) { grid.appendChild(phonemeCard(entry)); });
      root.appendChild(grid);
    });

    APP.speech.wireSpeakers(root);
    APP.phonemeColor.apply(root);
  }

  function renderAll() {}
  function clearAll() {}

  return { mount: mount, renderAll: renderAll, clearAll: clearAll };
})();
