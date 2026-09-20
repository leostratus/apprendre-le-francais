// Chrome-only i18n: nav, buttons, wizard UI labels. Taught-French content stays invariant.
window.APP = window.APP || {};

APP.i18n = (function () {
  var STRINGS = {
    en: {
      brand: 'Study Tools',
      tab_pronunciation: 'Pronunciation',
      tab_adverbes: 'Adverbs',
      tab_adjectifs: 'Adjectives',
      tab_noms: 'Nouns',
      tab_conjugations: 'Conjugations',
      tab_analyzer: 'Sentence Analyzer',
      tab_sons: 'Sounds',
      tab_passe_compose: 'Passé composé',
      lang_btn: 'FR',
      lang_btn_title: 'Switch to Canadian French',
      clear_btn: 'Clear',
      clear_btn_title: 'Reset this tool',
      reset_all_btn: 'Reset all tools',
      reset_all_confirm: 'Reset progress in every tool? This clears all saved choices.',
      confirm_ok: 'Reset',
      confirm_cancel: 'Cancel',
      wizard_progress: 'Your path',
      wizard_empty: 'No choices yet. Answer the question to begin.',
      wizard_redo: 'Edit',
      restart_wizard: 'Start over',
      formation_title: 'Adverb formation',
      formation_sub: 'Work through the decision tree to build the right adverb.',
      placement_title: 'Adverb placement',
      placement_sub: 'Work through the decision tree to place the adverb correctly.',
      reference_title: 'Reference',
      done_formation: 'Adverb formed',
      done_placement: 'Adverb correctly placed',
      done_pc: 'Your passé composé is correct',
      adj_formation_title: 'Adjective formation',
      adj_formation_sub: 'Work through the decision tree to form the feminine or the plural.',
      adj_placement_title: 'Adjective placement',
      adj_placement_sub: 'Work through the decision tree to place the adjective correctly.',
      done_adj_formation: 'Adjective form found',
      done_adj_placement: 'Adjective correctly placed',
      noun_gender_title: 'Noun gender',
      noun_gender_sub: 'Work through the decision tree to guess whether a noun is masculine or feminine.',
      noun_plural_title: 'Noun plural',
      noun_plural_sub: 'Work through the decision tree to form the plural of a noun.',
      done_noun_gender: 'Likely gender found',
      done_noun_plural: 'Plural formed',
      sons_eyebrow: 'French · Spelling → sound',
      sons_title: 'Sounds of French',
      sons_intro: 'Every phoneme in French, grouped by type, with the spellings that produce it and a spoken example for each. Tap the speaker icon to hear any example.',
      sons_spelling: 'spelling',
      sons_example: 'example',
      rail_title: 'Sounds key',
      rail_open_full: 'Open full chart →',
      conj_eyebrow: 'French · Conjugation patterns',
      conj_title: 'Conjugations',
      conj_intro: 'Every verb-form pattern in French, grouped by the shape that predicts it: the three regular groups first, then each irregular family, each with a full présent/imparfait/futur/conditionnel/subjonctif paradigm, the verbs that follow it, and their past participles.',
      conj_regular_title: 'The three regular groups',
      conj_regular_sub: 'Most French verbs belong to one of these three groups. Ending sound patterns are covered in more depth on the Pronunciation and Sounds pages.',
      conj_irregular_title: 'Irregular families',
      conj_irregular_sub: 'Each family shares one stem-change rule. Learn the rule once and it applies to every verb listed under it.',
      conj_th_infinitive: 'infinitive',
      conj_th_participle: 'past participle',
      conj_th_meaning: 'meaning',
      conj_verb_family: 'Verbs in this family',
      analyzer_eyebrow: 'French · Sentence analysis',
      analyzer_title: 'Sentence Analyzer',
      analyzer_intro: 'Type or paste a French sentence to see its part-of-speech breakdown and a phoneme-colored IPA transcription for every word.',
      analyzer_disclaimer: 'Part-of-speech tags and pronunciations here are automated and may contain errors.',
      analyzer_placeholder: 'Écrivez une phrase en français…',
      analyzer_placeholder_empty: 'Type a sentence above to see it analyzed here.',
      analyzer_play_all: 'Play sentence',
      analyzer_google: 'Google Translate ↗',
      analyzer_deepl: 'DeepL ↗',
      analyzer_breakdown: 'Word-by-word breakdown',
      analyzer_translations: 'Translations',
      analyzer_translate_idle: 'Type a sentence above.',
      analyzer_translate_loading: 'Translating…',
      analyzer_translate_error: 'Translation unavailable right now. Use the Open link instead.',
      analyzer_open: 'Open ↗',
      analyzer_deepl_key_placeholder: 'Your DeepL API key (optional)',
      analyzer_deepl_key_note: 'Get a free key at deepl.com/pro-api.',
      analyzer_legend_title: 'Part-of-speech key',
    },
    fr: {
      brand: 'Outils d’étude',
      tab_pronunciation: 'Prononciation',
      tab_adverbes: 'Adverbes',
      tab_adjectifs: 'Adjectifs',
      tab_noms: 'Noms',
      tab_conjugations: 'Conjugaisons',
      tab_analyzer: 'Analyseur de phrases',
      tab_sons: 'Sons',
      tab_passe_compose: 'Passé composé',
      lang_btn: 'EN',
      lang_btn_title: 'Passer à l’anglais',
      clear_btn: 'Effacer',
      clear_btn_title: 'Réinitialiser cet outil',
      reset_all_btn: 'Réinitialiser tous les outils',
      reset_all_confirm: 'Réinitialiser la progression dans tous les outils? Tous les choix enregistrés seront effacés.',
      confirm_ok: 'Réinitialiser',
      confirm_cancel: 'Annuler',
      wizard_progress: 'Votre parcours',
      wizard_empty: 'Aucun choix pour l’instant. Répondez à la question pour commencer.',
      wizard_redo: 'Modifier',
      restart_wizard: 'Recommencer',
      formation_title: 'Formation des adverbes',
      formation_sub: 'Suivez l’arbre de décision pour former le bon adverbe.',
      placement_title: 'Placement des adverbes',
      placement_sub: 'Suivez l’arbre de décision pour bien placer l’adverbe.',
      reference_title: 'Référence',
      done_formation: 'Adverbe formé',
      done_placement: 'Adverbe correctement placé',
      done_pc: 'Votre passé composé est correct',
      adj_formation_title: 'Formation des adjectifs',
      adj_formation_sub: 'Suivez l’arbre de décision pour former le féminin ou le pluriel.',
      adj_placement_title: 'Placement des adjectifs',
      adj_placement_sub: 'Suivez l’arbre de décision pour bien placer l’adjectif.',
      done_adj_formation: 'Forme de l’adjectif trouvée',
      done_adj_placement: 'Adjectif correctement placé',
      noun_gender_title: 'Genre du nom',
      noun_gender_sub: 'Suivez l’arbre de décision pour deviner si un nom est masculin ou féminin.',
      noun_plural_title: 'Pluriel du nom',
      noun_plural_sub: 'Suivez l’arbre de décision pour former le pluriel d’un nom.',
      done_noun_gender: 'Genre probable trouvé',
      done_noun_plural: 'Pluriel formé',
      sons_eyebrow: 'Français · Orthographe → son',
      sons_title: 'Les sons du français',
      sons_intro: 'Chaque phonème du français, regroupé par type, avec les orthographes qui le produisent et un exemple parlé pour chacune. Touchez l’icône du haut-parleur pour entendre un exemple.',
      sons_spelling: 'orthographe',
      sons_example: 'exemple',
      rail_title: 'Clé des sons',
      rail_open_full: 'Ouvrir le tableau complet →',
      conj_eyebrow: 'Français · Modèles de conjugaison',
      conj_title: 'Conjugaisons',
      conj_intro: 'Tous les modèles de forme verbale en français, regroupés selon la structure qui les prédit : d’abord les trois groupes réguliers, puis chaque famille irrégulière, chacune avec un paradigme complet au présent, à l’imparfait, au futur, au conditionnel et au subjonctif, les verbes qui suivent ce modèle, et leurs participes passés.',
      conj_regular_title: 'Les trois groupes réguliers',
      conj_regular_sub: 'La plupart des verbes français appartiennent à l’un de ces trois groupes. Les modèles de sons des terminaisons sont traités plus en détail dans les pages Prononciation et Sons.',
      conj_irregular_title: 'Familles irrégulières',
      conj_irregular_sub: 'Chaque famille partage une seule règle de changement de base. Apprenez la règle une fois, et elle s’applique à chaque verbe listé en dessous.',
      conj_th_infinitive: 'infinitif',
      conj_th_participle: 'participe passé',
      conj_th_meaning: 'sens',
      conj_verb_family: 'Verbes de cette famille',
      analyzer_eyebrow: 'Français · Analyse de phrases',
      analyzer_title: 'Analyseur de phrases',
      analyzer_intro: 'Tapez ou collez une phrase en français pour voir sa décomposition grammaticale et une transcription API colorée par phonème pour chaque mot.',
      analyzer_disclaimer: 'Les étiquettes grammaticales et les prononciations ici sont automatisées et peuvent contenir des erreurs.',
      analyzer_placeholder: 'Écrivez une phrase en français…',
      analyzer_placeholder_empty: 'Tapez une phrase ci-dessus pour la voir analysée ici.',
      analyzer_play_all: 'Écouter la phrase',
      analyzer_google: 'Google Traduction ↗',
      analyzer_deepl: 'DeepL ↗',
      analyzer_breakdown: 'Décomposition mot par mot',
      analyzer_translations: 'Traductions',
      analyzer_translate_idle: 'Tapez une phrase ci-dessus.',
      analyzer_translate_loading: 'Traduction en cours…',
      analyzer_translate_error: 'Traduction indisponible pour l’instant. Utilisez le lien Ouvrir à la place.',
      analyzer_open: 'Ouvrir ↗',
      analyzer_deepl_key_placeholder: 'Votre clé API DeepL (facultatif)',
      analyzer_deepl_key_note: 'Obtenez une clé gratuite sur deepl.com/pro-api.',
      analyzer_legend_title: 'Clé des classes grammaticales',
    }
  };

  var LANG_KEY = 'sft.lang';
  var lang = (function () {
    try {
      var saved = localStorage.getItem(LANG_KEY);
      if (saved === 'en' || saved === 'fr') return saved;
    } catch (e) {}
    return 'en';
  })();

  var listeners = [];

  function getLang() { return lang; }

  function setLang(next) {
    if (next !== 'en' && next !== 'fr') return;
    lang = next;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    listeners.forEach(function (fn) { fn(lang); });
  }

  function toggleLang() { setLang(lang === 'en' ? 'fr' : 'en'); }

  function onChange(fn) { listeners.push(fn); }

  // s(key) — chrome dictionary lookup
  function s(key) {
    var dict = STRINGS[lang] || STRINGS.en;
    return dict[key] != null ? dict[key] : (STRINGS.en[key] || key);
  }

  // t(field) — translate an inline {en,fr} field, or pass through invariant strings/nodes
  function t(field) {
    if (field == null) return '';
    if (typeof field === 'string') return field;
    if (typeof field === 'object' && ('en' in field || 'fr' in field)) {
      return field[lang] != null ? field[lang] : (field.en || field.fr || '');
    }
    return field;
  }

  return { getLang: getLang, setLang: setLang, toggleLang: toggleLang, onChange: onChange, s: s, t: t };
})();
