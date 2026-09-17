// Universal phoneme coloring: walks rendered DOM text and wraps any bare IPA
// symbol in the site's five phoneme-type spans (v/nv/c/r/g), so a symbol
// mentioned in flowing prose gets the same color as the same symbol inside a
// hand-built table cell. Only touches IPA-exclusive characters — glyphs that
// never appear in real French/English spelling — so ordinary prose text is
// never mistaken for a phoneme. (œ is excluded even though it's IPA /œ/,
// because œ is also a real French spelling character — sœur, œuf, vœu.)
window.APP = window.APP || {};

APP.phonemeColor = (function () {
  var MAP = { 'ʁ': 'r', 'ɛ': 'v', 'ɔ': 'v', 'ɑ': 'v', 'ø': 'v', 'ə': 'v', 'ɲ': 'c', 'ʃ': 'c', 'ʒ': 'c', 'ɥ': 'g' };
  var NASAL_BASE = 'ɛɔɑ';
  var TILDE = '̃';
  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, CODE: 1 };
  var COLOR_CLASSES = ['v', 'nv', 'c', 'r', 'g'];

  function classify(ch, next) {
    if (NASAL_BASE.indexOf(ch) !== -1 && next === TILDE) return { cls: 'nv', len: 2 };
    if (MAP[ch]) return { cls: MAP[ch], len: 1 };
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
        span.className = m.cls;
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
      if (parent.classList && COLOR_CLASSES.some(function (c) { return parent.classList.contains(c); })) continue;
      if (hasMatch(node.nodeValue)) toProcess.push(node);
    }
    toProcess.forEach(splitTextNode);
  }

  return { apply: apply };
})();
