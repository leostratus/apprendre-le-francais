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

  function paradigmTable(paradigm) {
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
      tr.innerHTML = '<td>' + v.infinitive + '</td><td>' + H.say('<code>' + v.participle + '</code>', v.infinitive + ', ' + v.participle) + '</td><td>' + v.meaning + '</td>';
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

    root.appendChild(paradigmTable(opts.paradigm));

    if (opts.participleNote) root.appendChild(el('div', 'callout neutral', i18n.t(opts.participleNote)));

    if (opts.verbList) {
      root.appendChild(el('div', 'conj-verblist-title', i18n.s('conj_verb_family')));
      root.appendChild(verbListTable(opts.verbList));
    }
  }

  function renderIntro(root) {
    var d = APP.data.conjIntro;

    var sh0 = el('div', 'sh');
    sh0.innerHTML = '<div class="sh-marker">§0</div><h2>' + i18n.t(d.moodTense.title) + '</h2>';
    root.appendChild(sh0);
    root.appendChild(el('p', 'prose', i18n.t(d.moodTense.p1)));
    var grid = el('div', 'mt-grid');
    grid.innerHTML =
      '<div class="mt-cell"><div class="label">' + i18n.t(d.moodTense.tenseLabel) + '</div><div class="term">' + i18n.t(d.moodTense.tenseTerm) + '</div><div class="def">' + i18n.t(d.moodTense.tenseDef) + '</div></div>' +
      '<div class="mt-cell"><div class="label">' + i18n.t(d.moodTense.moodLabel) + '</div><div class="term">' + i18n.t(d.moodTense.moodTerm) + '</div><div class="def">' + i18n.t(d.moodTense.moodDef) + '</div></div>';
    root.appendChild(grid);
    root.appendChild(el('p', 'prose', i18n.t(d.moodTense.p2)));

    var sh1 = el('div', 'sh');
    sh1.innerHTML = '<div class="sh-marker">§1</div><h2>' + i18n.t(d.futureVsCond.title) + '</h2>';
    root.appendChild(sh1);
    root.appendChild(el('p', 'prose', i18n.t(d.futureVsCond.p1)));
    var rel = el('div', 'rel');
    rel.innerHTML =
      '<div class="rel-col"><div class="col-label">' + i18n.t(d.futureVsCond.futureLabel) + '</div>' +
      '<div class="big-ipa">' + H.ipa(d.futureVsCond.futureIpa) + '</div><p>' + i18n.t(d.futureVsCond.futureP) + '</p></div>' +
      '<div class="rel-divider">vs</div>' +
      '<div class="rel-col"><div class="col-label">' + i18n.t(d.futureVsCond.condLabel) + '</div>' +
      '<div class="big-ipa">' + H.ipa(d.futureVsCond.condIpa) + '</div><p>' + i18n.t(d.futureVsCond.condP) + '</p></div>';
    root.appendChild(rel);
    root.appendChild(el('div', 'callout neutral', i18n.t(d.futureVsCond.note)));

    var sh2 = el('div', 'sh');
    sh2.innerHTML = '<div class="sh-marker">§2</div><h2>' + i18n.t(d.soundsKey.title) + '</h2>';
    root.appendChild(sh2);
    root.appendChild(el('p', 'prose', i18n.t(d.soundsKey.p1)));
    var table = el('table', 'sm-table');
    var thead = el('thead', '', '<tr><th>' + i18n.t(d.soundsKey.thSymbol) + '</th><th>' + i18n.t(d.soundsKey.thLike) + '</th><th>' + i18n.t(d.soundsKey.thAppears) + '</th></tr>');
    table.appendChild(thead);
    var tbody = el('tbody');
    d.soundsKey.rows.forEach(function (r) {
      var tr = el('tr');
      tr.innerHTML = '<td class="sound-col">' + H.ipa(r[0]) + '</td><td style="font-size:0.83rem; color:var(--dim);">' + r[1] + '</td><td style="font-family:\'Noto Sans Mono\',monospace; font-size:0.78rem; color:var(--muted);">' + r[2] + '</td>';
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    root.appendChild(table);
    root.appendChild(el('div', 'callout neutral', i18n.t(d.soundsKey.note)));
  }

  function renderPasseSimple(root, idx) {
    var d = APP.data.passeSimple;
    var sh = el('div', 'sh');
    sh.innerHTML = '<div class="sh-marker">§' + idx + '</div><h2>' + i18n.t(d.title) + '</h2>';
    root.appendChild(sh);
    root.appendChild(el('p', 'prose', i18n.t(d.rule)));

    var modelLine = el('div', 'conj-model-line');
    modelLine.innerHTML = '<span class="conj-model-verb">' + d.model + '</span><span class="conj-model-meaning">' + d.meaning + '</span>';
    root.appendChild(modelLine);

    var table = el('table', 'phon-table');
    var thead = el('thead', '', '<tr><th>pronoun</th><th>IPA</th><th>spelling</th></tr>');
    table.appendChild(thead);
    var tbody = el('tbody');
    d.rows.forEach(function (r) {
      var tr = el('tr');
      tr.innerHTML = '<td class="pron">' + r.pron + '</td><td class="sound">' + H.ipa(r.ipa) + '</td><td class="spell">' + H.say(r.spell, r.spell.split(' / ')[0]) + '</td>';
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    var wrap = el('div', 'conj-table-wrap');
    wrap.appendChild(table);
    root.appendChild(wrap);
  }

  function renderFlow(root, idx) {
    var d = APP.data.conjFlow;
    var sh = el('div', 'sh');
    sh.innerHTML = '<div class="sh-marker">§' + idx + '</div><h2>' + i18n.t(d.title) + '</h2>';
    root.appendChild(sh);
    root.appendChild(el('p', 'prose', i18n.t(d.p1)));

    var flow = el('div', 'flow');
    flow.innerHTML =
      '<div class="flow-box flow-start">' + i18n.t(d.bare) + '</div>' +
      '<div class="flow-arrow">▼</div>' +
      '<div class="flow-box">' + i18n.t(d.hearR) + '</div>' +
      '<div class="flow-arrow">▼</div>' +
      '<div class="flow-branch-row">' +
        '<div class="flow-branch">' +
          '<div class="flow-branch-label">' + i18n.t(d.noR) + '</div>' +
          '<div class="flow-box">' + i18n.t(d.hearE) + '</div>' +
          '<div class="flow-arrow">▼</div>' +
          '<div class="flow-branch-row">' +
            '<div class="flow-branch"><div class="flow-branch-label">' + i18n.t(d.noE) + '</div><div class="flow-result"><strong>' + i18n.t(d.present) + '</strong><br>' + i18n.t(d.presentNote) + '</div></div>' +
            '<div class="flow-branch"><div class="flow-branch-label">' + i18n.t(d.yesE) + '</div><div class="flow-result"><strong>' + i18n.t(d.imperfect) + '</strong><br>' + i18n.t(d.imperfectNote) + '</div></div>' +
          '</div>' +
        '</div>' +
        '<div class="flow-branch">' +
          '<div class="flow-branch-label">' + i18n.t(d.yesR) + '</div>' +
          '<div class="flow-box">' + i18n.t(d.endingClosed) + '</div>' +
          '<div class="flow-arrow">▼</div>' +
          '<div class="flow-branch-row">' +
            '<div class="flow-branch"><div class="flow-branch-label">' + i18n.t(d.yesClosed) + '</div><div class="flow-result"><strong>' + i18n.t(d.future) + '</strong><br>' + i18n.t(d.futureNote) + '</div></div>' +
            '<div class="flow-branch"><div class="flow-branch-label">' + i18n.t(d.noClosed) + '</div><div class="flow-result"><strong>' + i18n.t(d.cond) + '</strong><br>' + i18n.t(d.condNote) + '</div></div>' +
          '</div>' +
        '</div>' +
      '</div>';
    root.appendChild(flow);
  }

  function mount(root) {
    root.innerHTML = '';

    var header = el('div', 'tool-header');
    header.innerHTML =
      '<div class="eyebrow">' + i18n.s('conj_eyebrow') + '</div>' +
      '<h1>' + i18n.s('conj_title') + '</h1>' +
      '<p class="intro">' + i18n.s('conj_intro') + '</p>';
    root.appendChild(header);

    renderIntro(root);

    var idx = 3;

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
    shMemo.innerHTML = '<div class="sh-marker">' + idx++ + '</div><h2>' + i18n.t(APP.data.memorizeOnly.title) + '</h2>';
    root.appendChild(shMemo);
    root.appendChild(el('div', 'callout neutral', i18n.t(APP.data.memorizeOnly.note)));
    root.appendChild(verbListTable(APP.data.memorizeOnly.verbList));

    renderPasseSimple(root, idx++);
    renderFlow(root, idx++);

    APP.speech.wireSpeakers(root);
    APP.phonemeColor.apply(root);
  }

  function renderAll() {}
  function clearAll() {}

  return { mount: mount, renderAll: renderAll, clearAll: clearAll };
})();
