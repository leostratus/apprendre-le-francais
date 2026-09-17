(function () {
  var i18n = APP.i18n;

  function confirmDialog(message, onConfirm) {
    var overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    var box = document.createElement('div');
    box.className = 'confirm-box';
    var msg = document.createElement('div');
    msg.className = 'confirm-msg';
    msg.textContent = message;
    var actions = document.createElement('div');
    actions.className = 'confirm-actions';

    var cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'nav-btn';
    cancelBtn.textContent = i18n.s('confirm_cancel');

    var okBtn = document.createElement('button');
    okBtn.type = 'button';
    okBtn.className = 'nav-btn reset-all';
    okBtn.textContent = i18n.s('confirm_ok');

    function close() { document.body.removeChild(overlay); }
    cancelBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    okBtn.addEventListener('click', function () { close(); onConfirm(); });

    actions.appendChild(cancelBtn);
    actions.appendChild(okBtn);
    box.appendChild(msg);
    box.appendChild(actions);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  var TOOLS = [
    { id: 'sons', labelKey: 'tab_sons', module: APP.tools.sons, hasClear: false },
    { id: 'adverbes', labelKey: 'tab_adverbes', module: APP.tools.adverbes, hasClear: true },
    { id: 'adjectifs', labelKey: 'tab_adjectifs', module: APP.tools.adjectifs, hasClear: true },
    { id: 'noms', labelKey: 'tab_noms', module: APP.tools.noms, hasClear: true },
    { id: 'conjugations', labelKey: 'tab_conjugations', module: APP.tools.conjugations, hasClear: false },
    { id: 'passe-compose', labelKey: 'tab_passe_compose', module: APP.tools.passeCompose, hasClear: true },
    { id: 'analyzer', labelKey: 'tab_analyzer', module: APP.tools.analyzer, hasClear: true }
  ];

  var activeId = APP.state.getActiveTool(TOOLS[0].id);
  if (!TOOLS.some(function (t) { return t.id === activeId; })) activeId = TOOLS[0].id;

  var containers = {};
  var tabButtons = {};
  var clearBtn, langBtn, resetAllBtn, tabsEl;

  function activeTool() {
    for (var i = 0; i < TOOLS.length; i++) if (TOOLS[i].id === activeId) return TOOLS[i];
    return TOOLS[0];
  }

  function buildNav() {
    var nav = document.getElementById('topnav');
    nav.innerHTML = '';

    var brand = document.createElement('div');
    brand.className = 'brand';
    brand.textContent = i18n.s('brand');
    nav.appendChild(brand);

    tabsEl = document.createElement('div');
    tabsEl.className = 'tool-tabs';
    tabsEl.setAttribute('role', 'tablist');
    TOOLS.forEach(function (t) {
      var b = document.createElement('button');
      b.className = 'tool-tab';
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(t.id === activeId));
      b.textContent = i18n.s(t.labelKey);
      b.addEventListener('click', function () { selectTool(t.id); });
      tabsEl.appendChild(b);
      tabButtons[t.id] = b;
    });
    nav.appendChild(tabsEl);

    var actions = document.createElement('div');
    actions.className = 'nav-actions';

    clearBtn = document.createElement('button');
    clearBtn.className = 'nav-btn';
    clearBtn.type = 'button';
    clearBtn.title = i18n.s('clear_btn_title');
    clearBtn.textContent = i18n.s('clear_btn');
    clearBtn.addEventListener('click', function () { activeTool().module.clearAll(); });
    actions.appendChild(clearBtn);

    langBtn = document.createElement('button');
    langBtn.className = 'nav-btn lang-btn';
    langBtn.type = 'button';
    langBtn.title = i18n.s('lang_btn_title');
    langBtn.textContent = i18n.s('lang_btn');
    langBtn.addEventListener('click', function () { i18n.toggleLang(); });
    actions.appendChild(langBtn);

    resetAllBtn = document.createElement('button');
    resetAllBtn.className = 'nav-btn reset-all';
    resetAllBtn.type = 'button';
    resetAllBtn.textContent = i18n.s('reset_all_btn');
    resetAllBtn.addEventListener('click', function () {
      confirmDialog(i18n.s('reset_all_confirm'), function () {
        APP.state.clearAllWizards();
        TOOLS.forEach(function (t) { t.module.renderAll(); });
      });
    });
    actions.appendChild(resetAllBtn);

    nav.appendChild(actions);
    updateClearVisibility();
  }

  function updateClearVisibility() {
    clearBtn.hidden = !activeTool().hasClear;
  }

  function buildContainers() {
    var root = document.getElementById('app-root');
    root.innerHTML = '';
    TOOLS.forEach(function (t) {
      var main = document.createElement('main');
      main.className = 'tool-main';
      main.id = 'tool-' + t.id;
      main.hidden = t.id !== activeId;
      root.appendChild(main);
      containers[t.id] = main;
      t.module.mount(main);
    });
  }

  function selectTool(id) {
    activeId = id;
    APP.state.setActiveTool(id);
    TOOLS.forEach(function (t) {
      containers[t.id].hidden = t.id !== id;
      tabButtons[t.id].setAttribute('aria-selected', String(t.id === id));
    });
    updateClearVisibility();
  }

  function buildRail() {
    var rail = document.getElementById('phoneme-rail');
    var toggle = document.getElementById('rail-toggle');
    APP.components.phonemeRail.render(rail, toggle, function () { selectTool('sons'); });
  }

  function fullRebuild() {
    buildNav();
    buildContainers();
    buildRail();
    selectTool(activeId);
  }

  i18n.onChange(function () { fullRebuild(); });

  fullRebuild();
})();
