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
      intro: 'Spelling appears only as a reference footnote. Every ending is described by its phonemes, the individual sounds, using IPA (the International Phonetic Alphabet). Color marks phoneme type: the kind of sound you are hearing. Tap the speaker icon next to any form to hear it spoken aloud in your browser’s French voice.',
      leg_oral: 'oral vowel', leg_nasal: 'nasal vowel', leg_cons: 'consonant', leg_rhotic: 'ʁ (French r)', leg_rhotic_note: '(the futur/conditionnel stem marker)', leg_glide: 'glide',
      s0_h: 'Mood and tense are two different axes',
      s0_p1: 'These two words are often conflated. They answer different questions.',
      s0_tense_label: 'Tense answers', s0_tense_term: 'When?', s0_tense_def: 'Tense can be past, present, or future. It locates an action in time.',
      s0_mood_label: 'Mood answers', s0_mood_term: 'How real is it?', s0_mood_def: 'Is this a fact, a hypothesis, a wish, a command? Mood expresses the speaker’s relationship to reality.',
      s0_p2: 'French has four moods. The <strong>indicatif</strong> states facts; most of the tenses you use daily belong to it. The <strong>subjonctif</strong> marks doubt, emotion, or necessity. The <strong>conditionnel</strong> marks hypotheticals: things that <em>would</em> happen under some condition. The <strong>impératif</strong> issues commands.',
      s0_callout: '<strong>When you hear a verb ending, your ear is doing two jobs at once:</strong> tracking <em>when</em> (tense) and tracking <em>how real</em> (mood). The endings encode both.',

      s1_h: 'Why the futur and conditionnel sound alike',
      s1_p1: 'They share the same stem: <strong>the infinitive</strong>, which carries its ʁ into the conjugated form. The only difference is the ending. The futur attaches new endings; the conditionnel attaches the <em>imparfait</em> endings to that same stem.',
      s1_future_label: 'Futur simple', s1_future_p: '"I will speak." A projection into future time, asserted as fact in the indicative mood.',
      s1_cond_label: 'Conditionnel', s1_cond_p: '"I would speak." A projection into a contingent or unreal situation, sometimes called the <em>futur du passé</em>: the future as seen from within a condition that may never be met.',
      s1_callout: '<strong>The stem stays the same; only the vowel changes.</strong> Both tenses project forward, and the stem’s ʁ carries that shared meaning. The ending resolves which one: closed e → asserted future; open ɛ → contingent or hypothetical.',

      s2_h: 'The sounds that matter in verb endings',
      s2_p1: 'Only a handful of sounds appear in verb endings. Here they are, with phoneme-type coloring applied.',
      s2_th_symbol: 'symbol', s2_th_type: 'type', s2_th_like: 'sounds like', s2_th_appears: 'appears in (spelling, for reference)',
      s2_type_oral: 'oral vowel', s2_type_nasal: 'nasal vowel', s2_type_rhotic: 'rhotic (French r)', s2_type_glide: 'glide',
      s2_callout: '<strong>e vs ɛ:</strong> e is tense and closed (futur, -ez); ɛ is open (imparfait, conditionnel). Many spellings share the same sound: <em>-ait, -ais, -aient</em> are all ɛ.',

      s3_h: 'Présent: the bare stem',
      s3_p1: 'No tense marker at all. You hear the stem, then a person sound. For -er verbs the singular ending is silent, so je, tu, il, and ils all sound the same.',
      s3_callout: '<strong>The -ent of ils/elles is silent for -er verbs.</strong> Four pronouns (je / tu / il / ils) produce the same sound. The plural is signaled only by context or the pronoun.',

      s4_h: 'Imparfait: injecting ɛ',
      s4_p1: 'Past ongoing or habitual action ("I was speaking," "I used to speak"). Built from the <em>nous</em> present stem (drop ɔ̃) by inserting the open vowel ɛ. This rule has no exceptions in French.',
      s4_callout: '<strong>The spelling trap:</strong> <em>parlais, parlait, parlaient</em> are three different spellings of one sound. Your ear only has one thing to learn here.',

      s5_h: 'Futur simple: hear the ʁ',
      s5_p1: 'Built on the infinitive, which keeps its ʁ audible. That ʁ inside a conjugated form is your signal: you are in futur or conditionnel territory.',
      s5_callout: '<strong>Person endings by sound:</strong> je/vous → e · tu/il → a · nous/ils → ɔ̃.',

      s6_h: 'Conditionnel: ʁ stem, ɛ endings',
      s6_p1: 'Same infinitive stem as the futur, but with the imparfait’s ɛ endings attached. Once you know §4 and §5, this follows automatically.',
      s6_callout: '<strong>Futur vs. conditionnel by ear:</strong> both have ʁ in the stem. The ending decides which: closed e or open ɛ for je; for nous/vous, the glide j marks conditionnel, and its absence marks futur.',

      s7_h: 'Subjonctif: a mood, not a tense',
      s7_p1: 'The subjonctif marks doubt, wish, emotion, or necessity rather than a fact. It is almost always preceded by <em>que</em>. Its endings are phonetically identical to the présent for -er verbs in the singular/ils, and identical to the imparfait for nous/vous. Context (the word <em>que</em> plus a trigger verb like <em>vouloir, falloir, douter</em>) is the cue.',
      s7_meaning_present: '= présent', s7_meaning_imperf_nous: '= imparfait nous', s7_meaning_imperf_vous: '= imparfait vous',
      s7_callout: '<strong>The subjonctif is phonetically distinctive only in irregular verbs</strong>, where the stem itself changes: aj for aller (<em>que j’aille</em>), swa for être (<em>que je sois</em>), ɛ for avoir (<em>que j’aie</em>).',

      s8_h: 'Passé simple: recognize it, don’t produce it',
      s8_p1: 'Completed past with a definite endpoint, used in formal writing and literature. You will read it often in novels and rarely need to say it. Train your ear to recognize it.',
      s8_callout: '<strong>Recognition cues:</strong> am / at for nous/vous are unmistakable in any verb. ɛʁ for ils is just as distinctive.',

      s9_h: 'Stem-changing irregulars in the présent',
      s9_p1: 'These are high-frequency verbs whose <em>stem</em>, not just the ending, changes in the présent. The endings follow the same rules; what shifts is the root sound itself. The pattern is called the <strong>"boot" pattern</strong> (or <em>le radical variable</em>): the changed stem appears in the singular + ils forms, and the unchanged stem appears in nous/vous.',
      s9_th_verb: 'verb', s9_th_je: 'je (IPA)', s9_th_nous: 'nous (IPA)', s9_th_ils: 'ils (IPA)', s9_th_spelling: 'spelling je / nous / ils', s9_th_changes: 'what changes',
      s9_callout: '<strong>The boot pattern by ear:</strong> for most of these verbs, the singular + ils forms share a stronger or more open stem vowel, while nous/vous have a reduced or more closed stem. The endings themselves stay regular. Train the stem pairs, not the full paradigm.',

      s10_h: 'Sound → meaning: the decision flow',
      s10_p1: 'Everything in §3 through §8 reduces to one flow. Passé simple sits outside it; you recognize it from am / at / ɛʁ alone, described in §8.',
      s10_bare: 'bare stem (nothing)', s10_hear_r: 'Hear ʁ in the stem?',
      s10_no_r: 'No', s10_yes_r: 'Yes',
      s10_hear_e: 'Hear ɛ?', s10_no_e: 'No', s10_yes_e: 'Yes',
      s10_ending_closed: 'Ending closed (e, a, ɔ̃)?', s10_yes_closed: 'Yes', s10_no_closed: 'No (open ɛ, or glide j)',
      s10_present: 'Présent', s10_present_note: 'fact, now or habitual',
      s10_imperfait: 'Imparfait', s10_imperfait_note: 'past, ongoing (or subjonctif nous/vous, with que)',
      s10_futur: 'Futur', s10_futur_note: 'will happen',
      s10_cond: 'Conditionnel', s10_cond_note: 'would happen'
    },
    fr: {
      eyebrow: 'Français · axé sur la phonétique',
      title: 'Les terminaisons verbales comme <em>sons</em>',
      intro: 'L’orthographe n’apparaît qu’en note de référence. Chaque terminaison est décrite par ses phonèmes, les sons individuels, à l’aide de l’API (l’alphabet phonétique international). La couleur marque le type de phonème : le genre de son que vous entendez. Touchez l’icône du haut-parleur à côté de n’importe quelle forme pour l’entendre, avec la voix française de votre navigateur.',
      leg_oral: 'voyelle orale', leg_nasal: 'voyelle nasale', leg_cons: 'consonne', leg_rhotic: 'ʁ (r français)', leg_rhotic_note: '(le marqueur du radical futur/conditionnel)', leg_glide: 'semi-voyelle',
      s0_h: 'Mode et temps sont deux axes différents',
      s0_p1: 'Ces deux mots sont souvent confondus. Ils répondent à des questions différentes.',
      s0_tense_label: 'Le temps répond à', s0_tense_term: 'Quand ?', s0_tense_def: 'Le temps peut être passé, présent ou futur. Il situe une action dans le temps.',
      s0_mood_label: 'Le mode répond à', s0_mood_term: 'À quel point est-ce réel ?', s0_mood_def: 'Est-ce un fait, une hypothèse, un souhait, un ordre ? Le mode exprime le rapport du locuteur à la réalité.',
      s0_p2: 'Le français compte quatre modes. L’<strong>indicatif</strong> énonce des faits ; la plupart des temps que vous utilisez au quotidien en font partie. Le <strong>subjonctif</strong> marque le doute, l’émotion ou la nécessité. Le <strong>conditionnel</strong> marque l’hypothétique : ce qui <em>se produirait</em> sous certaine condition. L’<strong>impératif</strong> donne des ordres.',
      s0_callout: '<strong>Quand vous entendez une terminaison verbale, votre oreille fait deux tâches à la fois :</strong> repérer <em>quand</em> (le temps) et repérer <em>à quel point c’est réel</em> (le mode). Les terminaisons encodent les deux.',

      s1_h: 'Pourquoi le futur et le conditionnel se ressemblent',
      s1_p1: 'Ils partagent la même base : <strong>l’infinitif</strong>, qui porte son ʁ jusque dans la forme conjuguée. Seule la terminaison diffère. Le futur ajoute de nouvelles terminaisons; le conditionnel ajoute les terminaisons de l’<em>imparfait</em> à cette même base.',
      s1_future_label: 'Futur simple', s1_future_p: '« Je parlerai. » Une projection dans le futur, affirmée comme un fait au mode indicatif.',
      s1_cond_label: 'Conditionnel', s1_cond_p: '« Je parlerais. » Une projection dans une situation contingente ou irréelle, parfois appelée <em>futur du passé</em> : le futur vu de l’intérieur d’une condition qui pourrait ne jamais se réaliser.',
      s1_callout: '<strong>La base reste la même ; seule la voyelle change.</strong> Les deux temps se projettent vers l’avant, et le ʁ de la base porte ce sens commun. La terminaison tranche : e fermé → futur affirmé; ɛ ouvert → contingent ou hypothétique.',

      s2_h: 'Les sons qui comptent dans les terminaisons',
      s2_p1: 'Seule une poignée de sons apparaît dans les terminaisons verbales. Les voici, avec la coloration par type de phonème.',
      s2_th_symbol: 'symbole', s2_th_type: 'type', s2_th_like: 'ressemble à', s2_th_appears: 'apparaît dans (orthographe, pour référence)',
      s2_type_oral: 'voyelle orale', s2_type_nasal: 'voyelle nasale', s2_type_rhotic: 'rhotique (r français)', s2_type_glide: 'semi-voyelle',
      s2_callout: '<strong>e contre ɛ :</strong> e est tendu et fermé (futur, -ez); ɛ est ouvert (imparfait, conditionnel). Plusieurs orthographes correspondent au même son : <em>-ait, -ais, -aient</em> sont tous ɛ.',

      s3_h: 'Présent : la base nue',
      s3_p1: 'Aucun marqueur de temps. Vous entendez la base, puis un son de personne. Pour les verbes en -er, la terminaison du singulier est muette, donc je, tu, il et ils sonnent tous pareil.',
      s3_callout: '<strong>Le -ent de ils/elles est muet pour les verbes en -er.</strong> Quatre pronoms (je / tu / il / ils) produisent le même son. Le pluriel n’est signalé que par le contexte ou le pronom.',

      s4_h: 'Imparfait : insérer ɛ',
      s4_p1: 'Action passée continue ou habituelle (« je parlais »). Construit à partir de la base du présent de <em>nous</em> (en retirant ɔ̃) en insérant la voyelle ouverte ɛ. Cette règle n’a aucune exception en français.',
      s4_callout: '<strong>Le piège orthographique :</strong> <em>parlais, parlait, parlaient</em> sont trois orthographes différentes d’un seul son. Votre oreille n’a qu’une seule chose à apprendre ici.',

      s5_h: 'Futur simple : entendre le ʁ',
      s5_p1: 'Construit sur l’infinitif, qui garde son ʁ audible. Ce ʁ à l’intérieur d’une forme conjuguée est votre signal : vous êtes en territoire futur ou conditionnel.',
      s5_callout: '<strong>Terminaisons personnelles à l’oreille :</strong> je/vous → e · tu/il → a · nous/ils → ɔ̃.',

      s6_h: 'Conditionnel : base en ʁ, terminaisons en ɛ',
      s6_p1: 'Même base infinitive que le futur, mais avec les terminaisons ɛ de l’imparfait. Une fois les §4 et §5 maîtrisés, cela devient automatique.',
      s6_callout: '<strong>Futur contre conditionnel à l’oreille :</strong> les deux ont ʁ dans la base. La terminaison tranche : fermée e ou ouverte ɛ pour je; pour nous/vous, la semi-voyelle j marque le conditionnel, son absence marque le futur.',

      s7_h: 'Subjonctif : un mode, pas un temps',
      s7_p1: 'Le subjonctif marque le doute, le souhait, l’émotion ou la nécessité plutôt qu’un fait. Il est presque toujours précédé de <em>que</em>. Ses terminaisons sont phonétiquement identiques au présent pour les verbes en -er au singulier/ils, et identiques à l’imparfait pour nous/vous. Le contexte (le mot <em>que</em> plus un verbe déclencheur comme <em>vouloir, falloir, douter</em>) est l’indice.',
      s7_meaning_present: '= présent', s7_meaning_imperf_nous: '= imparfait nous', s7_meaning_imperf_vous: '= imparfait vous',
      s7_callout: '<strong>Le subjonctif ne se distingue phonétiquement que dans les verbes irréguliers</strong>, où la base elle-même change : aj pour aller (<em>que j’aille</em>), swa pour être (<em>que je sois</em>), ɛ pour avoir (<em>que j’aie</em>).',

      s8_h: 'Passé simple : à reconnaître, pas à produire',
      s8_p1: 'Passé achevé avec un point final précis, utilisé à l’écrit soutenu et en littérature. Vous le lirez souvent dans les romans et n’aurez presque jamais besoin de le dire. Entraînez votre oreille à le reconnaître.',
      s8_callout: '<strong>Indices de reconnaissance :</strong> am / at pour nous/vous sont reconnaissables dans n’importe quel verbe. ɛʁ pour ils est tout aussi distinctif.',

      s9_h: 'Irréguliers à base variable au présent',
      s9_p1: 'Ce sont des verbes très fréquents dont la <em>base</em>, pas seulement la terminaison, change au présent. Les terminaisons suivent les mêmes règles; c’est le son de la racine qui change. Ce motif s’appelle le <strong>« radical variable »</strong> (le « boot pattern » en anglais) : la base changée apparaît au singulier + ils, et la base inchangée apparaît à nous/vous.',
      s9_th_verb: 'verbe', s9_th_je: 'je (API)', s9_th_nous: 'nous (API)', s9_th_ils: 'ils (API)', s9_th_spelling: 'orthographe je / nous / ils', s9_th_changes: 'ce qui change',
      s9_callout: '<strong>Le radical variable à l’oreille :</strong> pour la plupart de ces verbes, le singulier + ils partagent une voyelle de base plus forte ou plus ouverte, tandis que nous/vous ont une base réduite ou plus fermée. Les terminaisons elles-mêmes restent régulières. Entraînez les paires de bases, pas tout le paradigme.',

      s10_h: 'Son → sens : le parcours de décision',
      s10_p1: 'Tout ce qui est vu aux §3 à §8 se ramène à ce seul parcours. Le passé simple reste à part ; vous le reconnaissez uniquement par am / at / ɛʁ, décrit au §8.',
      s10_bare: 'base nue (rien)', s10_hear_r: 'La base a-t-elle ʁ ?',
      s10_no_r: 'Non', s10_yes_r: 'Oui',
      s10_hear_e: 'Entendez-vous ɛ ?', s10_no_e: 'Non', s10_yes_e: 'Oui',
      s10_ending_closed: 'Terminaison fermée (e, a, ɔ̃) ?', s10_yes_closed: 'Oui', s10_no_closed: 'Non (ɛ ouvert, ou semi-voyelle j)',
      s10_present: 'Présent', s10_present_note: 'fait, présent ou habituel',
      s10_imperfait: 'Imparfait', s10_imperfait_note: 'passé continu (ou subjonctif nous/vous, avec que)',
      s10_futur: 'Futur', s10_futur_note: 'va arriver',
      s10_cond: 'Conditionnel', s10_cond_note: 'arriverait'
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
    + '<div class="rel-col"><div class="col-label">' + d.s1_future_label + '</div>'
    + '<div class="big-ipa"><span class="c-stem ipa"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="v">ɛ</span><span class="r">ʁ</span></span><span class="ipa">.<span class="v">e</span></span></div>'
    + '<p>' + d.s1_future_p + '</p></div>'
    + '<div class="rel-divider">vs</div>'
    + '<div class="rel-col"><div class="col-label">' + d.s1_cond_label + '</div>'
    + '<div class="big-ipa"><span class="c-stem ipa"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="v">ɛ</span><span class="r">ʁ</span></span><span class="ipa">.<span class="v">ɛ</span></span></div>'
    + '<p>' + d.s1_cond_p + '</p></div>'
    + '</div>'
    + '<div class="callout neutral">' + d.s1_callout + '</div>'
    + '</section>'

    + '<section><div class="sh"><div class="sh-marker">§ 2</div><h2>' + d.s2_h + '</h2></div>'
    + '<p class="prose">' + d.s2_p1 + '</p>'
    + '<table class="sm-table"><thead><tr><th>' + d.s2_th_symbol + '</th><th>' + d.s2_th_type + '</th><th>' + d.s2_th_like + '</th><th>' + d.s2_th_appears + '</th></tr></thead><tbody>'
    + '<tr><td class="sound-col"><span class="v">e</span></td><td style="font-size:0.8rem; color:var(--ph-vowel);">' + d.s2_type_oral + '</td><td style="font-size:0.83rem; color:var(--dim);">"ay" in "say," tense and closed, no diphthong</td><td style="font-family:\'Noto Sans Mono\',monospace; font-size:0.78rem; color:var(--muted);">‑er ‑ez ‑é ‑ai (futur je)</td></tr>'
    + '<tr><td class="sound-col"><span class="v">ɛ</span></td><td style="font-size:0.8rem; color:var(--ph-vowel);">' + d.s2_type_oral + '</td><td style="font-size:0.83rem; color:var(--dim);">"e" in "bet," open, mouth wider than [e]</td><td style="font-family:\'Noto Sans Mono\',monospace; font-size:0.78rem; color:var(--muted);">‑ait ‑ais ‑aient ‑è ‑ê</td></tr>'
    + '<tr><td class="sound-col"><span class="v">a</span></td><td style="font-size:0.8rem; color:var(--ph-vowel);">' + d.s2_type_oral + '</td><td style="font-size:0.83rem; color:var(--dim);">open front "ah"</td><td style="font-family:\'Noto Sans Mono\',monospace; font-size:0.78rem; color:var(--muted);">‑a ‑as (futur/passé simple)</td></tr>'
    + '<tr><td class="sound-col"><span class="nv">ɔ̃</span></td><td style="font-size:0.8rem; color:var(--ph-nasal);">' + d.s2_type_nasal + '</td><td style="font-size:0.83rem; color:var(--dim);">nasalized "o," air through the nose, no English equivalent</td><td style="font-family:\'Noto Sans Mono\',monospace; font-size:0.78rem; color:var(--muted);">‑ons ‑ont</td></tr>'
    + '<tr><td class="sound-col"><span class="r">ʁ</span></td><td style="font-size:0.8rem; color:var(--ph-rhotic);">' + d.s2_type_rhotic + '</td><td style="font-size:0.83rem; color:var(--dim);">voiced uvular fricative, back of the throat, never rolled</td><td style="font-family:\'Noto Sans Mono\',monospace; font-size:0.78rem; color:var(--muted);">r, rr (futur/conditionnel stem marker)</td></tr>'
    + '<tr><td class="sound-col"><span class="g">j</span></td><td style="font-size:0.8rem; color:var(--ph-glide);">' + d.s2_type_glide + '</td><td style="font-size:0.83rem; color:var(--dim);">"y" in "yes," brief, glides into the next vowel</td><td style="font-family:\'Noto Sans Mono\',monospace; font-size:0.78rem; color:var(--muted);">‑ions ‑iez (imparfait/subj. nous/vous)</td></tr>'
    + '</tbody></table>'
    + '<div class="callout neutral" style="margin-top:1.1rem;">' + d.s2_callout + '</div>'
    + '</section>'

    + '<section><div class="sh"><div class="sh-marker">§ 3</div><h2>' + d.s3_h + '</h2></div>'
    + '<p class="prose">' + d.s3_p1 + '</p>'
    + '<div class="phon-block"><div class="phon-label">Présent · parler</div>'
    + '<table class="phon-table"><thead><tr><th>pronoun</th><th>IPA</th><th>spelling</th></tr></thead><tbody>'
    + '<tr><td class="pron">je / tu / il / ils</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span></td><td class="spell">je <span class="end-mark">parle</span> · tu <span class="end-mark">parles</span> · il <span class="end-mark">parle</span> · ils <span class="end-mark">parlent</span><button class="say" data-say="je parle" title="hear it">▶</button></td></tr>'
    + '<tr class="stable"><td class="pron">nous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-mark"><span class="nv">ɔ̃</span></span></td><td class="spell">nous <span class="end-mark">parlons</span><button class="say" data-say="nous parlons" title="hear it">▶</button></td></tr>'
    + '<tr class="stable"><td class="pron">vous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-mark"><span class="v">e</span></span></td><td class="spell">vous <span class="end-mark">parlez</span><button class="say" data-say="vous parlez" title="hear it">▶</button></td></tr>'
    + '</tbody></table></div>'
    + '<div class="callout neutral">' + d.s3_callout + '</div>'
    + '</section>'

    + '<section><div class="sh"><div class="sh-marker">§ 4</div><h2>' + d.s4_h + '</h2></div>'
    + '<p class="prose">' + d.s4_p1 + '</p>'
    + '<div class="phon-block"><div class="phon-label">Imparfait · parler</div>'
    + '<table class="phon-table"><thead><tr><th>pronoun</th><th>IPA</th><th>spelling</th></tr></thead><tbody>'
    + '<tr><td class="pron">je / tu / il / ils</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-mark"><span class="v">ɛ</span></span></td><td class="spell">je <span class="end-mark">parlais</span> · il <span class="end-mark">parlait</span> · ils <span class="end-mark">parlaient</span><button class="say" data-say="je parlais" title="hear it">▶</button></td></tr>'
    + '<tr class="stable"><td class="pron">nous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-mark"><span class="g">j</span><span class="nv">ɔ̃</span></span></td><td class="spell">nous <span class="end-mark">parlions</span><button class="say" data-say="nous parlions" title="hear it">▶</button></td></tr>'
    + '<tr class="stable"><td class="pron">vous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-mark"><span class="g">j</span><span class="v">e</span></span></td><td class="spell">vous <span class="end-mark">parliez</span><button class="say" data-say="vous parliez" title="hear it">▶</button></td></tr>'
    + '</tbody></table></div>'
    + '<div class="callout neutral">' + d.s4_callout + '</div>'
    + '</section>'

    + '<section><div class="sh"><div class="sh-marker">§ 5</div><h2>' + d.s5_h + '</h2></div>'
    + '<p class="prose">' + d.s5_p1 + '</p>'
    + '<div class="phon-block"><div class="phon-label">Futur simple · parler</div>'
    + '<table class="phon-table"><thead><tr><th>pronoun</th><th>IPA</th><th>spelling</th></tr></thead><tbody>'
    + '<tr><td class="pron">je</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="v">ɛ</span><span class="r">ʁ</span><span class="end-mark"><span class="v">e</span></span></td><td class="spell">je <span class="end-mark">parlerai</span><button class="say" data-say="je parlerai" title="hear it">▶</button></td></tr>'
    + '<tr><td class="pron">tu / il</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="v">ɛ</span><span class="r">ʁ</span><span class="end-mark"><span class="v">a</span></span></td><td class="spell">tu <span class="end-mark">parleras</span> · il <span class="end-mark">parlera</span><button class="say" data-say="il parlera" title="hear it">▶</button></td></tr>'
    + '<tr class="stable"><td class="pron">nous / ils</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="v">ɛ</span><span class="r">ʁ</span><span class="end-mark"><span class="nv">ɔ̃</span></span></td><td class="spell">nous <span class="end-mark">parlerons</span> · ils <span class="end-mark">parleront</span><button class="say" data-say="nous parlerons" title="hear it">▶</button></td></tr>'
    + '<tr class="stable"><td class="pron">vous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="v">ɛ</span><span class="r">ʁ</span><span class="end-mark"><span class="v">e</span></span></td><td class="spell">vous <span class="end-mark">parlerez</span><button class="say" data-say="vous parlerez" title="hear it">▶</button></td></tr>'
    + '</tbody></table></div>'
    + '<div class="callout neutral">' + d.s5_callout + '</div>'
    + '</section>'

    + '<section><div class="sh"><div class="sh-marker">§ 6</div><h2>' + d.s6_h + '</h2></div>'
    + '<p class="prose">' + d.s6_p1 + '</p>'
    + '<div class="phon-block"><div class="phon-label">Conditionnel · parler</div>'
    + '<table class="phon-table"><thead><tr><th>pronoun</th><th>IPA</th><th>spelling</th></tr></thead><tbody>'
    + '<tr><td class="pron">je / tu / il / ils</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="v">ɛ</span><span class="r">ʁ</span><span class="end-mark"><span class="v">ɛ</span></span></td><td class="spell">je <span class="end-mark">parlerais</span> · il <span class="end-mark">parlerait</span> · ils <span class="end-mark">parleraient</span><button class="say" data-say="je parlerais" title="hear it">▶</button></td></tr>'
    + '<tr class="stable"><td class="pron">nous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="v">ɛ</span><span class="r">ʁ</span><span class="end-mark"><span class="g">j</span><span class="nv">ɔ̃</span></span></td><td class="spell">nous <span class="end-mark">parlerions</span><button class="say" data-say="nous parlerions" title="hear it">▶</button></td></tr>'
    + '<tr class="stable"><td class="pron">vous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="v">ɛ</span><span class="r">ʁ</span><span class="end-mark"><span class="g">j</span><span class="v">e</span></span></td><td class="spell">vous <span class="end-mark">parleriez</span><button class="say" data-say="vous parleriez" title="hear it">▶</button></td></tr>'
    + '</tbody></table></div>'
    + '<div class="callout neutral">' + d.s6_callout + '</div>'
    + '</section>'

    + '<section><div class="sh"><div class="sh-marker">§ 7</div><h2>' + d.s7_h + '</h2></div>'
    + '<p class="prose">' + d.s7_p1 + '</p>'
    + '<div class="phon-block"><div class="phon-label">Subjonctif présent · parler</div>'
    + '<table class="phon-table"><thead><tr><th>pronoun</th><th>IPA</th><th>spelling</th><th>sounds like</th></tr></thead><tbody>'
    + '<tr><td class="pron">je / tu / il / ils</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span></td><td class="spell">que je <span class="end-mark">parle</span> · qu’ils <span class="end-mark">parlent</span><button class="say" data-say="que je parle" title="hear it">▶</button></td><td class="meaning">' + d.s7_meaning_present + '</td></tr>'
    + '<tr class="stable"><td class="pron">nous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-mark"><span class="g">j</span><span class="nv">ɔ̃</span></span></td><td class="spell">que nous <span class="end-mark">parlions</span><button class="say" data-say="que nous parlions" title="hear it">▶</button></td><td class="meaning">' + d.s7_meaning_imperf_nous + '</td></tr>'
    + '<tr class="stable"><td class="pron">vous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-mark"><span class="g">j</span><span class="v">e</span></span></td><td class="spell">que vous <span class="end-mark">parliez</span><button class="say" data-say="que vous parliez" title="hear it">▶</button></td><td class="meaning">' + d.s7_meaning_imperf_vous + '</td></tr>'
    + '</tbody></table></div>'
    + '<div class="callout neutral">' + d.s7_callout + '</div>'
    + '</section>'

    + '<section><div class="sh"><div class="sh-marker">§ 8</div><h2>' + d.s8_h + '</h2></div>'
    + '<p class="prose">' + d.s8_p1 + '</p>'
    + '<div class="phon-block"><div class="phon-label">Passé simple · parler (-er verb)</div>'
    + '<table class="phon-table"><thead><tr><th>pronoun</th><th>IPA</th><th>spelling</th></tr></thead><tbody>'
    + '<tr><td class="pron">je</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-mark"><span class="v">e</span></span></td><td class="spell">je <span class="end-mark">parlai</span><button class="say" data-say="je parlai" title="hear it">▶</button></td></tr>'
    + '<tr><td class="pron">tu / il</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-mark"><span class="v">a</span></span></td><td class="spell">tu <span class="end-mark">parlas</span> · il <span class="end-mark">parla</span><button class="say" data-say="il parla" title="hear it">▶</button></td></tr>'
    + '<tr><td class="pron">nous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-mark"><span class="v">a</span><span class="c">m</span></span></td><td class="spell">nous <span class="end-mark">parlâmes</span><button class="say" data-say="nous parlâmes" title="hear it">▶</button></td></tr>'
    + '<tr><td class="pron">vous</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-mark"><span class="v">a</span><span class="c">t</span></span></td><td class="spell">vous <span class="end-mark">parlâtes</span><button class="say" data-say="vous parlâtes" title="hear it">▶</button></td></tr>'
    + '<tr><td class="pron">ils</td><td class="sound"><span class="c">p</span><span class="v">a</span><span class="r">ʁ</span><span class="c">l</span><span class="end-mark"><span class="v">ɛ</span><span class="r">ʁ</span></span></td><td class="spell">ils <span class="end-mark">parlèrent</span><button class="say" data-say="ils parlèrent" title="hear it">▶</button></td></tr>'
    + '</tbody></table></div>'
    + '<div class="callout neutral">' + d.s8_callout + '</div>'
    + '</section>'

    + '<section><div class="sh"><div class="sh-marker">§ 9</div><h2>' + d.s9_h + '</h2></div>'
    + '<p class="prose">' + d.s9_p1 + '</p>'
    + '<table class="irr-table"><thead><tr><th>' + d.s9_th_verb + '</th><th>' + d.s9_th_je + '</th><th>' + d.s9_th_nous + '</th><th>' + d.s9_th_ils + '</th><th>' + d.s9_th_spelling + '</th><th>' + d.s9_th_changes + '</th></tr></thead><tbody>'
    + [
      ['être', 'je suis, nous sommes, ils sont', '<span class="c">s</span><span class="v">ɥ</span><span class="c">i</span>', '<span class="c">s</span><span class="nv">ɔ̃</span><span class="c">m</span>', '<span class="c">s</span><span class="nv">ɔ̃</span>', 'suis / sommes / sont', 'three distinct stems'],
      ['avoir', 'je ai, nous avons, ils ont', '<span class="v">ɛ</span>', '<span class="v">a</span><span class="c">v</span><span class="nv">ɔ̃</span>', '<span class="nv">ɔ̃</span>', 'ai / avons / ont', 'stem suppressed in je/ils'],
      ['aller', 'je vais, nous allons, ils vont', '<span class="c">v</span><span class="v">ɛ</span>', '<span class="v">a</span><span class="c">l</span><span class="nv">ɔ̃</span>', '<span class="c">v</span><span class="nv">ɔ̃</span>', 'vais / allons / vont', 'three different stems (vais/va, all-, von-)'],
      ['faire', 'je fais, nous faisons, ils font', '<span class="c">f</span><span class="v">ɛ</span>', '<span class="c">f</span><span class="z">z</span><span class="nv">ɔ̃</span>', '<span class="c">f</span><span class="nv">ɔ̃</span>', 'fais / faisons / font', 'stem vowel ɛ (sing) → ə (nous)'],
      ['pouvoir', 'je peux, nous pouvons, ils peuvent', '<span class="c">p</span><span class="v">ø</span>', '<span class="c">p</span><span class="v">u</span><span class="c">v</span><span class="nv">ɔ̃</span>', '<span class="c">p</span><span class="v">ø</span><span class="c">v</span>', 'peux / pouvons / peuvent', 'ø in sing/ils; u in nous/vous'],
      ['vouloir', 'je veux, nous voulons, ils veulent', '<span class="c">v</span><span class="v">ø</span>', '<span class="c">v</span><span class="v">u</span><span class="c">l</span><span class="nv">ɔ̃</span>', '<span class="c">v</span><span class="v">ø</span><span class="c">l</span>', 'veux / voulons / veulent', 'ø in sing/ils; u in nous/vous, same boot pattern as pouvoir'],
      ['savoir', 'je sais, nous savons, ils savent', '<span class="c">s</span><span class="v">ɛ</span>', '<span class="c">s</span><span class="v">a</span><span class="c">v</span><span class="nv">ɔ̃</span>', '<span class="c">s</span><span class="v">a</span><span class="c">v</span>', 'sais / savons / savent', 'sing ɛ → nous/vous/ils a'],
      ['venir', 'je viens, nous venons, ils viennent', '<span class="c">v</span><span class="nv">jɛ̃</span>', '<span class="c">v</span><span class="v">ə</span><span class="c">n</span><span class="nv">ɔ̃</span>', '<span class="c">v</span><span class="nv">jɛ̃</span><span class="c">n</span>', 'viens / venons / viennent', 'nasal jɛ̃ in sing/ils; schwa stem in nous/vous'],
      ['tenir', 'je tiens, nous tenons, ils tiennent', '<span class="c">t</span><span class="nv">jɛ̃</span>', '<span class="c">t</span><span class="v">ə</span><span class="c">n</span><span class="nv">ɔ̃</span>', '<span class="c">t</span><span class="nv">jɛ̃</span><span class="c">n</span>', 'tiens / tenons / tiennent', 'same boot pattern as venir'],
      ['prendre', 'je prends, nous prenons, ils prennent', '<span class="c">p</span><span class="r">ʁ</span><span class="nv">ɑ̃</span>', '<span class="c">p</span><span class="r">ʁ</span><span class="v">ə</span><span class="c">n</span><span class="nv">ɔ̃</span>', '<span class="c">p</span><span class="r">ʁ</span><span class="nv">ɑ̃</span><span class="c">n</span>', 'prends / prenons / prennent', 'nasal ɑ̃ in sing/ils; ə+n in nous/vous'],
      ['boire', 'je bois, nous buvons, ils boivent', '<span class="c">b</span><span class="v">wa</span>', '<span class="c">b</span><span class="v">u</span><span class="c">v</span><span class="nv">ɔ̃</span>', '<span class="c">b</span><span class="v">wa</span><span class="c">v</span>', 'bois / buvons / boivent', 'wa in sing/ils; u in nous/vous'],
      ['croire', 'je crois, nous croyons, ils croient', '<span class="c">k</span><span class="r">ʁ</span><span class="v">wa</span>', '<span class="c">k</span><span class="r">ʁ</span><span class="v">a</span><span class="c">j</span><span class="nv">ɔ̃</span>', '<span class="c">k</span><span class="r">ʁ</span><span class="v">wa</span><span class="c">j</span>', 'crois / croyons / croient', 'wa in sing/ils; a in nous/vous'],
      ['devoir', 'je dois, nous devons, ils doivent', '<span class="c">d</span><span class="v">wa</span>', '<span class="c">d</span><span class="v">ə</span><span class="c">v</span><span class="nv">ɔ̃</span>', '<span class="c">d</span><span class="v">wa</span><span class="c">v</span>', 'dois / devons / doivent', 'wa in sing/ils; ə in nous/vous'],
      ['voir', 'je vois, nous voyons, ils voient', '<span class="c">v</span><span class="v">wa</span>', '<span class="c">v</span><span class="v">wa</span><span class="c">j</span><span class="nv">ɔ̃</span>', '<span class="c">v</span><span class="v">wa</span><span class="c">j</span>', 'vois / voyons / voient', 'stem stable; glide j added in nous/vous/ils']
    ].map(function (r) {
      return '<tr><td class="verb-col">' + r[0] + '<button class="say" data-say="' + r[1] + '" title="hear it">▶</button></td>'
        + '<td class="ipa-irr">' + r[2] + '</td><td class="ipa-irr">' + r[3] + '</td><td class="ipa-irr">' + r[4] + '</td>'
        + '<td class="spell">' + r[5] + '</td><td class="note-col">' + r[6] + '</td></tr>';
    }).join('')
    + '</tbody></table>'
    + '<div class="callout neutral" style="margin-top:1.1rem;">' + d.s9_callout + '</div>'
    + '</section>'

    + '<section><div class="sh"><div class="sh-marker">§ 10</div><h2>' + d.s10_h + '</h2></div>'
    + '<p class="prose">' + d.s10_p1 + '</p>'
    + '<div class="flow">'
    +   '<div class="flow-box flow-start">' + d.s10_bare + '</div>'
    +   '<div class="flow-arrow">▼</div>'
    +   '<div class="flow-box">' + d.s10_hear_r + '</div>'
    +   '<div class="flow-arrow">▼</div>'
    +   '<div class="flow-branch-row">'

    // no ʁ → présent / imparfait
    +     '<div class="flow-branch">'
    +       '<div class="flow-branch-label">' + d.s10_no_r + '</div>'
    +       '<div class="flow-box">' + d.s10_hear_e + '</div>'
    +       '<div class="flow-arrow">▼</div>'
    +       '<div class="flow-branch-row">'
    +         '<div class="flow-branch">'
    +           '<div class="flow-branch-label">' + d.s10_no_e + '</div>'
    +           '<div class="flow-result"><strong>' + d.s10_present + '</strong><br>' + d.s10_present_note + '</div>'
    +         '</div>'
    +         '<div class="flow-branch">'
    +           '<div class="flow-branch-label">' + d.s10_yes_e + '</div>'
    +           '<div class="flow-result"><strong>' + d.s10_imperfait + '</strong><br>' + d.s10_imperfait_note + '</div>'
    +         '</div>'
    +       '</div>'
    +     '</div>'

    // ʁ present → futur / conditionnel
    +     '<div class="flow-branch">'
    +       '<div class="flow-branch-label">' + d.s10_yes_r + '</div>'
    +       '<div class="flow-box">' + d.s10_ending_closed + '</div>'
    +       '<div class="flow-arrow">▼</div>'
    +       '<div class="flow-branch-row">'
    +         '<div class="flow-branch">'
    +           '<div class="flow-branch-label">' + d.s10_yes_closed + '</div>'
    +           '<div class="flow-result"><strong>' + d.s10_futur + '</strong><br>' + d.s10_futur_note + '</div>'
    +         '</div>'
    +         '<div class="flow-branch">'
    +           '<div class="flow-branch-label">' + d.s10_no_closed + '</div>'
    +           '<div class="flow-result"><strong>' + d.s10_cond + '</strong><br>' + d.s10_cond_note + '</div>'
    +         '</div>'
    +       '</div>'
    +     '</div>'

    +   '</div>'
    + '</div>'
    + '</section>';
  }

  function mount(root) {
    root.innerHTML = render(i18n.getLang());
    APP.speech.wireSpeakers(root);
    mounted = true;
  }

  function renderAll() { /* pronunciation tool has no persisted quiz state to re-derive */ }
  function clearAll() { /* nothing to clear, reference content only, no choices made */ }

  return { mount: mount, renderAll: renderAll, clearAll: clearAll };
})();
