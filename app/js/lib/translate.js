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
