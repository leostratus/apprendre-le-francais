// Per-tool wizard state: persists only the sequence of chosen option ids from the
// start node. All text/results are recomputed from data + current language on render,
// so language switches and data edits never leave stale rendered content behind.
window.APP = window.APP || {};

APP.state = (function () {
  var PREFIX = 'sft.wizard.';
  var ACTIVE_TOOL_KEY = 'sft.activeTool';

  function key(wizardId) { return PREFIX + wizardId; }

  function loadPath(wizardId) {
    try {
      var raw = localStorage.getItem(key(wizardId));
      if (!raw) return [];
      var arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function savePath(wizardId, path) {
    try { localStorage.setItem(key(wizardId), JSON.stringify(path)); } catch (e) {}
  }

  function clearPath(wizardId) {
    try { localStorage.removeItem(key(wizardId)); } catch (e) {}
  }

  function clearAllWizards() {
    try {
      var toRemove = [];
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(PREFIX) === 0) toRemove.push(k);
      }
      toRemove.forEach(function (k) { localStorage.removeItem(k); });
    } catch (e) {}
  }

  function getActiveTool(fallback) {
    try {
      var v = localStorage.getItem(ACTIVE_TOOL_KEY);
      return v || fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setActiveTool(toolId) {
    try { localStorage.setItem(ACTIVE_TOOL_KEY, toolId); } catch (e) {}
  }

  return {
    loadPath: loadPath,
    savePath: savePath,
    clearPath: clearPath,
    clearAllWizards: clearAllWizards,
    getActiveTool: getActiveTool,
    setActiveTool: setActiveTool
  };
})();
