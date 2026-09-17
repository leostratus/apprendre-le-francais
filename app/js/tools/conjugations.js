window.APP = window.APP || {};
APP.tools = APP.tools || {};

APP.tools.conjugations = (function () {
  var i18n = APP.i18n;
  var H = APP.dataHelpers;

  var TENSES = [
    { key: 'present', label: { en: 'Présent', fr: 'Présent' } },
    { key: 'imperfect', label: { en: 'Imparfait', fr: 'Imparfait' } },
    { key: 'future', label: { en: 'Futur', fr: 'Futur' } },
    { key: 'conditional', label: { en: 'Conditionnel', fr: 'Conditionnel' } },
    { key: 'subjunctive', label: { en: 'Subjonctif', fr: 'Subjonctif' } }
  ];

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function paradigmTable(paradigm, modelVerb) {
    var table = el('table', 'conj-table');
    var thead = el('thead');
    var headRow = el('tr');
    headRow.appendChild(el('th', 'conj-pron-col'));
    TENSES.forEach(function (t) { headRow.appendChild(el('th', '', i18n.t(t.label))); });
    thead.appendChild(headRow);
    table.appendChild(thead);

    var tbody = el('tbody');
    for (var i = 0; i < 6; i++) {
      var tr = el('tr');
      var pron = paradigm[TENSES[0].key][i].pron;
      tr.appendChild(el('td', 'conj-pron-col', pron));
      TENSES.forEach(function (t) {
        var form = paradigm[t.key][i];
        var phrase = pron.split(' / ')[0] + ' ' + form.spell;
        var cell = el('td', 'conj-cell');
        cell.innerHTML = H.ipa(form.ipa) + '<span class="conj-spell">' + H.say(form.spell, phrase) + '</span>';
        tr.appendChild(cell);
      });
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    var wrap = el('div', 'conj-table-wrap');
    wrap.appendChild(table);
    return wrap;
  }

  function verbListTable(list) {
    var table = el('table', 'mini-table conj-verblist');
    var thead = el('thead', '', '<tr><th>' + i18n.s('conj_th_infinitive') + '</th><th>' + i18n.s('conj_th_participle') + '</th><th>' + i18n.s('conj_th_meaning') + '</th></tr>');
    table.appendChild(thead);
    var tbody = el('tbody');
    list.forEach(function (v) {
      var tr = el('tr');
      tr.innerHTML = '<td>' + v.infinitive + '</td><td>' + H.say('<code>' + v.participle + '</code>', v.infinitive + ' — ' + v.participle) + '</td><td>' + v.meaning + '</td>';
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
  }

  function groupBlock(root, idx, opts) {
    var sh = el('div', 'sh');
    sh.innerHTML = '<div class="sh-marker">§' + idx + '</div><h2>' + i18n.t(opts.title) + '</h2>';
    root.appendChild(sh);

    if (opts.rule) root.appendChild(el('p', 'prose', i18n.t(opts.rule)));

    var modelLine = el('div', 'conj-model-line');
    modelLine.innerHTML = '<span class="conj-model-verb">' + opts.model + '</span><span class="conj-model-meaning">' + opts.meaning + '</span>';
    root.appendChild(modelLine);

    root.appendChild(paradigmTable(opts.paradigm, opts.model));

    if (opts.participleNote) root.appendChild(el('div', 'callout neutral', i18n.t(opts.participleNote)));

    if (opts.verbList) {
      root.appendChild(el('div', 'conj-verblist-title', i18n.s('conj_verb_family')));
      root.appendChild(verbListTable(opts.verbList));
    }
  }

  function mount(root) {
    root.innerHTML = '';

    var header = el('div', 'tool-header');
    header.innerHTML =
      '<div class="eyebrow">' + i18n.s('conj_eyebrow') + '</div>' +
      '<h1>' + i18n.s('conj_title') + '</h1>' +
      '<p class="intro">' + i18n.s('conj_intro') + '</p>';
    root.appendChild(header);

    var idx = 1;

    var shReg = el('div', 'sh');
    shReg.innerHTML = '<div class="sh-marker">A</div><h2>' + i18n.s('conj_regular_title') + '</h2>';
    root.appendChild(shReg);
    root.appendChild(el('p', 'prose', i18n.s('conj_regular_sub')));

    APP.data.regularGroups.forEach(function (g) {
      groupBlock(root, idx++, {
        title: { en: g.ending + ' verbs', fr: 'Verbes en ' + g.ending },
        rule: null,
        model: g.model, meaning: g.meaning, paradigm: g.paradigm,
        participleNote: g.note
      });
    });

    var shIrr = el('div', 'sh');
    shIrr.innerHTML = '<div class="sh-marker">B</div><h2>' + i18n.s('conj_irregular_title') + '</h2>';
    root.appendChild(shIrr);
    root.appendChild(el('p', 'prose', i18n.s('conj_irregular_sub')));

    APP.data.irregularFamilies.forEach(function (fam) {
      groupBlock(root, idx++, {
        title: fam.title, rule: fam.rule,
        model: fam.model, meaning: fam.meaning, paradigm: fam.paradigm,
        participleNote: fam.participleNote, verbList: fam.verbList
      });
    });

    var shMemo = el('div', 'sh');
    shMemo.innerHTML = '<div class="sh-marker">' + idx + '</div><h2>' + i18n.t(APP.data.memorizeOnly.title) + '</h2>';
    root.appendChild(shMemo);
    root.appendChild(el('div', 'callout neutral', i18n.t(APP.data.memorizeOnly.note)));
    root.appendChild(verbListTable(APP.data.memorizeOnly.verbList));

    APP.speech.wireSpeakers(root);
    APP.phonemeColor.apply(root);
  }

  function renderAll() {}
  function clearAll() {}

  return { mount: mount, renderAll: renderAll, clearAll: clearAll };
})();
