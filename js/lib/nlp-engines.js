// Lazy-loads the two vendored open-source engines the Analyzer upgrades to:
//   - fr-compromise (js/vendor/fr-compromise.min.js, ~260KB): a real French
//     lexicon + grammar POS tagger, replacing the site's own ~250-word
//     dictionary + suffix heuristics for anything it recognizes.
//   - espeak-ng compiled to WASM (js/vendor/espeak-ng.js + .wasm, ~18MB): a
//     mature, exception-aware French grapheme-to-phoneme engine, replacing
//     the site's own hand-written rule engine.
//
// Neither loads until something asks for it (APP.tools.analyzer does, on
// mount) — this keeps every other tool's load time unaffected by the 18MB
// WASM payload. Both are vendored locally rather than fetched from a CDN, so
// this works offline once loaded once (the point of a packaged/offline app).
window.APP = window.APP || {};

APP.nlpEngines = (function () {
  var frPromise = null;
  var espeakModulePromise = null;

  // Emscripten's locateFile resolves relative paths against the page's own
  // URL, not this script's — which breaks both on GitHub Pages (served from
  // a /apprendre-le-francais/ subpath) and on a plain '../vendor/' guess.
  // document.currentScript is only valid during this synchronous top-level
  // run, so it's captured now and turned into an absolute vendor/ URL.
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

  // Just fetches+compiles the WASM module factory once. Emscripten's
  // MODULARIZE build doesn't export callMain for reuse (confirmed at
  // integration time — it throws "callMain was not exported"), so each
  // transcription still creates a fresh lightweight instance from this
  // already-compiled factory rather than re-fetching/re-compiling the 18MB
  // binary every time.
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

  // transcribeSentence(text, lang) -> Promise<string>: raw espeak IPA output
  // for the whole sentence, in one instantiation (far cheaper than one
  // instantiation per word — see the callMain note above).
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
