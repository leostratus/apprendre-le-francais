window.APP = window.APP || {};
APP.tools = APP.tools || {};

APP.tools.pronunciation = (function () {
  var i18n = APP.i18n;
  var mounted = false;

  // Chrome/instructional prose, bilingual. IPA, spelling, and conjugation-table
  // content below is invariant — it's the French being taught (or a fixed English
  // gloss/analogy of it), not UI chrome, so it isn't part of this dictionary.
  var D = {
    en: {
      eyebrow: 'French · Phonetics-first',
      title: 'Verb endings as <em>sounds</em>',
      intro: 'Spelling appears only as a reference footnote. Every ending is described by its phonemes — the individual sounds — using IPA (the International Phonetic Alphabet). Two color systems run in parallel: <strong>tense family</strong> colors (which tense you’re in) and <strong>phoneme type</strong> colors (what kind of sound you’re hearing). Tap the speaker icon next to any form to hear it spoken aloud, using your browser’s French voice.',
      leg_oral: 'oral vowel', leg_nasal: 'nasal vowel', leg_cons: 'consonant', leg_rhotic: 'ʁ (French r)', leg_rhotic_note: '— the futur/cond marker', leg_glide: 'glide',
      s0_h: 'Mood and tense — two different axes',
      s0_p1: 'These two words are often conflated. They answer different questions.',
      s0_tense_label: 'Tense answers', s0_tense_term: 'When?', s0_tense_def: 'Past, present, future. Tense locates an action in time.',
      s0_mood_label: 'Mood answers', s0_mood_term: 'How real is it?', s0_mood_def: 'Is this a fact, a hypothesis, a wish, a command? Mood expresses the speaker’s relationship to reality.',
      s0_p2: 'French has four moods. The <strong>indicatif</strong> states facts — most of the tenses you use daily live here. The <strong>subjonctif</strong> marks doubt, emotion, or necessity. The <strong>conditionnel</strong> marks hypotheticals — things that <em>would</em> happen under some condition. The <strong>impératif</strong> issues commands.',
      s0_callout: '<strong>When you hear a verb ending, your ear is doing two jobs simultaneously:</strong> tracking <em>when</em> (tense) and tracking <em>how real</em> (mood). The endings encode both at once.',

      s1_h: 'Why the futur and conditionnel sound so similar',
      s1_p1: 'They share the same stem: <strong>the infinitive</strong>, which carries its ʁ into the conjugated form. The only difference is the ending. The futur attaches new endings; the conditionnel attaches the <em>imparfait</em> endings to that same stem.',
      s1_future_label: 'Futur simple', s1_future_p: '"I will speak." A real projection into future time. Indicative mood — you’re asserting it will happen.',
      s1_cond_label: 'Conditionnel', s1_cond_p: '"I would speak." A projection into a contingent or unreal situation. Sometimes called the <em>futur du passé</em> — the future as seen from within a condition that may never be met.',
      s1_callout: '<strong>Same stem, different vowel.</strong> Both tenses project forward; the stem’s ʁ carries that shared meaning. The ending resolves which: closed e → asserted future; open ɛ → contingent/hypothetical.',

      s2_h: 'The sounds that matter — minimal IPA key',
      s2_p1: 'Only a handful of sounds appear in verb endings. Here they are, with the phoneme-type coloring applied.',
      s2_th_symbol: 'symbol', s2_th_type: 'type', s2_th_like: 'sounds like', s2_th_appears: 'appears in (spelling — ref only)',
      s2_type_oral: 'oral vowel', s2_type_nasal: 'nasal vowel', s2_type_rhotic: 'rhotic (French r)', s2_type_glide: 'glide',
      s2_callout: '<strong>The e / ɛ distinction</strong> is the most important one to train. e is tense and closed — futur, -ez. ɛ is open — imparfait and conditionnel. Many spellings map to the same sound: <em>-ait, -ais, -aient</em> are all ɛ.',

      s3_h: 'Présent — the bare stem',
      s3_p1: 'No tense marker at all. You hear the stem, then a person sound. For -er verbs the singular ending is silent, so je, tu, il, and ils all sound the same.',
      s3_callout: '<strong>The -ent of ils/elles is completely silent for -er verbs.</strong> Four pronouns (je / tu / il / ils) all produce the same sound. The plural is signaled only by context or the pronoun.',

      s4_h: 'Imparfait — inject ɛ',
      s4_p1: 'Past ongoing or habitual action ("I was speaking," "I used to speak"). Built from the <em>nous</em> present stem (drop ɔ̃) by inserting the open vowel ɛ. No exceptions, ever, across all French verbs.',
      s4_callout: '<strong>The spelling trap:</strong> <em>parlais, parlait, parlaient</em> are three different spellings of one sound. Your ear only has one thing to learn here.',

      s5_h: 'Futur simple — hear the ʁ',
      s5_p1: 'Built on the infinitive, which keeps its ʁ audible. That ʁ inside a conjugated form is your signal: you’re in futur or conditionnel territory.',
      s5_callout: '<strong>Person endings by sound:</strong> je/vous → e · tu/il → a · nous/ils → ɔ̃.',

      s6_h: 'Conditionnel — ʁ stem + ɛ endings',
      s6_p1: 'Same infinitive stem as the futur, but with the imparfait’s ɛ endings attached. Once you know §4 and §5, this is automatic.',
      s6_callout: '<strong>Futur vs. conditionnel by ear:</strong> both have ʁ in the stem. Then — ending closed e / open ɛ for je; for nous/vous the glide j marks conditional, its absence marks futur.',

      s7_h: 'Subjonctif — mood, not tense',
      s7_p1: 'The subjonctif marks doubt, wish, emotion, or necessity — not a fact. Almost always preceded by <em>que</em>. Its endings are phonetically identical to the présent for -er verbs in the singular/ils, and identical to the imparfait for nous/vous. Context (the word <em>que</em> plus a trigger verb like <em>vouloir, falloir, douter</em>) is the primary cue.',
      s7_meaning_present: '= présent', s7_meaning_imperf_nous: '= imparfait nous', s7_meaning_imperf_vous: '= imparfait vous',
      s7_callout: '<strong>The subjonctif is phonetically distinctive only in irregular verbs</strong>, where the stem itself changes: aj for aller (<em>que j’aille</em>), swa for être (<em>que je sois</em>), ɛ for avoir (<em>que j’aie</em>).',

      s8_h: 'Passé simple — literary; recognize, don’t produce',
      s8_p1: 'Completed past with a definite endpoint, used only in formal writing and literature. You’ll read it constantly in novels; you’ll never need to say it. Train your ear only to recognize it.',
      s8_callout: '<strong>Recognition cues:</strong> am / at for nous/vous are unmistakable in any verb. ɛʁ for ils is equally distinctive.',

      s9_h: 'Stem-changing irregulars — présent',
      s9_p1: 'These are the high-frequency verbs whose <em>stem</em> — not just the ending — changes in the présent. The endings follow the same rules; what shifts is the root sound itself. The pattern is called the <strong>"boot" pattern</strong> (or <em>le radical variable</em>): the changed stem appears in the singular + ils forms, and the unchanged stem appears in nous/vous.',
      s9_th_verb: 'verb', s9_th_je: 'je (IPA)', s9_th_nous: 'nous (IPA)', s9_th_ils: 'ils (IPA)', s9_th_spelling: 'spelling je / nous / ils', s9_th_changes: 'what changes',
      s9_callout: '<strong>The boot pattern by ear:</strong> for most of these verbs, the singular + ils forms share a stronger or more "open" stem vowel, while nous/vous have a reduced or more closed stem. The endings themselves are always regular. Train the stem pairs, not the full paradigm.',

      s10_h: 'Sound → meaning — the full decision map',
      s10_th_hear: 'You hear in the ending…', s10_th_stem_r: 'Stem has ʁ?', s10_th_tense: 'Tense / mood', s10_th_meaning: 'Meaning',
      s10_row_bare_meaning: 'fact, now or habitual', s10_row_nous_meaning: 'fact, now, we', s10_row_vous_meaning: 'fact, now, you (pl.)',
      s10_row_imperf_meaning: 'past, ongoing', s10_row_imperf_nous_meaning: 'past ongoing — or subjonctif (needs que)',
      s10_row_fut_meaning: 'will happen', s10_row_cond_meaning: 'would happen', s10_row_cond_nous_meaning: 'would happen, we',
      s10_row_ps_meaning: 'completed past, literary',
      s10_present_nous: 'Présent nous', s10_present_vous: 'Présent vous', s10_imperf_je: 'Imparfait (je/tu/il/ils)',
      s10_imperf_or_subj: 'Imparfait nous / Subj. nous', s10_fut_je: 'Futur (je / vous)', s10_fut_tu: 'Futur (tu / il)', s10_fut_nous: 'Futur (nous / ils)',
      s10_cond_je: 'Conditionnel (je/tu/il/ils)', s10_cond_nous: 'Conditionnel nous', s10_ps: 'Passé simple', s10_bare: 'bare stem (nothing)',
      s10_callout: '<strong>The single decision tree:</strong> Hear ʁ in the stem? → futur or conditionnel. Ending closed e/a/ɔ̃ → futur. Ending open ɛ or with glide j → conditionnel. No ʁ? → présent or imparfait. Hear ɛ? → imparfait. Bare stem? → présent.'
    },
    fr: {
      eyebrow: 'Français · axé sur la phonétique',
      title: 'Les terminaisons verbales comme <em>sons</em>',
      intro: 'L’orthographe n’apparaît qu’en note de référence. Chaque terminaison est décrite par ses phonèmes — les sons individuels — à l’aide de l’API (l’alphabet phonétique international). Deux systèmes de couleurs fonctionnent en parallèle : les couleurs de <strong>famille de temps</strong> (dans quel temps vous êtes) et les couleurs de <strong>type de phonème</strong> (quel genre de son vous entendez). Touchez l’icône du haut-parleur à côté de n’importe quelle forme pour l’entendre, avec la voix française de votre navigateur.',
      leg_oral: 'voyelle orale', leg_nasal: 'voyelle nasale', leg_cons: 'consonne', leg_rhotic: 'ʁ (r français)', leg_rhotic_note: '— le marqueur du futur/cond.', leg_glide: 'semi-voyelle',
      s0_h: 'Mode et temps — deux axes différents',
      s0_p1: 'Ces deux mots sont souvent confondus. Ils répondent à des questions différentes.',
      s0_tense_label: 'Le temps répond à', s0_tense_term: 'Quand ?', s0_tense_def: 'Passé, présent, futur. Le temps situe une action dans le temps.',
      s0_mood_label: 'Le mode répond à', s0_mood_term: 'À quel point est-ce réel ?', s0_mood_def: 'Est-ce un fait, une hypothèse, un souhait, un ordre ? Le mode exprime le rapport du locuteur à la réalité.',
      s0_p2: 'Le français compte quatre modes. L’<strong>indicatif</strong> énonce des faits — la plupart des temps que vous utilisez au quotidien s’y trouvent. Le <strong>subjonctif</strong> marque le doute, l’émotion ou la nécessité. Le <strong>conditionnel</strong> marque l’hypothétique — ce qui <em>se produirait</em> sous certaine condition. L’<strong>impératif</strong> donne des ordres.',
      s0_callout: '<strong>Quand vous entendez une terminaison verbale, votre oreille fait deux tâches à la fois :</strong> repérer <em>quand</em> (le temps) et repérer <em>à quel point c’est réel</em> (le mode). Les terminaisons encodent les deux en même temps.',

      s1_h: 'Pourquoi le futur et le conditionnel se ressemblent autant',
      s1_p1: 'Ils partagent la même base : <strong>l’infinitif</strong>, qui porte son ʁ jusque dans la forme conjuguée. Seule la terminaison diffère. Le futur ajoute de nouvelles terminaisons; le conditionnel ajoute les terminaisons de l’<em>imparfait</em> à cette même base.',
      s1_future_label: 'Futur simple', s1_future_p: '« Je parlerai. » Une projection réelle dans le futur. Mode indicatif — vous affirmez que cela arrivera.',
      s1_cond_label: 'Conditionnel', s1_cond_p: '« Je parlerais. » Une projection dans une situation contingente ou irréelle. Parfois appelé <em>futur du passé</em> — le futur vu de l’intérieur d’une condition qui pourrait ne jamais se réaliser.',
      s1_callout: '<strong>Même base, voyelle différente.</strong> Les deux temps se projettent vers l’avant; le ʁ de la base porte ce sens commun. La terminaison tranche : e fermé → futur affirmé; ɛ ouvert → contingent/hypothétique.',

      s2_h: 'Les sons qui comptent — clé API minimale',
      s2_p1: 'Seule une poignée de sons apparaît dans les terminaisons verbales. Les voici, avec la coloration par type de phonème.',
      s2_th_symbol: 'symbole', s2_th_type: 'type', s2_th_like: 'ressemble à', s2_th_appears: 'apparaît dans (orthographe — réf. seulement)',
      s2_type_oral: 'voyelle orale', s2_type_nasal: 'voyelle nasale', s2_type_rhotic: 'rhotique (r français)', s2_type_glide: 'semi-voyelle',
      s2_callout: '<strong>La distinction e / ɛ</strong> est la plus importante à entraîner. e est tendu et fermé — futur, -ez. ɛ est ouvert — imparfait et conditionnel. Plusieurs orthographes correspondent au même son : <em>-ait, -ais, -aient</em> sont tous ɛ.',

      s3_h: 'Présent — la base nue',
      s3_p1: 'Aucun marqueur de temps. Vous entendez la base, puis un son de personne. Pour les verbes en -er, la terminaison du singulier est muette, donc je, tu, il et ils sonnent tous pareil.',
      s3_callout: '<strong>Le -ent de ils/elles est totalement muet pour les verbes en -er.</strong> Quatre pronoms (je / tu / il / ils) produisent le même son. Le pluriel n’est signalé que par le contexte ou le pronom.',

      s4_h: 'Imparfait — injecter ɛ',
      s4_p1: 'Action passée continue ou habituelle (« je parlais »). Construit à partir de la base du présent de <em>nous</em> (en retirant ɔ̃) en insérant la voyelle ouverte ɛ. Aucune exception, jamais, dans tout le français.',
      s4_callout: '<strong>Le piège orthographique :</strong> <em>parlais, parlait, parlaient</em> sont trois orthographes différentes d’un seul son. Votre oreille n’a qu’une seule chose à apprendre ici.',

      s5_h: 'Futur simple — entendre le ʁ',
      s5_p1: 'Construit sur l’infinitif, qui garde son ʁ audible. Ce ʁ à l’intérieur d’une forme conjuguée est votre signal : vous êtes en territoire futur ou conditionnel.',
      s5_callout: '<strong>Terminaisons personnelles à l’oreille :</strong> je/vous → e · tu/il → a · nous/ils → ɔ̃.',

      s6_h: 'Conditionnel — base en ʁ + terminaisons en ɛ',
      s6_p1: 'Même base infinitive que le futur, mais avec les terminaisons ɛ de l’imparfait. Une fois les §4 et §5 maîtrisés, c’est automatique.',
      s6_callout: '<strong>Futur vs conditionnel à l’oreille :</strong> les deux ont ʁ dans la base. Ensuite — terminaison fermée e / ouverte ɛ pour je; pour nous/vous, la semi-voyelle j marque le conditionnel, son absence marque le futur.',

      s7_h: 'Subjonctif — un mode, pas un temps',
      s7_p1: 'Le subjonctif marque le doute, le souhait, l’émotion ou la nécessité — pas un fait. Presque toujours précédé de <em>que</em>. Ses terminaisons sont phonétiquement identiques au présent pour les verbes en -er au singulier/ils, et identiques à l’imparfait pour nous/vous. Le contexte (le mot <em>que</em> plus un verbe déclencheur comme <em>vouloir, falloir, douter</em>) est l’indice principal.',
      s7_meaning_present: '= présent', s7_meaning_imperf_nous: '= imparfait nous', s7_meaning_imperf_vous: '= imparfait vous',
      s7_callout: '<strong>Le subjonctif ne se distingue phonétiquement que dans les verbes irréguliers</strong>, où la base elle-même change : aj pour aller (<em>que j’aille</em>), swa pour être (<em>que je sois</em>), ɛ pour avoir (<em>que j’aie</em>).',

      s8_h: 'Passé simple — littéraire ; à reconnaître, pas à produire',
      s8_p1: 'Passé achevé avec un point final précis, utilisé seulement à l’écrit soutenu et en littérature. Vous le lirez constamment dans les romans; vous n’aurez jamais besoin de le dire. Entraînez seulement votre oreille à le reconnaître.',
      s8_callout: '<strong>Indices de reconnaissance :</strong> am / at pour nous/vous sont reconnaissables dans n’importe quel verbe. ɛʁ pour ils est tout aussi distinctif.',

      s9_h: 'Irréguliers à base variable — présent',
      s9_p1: 'Ce sont les verbes très fréquents dont la <em>base</em> — pas seulement la terminaison — change au présent. Les terminaisons suivent les mêmes règles; c’est le son de la racine qui change. Ce motif s’appelle le <strong>« radical variable »</strong> (ou le « boot pattern » en anglais) : la base changée apparaît au singulier + ils, et la base inchangée apparaît à nous/vous.',
      s9_th_verb: 'verbe', s9_th_je: 'je (API)', s9_th_nous: 'nous (API)', s9_th_ils: 'ils (API)', s9_th_spelling: 'orthographe je / nous / ils', s9_th_changes: 'ce qui change',
      s9_callout: '<strong>Le radical variable à l’oreille :</strong> pour la plupart de ces verbes, le singulier + ils partagent une voyelle de base plus forte ou plus « ouverte », tandis que nous/vous ont une base réduite ou plus fermée. Les terminaisons elles-mêmes restent toujours régulières. Entraînez les paires de bases, pas tout le paradigme.',

      s10_h: 'Son → sens — la carte de décision complète',
      s10_th_hear: 'Vous entendez dans la terminaison…', s10_th_stem_r: 'La base a-t-elle ʁ ?', s10_th_tense: 'Temps / mode', s10_th_meaning: 'Sens',
      s10_row_bare_meaning: 'fait, présent ou habituel', s10_row_nous_meaning: 'fait, présent, nous', s10_row_vous_meaning: 'fait, présent, vous',
      s10_row_imperf_meaning: 'passé, continu', s10_row_imperf_nous_meaning: 'passé continu — ou subjonctif (nécessite que)',
      s10_row_fut_meaning: 'va arriver', s10_row_cond_meaning: 'arriverait', s10_row_cond_nous_meaning: 'arriverait, nous',
      s10_row_ps_meaning: 'passé achevé, littéraire',
      s10_present_nous: 'Présent nous', s10_present_vous: 'Présent vous', s10_imperf_je: 'Imparfait (je/tu/il/ils)',
      s10_imperf_or_subj: 'Imparfait nous / Subj. nous', s10_fut_je: 'Futur (je / vous)', s10_fut_tu: 'Futur (tu / il)', s10_fut_nous: 'Futur (nous / ils)',
      s10_cond_je: 'Conditionnel (je/tu/il/ils)', s10_cond_nous: 'Conditionnel nous', s10_ps: 'Passé simple', s10_bare: 'base nue (rien)',
      s10_callout: '<strong>L’arbre de décision unique :</strong> Vous entendez ʁ dans la base ? → futur ou conditionnel. Terminaison fermée e/a/ɔ̃ → futur. Terminaison ouverte ɛ ou avec semi-voyelle j → conditionnel. Pas de ʁ ? → présent ou imparfait. Vous entendez ɛ ? → imparfait. Base nue ? → présent.'
    }
  };

  function render(lang) {
    var d = D[lang] || D.en;
    return ''
    + '<div class="tool-header"><div class="eyebrow">' + d.eyebrow + '</div>'
    + '<h1>' + d.title + '</h1>'
    + '<p class="intro">' + d.intro + '</p></div>'

    + '<div class="ph-legend">'
    + '<div class="ph-leg"><div class="ph-dot" style="background:var(--ph-vowel)"></div><span class="v">' + d.leg_oral + '</span> <span style="font-size:0.75rem; color:var(--muted); font-family:\'Noto Sans Mono\',monospace; margin-left:0.3rem;">e ɛ a ɔ ø y u i</span></div>'
    + '<div class="ph-leg"><div class="ph-dot" style="background:var(--ph-nasal)"></div><span class="nv">' + d.leg_nasal + '</span> <span style="font-size:0.75rem; color:var(--muted); font-family:\'Noto Sans Mono\',monospace; margin-left:0.3rem;">ɔ̃ ɑ̃ ɛ̃</span></div>'
    + '<div class="ph-leg"><div class="ph-dot" style="background:var(--ph-cons)"></div><span class="c">' + d.leg_cons + '</span> <span style="font-size:0.75rem; color:var(--muted); font-family:\'Noto Sans Mono\',monospace; margin-left:0.3rem;">p b t d k m n l s z…</span></div>'
    + '<div class="ph-leg"><div class="ph-dot" style="background:var(--ph-rhotic)"></div><span class="r">' + d.leg_rhotic + '</span> <span style="font-size:0.75rem; color:var(--muted); margin-left:0.3rem;">' + d.leg_rhotic_note + '</span></div>'
    + '<div class="ph-leg"><div class="ph-dot" style="background:var(--ph-glide)"></div><span class="g">' + d.leg_glide + '</span> <span style="font-size:0.75rem; color:var(--muted); font-family:\'Noto Sans Mono\',monospace; margin-left:0.3rem;">j w ɥ</span></div>'
    + '</div>'

    + '<div class="legend">'
    + '<div class="leg"><div class="swatch" style="background:var(--present)"></div><span class="c-present">présent</span></div>'
    + '<div class="leg"><div class="swatch" style="background:var(--imperf)"></div><span class="c-imperf">imparfait</span></div>'
    + '<div class="leg"><div class="swatch" style="background:var(--future)"></div><span class="c-future">futur simple</span></div>'
    + '<div class="leg"><div class="swatch" style="background:var(--cond)"></div><span class="c-cond">conditionnel</span></div>'
    + '<div class="leg"><div class="swatch" style="background:var(--subj)"></div><span class="c-subj">subjonctif</span></div>'
    + '<div class="leg"><div class="swatch" style="background:var(--ps)"></div><span class="c-ps">passé simple</span></div>'
    + '</div>'

    + '<section><div class="sh"><div class="sh-marker">§ 0</div><h2>' + d.s0_h + '</h2></div>'
    + '<p class="prose">' + d.s0_p1 + '</p>'
    + '<div class="mt-grid">'
    + '<div class="mt-cell"><div class="label">' + d.s0_tense_label + '</div><div class="term">' + d.s0_tense_term + '</div><div class="def">' + d.s0_tense_def + '</div></div>'
    + '<div class="mt-cell"><div class="label">' + d.s0_mood_label + '</div><div class="term">' + d.s0_mood_term + '</div><div class="def">' + d.s0_mood_def + '</div></div>'
    + '</div>'
    + '<p class="prose">' + d.s0_p2 + '</p>'
    + '<div class="callout neutral">' + d.s0_callout + '</div>'
    + '</section>'

    + '<section><div class="sh"><div class="sh-marker">§ 1</div><h2>' + d.s1_h + '</h2></div>'
    + '<p class="prose">' + d.s1_p1 + '</p>'
    + '<div class="rel">'
    + '<div class="rel-col"><div class="col-label c-future">' + d.s1_future_label + '</div>'
    + '<div class="big-ipa"><span class="c-stem ipa"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="v">ɛ</span><span class="r">ʁ</span></span><span class="c-future ipa">.<span class="v">e</span></span></div>'
    + '<p>' + d.s1_future_p + '</p></div>'
    + '<div class="rel-divider">vs</div>'
    + '<div class="rel-col"><div class="col-label c-cond">' + d.s1_cond_label + '</div>'
    + '<div class="big-ipa"><span class="c-stem ipa"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="v">ɛ</span><span class="r">ʁ</span></span><span class="c-cond ipa">.<span class="v">ɛ</span></span></div>'
    + '<p>' + d.s1_cond_p + '</p></div>'
    + '</div>'
    + '<div class="callout cond">' + d.s1_callout + '</div>'
    + '</section>'

    + '<section><div class="sh"><div class="sh-marker">§ 2</div><h2>' + d.s2_h + '</h2></div>'
    + '<p class="prose">' + d.s2_p1 + '</p>'
    + '<table class="sm-table"><thead><tr><th>' + d.s2_th_symbol + '</th><th>' + d.s2_th_type + '</th><th>' + d.s2_th_like + '</th><th>' + d.s2_th_appears + '</th></tr></thead><tbody>'
    + '<tr><td class="sound-col"><span class="v">e</span></td><td style="font-size:0.8rem; color:var(--ph-vowel);">' + d.s2_type_oral + '</td><td style="font-size:0.83rem; color:var(--dim);">"ay" in "say" — tense, closed, no diphthong</td><td style="font-family:\'Noto Sans Mono\',monospace; font-size:0.78rem; color:var(--muted);">‑er ‑ez ‑é ‑ai (futur je)</td></tr>'
    + '<tr><td class="sound-col"><span class="v">ɛ</span></td><td style="font-size:0.8rem; color:var(--ph-vowel);">' + d.s2_type_oral + '</td><td style="font-size:0.83rem; color:var(--dim);">"e" in "bet" — open, mouth wider than [e]</td><td style="font-family:\'Noto Sans Mono\',monospace; font-size:0.78rem; color:var(--muted);">‑ait ‑ais ‑aient ‑è ‑ê</td></tr>'
    + '<tr><td class="sound-col"><span class="v">a</span></td><td style="font-size:0.8rem; color:var(--ph-vowel);">' + d.s2_type_oral + '</td><td style="font-size:0.83rem; color:var(--dim);">open front "ah"</td><td style="font-family:\'Noto Sans Mono\',monospace; font-size:0.78rem; color:var(--muted);">‑a ‑as (futur/passé simple)</td></tr>'
    + '<tr><td class="sound-col"><span class="nv">ɔ̃</span></td><td style="font-size:0.8rem; color:var(--ph-nasal);">' + d.s2_type_nasal + '</td><td style="font-size:0.83rem; color:var(--dim);">nasalized "o" — air through nose, no English equivalent</td><td style="font-family:\'Noto Sans Mono\',monospace; font-size:0.78rem; color:var(--muted);">‑ons ‑ont</td></tr>'
    + '<tr><td class="sound-col"><span class="r">ʁ</span></td><td style="font-size:0.8rem; color:var(--ph-rhotic);">' + d.s2_type_rhotic + '</td><td style="font-size:0.83rem; color:var(--dim);">voiced uvular fricative — back of throat, never rolled</td><td style="font-family:\'Noto Sans Mono\',monospace; font-size:0.78rem; color:var(--muted);">r, rr — the futur/cond stem marker</td></tr>'
    + '<tr><td class="sound-col"><span class="g">j</span></td><td style="font-size:0.8rem; color:var(--ph-glide);">' + d.s2_type_glide + '</td><td style="font-size:0.83rem; color:var(--dim);">"y" in "yes" — brief, transitions into the following vowel</td><td style="font-family:\'Noto Sans Mono\',monospace; font-size:0.78rem; color:var(--muted);">‑ions ‑iez (imparfait/subj. nous/vous)</td></tr>'
    + '</tbody></table>'
    + '<div class="callout neutral" style="margin-top:1.1rem;">' + d.s2_callout + '</div>'
    + '</section>'

    + '<section><div class="sh"><div class="sh-marker">§ 3</div><h2 class="c-present">' + d.s3_h + '</h2></div>'
    + '<p class="prose">' + d.s3_p1 + '</p>'
    + '<div class="phon-block"><div class="phon-label pl-present">Présent · parler</div>'
    + '<table class="phon-table"><thead><tr><th>pronoun</th><th>IPA</th><th>spelling</th></tr></thead><tbody>'
    + '<tr><td class="pron">je / tu / il / ils</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span></td><td class="spell">je <span class="end-present">parle</span> · tu <span class="end-present">parles</span> · il <span class="end-present">parle</span> · ils <span class="end-present">parlent</span><button class="say" data-say="je parle" title="hear it">▶</button></td></tr>'
    + '<tr class="stable"><td class="pron">nous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-present c-present"><span class="nv">ɔ̃</span></span></td><td class="spell">nous <span class="end-present">parlons</span><button class="say" data-say="nous parlons" title="hear it">▶</button></td></tr>'
    + '<tr class="stable"><td class="pron">vous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-present c-present"><span class="v">e</span></span></td><td class="spell">vous <span class="end-present">parlez</span><button class="say" data-say="vous parlez" title="hear it">▶</button></td></tr>'
    + '</tbody></table></div>'
    + '<div class="callout present">' + d.s3_callout + '</div>'
    + '</section>'

    + '<section><div class="sh"><div class="sh-marker">§ 4</div><h2 class="c-imperf">' + d.s4_h + '</h2></div>'
    + '<p class="prose">' + d.s4_p1 + '</p>'
    + '<div class="phon-block"><div class="phon-label pl-imperf">Imparfait · parler</div>'
    + '<table class="phon-table"><thead><tr><th>pronoun</th><th>IPA</th><th>spelling</th></tr></thead><tbody>'
    + '<tr><td class="pron">je / tu / il / ils</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-imperf c-imperf"><span class="v">ɛ</span></span></td><td class="spell">je <span class="end-imperf">parlais</span> · il <span class="end-imperf">parlait</span> · ils <span class="end-imperf">parlaient</span><button class="say" data-say="je parlais" title="hear it">▶</button></td></tr>'
    + '<tr class="stable"><td class="pron">nous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-imperf c-imperf"><span class="g">j</span><span class="nv">ɔ̃</span></span></td><td class="spell">nous <span class="end-imperf">parlions</span><button class="say" data-say="nous parlions" title="hear it">▶</button></td></tr>'
    + '<tr class="stable"><td class="pron">vous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-imperf c-imperf"><span class="g">j</span><span class="v">e</span></span></td><td class="spell">vous <span class="end-imperf">parliez</span><button class="say" data-say="vous parliez" title="hear it">▶</button></td></tr>'
    + '</tbody></table></div>'
    + '<div class="callout neutral">' + d.s4_callout + '</div>'
    + '</section>'

    + '<section><div class="sh"><div class="sh-marker">§ 5</div><h2 class="c-future">' + d.s5_h + '</h2></div>'
    + '<p class="prose">' + d.s5_p1 + '</p>'
    + '<div class="phon-block"><div class="phon-label pl-future">Futur simple · parler</div>'
    + '<table class="phon-table"><thead><tr><th>pronoun</th><th>IPA</th><th>spelling</th></tr></thead><tbody>'
    + '<tr><td class="pron">je</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="v">ɛ</span><span class="r">ʁ</span><span class="end-future c-future"><span class="v">e</span></span></td><td class="spell">je <span class="end-future">parlerai</span><button class="say" data-say="je parlerai" title="hear it">▶</button></td></tr>'
    + '<tr><td class="pron">tu / il</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="v">ɛ</span><span class="r">ʁ</span><span class="end-future c-future"><span class="v">a</span></span></td><td class="spell">tu <span class="end-future">parleras</span> · il <span class="end-future">parlera</span><button class="say" data-say="il parlera" title="hear it">▶</button></td></tr>'
    + '<tr class="stable"><td class="pron">nous / ils</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="v">ɛ</span><span class="r">ʁ</span><span class="end-future c-future"><span class="nv">ɔ̃</span></span></td><td class="spell">nous <span class="end-future">parlerons</span> · ils <span class="end-future">parleront</span><button class="say" data-say="nous parlerons" title="hear it">▶</button></td></tr>'
    + '<tr class="stable"><td class="pron">vous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="v">ɛ</span><span class="r">ʁ</span><span class="end-future c-future"><span class="v">e</span></span></td><td class="spell">vous <span class="end-future">parlerez</span><button class="say" data-say="vous parlerez" title="hear it">▶</button></td></tr>'
    + '</tbody></table></div>'
    + '<div class="callout future">' + d.s5_callout + '</div>'
    + '</section>'

    + '<section><div class="sh"><div class="sh-marker">§ 6</div><h2 class="c-cond">' + d.s6_h + '</h2></div>'
    + '<p class="prose">' + d.s6_p1 + '</p>'
    + '<div class="phon-block"><div class="phon-label pl-cond">Conditionnel · parler</div>'
    + '<table class="phon-table"><thead><tr><th>pronoun</th><th>IPA</th><th>spelling</th></tr></thead><tbody>'
    + '<tr><td class="pron">je / tu / il / ils</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="v">ɛ</span><span class="r">ʁ</span><span class="end-cond c-cond"><span class="v">ɛ</span></span></td><td class="spell">je <span class="end-cond">parlerais</span> · il <span class="end-cond">parlerait</span> · ils <span class="end-cond">parleraient</span><button class="say" data-say="je parlerais" title="hear it">▶</button></td></tr>'
    + '<tr class="stable"><td class="pron">nous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="v">ɛ</span><span class="r">ʁ</span><span class="end-cond c-cond"><span class="g">j</span><span class="nv">ɔ̃</span></span></td><td class="spell">nous <span class="end-cond">parlerions</span><button class="say" data-say="nous parlerions" title="hear it">▶</button></td></tr>'
    + '<tr class="stable"><td class="pron">vous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="v">ɛ</span><span class="r">ʁ</span><span class="end-cond c-cond"><span class="g">j</span><span class="v">e</span></span></td><td class="spell">vous <span class="end-cond">parleriez</span><button class="say" data-say="vous parleriez" title="hear it">▶</button></td></tr>'
    + '</tbody></table></div>'
    + '<div class="callout cond">' + d.s6_callout + '</div>'
    + '</section>'

    + '<section><div class="sh"><div class="sh-marker">§ 7</div><h2 class="c-subj">' + d.s7_h + '</h2></div>'
    + '<p class="prose">' + d.s7_p1 + '</p>'
    + '<div class="phon-block"><div class="phon-label pl-subj">Subjonctif présent · parler</div>'
    + '<table class="phon-table"><thead><tr><th>pronoun</th><th>IPA</th><th>spelling</th><th>sounds like</th></tr></thead><tbody>'
    + '<tr><td class="pron">je / tu / il / ils</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span></td><td class="spell">que je <span class="end-subj">parle</span> · qu’ils <span class="end-subj">parlent</span><button class="say" data-say="que je parle" title="hear it">▶</button></td><td class="meaning c-present">' + d.s7_meaning_present + '</td></tr>'
    + '<tr class="stable"><td class="pron">nous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-subj c-subj"><span class="g">j</span><span class="nv">ɔ̃</span></span></td><td class="spell">que nous <span class="end-subj">parlions</span><button class="say" data-say="que nous parlions" title="hear it">▶</button></td><td class="meaning c-imperf">' + d.s7_meaning_imperf_nous + '</td></tr>'
    + '<tr class="stable"><td class="pron">vous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-subj c-subj"><span class="g">j</span><span class="v">e</span></span></td><td class="spell">que vous <span class="end-subj">parliez</span><button class="say" data-say="que vous parliez" title="hear it">▶</button></td><td class="meaning c-imperf">' + d.s7_meaning_imperf_vous + '</td></tr>'
    + '</tbody></table></div>'
    + '<div class="callout subj">' + d.s7_callout + '</div>'
    + '</section>'

    + '<section><div class="sh"><div class="sh-marker">§ 8</div><h2 class="c-ps">' + d.s8_h + '</h2></div>'
    + '<p class="prose">' + d.s8_p1 + '</p>'
    + '<div class="phon-block"><div class="phon-label pl-ps">Passé simple · parler (-er verb)</div>'
    + '<table class="phon-table"><thead><tr><th>pronoun</th><th>IPA</th><th>spelling</th></tr></thead><tbody>'
    + '<tr><td class="pron">je</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-ps c-ps"><span class="v">e</span></span></td><td class="spell">je <span class="end-ps">parlai</span><button class="say" data-say="je parlai" title="hear it">▶</button></td></tr>'
    + '<tr><td class="pron">tu / il</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-ps c-ps"><span class="v">a</span></span></td><td class="spell">tu <span class="end-ps">parlas</span> · il <span class="end-ps">parla</span><button class="say" data-say="il parla" title="hear it">▶</button></td></tr>'
    + '<tr><td class="pron">nous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-ps c-ps"><span class="v">a</span><span class="c">m</span></span></td><td class="spell">nous <span class="end-ps">parlâmes</span><button class="say" data-say="nous parlâmes" title="hear it">▶</button></td></tr>'
    + '<tr><td class="pron">vous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-ps c-ps"><span class="v">a</span><span class="c">t</span></span></td><td class="spell">vous <span class="end-ps">parlâtes</span><button class="say" data-say="vous parlâtes" title="hear it">▶</button></td></tr>'
    + '<tr><td class="pron">ils</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-ps c-ps"><span class="v">ɛ</span><span class="r">ʁ</span></span></td><td class="spell">ils <span class="end-ps">parlèrent</span><button class="say" data-say="ils parlèrent" title="hear it">▶</button></td></tr>'
    + '</tbody></table></div>'
    + '<div class="callout ps">' + d.s8_callout + '</div>'
    + '</section>'

    + '<section><div class="sh"><div class="sh-marker">§ 9</div><h2>' + d.s9_h + '</h2></div>'
    + '<p class="prose">' + d.s9_p1 + '</p>'
    + '<table class="irr-table"><thead><tr><th>' + d.s9_th_verb + '</th><th>' + d.s9_th_je + '</th><th>' + d.s9_th_nous + '</th><th>' + d.s9_th_ils + '</th><th>' + d.s9_th_spelling + '</th><th>' + d.s9_th_changes + '</th></tr></thead><tbody>'
    + [
      ['être', 'je suis, nous sommes, ils sont', '<span class="c">s</span><span class="v">ɥ</span><span class="c">i</span>', '<span class="c">s</span><span class="nv">ɔ̃</span><span class="c">m</span>', '<span class="c">s</span><span class="nv">ɔ̃</span>', 'suis / sommes / sont', 'stem changes completely — three distinct stems'],
      ['avoir', 'je ai, nous avons, ils ont', '<span class="v">ɛ</span>', '<span class="v">a</span><span class="c">v</span><span class="nv">ɔ̃</span>', '<span class="nv">ɔ̃</span>', 'ai / avons / ont', 'stem suppressed entirely in je/ils'],
      ['aller', 'je vais, nous allons, ils vont', '<span class="c">v</span><span class="v">ɛ</span>', '<span class="v">a</span><span class="c">l</span><span class="nv">ɔ̃</span>', '<span class="c">v</span><span class="nv">ɔ̃</span>', 'vais / allons / vont', 'two completely different stems (vais/va, all-, von-)'],
      ['faire', 'je fais, nous faisons, ils font', '<span class="c">f</span><span class="v">ɛ</span>', '<span class="c">f</span><span class="z">z</span><span class="nv">ɔ̃</span>', '<span class="c">f</span><span class="nv">ɔ̃</span>', 'fais / faisons / font', 'stem vowel ɛ (sing) → ə (nous)'],
      ['pouvoir', 'je peux, nous pouvons, ils peuvent', '<span class="c">p</span><span class="v">ø</span>', '<span class="c">p</span><span class="v">u</span><span class="c">v</span><span class="nv">ɔ̃</span>', '<span class="c">p</span><span class="v">ø</span><span class="c">v</span>', 'peux / pouvons / peuvent', 'ø in sing/ils; u in nous/vous'],
      ['vouloir', 'je veux, nous voulons, ils veulent', '<span class="c">v</span><span class="v">ø</span>', '<span class="c">v</span><span class="v">u</span><span class="c">l</span><span class="nv">ɔ̃</span>', '<span class="c">v</span><span class="v">ø</span><span class="c">l</span>', 'veux / voulons / veulent', 'ø in sing/ils; u in nous/vous — same boot pattern as pouvoir'],
      ['savoir', 'je sais, nous savons, ils savent', '<span class="c">s</span><span class="v">ɛ</span>', '<span class="c">s</span><span class="v">a</span><span class="c">v</span><span class="nv">ɔ̃</span>', '<span class="c">s</span><span class="v">a</span><span class="c">v</span>', 'sais / savons / savent', 'sing ɛ → nous/vous/ils a'],
      ['venir', 'je viens, nous venons, ils viennent', '<span class="c">v</span><span class="nv">jɛ̃</span>', '<span class="c">v</span><span class="v">ə</span><span class="c">n</span><span class="nv">ɔ̃</span>', '<span class="c">v</span><span class="nv">jɛ̃</span><span class="c">n</span>', 'viens / venons / viennent', 'nasal jɛ̃ in sing/ils; schwa stem in nous/vous'],
      ['tenir', 'je tiens, nous tenons, ils tiennent', '<span class="c">t</span><span class="nv">jɛ̃</span>', '<span class="c">t</span><span class="v">ə</span><span class="c">n</span><span class="nv">ɔ̃</span>', '<span class="c">t</span><span class="nv">jɛ̃</span><span class="c">n</span>', 'tiens / tenons / tiennent', 'identical boot pattern to venir'],
      ['prendre', 'je prends, nous prenons, ils prennent', '<span class="c">p</span><span class="r">ʁ</span><span class="nv">ɑ̃</span>', '<span class="c">p</span><span class="r">ʁ</span><span class="v">ə</span><span class="c">n</span><span class="nv">ɔ̃</span>', '<span class="c">p</span><span class="r">ʁ</span><span class="nv">ɑ̃</span><span class="c">n</span>', 'prends / prenons / prennent', 'nasal ɑ̃ in sing/ils; ə+n in nous/vous'],
      ['boire', 'je bois, nous buvons, ils boivent', '<span class="c">b</span><span class="v">wa</span>', '<span class="c">b</span><span class="v">u</span><span class="c">v</span><span class="nv">ɔ̃</span>', '<span class="c">b</span><span class="v">wa</span><span class="c">v</span>', 'bois / buvons / boivent', 'wa in sing/ils; u in nous/vous'],
      ['croire', 'je crois, nous croyons, ils croient', '<span class="c">k</span><span class="r">ʁ</span><span class="v">wa</span>', '<span class="c">k</span><span class="r">ʁ</span><span class="v">a</span><span class="c">j</span><span class="nv">ɔ̃</span>', '<span class="c">k</span><span class="r">ʁ</span><span class="v">wa</span><span class="c">j</span>', 'crois / croyons / croient', 'wa in sing/ils; a in nous/vous'],
      ['devoir', 'je dois, nous devons, ils doivent', '<span class="c">d</span><span class="v">wa</span>', '<span class="c">d</span><span class="v">ə</span><span class="c">v</span><span class="nv">ɔ̃</span>', '<span class="c">d</span><span class="v">wa</span><span class="c">v</span>', 'dois / devons / doivent', 'wa in sing/ils; ə in nous/vous'],
      ['voir', 'je vois, nous voyons, ils voient', '<span class="c">v</span><span class="v">wa</span>', '<span class="c">v</span><span class="v">wa</span><span class="c">j</span><span class="nv">ɔ̃</span>', '<span class="c">v</span><span class="v">wa</span><span class="c">j</span>', 'vois / voyons / voient', 'stem stable; glide j added in nous/vous/ils']
    ].map(function (r) {
      return '<tr><td class="verb-col">' + r[0] + '<button class="say" data-say="' + r[1] + '" title="hear it">▶</button></td>'
        + '<td class="ipa-irr">' + r[2] + '</td><td class="ipa-irr">' + r[3] + '</td><td class="ipa-irr">' + r[4] + '</td>'
        + '<td class="spell c-present">' + r[5] + '</td><td class="note-col">' + r[6] + '</td></tr>';
    }).join('')
    + '</tbody></table>'
    + '<div class="callout neutral" style="margin-top:1.1rem;">' + d.s9_callout + '</div>'
    + '</section>'

    + '<section><div class="sh"><div class="sh-marker">§ 10</div><h2>' + d.s10_h + '</h2></div>'
    + '<table class="sm-table"><thead><tr><th>' + d.s10_th_hear + '</th><th>' + d.s10_th_stem_r + '</th><th>' + d.s10_th_tense + '</th><th>' + d.s10_th_meaning + '</th></tr></thead><tbody>'
    + '<tr><td class="sound-col c-stem">' + d.s10_bare + '</td><td>—</td><td class="c-present">' + d.s10_present_nous.replace(' nous', '') + '</td><td style="font-size:0.83rem; color:var(--dim);">' + d.s10_row_bare_meaning + '</td></tr>'
    + '<tr><td class="sound-col c-stem">stem + <span class="c-present"><span class="nv">ɔ̃</span></span></td><td>no</td><td class="c-present">' + d.s10_present_nous + '</td><td style="font-size:0.83rem; color:var(--dim);">' + d.s10_row_nous_meaning + '</td></tr>'
    + '<tr><td class="sound-col c-stem">stem + <span class="c-present"><span class="v">e</span></span></td><td>no</td><td class="c-present">' + d.s10_present_vous + '</td><td style="font-size:0.83rem; color:var(--dim);">' + d.s10_row_vous_meaning + '</td></tr>'
    + '<tr><td class="sound-col c-stem">stem + <span class="c-imperf"><span class="v">ɛ</span></span></td><td>no</td><td class="c-imperf">' + d.s10_imperf_je + '</td><td style="font-size:0.83rem; color:var(--dim);">' + d.s10_row_imperf_meaning + '</td></tr>'
    + '<tr><td class="sound-col c-stem">stem + <span class="c-imperf"><span class="g">j</span><span class="nv">ɔ̃</span></span></td><td>no</td><td>' + d.s10_imperf_or_subj + '</td><td style="font-size:0.83rem; color:var(--dim);">' + d.s10_row_imperf_nous_meaning + '</td></tr>'
    + '<tr><td class="sound-col c-stem">stem·<span class="r">ʁ</span> + <span class="c-future"><span class="v">e</span></span></td><td>yes</td><td class="c-future">' + d.s10_fut_je + '</td><td style="font-size:0.83rem; color:var(--dim);">' + d.s10_row_fut_meaning + '</td></tr>'
    + '<tr><td class="sound-col c-stem">stem·<span class="r">ʁ</span> + <span class="c-future"><span class="v">a</span></span></td><td>yes</td><td class="c-future">' + d.s10_fut_tu + '</td><td style="font-size:0.83rem; color:var(--dim);">' + d.s10_row_fut_meaning + '</td></tr>'
    + '<tr><td class="sound-col c-stem">stem·<span class="r">ʁ</span> + <span class="c-future"><span class="nv">ɔ̃</span></span></td><td>yes</td><td class="c-future">' + d.s10_fut_nous + '</td><td style="font-size:0.83rem; color:var(--dim);">' + d.s10_row_fut_meaning + '</td></tr>'
    + '<tr><td class="sound-col c-stem">stem·<span class="r">ʁ</span> + <span class="c-cond"><span class="v">ɛ</span></span></td><td>yes</td><td class="c-cond">' + d.s10_cond_je + '</td><td style="font-size:0.83rem; color:var(--dim);">' + d.s10_row_cond_meaning + '</td></tr>'
    + '<tr><td class="sound-col c-stem">stem·<span class="r">ʁ</span> + <span class="c-cond"><span class="g">j</span><span class="nv">ɔ̃</span></span></td><td>yes</td><td class="c-cond">' + d.s10_cond_nous + '</td><td style="font-size:0.83rem; color:var(--dim);">' + d.s10_row_cond_nous_meaning + '</td></tr>'
    + '<tr><td class="sound-col"><span class="c-ps"><span class="v">a</span><span class="c">m</span></span> or <span class="c-ps"><span class="v">a</span><span class="c">t</span></span> or <span class="c-ps"><span class="v">ɛ</span><span class="r">ʁ</span></span></td><td>—</td><td class="c-ps">' + d.s10_ps + '</td><td style="font-size:0.83rem; color:var(--dim);">' + d.s10_row_ps_meaning + '</td></tr>'
    + '</tbody></table>'
    + '<div class="callout neutral" style="margin-top:1.1rem;">' + d.s10_callout + '</div>'
    + '</section>';
  }

  function mount(root) {
    root.innerHTML = render(i18n.getLang());
    APP.speech.wireSpeakers(root);
    mounted = true;
  }

  function renderAll() { /* pronunciation tool has no persisted quiz state to re-derive */ }
  function clearAll() { /* nothing to clear — reference content only, no choices made */ }

  return { mount: mount, renderAll: renderAll, clearAll: clearAll };
})();
