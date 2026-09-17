window.APP = window.APP || {};
APP.tools = APP.tools || {};

APP.tools.passeCompose = (function () {
  var i18n = APP.i18n;
  var engine = null;

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

    var header = el('div', 'tool-header');
    header.innerHTML =
      '<div class="eyebrow">French · Grammar</div>' +
      '<h1>Le <em>passé composé</em></h1>' +
      '<p class="intro">' + i18n.t({ en: 'Walk through auxiliary choice, agreement, negation, and question form — one decision at a time.', fr: 'Parcourez le choix de l’auxiliaire, l’accord, la négation et la forme interrogative — une décision à la fois.' }) + '</p>';
    root.appendChild(header);

    var wrap = el('div');
    root.appendChild(wrap);
    engine = APP.WizardEngine({ wizardId: 'passe-compose', graph: APP.data.passeCompose, container: wrap, doneKey: 'done_pc' });

    var ref = el('div', 'ref-section');
    var shR = el('div', 'sh');
    shR.innerHTML = '<div class="sh-marker">§</div><h2>' + i18n.s('reference_title') + '</h2>';
    ref.appendChild(shR);
    var refData = APP.data.passeComposeReference;
    renderRefTable(ref, refData.families);
    renderRefTable(ref, refData.isolated);
    root.appendChild(ref);

    engine.render();
    APP.speech.wireSpeakers(root);
  }

  function renderAll() { if (engine) engine.render(); }

  function clearAll() {
    APP.state.clearPath('passe-compose');
    renderAll();
  }

  return { mount: mount, renderAll: renderAll, clearAll: clearAll };
})();
