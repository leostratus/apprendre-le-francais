// Persistent right-hand reference: the color-coded phoneme legend, shown on
// every tool. Collapses to a floating toggle + overlay on narrow viewports.
window.APP = window.APP || {};
APP.components = APP.components || {};

APP.components.phonemeRail = (function () {
  var i18n = APP.i18n;

  // Every vowel, oral then nasal, each with its own fixed color — the only
  // color-coding on the site. Consonants, glides, and the rhotic are never
  // colored, so they're left off this legend.
  var VOWELS = ['i', 'e', 'ɛ', 'a', 'ɑ', 'ɔ', 'o', 'u', 'y', 'ø', 'œ', 'ə'];
  var NASALS = ['ɑ̃', 'ɛ̃', 'ɔ̃', 'œ̃'];

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function content(onOpenSons) {
    var frag = document.createElement('div');
    frag.appendChild(el('div', 'rail-title', i18n.s('rail_title')));

    var list = el('div', 'rail-legend rail-legend-vowels');
    VOWELS.concat(NASALS).forEach(function (symbol) {
      var item = el('div', 'rail-leg');
      item.innerHTML =
        '<span class="ph-dot" style="background:' + APP.phonemePalette.colorFor(symbol) + '"></span>' +
        '<span class="ipa">/' + symbol + '/</span>';
      list.appendChild(item);
    });
    frag.appendChild(list);

    var btn = el('button', 'rail-open-btn', i18n.s('rail_open_full'));
    btn.type = 'button';
    btn.addEventListener('click', onOpenSons);
    frag.appendChild(btn);

    return frag;
  }

  function render(railEl, overlayBtnEl, onOpenSons) {
    railEl.innerHTML = '';
    railEl.appendChild(content(onOpenSons));

    overlayBtnEl.innerHTML = '🔊';
    overlayBtnEl.title = i18n.s('rail_title');
    overlayBtnEl.onclick = function () {
      var overlay = el('div', 'rail-overlay');
      var box = el('div', 'rail-overlay-box');
      box.appendChild(content(function () { document.body.removeChild(overlay); onOpenSons(); }));
      var close = el('button', 'nav-btn', i18n.s('confirm_cancel'));
      close.type = 'button';
      close.style.marginTop = '0.8rem';
      close.addEventListener('click', function () { document.body.removeChild(overlay); });
      box.appendChild(close);
      overlay.appendChild(box);
      overlay.addEventListener('click', function (e) { if (e.target === overlay) document.body.removeChild(overlay); });
      document.body.appendChild(overlay);
    };
  }

  return { render: render };
})();
