// Shared browser TTS ("hear it" buttons). Any tool can render a
// <button class="say" data-say="phrase to speak">…</button> and call
// APP.speech.wireSpeakers(root) to activate every such button under root.
window.APP = window.APP || {};

APP.speech = (function () {
  var frVoice = null;

  function pickVoice() {
    if (!('speechSynthesis' in window)) return;
    var voices = speechSynthesis.getVoices();
    frVoice = voices.find(function (v) { return v.lang === 'fr-FR'; })
      || voices.find(function (v) { return v.lang && v.lang.indexOf('fr') === 0; })
      || null;
  }

  if ('speechSynthesis' in window) {
    pickVoice();
    if (speechSynthesis.onvoiceschanged !== undefined) speechSynthesis.onvoiceschanged = pickVoice;
  }

  function speak(text, btn) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'fr-FR';
    if (frVoice) u.voice = frVoice;
    u.rate = 0.85;
    if (btn) {
      btn.classList.add('playing');
      u.onend = function () { btn.classList.remove('playing'); };
      u.onerror = function () { btn.classList.remove('playing'); };
    }
    speechSynthesis.speak(u);
  }

  // Idempotent: marks wired buttons so re-render + re-wire (wizard re-renders
  // its whole container each step) never double-binds a listener.
  function wireSpeakers(root) {
    if (!root) return;
    root.querySelectorAll('.say:not([data-wired])').forEach(function (btn) {
      btn.setAttribute('data-wired', '1');
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        speak(btn.dataset.say, btn);
      });
    });
  }

  return { speak: speak, wireSpeakers: wireSpeakers };
})();
