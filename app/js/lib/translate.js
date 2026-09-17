// Client-side translation calls, no server/build step available on this
// static site.
//
// Google: uses the unofficial translate.googleapis.com "gtx" endpoint (the
// same one many free browser-extension translators call) — it answers plain
// fetch() with no API key and no CORS block, but it is undocumented, can
// change or rate-limit without notice, and is not the paid Cloud Translation
// API. Treated as best-effort, with the official translate.google.com link
// kept as a fallback.
//
// DeepL: has no keyless public endpoint. If the user supplies their own
// DeepL API key (stored only in this browser's localStorage — never in the
// repo, never sent anywhere but DeepL's own API), this calls it directly.
window.APP = window.APP || {};

APP.translate = (function () {
  function google(text, sl, tl) {
    var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + sl + '&tl=' + tl + '&dt=t&q=' + encodeURIComponent(text);
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function (data) {
      if (!data || !data[0]) throw new Error('unexpected response');
      return data[0].map(function (seg) { return seg[0]; }).join('');
    });
  }

  function deepl(text, sl, tl, apiKey) {
    if (!apiKey) return Promise.reject(new Error('no-key'));
    var isFree = /:fx$/.test(apiKey);
    var base = isFree ? 'https://api-free.deepl.com' : 'https://api.deepl.com';
    var body = new URLSearchParams();
    body.set('auth_key', apiKey);
    body.set('text', text);
    body.set('source_lang', sl.toUpperCase());
    body.set('target_lang', tl.toUpperCase());
    return fetch(base + '/v2/translate', { method: 'POST', body: body }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function (data) {
      if (!data || !data.translations || !data.translations[0]) throw new Error('unexpected response');
      return data.translations[0].text;
    });
  }

  return { google: google, deepl: deepl };
})();
