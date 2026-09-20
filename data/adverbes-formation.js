window.APP = window.APP || {};
APP.data = APP.data || {};

(function () {
  var H = APP.dataHelpers;
  var T = H.table, C = H.combine;
  var Sens = { en: 'Meaning', fr: 'Sens' };
  var Adverbe = { en: 'Adverb', fr: 'Adverbe' };
  var Adjectif = { en: 'Adjective', fr: 'Adjectif' };
  var Exemple = { en: 'Example', fr: 'Exemple' };
  var MascFr = { en: 'Masc.', fr: 'Masc.' };
  var FemFr = { en: 'Fem.', fr: 'Fém.' };

  APP.data.adverbesFormation = {
    start: 'q_independent',
    nodes: {
      q_independent: {
        type: 'question',
        text: { en: 'Is the adverb an independent word (not derived from an adjective)?', fr: 'L’adverbe est-il un mot indépendant (non dérivé d’un adjectif) ?' },
        note: { en: 'e.g. très, assez, trop, déjà, souvent, toujours, jamais, hier, bien, mal, vite…', fr: 'très, assez, trop, déjà, souvent, toujours, jamais, hier, bien, mal, vite…' },
        options: [
          {
            id: 'oui', tone: 'green',
            label: { en: 'Yes → use it as is', fr: 'Oui → utiliser tel quel' },
            next: 'end',
            result: {
              title: { en: 'Common independent adverbs', fr: 'Adverbes indépendants courants' },
              tone: 'green',
              html: T([Adverbe, Sens], [
                ['très', 'very'], ['assez', 'quite / enough'], ['trop', 'too much'], ['plus', 'more'],
                ['moins', 'less'], ['aussi', 'also / as'], ['déjà', 'already'], ['encore', 'still / again'],
                ['jamais', 'never'], ['souvent', 'often'], ['toujours', 'always'], ['parfois', 'sometimes'],
                ['bientôt', 'soon'], ['hier', 'yesterday'], ['aujourd’hui', 'today'], ['demain', 'tomorrow'],
                ['ici', 'here'], ['là', 'there'], ['partout', 'everywhere'],
                ['bien', 'well (irregular, from bon)'], ['mal', 'badly (irregular, from mauvais)'],
                ['mieux', 'better (irregular, from meilleur)'], ['vite', 'fast (irregular, from rapide)'],
                ['peu', 'little (irregular, from petit)']
              ].map(function (r) { return ['<code>' + r[0] + '</code>', r[1]]; }), { glossCols: [1] }),
              note: { en: 'bien, mal, mieux, vite, peu are irregular. Their base adjective follows no formation rule.', fr: 'bien, mal, mieux, vite, peu sont irréguliers. Leur adjectif de base ne suit aucune règle de formation.' }
            }
          },
          {
            id: 'non', tone: 'blue',
            label: { en: 'No → derive it from the adjective', fr: 'Non → dériver de l’adjectif' },
            next: 'q_ant_ent'
          }
        ]
      },

      q_ant_ent: {
        type: 'question',
        text: { en: 'Does the masculine adjective end in -ant or -ent?', fr: 'L’adjectif (masc.) se termine-t-il en -ant ou -ent ?' },
        options: [
          {
            id: 'oui', tone: 'blue',
            label: { en: 'Yes', fr: 'Oui' },
            next: 'end',
            result: {
              title: { en: 'Replace the ending', fr: 'Remplacer la terminaison' },
              tone: 'blue',
              html: C(
                T([{ en: 'Ending', fr: 'Terminaison' }, { en: 'Replace with', fr: 'Remplacer par' }, Exemple], [
                  ['<code>-ant</code>', '<code>-amment</code>', 'courant → couramment'],
                  ['<code>-ent</code>', '<code>-emment</code>', 'évident → évidemment']
                ]),
                T([Adjectif, Adverbe], [
                  ['constant', '<code>constamment</code>'], ['fréquent', '<code>fréquemment</code>'],
                  ['prudent', '<code>prudemment</code>'], ['patient', '<code>patiemment</code>'],
                  ['récent', '<code>récemment</code>'], ['brillant', '<code>brillamment</code>'],
                  ['élégant', '<code>élégamment</code>']
                ], { style: 'margin-top:8px' })
              ),
              note: { en: '-amment and -emment are pronounced the same way: [amɑ̃].', fr: '-amment et -emment se prononcent de la même façon : [amɑ̃].' }
            }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_vowel' }
        ]
      },

      q_vowel: {
        type: 'question',
        text: { en: 'Does the masculine adjective end in a vowel?', fr: 'L’adjectif (masc.) se termine-t-il par une voyelle ?' },
        note: { en: '-é, -i, -u, -ai, -el…', fr: '-é, -i, -u, -ai, -el…' },
        options: [
          {
            id: 'oui', tone: 'orange',
            label: { en: 'Yes', fr: 'Oui' },
            next: 'end',
            result: {
              title: { en: 'Add -ment directly to the masculine form', fr: 'Ajouter -ment directement au masculin' },
              tone: 'orange',
              html: T([Adjectif, Adverbe], [
                ['vrai', '<code>vraiment</code>'], ['poli', '<code>poliment</code>'], ['absolu', '<code>absolument</code>'],
                ['aisé', '<code>aisément</code>'], ['forcé', '<code>forcément</code>']
              ]),
              note: { en: 'Exception: gai → gaiement (not gaiment).', fr: 'Exception : gai → gaiement (pas gaiment).' }
            }
          },
          {
            id: 'non', tone: 'purple',
            label: { en: 'No → ends in a consonant', fr: 'Non → consonne finale' },
            next: 'q_fem_irregular',
            result: {
              muted: true, tone: 'purple',
              html: { en: 'First form the feminine of the adjective, then add -ment.', fr: 'Formez d’abord le féminin de l’adjectif, puis ajoutez -ment.' }
            }
          }
        ]
      },

      // ── the adjective's feminine has to be formed first — same rules as
      // the Adjectives → Formation tool, applied here and landing on -ment ──
      q_fem_irregular: {
        type: 'question',
        text: { en: 'Is it one of the common irregular feminines?', fr: 'Est-ce l’un des féminins irréguliers courants ?' },
        note: { en: 'doux, faux, gentil…', fr: 'doux, faux, gentil…' },
        options: [
          {
            id: 'oui', tone: 'purple', label: { en: 'Yes', fr: 'Oui' }, next: 'end',
            result: {
              title: { en: 'Irregular feminine, then -ment', fr: 'Féminin irrégulier, puis -ment' }, tone: 'purple',
              html: T([MascFr, FemFr, Adverbe], [
                ['doux', 'douce', '<code>doucement</code>'], ['faux', 'fausse', '<code>faussement</code>'],
                ['gentil', 'gentille', '<code>gentiment</code>']
              ]),
              note: { en: 'gentiment is doubly irregular: it drops one l instead of keeping gentille whole.', fr: 'gentiment est doublement irrégulier : il perd un l au lieu de garder gentille tel quel.' }
            }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_fem_f' }
        ]
      },

      q_fem_f: {
        type: 'question',
        text: { en: 'Does the masculine end in -f?', fr: 'Le masculin se termine-t-il par -f ?' },
        options: [
          {
            id: 'oui', tone: 'orange', label: { en: 'Yes → -f becomes -ve, then -ment', fr: 'Oui → -f devient -ve, puis -ment' }, next: 'end',
            result: { title: { en: '-f → -ve → -vement', fr: '-f → -ve → -vement' }, tone: 'orange', html: T([MascFr, FemFr, Adverbe], [['actif', 'active', '<code>activement</code>'], ['naïf', 'naïve', '<code>naïvement</code>']]) }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_fem_x' }
        ]
      },

      q_fem_x: {
        type: 'question',
        text: { en: 'Does the masculine end in -x?', fr: 'Le masculin se termine-t-il par -x ?' },
        options: [
          {
            id: 'oui', tone: 'orange', label: { en: 'Yes → -x becomes -se, then -ment', fr: 'Oui → -x devient -se, puis -ment' }, next: 'end',
            result: { title: { en: '-x → -se → -sement', fr: '-x → -se → -sement' }, tone: 'orange', html: T([MascFr, FemFr, Adverbe], [['heureux', 'heureuse', '<code>heureusement</code>'], ['sérieux', 'sérieuse', '<code>sérieusement</code>']]) }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_fem_er' }
        ]
      },

      q_fem_er: {
        type: 'question',
        text: { en: 'Does the masculine end in -er?', fr: 'Le masculin se termine-t-il par -er ?' },
        options: [
          {
            id: 'oui', tone: 'orange', label: { en: 'Yes → -er becomes -ère, then -ment', fr: 'Oui → -er devient -ère, puis -ment' }, next: 'end',
            result: { title: { en: '-er → -ère → -èrement', fr: '-er → -ère → -èrement' }, tone: 'orange', html: T([MascFr, FemFr, Adverbe], [['premier', 'première', '<code>premièrement</code>'], ['léger', 'légère', '<code>légèrement</code>'], ['entier', 'entière', '<code>entièrement</code>']]) }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_fem_c' }
        ]
      },

      q_fem_c: {
        type: 'question',
        text: { en: 'Does the masculine end in -c?', fr: 'Le masculin se termine-t-il par -c ?' },
        options: [
          {
            id: 'oui', tone: 'purple', label: { en: 'Yes', fr: 'Oui' }, next: 'end',
            result: { title: { en: '-c → -che or -que, then -ment', fr: '-c → -che ou -que, puis -ment' }, tone: 'purple', html: T([MascFr, FemFr, Adverbe], [['franc', 'franche', '<code>franchement</code>'], ['public', 'publique', '<code>publiquement</code>']]) }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_fem_double' }
        ]
      },

      q_fem_double: {
        type: 'question',
        text: { en: 'Does the masculine end in -on, -en, -et, -eil, -el, -ul, -as, or -os?', fr: 'Le masculin se termine-t-il par -on, -en, -et, -eil, -el, -ul, -as ou -os ?' },
        note: { en: 'these double the final consonant before adding -e', fr: 'ceux-ci doublent la consonne finale avant d’ajouter -e' },
        options: [
          {
            id: 'oui', tone: 'purple', label: { en: 'Yes → double the consonant, then -ment', fr: 'Oui → doubler la consonne, puis -ment' }, next: 'end',
            result: {
              title: { en: 'Double the consonant + e, then -ment', fr: 'Doubler la consonne + e, puis -ment' }, tone: 'purple',
              html: T([MascFr, FemFr, Adverbe], [
                ['naturel', 'naturelle', '<code>naturellement</code>'], ['annuel', 'annuelle', '<code>annuellement</code>'], ['cruel', 'cruelle', '<code>cruellement</code>']
              ])
            }
          },
          {
            id: 'non', tone: 'green', label: { en: 'No → the default rule', fr: 'Non → la règle par défaut' }, next: 'end',
            result: {
              title: { en: 'Just add -e, then -ment', fr: 'Ajouter simplement -e, puis -ment' }, tone: 'green',
              html: T([MascFr, FemFr, Adverbe], [
                ['lent', 'lente', '<code>lentement</code>'], ['seul', 'seule', '<code>seulement</code>'], ['grand', 'grande', '<code>grandement</code>']
              ]),
              note: {
                en: 'Some adjectives ending in a silent -e take an accent to mark the syllable: énorme → énormément, profond → profondément, aveugle → aveuglément.',
                fr: 'Certains adjectifs en -e muet prennent un accent pour marquer la syllabe : énorme → énormément, profond → profondément, aveugle → aveuglément.'
              }
            }
          }
        ]
      },

      end: { type: 'end', title: { en: 'Adverb formed', fr: 'Adverbe formé' } }
    }
  };

  var ruleRows = [
    [{ en: 'Ends in -ant', fr: 'Se termine en -ant' }, { en: 'Replace with -amment', fr: 'Remplacer par -amment' }, 'courant → couramment, brillant → brillamment'],
    [{ en: 'Ends in -ent', fr: 'Se termine en -ent' }, { en: 'Replace with -emment', fr: 'Remplacer par -emment' }, 'évident → évidemment, récent → récemment'],
    [{ en: 'Ends in a vowel', fr: 'Se termine par une voyelle' }, { en: 'Add -ment to the masculine form', fr: 'Ajouter -ment au masculin' }, 'vrai → vraiment, absolu → absolument'],
    [{ en: 'Ends in a consonant', fr: 'Se termine par une consonne' }, { en: 'Feminize, then add -ment', fr: 'Féminiser, puis ajouter -ment' }, 'lent → lente → lentement, actif → active → activement']
  ];

  APP.data.adverbesFormationReference = {
    title: { en: 'Formation rules: summary', fr: 'Récapitulatif : règles de formation' },
    table: T(
      [{ en: 'Ending of the masc. adjective', fr: 'Terminaison de l’adjectif masc.' }, { en: 'Rule', fr: 'Règle' }, Exemple],
      ruleRows.map(function (r) { return [{ en: H.tr(r[0], 'en'), fr: H.tr(r[0], 'fr') }, { en: H.tr(r[1], 'en'), fr: H.tr(r[1], 'fr') }, r[2]]; })
    ),
    irregulars: {
      title: { en: 'Irregular adverbs to memorize', fr: 'Adverbes irréguliers à mémoriser' },
      table: T([{ en: 'Base adjective', fr: 'Adjectif de base' }, { en: 'Irregular adverb', fr: 'Adverbe irrégulier' }, Sens], [
        ['bon', '<code>bien</code>', 'well'], ['mauvais', '<code>mal</code>', 'badly'], ['meilleur', '<code>mieux</code>', 'better'],
        ['petit', '<code>peu</code>', 'little / not much'], ['rapide', '<code>vite</code>', 'fast']
      ], { glossCols: [2] })
    }
  };
})();
