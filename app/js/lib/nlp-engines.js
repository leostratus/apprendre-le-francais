window.APP = window.APP || {};

APP.nlpEngines = (function () {
  var frPromise = null;
  var espeakModulePromise = null;

  // locateFile must resolve against this script's own URL, not the page's,
  // or paths break under a subpath deployment.
  var VENDOR_BASE = (function () {
    var src = document.currentScript && document.currentScript.src;
    return src ? new URL('../vendor/', src).href : 'vendor/';
  })();

  function loadFrCompromise() {
    if (frPromise) return frPromise;
    frPromise = import('../vendor/fr-compromise.min.js')
      .then(function () {
        if (!window.frCompromise) throw new Error('fr-compromise did not expose window.frCompromise');
        return window.frCompromise;
      })
      .catch(function (e) {
        frPromise = null; // allow retry on next call
        throw e;
      });
    return frPromise;
  }

  // callMain isn't exported by this build, so each transcription creates a
  // fresh instance from this already-compiled factory.
  function loadEspeak() {
    if (espeakModulePromise) return espeakModulePromise;
    espeakModulePromise = import('../vendor/espeak-ng.js')
      .then(function (mod) { return mod.default; })
      .catch(function (e) {
        espeakModulePromise = null;
        throw e;
      });
    return espeakModulePromise;
  }

  function transcribeSentence(text, lang) {
    return loadEspeak().then(function (ESpeakNG) {
      return ESpeakNG({
        arguments: ['--phonout', '/out.txt', '--sep=""', '-q', '--ipa=3', '-v', lang || 'fr', text],
        locateFile: function (p) { return VENDOR_BASE + p; }
      });
    }).then(function (instance) {
      var out = '';
      try { out = instance.FS.readFile('/out.txt', { encoding: 'utf8' }); } catch (e) { out = ''; }
      return out.trim();
    });
  }

  return {
    loadFrCompromise: loadFrCompromise,
    loadEspeak: loadEspeak,
    transcribeSentence: transcribeSentence
  };
})();
