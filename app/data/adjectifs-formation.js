window.APP = window.APP || {};
APP.data = APP.data || {};

(function () {
  var H = APP.dataHelpers;
  var T = H.table;
  var Masc = { en: 'Masc.', fr: 'Masc.' };
  var Fem = { en: 'Fem.', fr: 'Fém.' };
  var Sing = { en: 'Singular', fr: 'Singulier' };
  var Plur = { en: 'Plural', fr: 'Pluriel' };

  APP.data.adjectifsFormation = {
    start: 'q_root',
    nodes: {
      q_root: {
        type: 'question',
        text: { en: 'Which form do you need?', fr: 'Quelle forme cherchez-vous ?' },
        options: [
          { id: 'fem', tone: 'green', label: { en: 'The feminine', fr: 'Le féminin' }, next: 'q_ends_e' },
          { id: 'plur', tone: 'blue', label: { en: 'The plural', fr: 'Le pluriel' }, next: 'q_plur_sx' }
        ]
      },

      // ── feminine chain ──
      q_ends_e: {
        type: 'question',
        text: { en: 'Does the masculine form already end in an unaccented -e?', fr: 'Le masculin se termine-t-il déjà par un -e non accentué ?' },
        note: { en: 'e.g. jeune, rouge, facile, riche, calme', fr: 'ex. jeune, rouge, facile, riche, calme' },
        options: [
          {
            id: 'oui', tone: 'green', label: { en: 'Yes → no change', fr: 'Oui → aucun changement' }, next: 'end_formation',
            result: {
              title: { en: 'Feminine is identical to the masculine', fr: 'Le féminin est identique au masculin' },
              tone: 'green',
              html: T([Masc, Fem], [
                ['jeune', 'jeune'], ['rouge', 'rouge'], ['facile', 'facile'], ['riche', 'riche'],
                ['calme', 'calme'], ['pratique', 'pratique'], ['rapide', 'rapide'], ['sympathique', 'sympathique']
              ])
            }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_irregular' }
        ]
      },

      q_irregular: {
        type: 'question',
        text: { en: 'Is it one of the common irregular adjectives?', fr: 'Est-ce l’un des adjectifs irréguliers courants ?' },
        note: { en: 'beau, nouveau, vieux, fou, mou, doux, faux, roux, frais, long, favori, public, gentil…', fr: 'beau, nouveau, vieux, fou, mou, doux, faux, roux, frais, long, favori, public, gentil…' },
        options: [
          {
            id: 'oui', tone: 'purple', label: { en: 'Yes', fr: 'Oui' }, next: 'end_formation',
            result: {
              title: { en: 'Irregular feminine forms — memorize these', fr: 'Féminins irréguliers — à mémoriser' },
              tone: 'purple',
              html: T([Masc, Fem], [
                ['beau (bel)', 'belle'], ['nouveau (nouvel)', 'nouvelle'], ['vieux (vieil)', 'vieille'],
                ['fou (fol)', 'folle'], ['mou (mol)', 'molle'], ['doux', 'douce'], ['faux', 'fausse'],
                ['roux', 'rousse'], ['frais', 'fraîche'], ['long', 'longue'], ['favori', 'favorite'],
                ['public', 'publique'], ['gentil', 'gentille']
              ]),
              note: { en: 'beau, nouveau, vieux, fou, mou have a special second masculine form (bel, nouvel, vieil, fol, mol) used before a vowel sound: un bel homme, un vieil ami.', fr: 'beau, nouveau, vieux, fou, mou ont une seconde forme masculine (bel, nouvel, vieil, fol, mol) utilisée devant une voyelle : un bel homme, un vieil ami.' }
            }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_f' }
        ]
      },

      q_f: {
        type: 'question',
        text: { en: 'Does the masculine end in -f?', fr: 'Le masculin se termine-t-il par -f ?' },
        options: [
          {
            id: 'oui', tone: 'orange', label: { en: 'Yes → -f becomes -ve', fr: 'Oui → -f devient -ve' }, next: 'end_formation',
            result: { title: { en: '-f → -ve', fr: '-f → -ve' }, tone: 'orange', html: T([Masc, Fem], [['actif', 'active'], ['neuf', 'neuve'], ['sportif', 'sportive'], ['naïf', 'naïve'], ['attentif', 'attentive']]) }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_x' }
        ]
      },

      q_x: {
        type: 'question',
        text: { en: 'Does the masculine end in -x?', fr: 'Le masculin se termine-t-il par -x ?' },
        options: [
          {
            id: 'oui', tone: 'orange', label: { en: 'Yes → -x becomes -se', fr: 'Oui → -x devient -se' }, next: 'end_formation',
            result: { title: { en: '-x → -se', fr: '-x → -se' }, tone: 'orange', html: T([Masc, Fem], [['heureux', 'heureuse'], ['sérieux', 'sérieuse'], ['dangereux', 'dangereuse'], ['curieux', 'curieuse'], ['jaloux', 'jalouse']]) }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_er' }
        ]
      },

      q_er: {
        type: 'question',
        text: { en: 'Does the masculine end in -er?', fr: 'Le masculin se termine-t-il par -er ?' },
        options: [
          {
            id: 'oui', tone: 'orange', label: { en: 'Yes → -er becomes -ère', fr: 'Oui → -er devient -ère' }, next: 'end_formation',
            result: { title: { en: '-er → -ère', fr: '-er → -ère' }, tone: 'orange', html: T([Masc, Fem], [['premier', 'première'], ['dernier', 'dernière'], ['cher', 'chère'], ['léger', 'légère'], ['entier', 'entière']]) }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_c' }
        ]
      },

      q_c: {
        type: 'question',
        text: { en: 'Does the masculine end in -c?', fr: 'Le masculin se termine-t-il par -c ?' },
        options: [
          {
            id: 'oui', tone: 'purple', label: { en: 'Yes', fr: 'Oui' }, next: 'end_formation',
            result: {
              title: { en: '-c → -che or -que (lexical — memorize each one)', fr: '-c → -che ou -que (lexical — à mémoriser au cas par cas)' },
              tone: 'purple',
              html: T([Masc, Fem], [['blanc', 'blanche'], ['sec', 'sèche'], ['franc', 'franche'], ['public', 'publique'], ['turc', 'turque'], ['grec', 'grecque']])
            }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_double' }
        ]
      },

      q_double: {
        type: 'question',
        text: { en: 'Does the masculine end in -on, -en, -et, -eil, -el, -ul, -as, or -os?', fr: 'Le masculin se termine-t-il par -on, -en, -et, -eil, -el, -ul, -as ou -os ?' },
        note: { en: 'these double the final consonant before adding -e', fr: 'ceux-ci doublent la consonne finale avant d’ajouter -e' },
        options: [
          {
            id: 'oui', tone: 'purple', label: { en: 'Yes → double the consonant + e', fr: 'Oui → doubler la consonne + e' }, next: 'end_formation',
            result: {
              title: { en: 'Double the final consonant, then add -e', fr: 'Doubler la consonne finale, puis ajouter -e' },
              tone: 'purple',
              html: T([Masc, Fem], [
                ['bon', 'bonne'], ['ancien', 'ancienne'], ['cruel', 'cruelle'], ['pareil', 'pareille'],
                ['nul', 'nulle'], ['bas', 'basse'], ['gros', 'grosse'], ['muet', 'muette'], ['net', 'nette']
              ])
            }
          },
          {
            id: 'non', tone: 'green', label: { en: 'No → the default rule', fr: 'Non → la règle par défaut' }, next: 'end_formation',
            result: {
              title: { en: 'Just add -e', fr: 'Ajouter simplement -e' },
              tone: 'green',
              html: T([Masc, Fem], [
                ['grand', 'grande'], ['petit', 'petite'], ['vert', 'verte'], ['gris', 'grise'], ['joli', 'jolie'],
                ['content', 'contente'], ['intelligent', 'intelligente'], ['intéressant', 'intéressante'], ['français', 'française']
              ])
            }
          }
        ]
      },

      // ── plural chain ──
      q_plur_sx: {
        type: 'question',
        text: { en: 'Does the singular already end in -s or -x?', fr: 'Le singulier se termine-t-il déjà par -s ou -x ?' },
        note: { en: 'e.g. gris, français, heureux', fr: 'ex. gris, français, heureux' },
        options: [
          {
            id: 'oui', tone: 'green', label: { en: 'Yes → no change', fr: 'Oui → aucun changement' }, next: 'end_formation',
            result: { title: { en: 'Plural is identical to the singular', fr: 'Le pluriel est identique au singulier' }, tone: 'green', html: T([Sing, Plur], [['gris', 'gris'], ['français', 'français'], ['heureux', 'heureux'], ['dangereux', 'dangereux']]) }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_plur_eau' }
        ]
      },

      q_plur_eau: {
        type: 'question',
        text: { en: 'Does it end in -eau?', fr: 'Se termine-t-il par -eau ?' },
        options: [
          {
            id: 'oui', tone: 'orange', label: { en: 'Yes → add -x', fr: 'Oui → ajouter -x' }, next: 'end_formation',
            result: {
              title: { en: '-eau → -eaux', fr: '-eau → -eaux' }, tone: 'orange',
              html: T([Sing, Plur], [['beau', 'beaux'], ['nouveau', 'nouveaux'], ['jumeau', 'jumeaux']]),
              note: { en: 'Exception: bleu is regular — bleu → bleus (add -s, not -x).', fr: 'Exception : bleu est régulier — bleu → bleus (ajouter -s, pas -x).' }
            }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_plur_al' }
        ]
      },

      q_plur_al: {
        type: 'question',
        text: { en: 'Does it end in -al?', fr: 'Se termine-t-il par -al ?' },
        options: [
          {
            id: 'oui', tone: 'purple', label: { en: 'Yes → usually -al becomes -aux', fr: 'Oui → -al devient généralement -aux' }, next: 'end_formation',
            result: {
              title: { en: '-al → -aux (most adjectives)', fr: '-al → -aux (la plupart des adjectifs)' },
              tone: 'purple',
              html: T([Sing, Plur], [['national', 'nationaux'], ['normal', 'normaux'], ['général', 'généraux'], ['social', 'sociaux'], ['spécial', 'spéciaux']]),
              note: { en: 'A short list stays regular (+s): banal, fatal, final, natal, naval → banals, fatals, finals, natals, navals.', fr: 'Une courte liste reste régulière (+s) : banal, fatal, final, natal, naval → banals, fatals, finals, natals, navals.' }
            }
          },
          { id: 'non', tone: 'green', label: { en: 'No → the default rule', fr: 'Non → la règle par défaut' }, next: 'end_formation',
            result: {
              title: { en: 'Just add -s', fr: 'Ajouter simplement -s' },
              tone: 'green',
              html: T([Sing, Plur], [['grand', 'grands'], ['petite', 'petites'], ['jolie', 'jolies'], ['intelligent', 'intelligents'], ['facile', 'faciles']])
            }
          }
        ]
      },

      end_formation: { type: 'end', title: { en: 'Adjective form found', fr: 'Forme de l’adjectif trouvée' } }
    }
  };
})();
