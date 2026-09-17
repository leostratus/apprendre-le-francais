window.APP = window.APP || {};
APP.data = APP.data || {};

// Source for the irregular verb families: user-provided reference PDF
// (French Irregular Verb Groups). Regular groups and IPA transcriptions
// added to match the site's phonetic system. Presented as a systematic
// reference — orthography and pronunciation side by side, patterns stated
// as fact, no commentary.
(function () {
  var PRONOUNS = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];

  // paradigm(present, imperfect, future, conditional, subjunctive) — each a
  // 6-item [ipa, spelling] array in je/tu/il/nous/vous/ils order.
  function paradigm(present, imperfect, future, conditional, subjunctive) {
    var tenses = { present: present, imperfect: imperfect, future: future, conditional: conditional, subjunctive: subjunctive };
    var out = {};
    Object.keys(tenses).forEach(function (t) {
      out[t] = tenses[t].map(function (pair, i) { return { pron: PRONOUNS[i], ipa: pair[0], spell: pair[1] }; });
    });
    return out;
  }

  function verbs(list) {
    // [infinitive, participle, meaning] -> {infinitive, participle, meaning}
    return list.map(function (v) { return { infinitive: v[0], participle: v[1], meaning: v[2] }; });
  }

  APP.data.regularGroups = [
    {
      id: 'er', ending: '-er', model: 'parler', meaning: 'to speak',
      paradigm: paradigm(
        [['paʁl', 'parle'], ['paʁl', 'parles'], ['paʁl', 'parle'], ['paʁlɔ̃', 'parlons'], ['paʁle', 'parlez'], ['paʁl', 'parlent']],
        [['paʁlɛ', 'parlais'], ['paʁlɛ', 'parlais'], ['paʁlɛ', 'parlait'], ['paʁljɔ̃', 'parlions'], ['paʁlje', 'parliez'], ['paʁlɛ', 'parlaient']],
        [['paʁlɛʁe', 'parlerai'], ['paʁlɛʁa', 'parleras'], ['paʁlɛʁa', 'parlera'], ['paʁlɛʁɔ̃', 'parlerons'], ['paʁlɛʁe', 'parlerez'], ['paʁlɛʁɔ̃', 'parleront']],
        [['paʁlɛʁɛ', 'parlerais'], ['paʁlɛʁɛ', 'parlerais'], ['paʁlɛʁɛ', 'parlerait'], ['paʁlɛʁjɔ̃', 'parlerions'], ['paʁlɛʁje', 'parleriez'], ['paʁlɛʁɛ', 'parleraient']],
        [['paʁl', 'parle'], ['paʁl', 'parles'], ['paʁl', 'parle'], ['paʁljɔ̃', 'parlions'], ['paʁlje', 'parliez'], ['paʁl', 'parlent']]
      ),
      note: { en: 'The largest group: roughly 90% of French verbs. The je/tu/il/ils forms of the présent share one silent ending.', fr: 'Le plus grand groupe : environ 90 % des verbes français. Les formes je/tu/il/ils du présent partagent une terminaison muette.' }
    },
    {
      id: 'ir', ending: '-ir', model: 'finir', meaning: 'to finish',
      paradigm: paradigm(
        [['fini', 'finis'], ['fini', 'finis'], ['fini', 'finit'], ['finisɔ̃', 'finissons'], ['finise', 'finissez'], ['finis', 'finissent']],
        [['finisɛ', 'finissais'], ['finisɛ', 'finissais'], ['finisɛ', 'finissait'], ['finisjɔ̃', 'finissions'], ['finisje', 'finissiez'], ['finisɛ', 'finissaient']],
        [['finiʁe', 'finirai'], ['finiʁa', 'finiras'], ['finiʁa', 'finira'], ['finiʁɔ̃', 'finirons'], ['finiʁe', 'finirez'], ['finiʁɔ̃', 'finiront']],
        [['finiʁɛ', 'finirais'], ['finiʁɛ', 'finirais'], ['finiʁɛ', 'finirait'], ['finiʁjɔ̃', 'finirions'], ['finiʁje', 'finiriez'], ['finiʁɛ', 'finiraient']],
        [['finis', 'finisse'], ['finis', 'finisses'], ['finis', 'finisse'], ['finisjɔ̃', 'finissions'], ['finisje', 'finissiez'], ['finis', 'finissent']]
      ),
      note: { en: 'The -iss- block appears in every form except the présent singular. That block is the signal that a verb belongs to this group rather than the -ir-like-er group below.', fr: 'Le bloc -iss- apparaît dans toutes les formes sauf le singulier du présent. Ce bloc signale qu’un verbe appartient à ce groupe plutôt qu’au groupe -ir conjugué comme -er ci-dessous.' }
    },
    {
      id: 're', ending: '-re', model: 'vendre', meaning: 'to sell',
      paradigm: paradigm(
        [['vɑ̃', 'vends'], ['vɑ̃', 'vends'], ['vɑ̃', 'vend'], ['vɑ̃dɔ̃', 'vendons'], ['vɑ̃de', 'vendez'], ['vɑ̃d', 'vendent']],
        [['vɑ̃dɛ', 'vendais'], ['vɑ̃dɛ', 'vendais'], ['vɑ̃dɛ', 'vendait'], ['vɑ̃djɔ̃', 'vendions'], ['vɑ̃dje', 'vendiez'], ['vɑ̃dɛ', 'vendaient']],
        [['vɑ̃dʁe', 'vendrai'], ['vɑ̃dʁa', 'vendras'], ['vɑ̃dʁa', 'vendra'], ['vɑ̃dʁɔ̃', 'vendrons'], ['vɑ̃dʁe', 'vendrez'], ['vɑ̃dʁɔ̃', 'vendront']],
        [['vɑ̃dʁɛ', 'vendrais'], ['vɑ̃dʁɛ', 'vendrais'], ['vɑ̃dʁɛ', 'vendrait'], ['vɑ̃dʁjɔ̃', 'vendrions'], ['vɑ̃dʁje', 'vendriez'], ['vɑ̃dʁɛ', 'vendraient']],
        [['vɑ̃d', 'vende'], ['vɑ̃d', 'vendes'], ['vɑ̃d', 'vende'], ['vɑ̃djɔ̃', 'vendions'], ['vɑ̃dje', 'vendiez'], ['vɑ̃d', 'vendent']]
      ),
      note: { en: 'The infinitive’s final -e is dropped before the futur/conditionnel endings are added; nothing else changes.', fr: 'Le -e final de l’infinitif est supprimé avant l’ajout des terminaisons du futur/conditionnel ; rien d’autre ne change.' }
    }
  ];

  APP.data.irregularFamilies = [
    {
      id: 'ir-truncated',
      title: { en: 'Third-group -ir verbs with a truncated stem in the singular', fr: 'Verbes du 3e groupe en -ir à base tronquée au singulier' },
      rule: { en: 'The final stem consonant is dropped in the singular and kept in the plural.', fr: 'La consonne finale de la base disparaît au singulier et reste au pluriel.' },
      model: 'partir', meaning: 'to leave',
      paradigm: paradigm(
        [['paʁ', 'pars'], ['paʁ', 'pars'], ['paʁ', 'part'], ['paʁtɔ̃', 'partons'], ['paʁte', 'partez'], ['paʁt', 'partent']],
        [['paʁtɛ', 'partais'], ['paʁtɛ', 'partais'], ['paʁtɛ', 'partait'], ['paʁtjɔ̃', 'partions'], ['paʁtje', 'partiez'], ['paʁtɛ', 'partaient']],
        [['paʁtiʁe', 'partirai'], ['paʁtiʁa', 'partiras'], ['paʁtiʁa', 'partira'], ['paʁtiʁɔ̃', 'partirons'], ['paʁtiʁe', 'partirez'], ['paʁtiʁɔ̃', 'partiront']],
        [['paʁtiʁɛ', 'partirais'], ['paʁtiʁɛ', 'partirais'], ['paʁtiʁɛ', 'partirait'], ['paʁtiʁjɔ̃', 'partirions'], ['paʁtiʁje', 'partiriez'], ['paʁtiʁɛ', 'partiraient']],
        [['paʁt', 'parte'], ['paʁt', 'partes'], ['paʁt', 'parte'], ['paʁtjɔ̃', 'partions'], ['paʁtje', 'partiez'], ['paʁt', 'partent']]
      ),
      participleNote: { en: 'Infinitive group predicts the default: true -ir verbs like partir take -i as the past participle ending.', fr: 'Le groupe de l’infinitif prédit la forme par défaut : les vrais verbes en -ir comme partir prennent -i comme terminaison du participe passé.' },
      verbList: verbs([
        ['partir', 'parti', 'to leave'], ['sortir', 'sorti', 'to go out'], ['dormir', 'dormi', 'to sleep'],
        ['sentir', 'senti', 'to feel, to smell'], ['mentir', 'menti', 'to lie'], ['servir', 'servi', 'to serve'],
        ['se repentir', 'repenti', 'to repent'], ['ressortir', 'ressorti', 'to go out again, to stand out'],
        ['repartir', 'reparti', 'to leave again'], ['endormir', 'endormi', 'to put to sleep'],
        ['ressentir', 'ressenti', 'to feel, to experience'], ['consentir', 'consenti', 'to consent'],
        ['pressentir', 'pressenti', 'to sense in advance'], ['desservir', 'desservi', 'to clear (a table), to serve poorly'],
        ['resservir', 'resservi', 'to serve again']
      ])
    },
    {
      id: 'ir-like-er',
      title: { en: '-ir verbs conjugated like -er verbs', fr: 'Verbes en -ir conjugués comme les verbes en -er' },
      rule: { en: 'The présent follows the endings of parler despite the -ir infinitive.', fr: 'Le présent suit les terminaisons de parler malgré l’infinitif en -ir.' },
      model: 'ouvrir', meaning: 'to open',
      paradigm: paradigm(
        [['uvʁ', 'ouvre'], ['uvʁ', 'ouvres'], ['uvʁ', 'ouvre'], ['uvʁɔ̃', 'ouvrons'], ['uvʁe', 'ouvrez'], ['uvʁ', 'ouvrent']],
        [['uvʁɛ', 'ouvrais'], ['uvʁɛ', 'ouvrais'], ['uvʁɛ', 'ouvrait'], ['uvʁjɔ̃', 'ouvrions'], ['uvʁje', 'ouvriez'], ['uvʁɛ', 'ouvraient']],
        [['uvʁiʁe', 'ouvrirai'], ['uvʁiʁa', 'ouvriras'], ['uvʁiʁa', 'ouvrira'], ['uvʁiʁɔ̃', 'ouvrirons'], ['uvʁiʁe', 'ouvrirez'], ['uvʁiʁɔ̃', 'ouvriront']],
        [['uvʁiʁɛ', 'ouvrirais'], ['uvʁiʁɛ', 'ouvrirais'], ['uvʁiʁɛ', 'ouvrirait'], ['uvʁiʁjɔ̃', 'ouvririons'], ['uvʁiʁje', 'ouvririez'], ['uvʁiʁɛ', 'ouvriraient']],
        [['uvʁ', 'ouvre'], ['uvʁ', 'ouvres'], ['uvʁ', 'ouvre'], ['uvʁjɔ̃', 'ouvrions'], ['uvʁje', 'ouvriez'], ['uvʁ', 'ouvrent']]
      ),
      participleNote: { en: 'Infinitive group predicts the default: -ir verbs that conjugate like -er verbs take -ert instead of the expected -i.', fr: 'Le groupe de l’infinitif prédit la forme par défaut : les verbes en -ir conjugués comme les verbes en -er prennent -ert au lieu du -i attendu.' },
      verbList: verbs([
        ['ouvrir', 'ouvert', 'to open'], ['offrir', 'offert', 'to offer'], ['souffrir', 'souffert', 'to suffer'],
        ['couvrir', 'couvert', 'to cover'], ['découvrir', 'découvert', 'to discover'], ['recouvrir', 'recouvert', 'to cover over'],
        ['entrouvrir', 'entrouvert', 'to open slightly'], ['rouvrir', 'rouvert', 'to reopen']
      ])
    },
    {
      id: 'oir-nasal',
      title: { en: '-oir verbs with nasal stem alternation', fr: 'Verbes en -oir à alternance nasale de la base' },
      rule: { en: 'The stem alternates between an eu form and an ou form depending on the person.', fr: 'La base alterne entre une forme en eu et une forme en ou selon la personne.' },
      model: 'vouloir', meaning: 'to want',
      paradigm: paradigm(
        [['vø', 'veux'], ['vø', 'veux'], ['vø', 'veut'], ['vulɔ̃', 'voulons'], ['vule', 'voulez'], ['vøl', 'veulent']],
        [['vulɛ', 'voulais'], ['vulɛ', 'voulais'], ['vulɛ', 'voulait'], ['vuljɔ̃', 'voulions'], ['vulje', 'vouliez'], ['vulɛ', 'voulaient']],
        [['vudʁe', 'voudrai'], ['vudʁa', 'voudras'], ['vudʁa', 'voudra'], ['vudʁɔ̃', 'voudrons'], ['vudʁe', 'voudrez'], ['vudʁɔ̃', 'voudront']],
        [['vudʁɛ', 'voudrais'], ['vudʁɛ', 'voudrais'], ['vudʁɛ', 'voudrait'], ['vudʁjɔ̃', 'voudrions'], ['vudʁje', 'voudriez'], ['vudʁɛ', 'voudraient']],
        [['vœj', 'veuille'], ['vœj', 'veuilles'], ['vœj', 'veuille'], ['vuljɔ̃', 'voulions'], ['vulje', 'vouliez'], ['vœj', 'veuillent']]
      ),
      participleNote: { en: '-oir verbs cluster around u: voulu, pu, valu sit alongside dû, reçu, connu, vu, lu as part of a wider tendency for -oir verbs to take -u.', fr: 'Les verbes en -oir se regroupent autour de u : voulu, pu, valu se rangent aux côtés de dû, reçu, connu, vu, lu, une tendance plus large des verbes en -oir à prendre -u.' },
      verbList: verbs([
        ['vouloir', 'voulu', 'to want'], ['pouvoir', 'pu', 'to be able to'], ['valoir', 'valu', 'to be worth'],
        ['équivaloir', 'équivalu', 'to be equivalent to'], ['prévaloir', 'prévalu', 'to prevail']
      ])
    },
    {
      id: 'aindre',
      title: { en: 'Verbs in -aindre, -eindre, -oindre', fr: 'Verbes en -aindre, -eindre, -oindre' },
      rule: { en: 'The d of the infinitive becomes gn before an ending that starts with a vowel.', fr: 'Le d de l’infinitif devient gn devant une terminaison qui commence par une voyelle.' },
      model: 'craindre', meaning: 'to fear',
      paradigm: paradigm(
        [['kʁɛ̃', 'crains'], ['kʁɛ̃', 'crains'], ['kʁɛ̃', 'craint'], ['kʁɛɲɔ̃', 'craignons'], ['kʁɛɲe', 'craignez'], ['kʁɛɲ', 'craignent']],
        [['kʁɛɲɛ', 'craignais'], ['kʁɛɲɛ', 'craignais'], ['kʁɛɲɛ', 'craignait'], ['kʁɛɲjɔ̃', 'craignions'], ['kʁɛɲje', 'craigniez'], ['kʁɛɲɛ', 'craignaient']],
        [['kʁɛ̃dʁe', 'craindrai'], ['kʁɛ̃dʁa', 'craindras'], ['kʁɛ̃dʁa', 'craindra'], ['kʁɛ̃dʁɔ̃', 'craindrons'], ['kʁɛ̃dʁe', 'craindrez'], ['kʁɛ̃dʁɔ̃', 'craindront']],
        [['kʁɛ̃dʁɛ', 'craindrais'], ['kʁɛ̃dʁɛ', 'craindrais'], ['kʁɛ̃dʁɛ', 'craindrait'], ['kʁɛ̃dʁjɔ̃', 'craindrions'], ['kʁɛ̃dʁje', 'craindriez'], ['kʁɛ̃dʁɛ', 'craindraient']],
        [['kʁɛɲ', 'craigne'], ['kʁɛɲ', 'craignes'], ['kʁɛɲ', 'craigne'], ['kʁɛɲjɔ̃', 'craignions'], ['kʁɛɲje', 'craigniez'], ['kʁɛɲ', 'craignent']]
      ),
      participleNote: { en: 'Stem ending predicts participle ending: a nasal consonant plus d in the stem drops the d and adds t, as in craint, peint, joint.', fr: 'La terminaison de la base prédit celle du participe : une consonne nasale suivie de d dans la base perd le d et ajoute t, comme dans craint, peint, joint.' },
      verbList: verbs([
        ['craindre', 'craint', 'to fear'], ['plaindre', 'plaint', 'to pity'], ['se plaindre', 'plaint', 'to complain'],
        ['contraindre', 'contraint', 'to compel'], ['peindre', 'peint', 'to paint'], ['éteindre', 'éteint', 'to extinguish, to turn off'],
        ['atteindre', 'atteint', 'to reach, to attain'], ['teindre', 'teint', 'to dye'], ['feindre', 'feint', 'to feign'],
        ['dépeindre', 'dépeint', 'to depict'], ['restreindre', 'restreint', 'to restrict'], ['astreindre', 'astreint', 'to compel, to bind'],
        ['joindre', 'joint', 'to join'], ['rejoindre', 'rejoint', 'to rejoin'], ['adjoindre', 'adjoint', 'to append, to attach'],
        ['disjoindre', 'disjoint', 'to separate'], ['enjoindre', 'enjoint', 'to enjoin, to order']
      ])
    },
    {
      id: 'aitre',
      title: { en: 'Verbs in -aître and -oître', fr: 'Verbes en -aître et -oître' },
      rule: { en: 'A circumflex and a t are inserted before any ending that starts with t; the final stem consonant drops in the singular.', fr: 'Un accent circonflexe et un t s’insèrent devant toute terminaison qui commence par t ; la consonne finale de la base disparaît au singulier.' },
      model: 'connaître', meaning: 'to know',
      paradigm: paradigm(
        [['kɔnɛ', 'connais'], ['kɔnɛ', 'connais'], ['kɔnɛ', 'connaît'], ['kɔnɛsɔ̃', 'connaissons'], ['kɔnɛse', 'connaissez'], ['kɔnɛs', 'connaissent']],
        [['kɔnɛsɛ', 'connaissais'], ['kɔnɛsɛ', 'connaissais'], ['kɔnɛsɛ', 'connaissait'], ['kɔnɛsjɔ̃', 'connaissions'], ['kɔnɛsje', 'connaissiez'], ['kɔnɛsɛ', 'connaissaient']],
        [['kɔnɛtʁe', 'connaîtrai'], ['kɔnɛtʁa', 'connaîtras'], ['kɔnɛtʁa', 'connaîtra'], ['kɔnɛtʁɔ̃', 'connaîtrons'], ['kɔnɛtʁe', 'connaîtrez'], ['kɔnɛtʁɔ̃', 'connaîtront']],
        [['kɔnɛtʁɛ', 'connaîtrais'], ['kɔnɛtʁɛ', 'connaîtrais'], ['kɔnɛtʁɛ', 'connaîtrait'], ['kɔnɛtʁjɔ̃', 'connaîtrions'], ['kɔnɛtʁje', 'connaîtriez'], ['kɔnɛtʁɛ', 'connaîtraient']],
        [['kɔnɛs', 'connaisse'], ['kɔnɛs', 'connaisses'], ['kɔnɛs', 'connaisse'], ['kɔnɛsjɔ̃', 'connaissions'], ['kɔnɛsje', 'connaissiez'], ['kɔnɛs', 'connaissent']]
      ),
      participleNote: { en: '-oir verbs cluster around u: connu and vu extend the same tendency, even though this family is spelled -aître and -oître rather than -oir.', fr: 'Les verbes en -oir se regroupent autour de u : connu et vu prolongent la même tendance, même si cette famille s’écrit -aître et -oître plutôt que -oir.' },
      verbList: verbs([
        ['connaître', 'connu', 'to know'], ['reconnaître', 'reconnu', 'to recognize'], ['méconnaître', 'méconnu', 'to misjudge, to fail to recognize'],
        ['paraître', 'paru', 'to appear, to seem'], ['apparaître', 'apparu', 'to appear'], ['disparaître', 'disparu', 'to disappear'],
        ['comparaître', 'comparu', 'to appear (before a court)'], ['naître', 'né', 'to be born'], ['renaître', 'rené', 'to be reborn'],
        ['croître', 'crû', 'to grow'], ['accroître', 'accru', 'to increase'], ['décroître', 'décru', 'to decrease']
      ])
    },
    {
      id: 'prendre',
      title: { en: 'Verbs built on prendre', fr: 'Verbes construits sur prendre' },
      rule: { en: 'The n of the stem doubles only in the third-person plural.', fr: 'Le n de la base double seulement à la troisième personne du pluriel.' },
      model: 'prendre', meaning: 'to take',
      paradigm: paradigm(
        [['pʁɑ̃', 'prends'], ['pʁɑ̃', 'prends'], ['pʁɑ̃', 'prend'], ['pʁənɔ̃', 'prenons'], ['pʁəne', 'prenez'], ['pʁɛn', 'prennent']],
        [['pʁənɛ', 'prenais'], ['pʁənɛ', 'prenais'], ['pʁənɛ', 'prenait'], ['pʁənjɔ̃', 'prenions'], ['pʁənje', 'preniez'], ['pʁənɛ', 'prenaient']],
        [['pʁɑ̃dʁe', 'prendrai'], ['pʁɑ̃dʁa', 'prendras'], ['pʁɑ̃dʁa', 'prendra'], ['pʁɑ̃dʁɔ̃', 'prendrons'], ['pʁɑ̃dʁe', 'prendrez'], ['pʁɑ̃dʁɔ̃', 'prendront']],
        [['pʁɑ̃dʁɛ', 'prendrais'], ['pʁɑ̃dʁɛ', 'prendrais'], ['pʁɑ̃dʁɛ', 'prendrait'], ['pʁɑ̃dʁjɔ̃', 'prendrions'], ['pʁɑ̃dʁje', 'prendriez'], ['pʁɑ̃dʁɛ', 'prendraient']],
        [['pʁɛn', 'prenne'], ['pʁɛn', 'prennes'], ['pʁɛn', 'prenne'], ['pʁənjɔ̃', 'prenions'], ['pʁənje', 'preniez'], ['pʁɛn', 'prennent']]
      ),
      participleNote: { en: 'Shared root predicts shared ending: any compound of prendre ends in -pris.', fr: 'La racine commune prédit la terminaison commune : tout composé de prendre finit en -pris.' },
      verbList: verbs([
        ['prendre', 'pris', 'to take'], ['apprendre', 'appris', 'to learn'], ['comprendre', 'compris', 'to understand'],
        ['surprendre', 'surpris', 'to surprise'], ['reprendre', 'repris', 'to resume, to take back'], ['entreprendre', 'entrepris', 'to undertake'],
        ['méprendre', 'mépris', 'to mistake'], ['se méprendre', 'mépris', 'to be mistaken'], ['désapprendre', 'désappris', 'to unlearn'],
        ['rapprendre', 'rappris', 'to relearn']
      ])
    },
    {
      id: 'mettre',
      title: { en: 'Verbs built on mettre', fr: 'Verbes construits sur mettre' },
      rule: { en: 'A single t in the singular, a doubled t in the plural.', fr: 'Un seul t au singulier, un t doublé au pluriel.' },
      model: 'mettre', meaning: 'to put',
      paradigm: paradigm(
        [['mɛ', 'mets'], ['mɛ', 'mets'], ['mɛ', 'met'], ['mɛtɔ̃', 'mettons'], ['mɛte', 'mettez'], ['mɛt', 'mettent']],
        [['mɛtɛ', 'mettais'], ['mɛtɛ', 'mettais'], ['mɛtɛ', 'mettait'], ['mɛtjɔ̃', 'mettions'], ['mɛtje', 'mettiez'], ['mɛtɛ', 'mettaient']],
        [['mɛtʁe', 'mettrai'], ['mɛtʁa', 'mettras'], ['mɛtʁa', 'mettra'], ['mɛtʁɔ̃', 'mettrons'], ['mɛtʁe', 'mettrez'], ['mɛtʁɔ̃', 'mettront']],
        [['mɛtʁɛ', 'mettrais'], ['mɛtʁɛ', 'mettrais'], ['mɛtʁɛ', 'mettrait'], ['mɛtʁjɔ̃', 'mettrions'], ['mɛtʁje', 'mettriez'], ['mɛtʁɛ', 'mettraient']],
        [['mɛt', 'mette'], ['mɛt', 'mettes'], ['mɛt', 'mette'], ['mɛtjɔ̃', 'mettions'], ['mɛtje', 'mettiez'], ['mɛt', 'mettent']]
      ),
      participleNote: { en: 'Shared root predicts shared ending: any compound of mettre ends in -mis.', fr: 'La racine commune prédit la terminaison commune : tout composé de mettre finit en -mis.' },
      verbList: verbs([
        ['mettre', 'mis', 'to put'], ['permettre', 'permis', 'to allow'], ['promettre', 'promis', 'to promise'],
        ['admettre', 'admis', 'to admit'], ['soumettre', 'soumis', 'to submit'], ['remettre', 'remis', 'to put back, to postpone'],
        ['transmettre', 'transmis', 'to transmit'], ['omettre', 'omis', 'to omit'], ['compromettre', 'compromis', 'to compromise'],
        ['émettre', 'émis', 'to emit'], ['démettre', 'démis', 'to dismiss, to dislocate'], ['entremettre', 'entremis', 'to intervene']
      ])
    },
    {
      id: 'dire-lire-ecrire-conduire',
      title: { en: 'Verbs built on dire, lire, écrire, conduire', fr: 'Verbes construits sur dire, lire, écrire, conduire' },
      rule: { en: 'Each stem forms its own small family, with a past participle in -it or -u.', fr: 'Chaque base forme sa propre petite famille, avec un participe passé en -it ou -u.' },
      model: 'conduire', meaning: 'to drive, to lead',
      paradigm: paradigm(
        [['kɔ̃dɥi', 'conduis'], ['kɔ̃dɥi', 'conduis'], ['kɔ̃dɥi', 'conduit'], ['kɔ̃dɥizɔ̃', 'conduisons'], ['kɔ̃dɥize', 'conduisez'], ['kɔ̃dɥiz', 'conduisent']],
        [['kɔ̃dɥizɛ', 'conduisais'], ['kɔ̃dɥizɛ', 'conduisais'], ['kɔ̃dɥizɛ', 'conduisait'], ['kɔ̃dɥizjɔ̃', 'conduisions'], ['kɔ̃dɥizje', 'conduisiez'], ['kɔ̃dɥizɛ', 'conduisaient']],
        [['kɔ̃dɥiʁe', 'conduirai'], ['kɔ̃dɥiʁa', 'conduiras'], ['kɔ̃dɥiʁa', 'conduira'], ['kɔ̃dɥiʁɔ̃', 'conduirons'], ['kɔ̃dɥiʁe', 'conduirez'], ['kɔ̃dɥiʁɔ̃', 'conduiront']],
        [['kɔ̃dɥiʁɛ', 'conduirais'], ['kɔ̃dɥiʁɛ', 'conduirais'], ['kɔ̃dɥiʁɛ', 'conduirait'], ['kɔ̃dɥiʁjɔ̃', 'conduirions'], ['kɔ̃dɥiʁje', 'conduiriez'], ['kɔ̃dɥiʁɛ', 'conduiraient']],
        [['kɔ̃dɥiz', 'conduise'], ['kɔ̃dɥiz', 'conduises'], ['kɔ̃dɥiz', 'conduise'], ['kɔ̃dɥizjɔ̃', 'conduisions'], ['kɔ̃dɥizje', 'conduisiez'], ['kɔ̃dɥiz', 'conduisent']]
      ),
      participleNote: {
        en: 'Shared root predicts shared ending: any compound of dire ends in -dit. -crire verbs take -crit (écrit, décrit, inscrit, prescrit) without exception. -uire verbs take -uit (conduit, produit, traduit, construit) without exception.',
        fr: 'La racine commune prédit la terminaison commune : tout composé de dire finit en -dit. Les verbes en -crire prennent -crit (écrit, décrit, inscrit, prescrit) sans exception. Les verbes en -uire prennent -uit (conduit, produit, traduit, construit) sans exception.'
      },
      verbList: verbs([
        ['dire', 'dit', 'to say'], ['redire', 'redit', 'to say again'], ['contredire', 'contredit', 'to contradict'],
        ['prédire', 'prédit', 'to predict'], ['interdire', 'interdit', 'to forbid'], ['médire', 'médit', 'to speak ill of'],
        ['lire', 'lu', 'to read'], ['relire', 'relu', 'to reread'], ['élire', 'élu', 'to elect'], ['réélire', 'réélu', 'to re-elect'],
        ['écrire', 'écrit', 'to write'], ['décrire', 'décrit', 'to describe'], ['inscrire', 'inscrit', 'to enroll, to inscribe'],
        ['prescrire', 'prescrit', 'to prescribe'], ['souscrire', 'souscrit', 'to subscribe'], ['transcrire', 'transcrit', 'to transcribe'],
        ['circonscrire', 'circonscrit', 'to circumscribe'], ['récrire', 'récrit', 'to rewrite'],
        ['conduire', 'conduit', 'to drive, to lead'], ['produire', 'produit', 'to produce'], ['traduire', 'traduit', 'to translate'],
        ['construire', 'construit', 'to build'], ['détruire', 'détruit', 'to destroy'], ['introduire', 'introduit', 'to introduce'],
        ['reproduire', 'reproduit', 'to reproduce'], ['séduire', 'séduit', 'to seduce'], ['réduire', 'réduit', 'to reduce'],
        ['instruire', 'instruit', 'to instruct'], ['cuire', 'cuit', 'to cook']
      ])
    },
    {
      id: 'auxiliary',
      title: { en: 'Auxiliary verbs and their derivatives', fr: 'Verbes auxiliaires et leurs dérivés' },
      rule: { en: 'Each stem is unique to itself; compounds inherit it unchanged.', fr: 'Chaque base est unique ; les composés en héritent sans changement.' },
      model: 'faire', meaning: 'to do, to make',
      paradigm: paradigm(
        [['fɛ', 'fais'], ['fɛ', 'fais'], ['fɛ', 'fait'], ['fəzɔ̃', 'faisons'], ['fɛt', 'faites'], ['fɔ̃', 'font']],
        [['fəzɛ', 'faisais'], ['fəzɛ', 'faisais'], ['fəzɛ', 'faisait'], ['fəzjɔ̃', 'faisions'], ['fəzje', 'faisiez'], ['fəzɛ', 'faisaient']],
        [['fəʁe', 'ferai'], ['fəʁa', 'feras'], ['fəʁa', 'fera'], ['fəʁɔ̃', 'ferons'], ['fəʁe', 'ferez'], ['fəʁɔ̃', 'feront']],
        [['fəʁɛ', 'ferais'], ['fəʁɛ', 'ferais'], ['fəʁɛ', 'ferait'], ['fəʁjɔ̃', 'ferions'], ['fəʁje', 'feriez'], ['fəʁɛ', 'feraient']],
        [['fas', 'fasse'], ['fas', 'fasses'], ['fas', 'fasse'], ['fasjɔ̃', 'fassions'], ['fasje', 'fassiez'], ['fas', 'fassent']]
      ),
      participleNote: { en: 'être and avoir have no predictable shape and must be learned as isolated forms alongside faire.', fr: 'être et avoir n’ont aucune forme prévisible et doivent être appris comme des formes isolées, à côté de faire.' },
      verbList: verbs([
        ['être', 'été', 'to be'], ['avoir', 'eu', 'to have'], ['aller', 'allé', 'to go'], ['s’en aller', 'en allé', 'to go away'],
        ['faire', 'fait', 'to do, to make'], ['refaire', 'refait', 'to redo'], ['défaire', 'défait', 'to undo'],
        ['satisfaire', 'satisfait', 'to satisfy'], ['contrefaire', 'contrefait', 'to counterfeit, to mimic']
      ])
    },
    {
      id: 'evoir',
      title: { en: '-evoir verbs', fr: 'Verbes en -evoir' },
      rule: { en: 'The stem alternates between oi and ev, with a ç appearing before o or a.', fr: 'La base alterne entre oi et ev, avec un ç devant o ou a.' },
      model: 'recevoir', meaning: 'to receive',
      paradigm: paradigm(
        [['ʁəswa', 'reçois'], ['ʁəswa', 'reçois'], ['ʁəswa', 'reçoit'], ['ʁəsəvɔ̃', 'recevons'], ['ʁəsəve', 'recevez'], ['ʁəswav', 'reçoivent']],
        [['ʁəsəvɛ', 'recevais'], ['ʁəsəvɛ', 'recevais'], ['ʁəsəvɛ', 'recevait'], ['ʁəsəvjɔ̃', 'recevions'], ['ʁəsəvje', 'receviez'], ['ʁəsəvɛ', 'recevaient']],
        [['ʁəsəvʁe', 'recevrai'], ['ʁəsəvʁa', 'recevras'], ['ʁəsəvʁa', 'recevra'], ['ʁəsəvʁɔ̃', 'recevrons'], ['ʁəsəvʁe', 'recevrez'], ['ʁəsəvʁɔ̃', 'recevront']],
        [['ʁəsəvʁɛ', 'recevrais'], ['ʁəsəvʁɛ', 'recevrais'], ['ʁəsəvʁɛ', 'recevrait'], ['ʁəsəvʁjɔ̃', 'recevrions'], ['ʁəsəvʁje', 'recevriez'], ['ʁəsəvʁɛ', 'recevraient']],
        [['ʁəswav', 'reçoive'], ['ʁəswav', 'reçoives'], ['ʁəswav', 'reçoive'], ['ʁəsəvjɔ̃', 'recevions'], ['ʁəsəvje', 'receviez'], ['ʁəswav', 'reçoivent']]
      ),
      participleNote: { en: '-oir verbs cluster around u: reçu, dû, and their siblings confirm the same tendency seen in vouloir and connaître above.', fr: 'Les verbes en -oir se regroupent autour de u : reçu, dû et leurs semblables confirment la même tendance observée pour vouloir et connaître ci-dessus.' },
      verbList: verbs([
        ['devoir', 'dû', 'to have to, to owe'], ['redevoir', 'redû', 'to owe again'], ['recevoir', 'reçu', 'to receive'],
        ['apercevoir', 'aperçu', 'to notice'], ['s’apercevoir', 'aperçu', 'to realize'], ['concevoir', 'conçu', 'to conceive'],
        ['décevoir', 'déçu', 'to disappoint'], ['percevoir', 'perçu', 'to perceive']
      ])
    },
    {
      id: 'enir',
      title: { en: 'Verbs in -enir (tenir, venir)', fr: 'Verbes en -enir (tenir, venir)' },
      rule: { en: 'The stem alternates between a nasal form in the singular/ils and a schwa form in nous/vous; the futur/conditionnel stem doubles the d into ndr.', fr: 'La base alterne entre une forme nasale au singulier/ils et une forme en schwa à nous/vous ; la base du futur/conditionnel ajoute ndr.' },
      model: 'venir', meaning: 'to come',
      paradigm: paradigm(
        [['vjɛ̃', 'viens'], ['vjɛ̃', 'viens'], ['vjɛ̃', 'vient'], ['vənɔ̃', 'venons'], ['vəne', 'venez'], ['vjɛn', 'viennent']],
        [['vənɛ', 'venais'], ['vənɛ', 'venais'], ['vənɛ', 'venait'], ['vənjɔ̃', 'venions'], ['vənje', 'veniez'], ['vənɛ', 'venaient']],
        [['vjɛ̃dʁe', 'viendrai'], ['vjɛ̃dʁa', 'viendras'], ['vjɛ̃dʁa', 'viendra'], ['vjɛ̃dʁɔ̃', 'viendrons'], ['vjɛ̃dʁe', 'viendrez'], ['vjɛ̃dʁɔ̃', 'viendront']],
        [['vjɛ̃dʁɛ', 'viendrais'], ['vjɛ̃dʁɛ', 'viendrais'], ['vjɛ̃dʁɛ', 'viendrait'], ['vjɛ̃dʁjɔ̃', 'viendrions'], ['vjɛ̃dʁje', 'viendriez'], ['vjɛ̃dʁɛ', 'viendraient']],
        [['vjɛn', 'vienne'], ['vjɛn', 'viennes'], ['vjɛn', 'vienne'], ['vənjɔ̃', 'venions'], ['vənje', 'veniez'], ['vjɛn', 'viennent']]
      ),
      participleNote: { en: 'Every -enir verb takes -enu: venu, tenu, obtenu, devenu.', fr: 'Chaque verbe en -enir prend -enu : venu, tenu, obtenu, devenu.' },
      verbList: verbs([
        ['venir', 'venu', 'to come'], ['devenir', 'devenu', 'to become'], ['revenir', 'revenu', 'to come back'],
        ['parvenir', 'parvenu', 'to reach, to manage to'], ['survenir', 'survenu', 'to occur suddenly'],
        ['se souvenir', 'souvenu', 'to remember'], ['prévenir', 'prévenu', 'to warn'], ['convenir', 'convenu', 'to suit, to agree'],
        ['tenir', 'tenu', 'to hold'], ['obtenir', 'obtenu', 'to obtain'], ['retenir', 'retenu', 'to retain'],
        ['maintenir', 'maintenu', 'to maintain'], ['soutenir', 'soutenu', 'to support'], ['contenir', 'contenu', 'to contain'],
        ['appartenir', 'appartenu', 'to belong']
      ])
    },
    {
      id: 'boire',
      title: { en: 'boire', fr: 'boire' },
      rule: { en: 'The stem alternates between a short form in the singular/ils and buv- in nous/vous; the futur/conditionnel and subjonctif nous/vous are built regularly from the infinitive and the buv- stem.', fr: 'La base alterne entre une forme courte au singulier/ils et buv- à nous/vous ; le futur/conditionnel et le subjonctif nous/vous sont réguliers, construits sur l’infinitif et la base buv-.' },
      model: 'boire', meaning: 'to drink',
      paradigm: paradigm(
        [['bwa', 'bois'], ['bwa', 'bois'], ['bwa', 'boit'], ['byvɔ̃', 'buvons'], ['byve', 'buvez'], ['bwav', 'boivent']],
        [['byvɛ', 'buvais'], ['byvɛ', 'buvais'], ['byvɛ', 'buvait'], ['byvjɔ̃', 'buvions'], ['byvje', 'buviez'], ['byvɛ', 'buvaient']],
        [['bwaʁe', 'boirai'], ['bwaʁa', 'boiras'], ['bwaʁa', 'boira'], ['bwaʁɔ̃', 'boirons'], ['bwaʁe', 'boirez'], ['bwaʁɔ̃', 'boiront']],
        [['bwaʁɛ', 'boirais'], ['bwaʁɛ', 'boirais'], ['bwaʁɛ', 'boirait'], ['bwaʁjɔ̃', 'boirions'], ['bwaʁje', 'boiriez'], ['bwaʁɛ', 'boiraient']],
        [['bwav', 'boive'], ['bwav', 'boives'], ['bwav', 'boive'], ['byvjɔ̃', 'buvions'], ['byvje', 'buviez'], ['bwav', 'boivent']]
      ),
      participleNote: { en: 'bu follows the wider -oir/-re tendency toward -u.', fr: 'bu suit la tendance plus large des verbes en -oir/-re vers -u.' },
      verbList: verbs([['boire', 'bu', 'to drink']])
    },
    {
      id: 'croire',
      title: { en: 'croire', fr: 'croire' },
      rule: { en: 'The stem alternates between croi- in the singular/ils and croy- everywhere the ending starts with a vowel sound.', fr: 'La base alterne entre croi- au singulier/ils et croy- partout où la terminaison commence par un son vocalique.' },
      model: 'croire', meaning: 'to believe',
      paradigm: paradigm(
        [['kʁwa', 'crois'], ['kʁwa', 'crois'], ['kʁwa', 'croit'], ['kʁwajɔ̃', 'croyons'], ['kʁwaje', 'croyez'], ['kʁwa', 'croient']],
        [['kʁwajɛ', 'croyais'], ['kʁwajɛ', 'croyais'], ['kʁwajɛ', 'croyait'], ['kʁwajjɔ̃', 'croyions'], ['kʁwajje', 'croyiez'], ['kʁwajɛ', 'croyaient']],
        [['kʁwaʁe', 'croirai'], ['kʁwaʁa', 'croiras'], ['kʁwaʁa', 'croira'], ['kʁwaʁɔ̃', 'croirons'], ['kʁwaʁe', 'croirez'], ['kʁwaʁɔ̃', 'croiront']],
        [['kʁwaʁɛ', 'croirais'], ['kʁwaʁɛ', 'croirais'], ['kʁwaʁɛ', 'croirait'], ['kʁwaʁjɔ̃', 'croirions'], ['kʁwaʁje', 'croiriez'], ['kʁwaʁɛ', 'croiraient']],
        [['kʁwa', 'croie'], ['kʁwa', 'croies'], ['kʁwa', 'croie'], ['kʁwajjɔ̃', 'croyions'], ['kʁwajje', 'croyiez'], ['kʁwa', 'croient']]
      ),
      participleNote: { en: 'cru follows the wider -oir/-re tendency toward -u.', fr: 'cru suit la tendance plus large des verbes en -oir/-re vers -u.' },
      verbList: verbs([['croire', 'cru', 'to believe']])
    },
    {
      id: 'voir',
      title: { en: 'voir', fr: 'voir' },
      rule: { en: 'The stem alternates between voi- and voy- like croire, but the futur/conditionnel stem is irregular: verr-, not voir-.', fr: 'La base alterne entre voi- et voy- comme pour croire, mais la base du futur/conditionnel est irrégulière : verr-, et non voir-.' },
      model: 'voir', meaning: 'to see',
      paradigm: paradigm(
        [['vwa', 'vois'], ['vwa', 'vois'], ['vwa', 'voit'], ['vwajɔ̃', 'voyons'], ['vwaje', 'voyez'], ['vwa', 'voient']],
        [['vwajɛ', 'voyais'], ['vwajɛ', 'voyais'], ['vwajɛ', 'voyait'], ['vwajjɔ̃', 'voyions'], ['vwajje', 'voyiez'], ['vwajɛ', 'voyaient']],
        [['vɛʁe', 'verrai'], ['vɛʁa', 'verras'], ['vɛʁa', 'verra'], ['vɛʁɔ̃', 'verrons'], ['vɛʁe', 'verrez'], ['vɛʁɔ̃', 'verront']],
        [['vɛʁɛ', 'verrais'], ['vɛʁɛ', 'verrais'], ['vɛʁɛ', 'verrait'], ['vɛʁjɔ̃', 'verrions'], ['vɛʁje', 'verriez'], ['vɛʁɛ', 'verraient']],
        [['vwa', 'voie'], ['vwa', 'voies'], ['vwa', 'voie'], ['vwajjɔ̃', 'voyions'], ['vwajje', 'voyiez'], ['vwa', 'voient']]
      ),
      participleNote: { en: 'vu follows the wider -oir/-re tendency toward -u.', fr: 'vu suit la tendance plus large des verbes en -oir/-re vers -u.' },
      verbList: verbs([['voir', 'vu', 'to see'], ['revoir', 'revu', 'to see again'], ['prévoir', 'prévu', 'to foresee'], ['entrevoir', 'entrevu', 'to glimpse']])
    },
    {
      id: 'aller',
      title: { en: 'aller', fr: 'aller' },
      rule: { en: 'Three unrelated stems share this one infinitive: va(is)- in the singular, all- in nous/vous, and v- in ils and the futur/conditionnel.', fr: 'Trois bases sans rapport se partagent cet infinitif : va(is)- au singulier, all- à nous/vous, et v- à ils et au futur/conditionnel.' },
      model: 'aller', meaning: 'to go',
      paradigm: paradigm(
        [['vɛ', 'vais'], ['va', 'vas'], ['va', 'va'], ['alɔ̃', 'allons'], ['ale', 'allez'], ['vɔ̃', 'vont']],
        [['alɛ', 'allais'], ['alɛ', 'allais'], ['alɛ', 'allait'], ['aljɔ̃', 'allions'], ['alje', 'alliez'], ['alɛ', 'allaient']],
        [['iʁe', 'irai'], ['iʁa', 'iras'], ['iʁa', 'ira'], ['iʁɔ̃', 'irons'], ['iʁe', 'irez'], ['iʁɔ̃', 'iront']],
        [['iʁɛ', 'irais'], ['iʁɛ', 'irais'], ['iʁɛ', 'irait'], ['iʁjɔ̃', 'irions'], ['iʁje', 'iriez'], ['iʁɛ', 'iraient']],
        [['aj', 'aille'], ['aj', 'ailles'], ['aj', 'aille'], ['aljɔ̃', 'allions'], ['alje', 'alliez'], ['aj', 'aillent']]
      ),
      participleNote: { en: 'The participle allé is built regularly from the infinitive, unlike every other tense above.', fr: 'Le participe allé est construit régulièrement à partir de l’infinitif, contrairement à tous les autres temps ci-dessus.' },
      verbList: verbs([['aller', 'allé', 'to go'], ['s’en aller', 'en allé', 'to go away']])
    }
  ];

  APP.data.passeSimple = {
    title: { en: 'Passé simple', fr: 'Passé simple' },
    rule: {
      en: 'Literary past tense with a definite endpoint, used only in formal writing and literature. It is worth learning to recognize, not to produce: am/at for nous/vous are unmistakable in any verb, and ɛʁ for ils is just as distinctive.',
      fr: 'Temps du passé littéraire avec un point final précis, utilisé seulement à l’écrit soutenu et en littérature. Il vaut la peine de le reconnaître, pas de le produire : am/at pour nous/vous sont reconnaissables dans n’importe quel verbe, et ɛʁ pour ils est tout aussi distinctif.'
    },
    model: 'parler', meaning: 'to speak (shown for a regular -er verb)',
    rows: [
      { pron: 'je', ipa: 'paʁle', spell: 'parlai' },
      { pron: 'tu / il', ipa: 'paʁla', spell: 'parlas / parla' },
      { pron: 'nous', ipa: 'paʁlam', spell: 'parlâmes' },
      { pron: 'vous', ipa: 'paʁlat', spell: 'parlâtes' },
      { pron: 'ils', ipa: 'paʁlɛʁ', spell: 'parlèrent' }
    ]
  };

  APP.data.conjIntro = {
    moodTense: {
      title: { en: 'Mood and tense are two different axes', fr: 'Mode et temps sont deux axes différents' },
      p1: { en: 'These two words are often conflated. They answer different questions.', fr: 'Ces deux mots sont souvent confondus. Ils répondent à des questions différentes.' },
      tenseLabel: { en: 'Tense answers', fr: 'Le temps répond à' }, tenseTerm: { en: 'When?', fr: 'Quand ?' },
      tenseDef: { en: 'Tense can be past, present, or future. It locates an action in time.', fr: 'Le temps peut être passé, présent ou futur. Il situe une action dans le temps.' },
      moodLabel: { en: 'Mood answers', fr: 'Le mode répond à' }, moodTerm: { en: 'How real is it?', fr: 'À quel point est-ce réel ?' },
      moodDef: { en: 'Is this a fact, a hypothesis, a wish, a command? Mood expresses the speaker’s relationship to reality.', fr: 'Est-ce un fait, une hypothèse, un souhait, un ordre ? Le mode exprime le rapport du locuteur à la réalité.' },
      p2: { en: 'French has four moods. The indicatif states facts; most of the tenses above belong to it. The subjonctif marks doubt, emotion, or necessity, not a fact. The conditionnel marks hypotheticals: things that would happen under some condition. The impératif issues commands.', fr: 'Le français compte quatre modes. L’indicatif énonce des faits ; la plupart des temps ci-dessus en font partie. Le subjonctif marque le doute, l’émotion ou la nécessité, pas un fait. Le conditionnel marque l’hypothétique : ce qui se produirait sous certaine condition. L’impératif donne des ordres.' }
    },
    futureVsCond: {
      title: { en: 'Why the futur and conditionnel sound alike', fr: 'Pourquoi le futur et le conditionnel se ressemblent' },
      p1: { en: 'They share the same stem: the infinitive, which carries its ʁ into the conjugated form. The futur attaches its own endings; the conditionnel attaches the imparfait’s endings to that same stem.', fr: 'Ils partagent la même base : l’infinitif, qui porte son ʁ jusque dans la forme conjuguée. Le futur ajoute ses propres terminaisons ; le conditionnel ajoute les terminaisons de l’imparfait à cette même base.' },
      futureLabel: { en: 'Futur simple', fr: 'Futur simple' }, futureIpa: 'paʁlɛʁe', futureSpell: 'parlerai',
      futureP: { en: 'A projection into future time, asserted as fact in the indicative mood.', fr: 'Une projection dans le futur, affirmée comme un fait au mode indicatif.' },
      condLabel: { en: 'Conditionnel', fr: 'Conditionnel' }, condIpa: 'paʁlɛʁɛ', condSpell: 'parlerais',
      condP: { en: 'A projection into a contingent or unreal situation.', fr: 'Une projection dans une situation contingente ou irréelle.' },
      note: { en: 'The stem stays the same; only the ending vowel changes: closed e signals an asserted future, open ɛ signals something contingent.', fr: 'La base reste la même ; seule la voyelle de la terminaison change : e fermé signale un futur affirmé, ɛ ouvert signale quelque chose de contingent.' }
    },
    soundsKey: {
      title: { en: 'The sounds that matter in verb endings', fr: 'Les sons qui comptent dans les terminaisons' },
      p1: { en: 'A handful of sounds carry most of the information in a verb ending.', fr: 'Une poignée de sons porte l’essentiel de l’information dans une terminaison verbale.' },
      thSymbol: { en: 'symbol', fr: 'symbole' }, thLike: { en: 'sounds like', fr: 'ressemble à' }, thAppears: { en: 'appears in', fr: 'apparaît dans' },
      rows: [
        ['e', '"ay" in "say," tense and closed', '‑er ‑ez ‑é (futur je)'],
        ['ɛ', '"e" in "bet," open', '‑ait ‑ais ‑aient ‑è ‑ê'],
        ['ɔ̃', 'nasalized "o," no English equivalent', '‑ons ‑ont'],
        ['ʁ', 'back-of-throat fricative, never rolled', 'the futur/conditionnel stem marker'],
        ['j', '"y" in "yes," brief glide', '‑ions ‑iez (imparfait/subj. nous/vous)']
      ],
      note: { en: 'The e / ɛ distinction is the one to train first: e is futur; ɛ is imparfait and conditionnel. Many spellings share one sound: -ait, -ais, -aient are all ɛ.', fr: 'La distinction e / ɛ est la première à entraîner : e est futur; ɛ est imparfait et conditionnel. Plusieurs orthographes partagent un seul son : -ait, -ais, -aient sont tous ɛ.' }
    }
  };

  APP.data.conjFlow = {
    title: { en: 'Sound → meaning: identifying a tense by ear', fr: 'Son → sens : identifier un temps à l’oreille' },
    p1: { en: 'Every regular ending above reduces to one flow. Passé simple sits outside it; recognize it instead from am / at / ɛʁ.', fr: 'Chaque terminaison régulière ci-dessus se ramène à ce seul parcours. Le passé simple reste à part ; on le reconnaît par am / at / ɛʁ.' },
    bare: { en: 'bare stem (nothing)', fr: 'base nue (rien)' }, hearR: { en: 'Hear ʁ in the stem?', fr: 'La base a-t-elle ʁ ?' },
    noR: { en: 'No', fr: 'Non' }, yesR: { en: 'Yes', fr: 'Oui' },
    hearE: { en: 'Hear ɛ?', fr: 'Entendez-vous ɛ ?' }, noE: { en: 'No', fr: 'Non' }, yesE: { en: 'Yes', fr: 'Oui' },
    endingClosed: { en: 'Ending closed (e, a, ɔ̃)?', fr: 'Terminaison fermée (e, a, ɔ̃) ?' },
    yesClosed: { en: 'Yes', fr: 'Oui' }, noClosed: { en: 'No (open ɛ, or glide j)', fr: 'Non (ɛ ouvert, ou semi-voyelle j)' },
    present: { en: 'Présent', fr: 'Présent' }, presentNote: { en: 'fact, now or habitual', fr: 'fait, présent ou habituel' },
    imperfect: { en: 'Imparfait', fr: 'Imparfait' }, imperfectNote: { en: 'past, ongoing (or subjonctif nous/vous, with que)', fr: 'passé continu (ou subjonctif nous/vous, avec que)' },
    future: { en: 'Futur', fr: 'Futur' }, futureNote: { en: 'will happen', fr: 'va arriver' },
    cond: { en: 'Conditionnel', fr: 'Conditionnel' }, condNote: { en: 'would happen', fr: 'arriverait' }
  };

  APP.data.memorizeOnly = {
    title: { en: 'Isolated participles within their own families', fr: 'Participes isolés au sein de leur propre famille' },
    note: {
      en: 'né and crû (naître, croître) do not follow the circumflex-plus-t pattern of the rest of the -aître/-oître family above; fait and été (faire, être) do not follow any -oir tendency either. These four have no predictable shape and are learned as isolated forms.',
      fr: 'né et crû (naître, croître) ne suivent pas le schéma circonflexe-plus-t du reste de la famille -aître/-oître ci-dessus ; fait et été (faire, être) ne suivent non plus aucune tendance des verbes en -oir. Ces quatre formes n’ont aucune forme prévisible et s’apprennent isolément.'
    },
    verbList: verbs([
      ['naître', 'né', 'to be born'], ['croître', 'crû', 'to grow'], ['faire', 'fait', 'to do, to make'], ['être', 'été', 'to be']
    ])
  };
})();
