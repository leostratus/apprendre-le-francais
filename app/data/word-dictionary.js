// Exact-match dictionary for common French function words and high-frequency
// vocabulary: word -> { pos, ipa }. This is consulted before the rule-based
// G2P/POS fallbacks in js/lib/, since these words carry the exceptions
// (silent/pronounced -es, -ent, -s, elisions) that no general rule gets right.
//
// POS codes: art (article), det (determiner: possessive/demonstrative),
// pron (pronoun), verb, noun, adj, adv, prep, conj, neg (negation), num
// (number), interj (interjection).
window.APP = window.APP || {};
APP.data = APP.data || {};

(function () {
  // [word, pos, ipa]
  var ENTRIES = [
    // articles
    ['le', 'art', 'lə'], ['la', 'art', 'la'], ['les', 'art', 'le'], ["l'", 'art', 'l'],
    ['un', 'art', 'œ̃'], ['une', 'art', 'yn'], ['des', 'art', 'de'], ['du', 'art', 'dy'],
    ['au', 'art', 'o'], ['aux', 'art', 'o'],

    // subject pronouns
    ['je', 'pron', 'ʒə'], ["j'", 'pron', 'ʒ'], ['tu', 'pron', 'ty'], ['il', 'pron', 'il'],
    ['elle', 'pron', 'ɛl'], ['on', 'pron', 'ɔ̃'], ['nous', 'pron', 'nu'], ['vous', 'pron', 'vu'],
    ['ils', 'pron', 'il'], ['elles', 'pron', 'ɛl'],

    // object / reflexive / other pronouns
    ['me', 'pron', 'mə'], ["m'", 'pron', 'm'], ['te', 'pron', 'tə'], ["t'", 'pron', 't'],
    ['se', 'pron', 'sə'], ["s'", 'pron', 's'], ['lui', 'pron', 'lɥi'], ['leur', 'pron', 'lœʁ'],
    ['y', 'pron', 'i'], ['en', 'pron', 'ɑ̃'], ['moi', 'pron', 'mwa'], ['toi', 'pron', 'twa'],
    ['soi', 'pron', 'swa'], ['eux', 'pron', 'ø'],

    // relative / demonstrative pronouns
    ['qui', 'pron', 'ki'], ['que', 'pron', 'kə'], ["qu'", 'pron', 'k'], ['dont', 'pron', 'dɔ̃'],
    ['où', 'pron', 'u'], ['ce', 'pron', 'sə'], ["c'", 'pron', 's'], ['ceci', 'pron', 'səsi'],
    ['cela', 'pron', 'səla'], ['ça', 'pron', 'sa'],

    // possessive determiners
    ['mon', 'det', 'mɔ̃'], ['ma', 'det', 'ma'], ['mes', 'det', 'me'],
    ['ton', 'det', 'tɔ̃'], ['ta', 'det', 'ta'], ['tes', 'det', 'te'],
    ['son', 'det', 'sɔ̃'], ['sa', 'det', 'sa'], ['ses', 'det', 'se'],
    ['notre', 'det', 'nɔtʁ'], ['nos', 'det', 'no'], ['votre', 'det', 'vɔtʁ'], ['vos', 'det', 'vo'],
    ['leurs', 'det', 'lœʁ'],

    // demonstrative determiners
    ['cet', 'det', 'sɛt'], ['cette', 'det', 'sɛt'], ['ces', 'det', 'se'],

    // negation
    ['ne', 'neg', 'nə'], ["n'", 'neg', 'n'], ['pas', 'neg', 'pa'], ['rien', 'neg', 'ʁjɛ̃'],
    ['personne', 'neg', 'pɛʁsɔn'], ['aucun', 'neg', 'okœ̃'], ['aucune', 'neg', 'okyn'],

    // prepositions
    ['à', 'prep', 'a'], ['de', 'prep', 'də'], ["d'", 'prep', 'd'], ['dans', 'prep', 'dɑ̃'],
    ['sur', 'prep', 'syʁ'], ['sous', 'prep', 'su'], ['avec', 'prep', 'avɛk'], ['sans', 'prep', 'sɑ̃'],
    ['pour', 'prep', 'puʁ'], ['par', 'prep', 'paʁ'], ['chez', 'prep', 'ʃe'], ['entre', 'prep', 'ɑ̃tʁ'],
    ['vers', 'prep', 'vɛʁ'], ['depuis', 'prep', 'dəpɥi'], ['pendant', 'prep', 'pɑ̃dɑ̃'],
    ['avant', 'prep', 'avɑ̃'], ['après', 'prep', 'apʁɛ'], ['contre', 'prep', 'kɔ̃tʁ'],

    // conjunctions
    ['et', 'conj', 'e'], ['ou', 'conj', 'u'], ['mais', 'conj', 'mɛ'], ['donc', 'conj', 'dɔ̃k'],
    ['or', 'conj', 'ɔʁ'], ['ni', 'conj', 'ni'], ['car', 'conj', 'kaʁ'], ['si', 'conj', 'si'],
    ['quand', 'conj', 'kɑ̃'], ['comme', 'conj', 'kɔm'], ['lorsque', 'conj', 'lɔʁskə'],
    ['puisque', 'conj', 'pɥiskə'],

    // high-frequency adverbs
    ['bien', 'adv', 'bjɛ̃'], ['mal', 'adv', 'mal'], ['très', 'adv', 'tʁɛ'], ['trop', 'adv', 'tʁo'],
    ['assez', 'adv', 'ase'], ['plus', 'adv', 'ply'], ['moins', 'adv', 'mwɛ̃'], ['aussi', 'adv', 'osi'],
    ['encore', 'adv', 'ɑ̃kɔʁ'], ['déjà', 'adv', 'deʒa'], ['toujours', 'adv', 'tuʒuʁ'],
    ['souvent', 'adv', 'suvɑ̃'], ['jamais', 'adv', 'ʒamɛ'], ['parfois', 'adv', 'paʁfwa'],
    ['ici', 'adv', 'isi'], ['là', 'adv', 'la'], ["aujourd'hui", 'adv', 'oʒuʁdɥi'],
    ['demain', 'adv', 'dəmɛ̃'], ['hier', 'adv', 'jɛʁ'], ['vite', 'adv', 'vit'],
    ['peu', 'adv', 'pø'], ['beaucoup', 'adv', 'boku'], ['maintenant', 'adv', 'mɛ̃tənɑ̃'],
    ['alors', 'adv', 'alɔʁ'], ['surtout', 'adv', 'syʁtu'], ['seulement', 'adv', 'sœlmɑ̃'],
    ['presque', 'adv', 'pʁɛskə'], ['oui', 'adv', 'wi'], ['non', 'adv', 'nɔ̃'],

    // lexical exceptions the general rules can't derive
    ['temps', 'noun', 'tɑ̃'], ['femme', 'noun', 'fam'], ['exemple', 'noun', 'ɛgzɑ̃pl'],
    ['monsieur', 'noun', 'məsjø'], ['femmes', 'noun', 'fam'],

    // small closed classes: numbers, interjections
    ['zéro', 'num', 'zeʁo'], ['un', 'num', 'œ̃'], ['deux', 'num', 'dø'], ['trois', 'num', 'tʁwa'],
    ['quatre', 'num', 'katʁ'], ['cinq', 'num', 'sɛ̃k'], ['six', 'num', 'sis'], ['sept', 'num', 'sɛt'],
    ['huit', 'num', 'ɥit'], ['neuf', 'num', 'nœf'], ['dix', 'num', 'dis'],
    ['oh', 'interj', 'o'], ['ah', 'interj', 'a'], ['eh', 'interj', 'e'], ['zut', 'interj', 'zyt'],
    ['bravo', 'interj', 'bʁavo'], ['allô', 'interj', 'alo'],

    // a starter set of common adjectives (open class — the rest fall to heuristics)
    ['grand', 'adj', 'gʁɑ̃'], ['grande', 'adj', 'gʁɑ̃d'], ['petit', 'adj', 'pəti'], ['petite', 'adj', 'pətit'],
    ['bon', 'adj', 'bɔ̃'], ['bonne', 'adj', 'bɔn'], ['mauvais', 'adj', 'movɛ'], ['mauvaise', 'adj', 'movɛz'],
    ['beau', 'adj', 'bo'], ['belle', 'adj', 'bɛl'], ['joli', 'adj', 'ʒɔli'], ['jolie', 'adj', 'ʒɔli'],
    ['jeune', 'adj', 'ʒœn'], ['vieux', 'adj', 'vjø'], ['vieille', 'adj', 'vjɛj'],
    ['nouveau', 'adj', 'nuvo'], ['nouvelle', 'adj', 'nuvɛl'], ['gentil', 'adj', 'ʒɑ̃ti'], ['gentille', 'adj', 'ʒɑ̃tij'],
    ['heureux', 'adj', 'øʁø'], ['heureuse', 'adj', 'øʁøz'], ['triste', 'adj', 'tʁist'],
    ['content', 'adj', 'kɔ̃tɑ̃'], ['contente', 'adj', 'kɔ̃tɑ̃t'], ['fatigué', 'adj', 'fatige'],
    ['important', 'adj', 'ɛ̃pɔʁtɑ̃'], ['difficile', 'adj', 'difisil'], ['facile', 'adj', 'fasil'],
    ['même', 'adj', 'mɛm'], ['autre', 'adj', 'otʁ'], ['tout', 'adj', 'tu'], ['toute', 'adj', 'tut'],
    ['rouge', 'adj', 'ʁuʒ'], ['bleu', 'adj', 'blø'], ['vert', 'adj', 'vɛʁ'], ['jaune', 'adj', 'ʒon'],
    ['noir', 'adj', 'nwaʁ'], ['blanc', 'adj', 'blɑ̃'], ['blanche', 'adj', 'blɑ̃ʃ'],
    ['français', 'adj', 'fʁɑ̃sɛ'], ['française', 'adj', 'fʁɑ̃sɛz'],
    ['rapide', 'adj', 'ʁapid'], ['lent', 'adj', 'lɑ̃'], ['lente', 'adj', 'lɑ̃t'],
    ['chaud', 'adj', 'ʃo'], ['froid', 'adj', 'fʁwa'], ['cher', 'adj', 'ʃɛʁ'], ['chère', 'adj', 'ʃɛʁ']
  ];

  var IPA = {};
  var POS = {};
  ENTRIES.forEach(function (e) {
    IPA[e[0]] = e[2];
    POS[e[0]] = e[1];
  });

  // Mine every conjugated form + infinitive already authored in the
  // Conjugations data as an exact verb dictionary — reuses work already
  // verified there instead of re-deriving pronunciations.
  function mineVerbs() {
    function addForm(spell, ipa) {
      var key = spell.toLowerCase();
      if (!IPA[key]) IPA[key] = ipa;
      POS[key] = 'verb';
    }
    function fromParadigm(paradigm) {
      if (!paradigm) return;
      Object.keys(paradigm).forEach(function (tense) {
        paradigm[tense].forEach(function (f) { addForm(f.spell, f.ipa); });
      });
    }
    (APP.data.regularGroups || []).forEach(function (g) { fromParadigm(g.paradigm); POS[g.model] = 'verb'; });
    (APP.data.irregularFamilies || []).forEach(function (fam) {
      fromParadigm(fam.paradigm);
      POS[fam.model] = 'verb';
      (fam.verbList || []).forEach(function (v) { POS[v.infinitive.replace(/^se |^s'/, '')] = 'verb'; });
    });
    if (APP.data.memorizeOnly) {
      (APP.data.memorizeOnly.verbList || []).forEach(function (v) { POS[v.infinitive.replace(/^se |^s'/, '')] = 'verb'; });
    }
  }
  mineVerbs();

  // A modest list of common regular -er infinitives, so at least the
  // dictionary form tags correctly. Their non-infinitive present-tense forms
  // (je/il "mange", "donne"...) are genuinely ambiguous with nouns/adjectives
  // by spelling alone and fall to the heuristic default — disclosed in the
  // Analyzer tool's own UI rather than silently guessed with false confidence.
  ['manger', 'aimer', 'donner', 'regarder', 'écouter', 'chercher', 'jouer', 'travailler',
    'habiter', 'penser', 'trouver', 'demander', 'montrer', 'porter', 'passer', 'laisser',
    'rester', 'sembler', 'tomber', 'entrer', 'monter', 'commencer', 'continuer', 'appeler',
    'aider', 'apporter', 'acheter', 'préparer', 'utiliser', 'expliquer', 'montrer', 'marcher',
    'chanter', 'danser', 'dessiner', 'nager', 'voyager', 'rêver', 'oublier', 'gagner', 'perdre'
  ].forEach(function (v) { if (!POS[v]) POS[v] = 'verb'; });

  APP.data.wordIPA = IPA;
  APP.data.wordPOS = POS;
})();
