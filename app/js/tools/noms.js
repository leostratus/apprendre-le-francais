window.APP = window.APP || {};
APP.tools = APP.tools || {};

APP.tools.noms = (function () {
  var i18n = APP.i18n;
  var engines = [];

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function renderRefTable(parent, ref) {
    var block = el('div', 'ref-block');
    block.appendChild(el('div', 'table-title', i18n.t(ref.title)));
    block.appendChild(el('div', '', i18n.t(ref.table)));
    parent.appendChild(block);
  }

  function mount(root) {
    root.innerHTML = '';
    engines = [];

    var header = el('div', 'tool-header');
    header.innerHTML =
      '<div class="eyebrow">French · Nouns</div>' +
      '<h1>Les <em>noms</em></h1>' +
      '<p class="intro">' + i18n.t({ en: 'Two decision trees: patterns for guessing a noun’s gender from its ending, and how to form its plural.', fr: 'Deux arbres de décision : des modèles pour deviner le genre d’un nom d’après sa terminaison, et comment former son pluriel.' }) + '</p>';
    root.appendChild(header);

    var shG = el('div', 'sh');
    shG.innerHTML = '<div class="sh-marker">§1</div><h2>' + i18n.s('noun_gender_title') + '</h2>';
    root.appendChild(shG);
    root.appendChild(el('p', 'prose', i18n.s('noun_gender_sub')));
    var wrapG = el('div');
    root.appendChild(wrapG);
    engines.push(APP.WizardEngine({ wizardId: 'noms-genre', graph: APP.data.nomsGenre, container: wrapG, doneKey: 'done_noun_gender' }));

    var shP = el('div', 'sh');
    shP.innerHTML = '<div class="sh-marker">§2</div><h2>' + i18n.s('noun_plural_title') + '</h2>';
    root.appendChild(shP);
    root.appendChild(el('p', 'prose', i18n.s('noun_plural_sub')));
    var wrapP = el('div');
    root.appendChild(wrapP);
    engines.push(APP.WizardEngine({ wizardId: 'noms-pluriel', graph: APP.data.nomsPluriel, container: wrapP, doneKey: 'done_noun_plural' }));

    var ref = el('div', 'ref-section');
    var shR = el('div', 'sh');
    shR.innerHTML = '<div class="sh-marker">§3</div><h2>' + i18n.s('reference_title') + '</h2>';
    ref.appendChild(shR);
    var refData = APP.data.nomsGenreReference;
    renderRefTable(ref, refData.fem);
    renderRefTable(ref, refData.masc);
    root.appendChild(ref);

    engines.forEach(function (e) { e.render(); });
    APP.speech.wireSpeakers(root);
    APP.phonemeColor.apply(root);
    APP.wordPhonemeColor.applyToTables(root);
  }

  function renderAll() { engines.forEach(function (e) { e.render(); }); }

  function clearAll() {
    APP.state.clearPath('noms-genre');
    APP.state.clearPath('noms-pluriel');
    renderAll();
  }

  return { mount: mount, renderAll: renderAll, clearAll: clearAll };
})();
