window.APP = window.APP || {};
APP.tools = APP.tools || {};

APP.tools.adjectifs = (function () {
  var i18n = APP.i18n;
  var engines = [];

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function mount(root) {
    root.innerHTML = '';
    engines = [];

    var header = el('div', 'tool-header');
    header.innerHTML =
      '<div class="eyebrow">French · Adjectives</div>' +
      '<h1>Les <em>adjectifs</em></h1>' +
      '<p class="intro">' + i18n.t({ en: 'Two decision trees: how to form the feminine and plural of an adjective, and where to place it relative to the noun.', fr: 'Deux arbres de décision : comment former le féminin et le pluriel d’un adjectif, et où le placer par rapport au nom.' }) + '</p>';
    root.appendChild(header);

    var shF = el('div', 'sh');
    shF.innerHTML = '<div class="sh-marker">§1</div><h2>' + i18n.s('adj_formation_title') + '</h2>';
    root.appendChild(shF);
    root.appendChild(el('p', 'prose', i18n.s('adj_formation_sub')));
    var wrapF = el('div');
    root.appendChild(wrapF);
    engines.push(APP.WizardEngine({ wizardId: 'adjectifs-formation', graph: APP.data.adjectifsFormation, container: wrapF, doneKey: 'done_adj_formation' }));

    var shP = el('div', 'sh');
    shP.innerHTML = '<div class="sh-marker">§2</div><h2>' + i18n.s('adj_placement_title') + '</h2>';
    root.appendChild(shP);
    root.appendChild(el('p', 'prose', i18n.s('adj_placement_sub')));
    var wrapP = el('div');
    root.appendChild(wrapP);
    engines.push(APP.WizardEngine({ wizardId: 'adjectifs-placement', graph: APP.data.adjectifsPlacement, container: wrapP, doneKey: 'done_adj_placement' }));

    engines.forEach(function (e) { e.render(); });
    APP.speech.wireSpeakers(root);
    APP.phonemeColor.apply(root);
  }

  function renderAll() { engines.forEach(function (e) { e.render(); }); }

  function clearAll() {
    APP.state.clearPath('adjectifs-formation');
    APP.state.clearPath('adjectifs-placement');
    renderAll();
  }

  return { mount: mount, renderAll: renderAll, clearAll: clearAll };
})();
