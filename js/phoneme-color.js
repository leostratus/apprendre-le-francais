// Universal phoneme coloring: walks rendered DOM text and colors any bare
// vowel IPA symbol with its fixed color from APP.phonemePalette, so a symbol
// mentioned in flowing prose gets the same color as the same symbol inside a
// hand-built table cell. Only touches IPA-exclusive characters — glyphs that
// never appear in real French/English spelling — so ordinary prose text is
// never mistaken for a phoneme. That rules out i, e, a, o, u, y (all real
// letters) and œ (real French spelling — sœur, œuf, vœu); those get colored
// by callers that already know the text is IPA (data-helpers.ipa()), not by
// this prose scanner. Consonants, glides, and the rhotic are never colored.
window.APP = window.APP || {};

APP.phonemeColor = (function () {
  var SAFE = 'ɛɔɑøə';
  var NASAL_BASE = 'ɛɔɑ';
  var TILDE = '̃';
  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, CODE: 1 };

  function classify(ch, next) {
    if (NASAL_BASE.indexOf(ch) !== -1 && next === TILDE) {
      var nasalColor = APP.phonemePalette.colorFor(ch + next);
      return nasalColor ? { color: nasalColor, len: 2 } : null;
    }
    if (SAFE.indexOf(ch) !== -1) {
      var color = APP.phonemePalette.colorFor(ch);
      return color ? { color: color, len: 1 } : null;
    }
    return null;
  }

  function hasMatch(text) {
    for (var i = 0; i < text.length; i++) {
      if (classify(text[i], text[i + 1])) return true;
    }
    return false;
  }

  function splitTextNode(node) {
    var text = node.nodeValue;
    var frag = document.createDocumentFragment();
    var buf = '';
    for (var i = 0; i < text.length; i++) {
      var m = classify(text[i], text[i + 1]);
      if (m) {
        if (buf) { frag.appendChild(document.createTextNode(buf)); buf = ''; }
        var span = document.createElement('span');
        span.style.color = m.color;
        span.textContent = text.substr(i, m.len);
        frag.appendChild(span);
        i += m.len - 1;
      } else {
        buf += text[i];
      }
    }
    if (buf) frag.appendChild(document.createTextNode(buf));
    node.parentNode.replaceChild(frag, node);
  }

  function apply(root) {
    if (!root) return;
    var toProcess = [];
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while ((node = walker.nextNode())) {
      var parent = node.parentNode;
      if (!parent || !parent.tagName) continue;
      if (SKIP_TAGS[parent.tagName]) continue;
      if (parent.tagName === 'SPAN' && parent.style && parent.style.color) continue;
      if (hasMatch(node.nodeValue)) toProcess.push(node);
    }
    toProcess.forEach(splitTextNode);
  }

  return { apply: apply };
})();
