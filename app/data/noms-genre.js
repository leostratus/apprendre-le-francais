window.APP = window.APP || {};
APP.data = APP.data || {};

(function () {
  var H = APP.dataHelpers;
  var T = H.table, say = H.say;
  var Ending = { en: 'Ending', fr: 'Terminaison' };
  var Word = { en: 'Word', fr: 'Mot' };
  var Meaning = { en: 'Meaning', fr: 'Sens' };

  function w(word) { return say('<code>' + word + '</code>', word); }

  APP.data.nomsGenre = {
    start: 'q_feminine',
    nodes: {
      q_feminine: {
        type: 'question',
        text: { en: 'Does the noun end in one of these strongly feminine suffixes?', fr: 'Le nom se termine-t-il par l’une de ces terminaisons fortement féminines ?' },
        note: { en: '-tion, -sion, -son, -té, -tié, -ure, -ude, -ance, -ence, -ette, -elle, -esse, -ie', fr: '-tion, -sion, -son, -té, -tié, -ure, -ude, -ance, -ence, -ette, -elle, -esse, -ie' },
        options: [
          {
            id: 'oui', tone: 'green',
            label: { en: 'Yes → feminine', fr: 'Oui → féminin' },
            next: 'end',
            result: {
              title: { en: 'Almost certainly feminine', fr: 'Presque certainement féminin' },
              tone: 'green',
              html: T([Ending, Word], [
                ['-tion', w('la nation')], ['-sion', w('la décision')], ['-té', w('la liberté')],
                ['-ure', w('la voiture')], ['-ance', w('la chance')], ['-ence', w('la patience')],
                ['-ette', w('la fourchette')], ['-elle', w('la vaisselle')], ['-esse', w('la richesse')], ['-ie', w('la vie')]
              ]),
              note: { en: 'A handful of exceptions exist: le silence, le lycée, le musée. Learn each noun with its article.', fr: 'Quelques exceptions existent : le silence, le lycée, le musée. Apprenez chaque nom avec son article.' }
            }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_masculine' }
        ]
      },

      q_masculine: {
        type: 'question',
        text: { en: 'Does the noun end in one of these strongly masculine suffixes?', fr: 'Le nom se termine-t-il par l’une de ces terminaisons fortement masculines ?' },
        note: { en: '-age, -ment, -eau, -isme, -oir, -al, -et, -ier, -in, -acle, -ège', fr: '-age, -ment, -eau, -isme, -oir, -al, -et, -ier, -in, -acle, -ège' },
        options: [
          {
            id: 'oui', tone: 'blue',
            label: { en: 'Yes → masculine', fr: 'Oui → masculin' },
            next: 'end',
            result: {
              title: { en: 'Almost certainly masculine', fr: 'Presque certainement masculin' },
              tone: 'blue',
              html: T([Ending, Word], [
                ['-age', w('le voyage')], ['-ment', w('le gouvernement')], ['-eau', w('le bureau')],
                ['-isme', w('le tourisme')], ['-oir', w('le miroir')], ['-al', w('le journal')],
                ['-et', w('le ticket')], ['-ier', w('le cahier')], ['-in', w('le jardin')], ['-ège', w('le collège')]
              ]),
              note: { en: '-age has several common exceptions: la plage, la cage, la page, l’image, la nage, la rage, la plage.', fr: '-age a plusieurs exceptions courantes : la plage, la cage, la page, l’image, la nage, la rage.' }
            }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_person' }
        ]
      },

      q_person: {
        type: 'question',
        text: { en: 'Does the noun refer to a person or animal with a natural gender (a profession, a family member)?', fr: 'Le nom désigne-t-il une personne ou un animal ayant un genre naturel (un métier, un membre de la famille) ?' },
        options: [
          {
            id: 'oui', tone: 'purple',
            label: { en: 'Yes', fr: 'Oui' },
            next: 'end',
            result: {
              title: { en: 'Grammatical gender follows natural gender', fr: 'Le genre grammatical suit le genre naturel' },
              tone: 'purple',
              html: T(
                [{ en: 'Pattern', fr: 'Modèle' }, { en: 'Masc.', fr: 'Masc.' }, { en: 'Fem.', fr: 'Fém.' }],
                [
                  [{ en: 'add -e', fr: 'ajouter -e' }, w('un ami'), w('une amie')],
                  [{ en: 'add -e', fr: 'ajouter -e' }, w('un étudiant'), w('une étudiante')],
                  [{ en: 'invariable', fr: 'invariable' }, w('un élève'), w('une élève')],
                  [{ en: 'invariable', fr: 'invariable' }, w('un enfant'), w('une enfant')],
                  [{ en: 'distinct word', fr: 'mot distinct' }, w('un homme'), w('une femme')],
                  [{ en: 'distinct word', fr: 'mot distinct' }, w('un frère'), w('une sœur')]
                ]
              )
            }
          },
          {
            id: 'non', tone: 'gray',
            label: { en: 'No → no strong pattern', fr: 'Non → aucun modèle fiable' },
            next: 'end',
            result: {
              muted: true, tone: 'gray',
              html: { en: 'No reliable ending pattern applies here: the gender has to be memorized. Always learn a new noun together with its article (le/la/un/une), not on its own.', fr: 'Aucune terminaison fiable ne s’applique ici : le genre doit être mémorisé. Apprenez toujours un nouveau nom avec son article (le/la/un/une), jamais seul.' }
            }
          }
        ]
      },

      end: { type: 'end', title: { en: 'Likely gender found', fr: 'Genre probable trouvé' } }
    }
  };

  APP.data.nomsGenreReference = {
    title: { en: 'Suffix reference', fr: 'Référence des terminaisons' },
    fem: {
      title: { en: 'Reliable feminine endings', fr: 'Terminaisons féminines fiables' },
      table: T([Ending, Word, Meaning], [
        ['-tion / -sion', w('la nation'), 'nation'], ['-son', w('la maison'), 'house'], ['-té / -tié', w('la beauté'), 'beauty'],
        ['-ure', w('la culture'), 'culture'], ['-ude', w('l’habitude'), 'habit'], ['-ance / -ence', w('la naissance'), 'birth'],
        ['-ette', w('la baguette'), 'baguette'], ['-elle', w('la nouvelle'), 'news'], ['-esse', w('la vitesse'), 'speed'], ['-ie', w('la boulangerie'), 'bakery']
      ], { glossCols: [2] })
    },
    masc: {
      title: { en: 'Reliable masculine endings', fr: 'Terminaisons masculines fiables' },
      table: T([Ending, Word, Meaning], [
        ['-age', w('le fromage'), 'cheese'], ['-ment', w('le moment'), 'moment'], ['-eau', w('le chapeau'), 'hat'],
        ['-isme', w('le réalisme'), 'realism'], ['-oir', w('le couloir'), 'hallway'], ['-al', w('le journal'), 'newspaper'],
        ['-et', w('le carnet'), 'notebook'], ['-ier', w('le papier'), 'paper'], ['-in', w('le magasin'), 'store'], ['-acle', w('le spectacle'), 'show']
      ], { glossCols: [2] })
    }
  };
})();
