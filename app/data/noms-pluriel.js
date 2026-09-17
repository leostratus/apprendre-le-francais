window.APP = window.APP || {};
APP.data = APP.data || {};

(function () {
  var H = APP.dataHelpers;
  var T = H.table, say = H.say;
  var Sing = { en: 'Singular', fr: 'Singulier' };
  var Plur = { en: 'Plural', fr: 'Pluriel' };

  function w(word) { return say('<code>' + word + '</code>', word); }

  APP.data.nomsPluriel = {
    start: 'q_sx',
    nodes: {
      q_sx: {
        type: 'question',
        text: { en: 'Does the singular already end in -s, -x, or -z?', fr: 'Le singulier se termine-t-il déjà par -s, -x ou -z ?' },
        note: { en: 'e.g. un bras, une croix, un nez', fr: 'ex. un bras, une croix, un nez' },
        options: [
          {
            id: 'oui', tone: 'green', label: { en: 'Yes → no change', fr: 'Oui → aucun changement' }, next: 'end',
            result: { title: { en: 'Plural is identical to the singular', fr: 'Le pluriel est identique au singulier' }, tone: 'green', html: T([Sing, Plur], [[w('un bras'), w('des bras')], [w('une croix'), w('des croix')], [w('un nez'), w('des nez')]]) }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_eau' }
        ]
      },

      q_eau: {
        type: 'question',
        text: { en: 'Does it end in -au, -eau, or -eu?', fr: 'Se termine-t-il par -au, -eau ou -eu ?' },
        options: [
          {
            id: 'oui', tone: 'orange', label: { en: 'Yes → add -x', fr: 'Oui → ajouter -x' }, next: 'end',
            result: {
              title: { en: '-au / -eau / -eu → + x', fr: '-au / -eau / -eu → + x' }, tone: 'orange',
              html: T([Sing, Plur], [[w('un bateau'), w('des bateaux')], [w('un cheveu'), w('des cheveux')], [w('un noyau'), w('des noyaux')]]),
              note: { en: 'Exceptions stay regular (+s): un pneu → des pneus, un bleu → des bleus.', fr: 'Exceptions régulières (+s) : un pneu → des pneus, un bleu → des bleus.' }
            }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_al' }
        ]
      },

      q_al: {
        type: 'question',
        text: { en: 'Does it end in -al?', fr: 'Se termine-t-il par -al ?' },
        options: [
          {
            id: 'oui', tone: 'purple', label: { en: 'Yes → usually -al becomes -aux', fr: 'Oui → -al devient généralement -aux' }, next: 'end',
            result: {
              title: { en: '-al → -aux (most nouns)', fr: '-al → -aux (la plupart des noms)' }, tone: 'purple',
              html: T([Sing, Plur], [[w('un cheval'), w('des chevaux')], [w('un journal'), w('des journaux')], [w('un animal'), w('des animaux')]]),
              note: { en: 'A short list stays regular (+s): un bal → des bals, un carnaval → des carnavals, un festival → des festivals, un régal → des régals.', fr: 'Une courte liste reste régulière (+s) : un bal → des bals, un carnaval → des carnavals, un festival → des festivals, un régal → des régals.' }
            }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_ail' }
        ]
      },

      q_ail: {
        type: 'question',
        text: { en: 'Does it end in -ail?', fr: 'Se termine-t-il par -ail ?' },
        options: [
          {
            id: 'oui', tone: 'purple', label: { en: 'Yes', fr: 'Oui' }, next: 'end',
            result: {
              title: { en: 'Mostly regular (+s), with a few -ail → -aux', fr: 'Généralement régulier (+s), avec quelques -ail → -aux' }, tone: 'purple',
              html: T([Sing, Plur], [[w('un détail'), w('des détails')], [w('un rail'), w('des rails')], [w('un travail'), w('des travaux')], [w('un vitrail'), w('des vitraux')]]),
              note: { en: 'travail, corail, émail, vitrail, soupirail are the common irregular ones (-ail → -aux); most other -ail nouns just add -s.', fr: 'travail, corail, émail, vitrail, soupirail sont les irréguliers courants (-ail → -aux) ; la plupart des autres noms en -ail prennent simplement -s.' }
            }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_irregular' }
        ]
      },

      q_irregular: {
        type: 'question',
        text: { en: 'Is it one of the fully irregular nouns?', fr: 'Est-ce l’un des noms totalement irréguliers ?' },
        note: { en: 'œil, ciel, monsieur, madame, mademoiselle…', fr: 'œil, ciel, monsieur, madame, mademoiselle…' },
        options: [
          {
            id: 'oui', tone: 'gray', label: { en: 'Yes', fr: 'Oui' }, next: 'end',
            result: {
              title: { en: 'Irregular plurals — memorize these', fr: 'Pluriels irréguliers — à mémoriser' }, tone: 'gray',
              html: T([Sing, Plur], [
                [w('un œil'), w('des yeux')], [w('le ciel'), w('les cieux')], [w('monsieur'), w('messieurs')],
                [w('madame'), w('mesdames')], [w('mademoiselle'), w('mesdemoiselles')]
              ])
            }
          },
          {
            id: 'non', tone: 'green', label: { en: 'No → the default rule', fr: 'Non → la règle par défaut' }, next: 'end',
            result: {
              title: { en: 'Just add -s', fr: 'Ajouter simplement -s' }, tone: 'green',
              html: T([Sing, Plur], [[w('un livre'), w('des livres')], [w('une table'), w('des tables')], [w('un stylo'), w('des stylos')]])
            }
          }
        ]
      },

      end: { type: 'end', title: { en: 'Plural formed', fr: 'Pluriel formé' } }
    }
  };
})();
