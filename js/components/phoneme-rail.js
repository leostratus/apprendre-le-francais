// Persistent right-hand reference: the color-coded phoneme legend, shown on
// every tool. Collapses to a floating toggle + overlay on narrow viewports.
window.APP = window.APP || {};
APP.components = APP.components || {};

APP.components.phonemeRail = (function () {
  var i18n = APP.i18n;

  var LEGEND = [
    { cls: 'v', dot: '--ph-vowel', label: { en: 'oral vowel', fr: 'voyelle orale' }, symbols: 'e ɛ a ɔ ø y u i' },
    { cls: 'nv', dot: '--ph-nasal', label: { en: 'nasal vowel', fr: 'voyelle nasale' }, symbols: 'ɔ̃ ɑ̃ ɛ̃' },
    { cls: 'c', dot: '--ph-cons', label: { en: 'consonant', fr: 'consonne' }, symbols: 'p b t d k m n l s z…' },
    { cls: 'r', dot: '--ph-rhotic', label: { en: 'ʁ (French r)', fr: 'ʁ (r français)' }, symbols: '' },
    { cls: 'g', dot: '--ph-glide', label: { en: 'glide', fr: 'semi-voyelle' }, symbols: 'j w ɥ' }
  ];

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function content(onOpenSons) {
    var frag = document.createElement('div');
    frag.appendChild(el('div', 'rail-title', i18n.s('rail_title')));

    var list = el('div', 'rail-legend');
    LEGEND.forEach(function (row) {
      var item = el('div', 'rail-leg');
      item.innerHTML =
        '<span class="ph-dot" style="background:var(' + row.dot + ')"></span>' +
        '<span class="' + row.cls + '">' + i18n.t(row.label) + '</span>' +
        (row.symbols ? '<span class="rail-symbols ipa">' + row.symbols + '</span>' : '');
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
