// The full Sounds chart, reachable from anywhere as a slide-over drawer
// instead of a tab switch, so opening it never loses whatever the user was
// doing on the current page. Mounts the same APP.tools.sons module used by
// the Sounds tab into its own content area, fresh on every open so it
// always reflects the current language.
window.APP = window.APP || {};
APP.components = APP.components || {};

APP.components.sonsDrawer = (function () {
  var wired = false;
  var drawerEl, contentEl, closeBtn;

  function wire() {
    if (wired) return;
    drawerEl = document.getElementById('sons-drawer');
    contentEl = document.getElementById('sons-drawer-content');
    closeBtn = document.getElementById('sons-drawer-close');
    if (!drawerEl) return;
    closeBtn.addEventListener('click', close);
    drawerEl.querySelector('.sons-drawer-backdrop').addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawerEl.classList.contains('open')) close();
    });
    wired = true;
  }

  function open() {
    wire();
    if (!drawerEl) return;
    contentEl.innerHTML = '';
    APP.tools.sons.mount(contentEl);
    drawerEl.classList.add('open');
    document.body.classList.add('sons-drawer-lock');
  }

  function close() {
    if (!drawerEl) return;
    drawerEl.classList.remove('open');
    document.body.classList.remove('sons-drawer-lock');
  }

  function toggle() {
    wire();
    if (drawerEl && drawerEl.classList.contains('open')) close();
    else open();
  }

  function isOpen() {
    return !!(drawerEl && drawerEl.classList.contains('open'));
  }

  return { open: open, close: close, toggle: toggle, isOpen: isOpen };
})();
