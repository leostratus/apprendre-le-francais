// Persistent right-hand reference: the color-coded phoneme legend, shown on
// every tool. Collapses to a floating toggle + overlay on narrow viewports.
window.APP = window.APP || {};
APP.components = APP.components || {};

APP.components.phonemeRail = (function () {
  var i18n = APP.i18n;

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function content(onOpenSons) {
    var frag = document.createElement('div');
    frag.appendChild(el('div', 'rail-title', i18n.s('rail_title')));

    // Every phoneme the Sounds page teaches, each with its own fixed color —
    // the only color-coding on the site. Pulled straight from that page's
    // own data so this legend can never drift out of sync with it.
    var list = el('div', 'rail-legend rail-legend-vowels');
    (APP.data.sons || []).forEach(function (entry) {
      var symbol = entry.ipa.replace(/\//g, '');
      var color = APP.phonemePalette.colorFor(symbol);
      if (!color) return;
      var item = el('div', 'rail-leg');
      item.innerHTML =
        '<span class="ph-dot" style="background:' + color + '"></span>' +
        '<span class="ipa">' + entry.ipa + '</span>';
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
