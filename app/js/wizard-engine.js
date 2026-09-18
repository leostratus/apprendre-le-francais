// Generic renderer for a graph-shaped decision wizard.
// graph = { start: 'nodeId', nodes: { id: { type: 'question'|'end', ... } } }
// question node: { text, note?, options: [{ id, label, next, result?: {title?, html, note?} }] }
// end node:      { title, html? }
window.APP = window.APP || {};

APP.WizardEngine = function (opts) {
  var wizardId = opts.wizardId;
  var graph = opts.graph;
  var container = opts.container;
  var doneKey = opts.doneKey; // i18n key for the generic "done" banner override, optional
  var i18n = APP.i18n;

  // Replay the persisted option-id path against the graph, starting from graph.start.
  // Stops (and truncates) at the first id that no longer resolves — defends against
  // stale localStorage from a previous version of the data.
  function replay() {
    var path = APP.state.loadPath(wizardId);
    var steps = [];
    var nodeId = graph.start;
    var valid = [];

    for (var i = 0; i < path.length; i++) {
      var node = graph.nodes[nodeId];
      if (!node || node.type !== 'question') break;
      var optId = path[i];
      var opt = null;
      for (var j = 0; j < node.options.length; j++) {
        if (node.options[j].id === optId) { opt = node.options[j]; break; }
      }
      if (!opt) break;
      steps.push({ node: node, option: opt });
      valid.push(optId);
      nodeId = opt.next;
    }

    if (valid.length !== path.length) APP.state.savePath(wizardId, valid);

    return { steps: steps, currentNodeId: nodeId, path: valid };
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function renderSidebar(state) {
    var box = el('div', 'wizard-sidebar');
    box.appendChild(el('div', 'ws-title', i18n.s('wizard_progress')));

    if (state.steps.length === 0) {
      box.appendChild(el('div', 'ws-empty', i18n.s('wizard_empty')));
    }

    state.steps.forEach(function (step, idx) {
      var btn = el('button', 'ws-step');
      btn.type = 'button';
      btn.appendChild(el('div', 'ws-q', i18n.t(step.node.text)));
      var aRow = el('div', 'ws-a');
      aRow.innerHTML = i18n.t(step.option.label) + '<span class="ws-redo">' + i18n.s('wizard_redo') + '</span>';
      btn.appendChild(aRow);
      btn.setAttribute('aria-label', i18n.t(step.node.text) + ': ' + i18n.t(step.option.label) + ' — ' + i18n.s('wizard_redo'));
      btn.addEventListener('click', function () {
        var newPath = state.path.slice(0, idx);
        APP.state.savePath(wizardId, newPath);
        render();
      });
      box.appendChild(btn);
    });

    return box;
  }

  function renderResultCard(option) {
    if (!option.result) return null;
    var r = option.result;
    var card = el('div', 'wr-card');
    if (r.muted) card.classList.add('muted');
    if (r.title) card.appendChild(el('div', 'wr-title', i18n.t(r.title)));
    if (r.html) card.appendChild(el('div', '', i18n.t(r.html)));
    if (r.note) card.appendChild(el('div', 'wr-note', i18n.t(r.note)));
    return card;
  }

  function renderQuestion(node) {
    var frag = document.createDocumentFragment();
    var box = el('div', 'wq-box');
    box.appendChild(el('div', 'wq-text', i18n.t(node.text)));
    if (node.note) box.appendChild(el('div', 'wq-note', i18n.t(node.note)));

    var optsWrap = el('div', 'wq-options');
    node.options.forEach(function (opt) {
      var b = el('button', 'wq-opt');
      b.type = 'button';
      var labelHtml = '<span class="wq-opt-label">' + i18n.t(opt.label) + '</span>';
      if (opt.sub) labelHtml += '<span class="wq-opt-sub">' + i18n.t(opt.sub) + '</span>';
      b.innerHTML = labelHtml;
      b.setAttribute('aria-label', i18n.t(opt.label) + (opt.sub ? ' — ' + i18n.t(opt.sub) : ''));
      b.addEventListener('click', function () {
        var path = APP.state.loadPath(wizardId);
        path.push(opt.id);
        APP.state.savePath(wizardId, path);
        render();
      });
      optsWrap.appendChild(b);
    });
    box.appendChild(optsWrap);
    frag.appendChild(box);
    return frag;
  }

  function renderEnd(node) {
    var frag = document.createDocumentFragment();
    var banner = el('div', 'wr-end');
    banner.appendChild(el('span', 'wr-end-check', '✓'));
    var title = doneKey ? i18n.s(doneKey) : i18n.t(node.title);
    banner.appendChild(el('span', 'wr-end-title', title));
    frag.appendChild(banner);
    if (node.html) frag.appendChild(el('div', '', i18n.t(node.html)));

    var restart = el('button', 'wiz-restart', i18n.s('restart_wizard'));
    restart.type = 'button';
    restart.addEventListener('click', function () {
      APP.state.clearPath(wizardId);
      render();
    });
    frag.appendChild(restart);
    return frag;
  }

  function render() {
    var state = replay();
    container.innerHTML = '';

    var wrap = el('div', 'wizard');
    wrap.appendChild(renderSidebar(state));

    var panel = el('div', 'wizard-panel');

    // Show result cards for every step taken so far, in order — chronological
    // reads naturally as "what happened along the way".
    state.steps.forEach(function (step) {
      var card = renderResultCard(step.option);
      if (card) panel.appendChild(card);
    });

    var currentNode = graph.nodes[state.currentNodeId];
    if (!currentNode) {
      // Shouldn't happen with well-formed data, but fail soft rather than throw.
      panel.appendChild(el('div', 'wr-card muted', 'This path has no further steps.'));
    } else if (currentNode.type === 'end') {
      panel.appendChild(renderEnd(currentNode));
    } else {
      panel.appendChild(renderQuestion(currentNode));
    }

    wrap.appendChild(panel);
    container.appendChild(wrap);
    APP.speech.wireSpeakers(container);
    APP.phonemeColor.apply(container);
    APP.wordPhonemeColor.applyToTables(container);
  }

  return { render: render, clear: function () { APP.state.clearPath(wizardId); render(); } };
};
