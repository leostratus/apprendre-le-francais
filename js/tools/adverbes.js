window.APP = window.APP || {};
APP.tools = APP.tools || {};

APP.tools.adverbes = (function () {
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
      '<div class="eyebrow">French · Adverbs</div>' +
      '<h1>Les <em>adverbes</em></h1>' +
      '<p class="intro">' + i18n.t({ en: 'Two decision trees: how to form an adverb from an adjective, and where to place it in a sentence.', fr: 'Deux arbres de décision : comment former un adverbe à partir d’un adjectif, et où le placer dans la phrase.' }) + '</p>';
    root.appendChild(header);

    // ── Formation wizard ──
    var shF = el('div', 'sh');
    shF.innerHTML = '<div class="sh-marker">§1</div><h2>' + i18n.s('formation_title') + '</h2>';
    root.appendChild(shF);
    root.appendChild(el('p', 'prose', i18n.s('formation_sub')));
    var wrapF = el('div');
    root.appendChild(wrapF);
    var engineF = APP.WizardEngine({ wizardId: 'adverbes-formation', graph: APP.data.adverbesFormation, container: wrapF, doneKey: 'done_formation' });
    engines.push(engineF);

    // ── Placement wizard ──
    var shP = el('div', 'sh');
    shP.innerHTML = '<div class="sh-marker">§2</div><h2>' + i18n.s('placement_title') + '</h2>';
    root.appendChild(shP);
    root.appendChild(el('p', 'prose', i18n.s('placement_sub')));
    var wrapP = el('div');
    root.appendChild(wrapP);
    var engineP = APP.WizardEngine({ wizardId: 'adverbes-placement', graph: APP.data.adverbesPlacement, container: wrapP, doneKey: 'done_placement' });
    engines.push(engineP);

    // ── Reference ──
    var ref = el('div', 'ref-section');
    var shR = el('div', 'sh');
    shR.innerHTML = '<div class="sh-marker">§3</div><h2>' + i18n.s('reference_title') + '</h2>';
    ref.appendChild(shR);
    var refData = APP.data.adverbesFormationReference;
    renderRefTable(ref, refData);
    renderRefTable(ref, refData.irregulars);
    root.appendChild(ref);

    engines.forEach(function (e) { e.render(); });
    APP.speech.wireSpeakers(root);
    APP.phonemeColor.apply(root);
  }

  function renderAll() { engines.forEach(function (e) { e.render(); }); }

  function clearAll() {
    APP.state.clearPath('adverbes-formation');
    APP.state.clearPath('adverbes-placement');
    renderAll();
  }

  return { mount: mount, renderAll: renderAll, clearAll: clearAll };
})();
