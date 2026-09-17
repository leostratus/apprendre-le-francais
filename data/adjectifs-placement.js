window.APP = window.APP || {};
APP.data = APP.data || {};

(function () {
  var H = APP.dataHelpers;
  var T = H.table, say = H.say;
  var Exemple = { en: 'Example', fr: 'Exemple' };

  function ex(sentence) { return say('<em>' + sentence + '</em>', sentence); }

  APP.data.adjectifsPlacement = {
    start: 'q_bags',
    nodes: {
      q_bags: {
        type: 'question',
        text: { en: 'Is it one of the common short adjectives that normally come before the noun?', fr: 'Est-ce l’un des adjectifs courts et courants qui se placent normalement avant le nom ?' },
        note: { en: 'beau, joli, bon, mauvais, petit, gros, jeune, vieux, nouveau, haut, gentil, meilleur, vaste, long…', fr: 'beau, joli, bon, mauvais, petit, gros, jeune, vieux, nouveau, haut, gentil, meilleur, vaste, long…' },
        options: [
          {
            id: 'oui', tone: 'green',
            label: { en: 'Yes → before the noun', fr: 'Oui → avant le nom' },
            next: 'end',
            result: {
              title: { en: 'Before the noun', fr: 'Avant le nom' },
              tone: 'green',
              html: T([Exemple], [
                [ex('un beau jardin')], [ex('une jolie maison')], [ex('un bon film')],
                [ex('un petit chien')], [ex('une grosse valise')], [ex('un vieux livre')], [ex('une nouvelle voiture')]
              ]),
              note: { en: 'These short, frequent adjectives are an exception to the general rule. Memorize them as a set.', fr: 'Ces adjectifs courts et fréquents sont une exception à la règle générale. Mémorisez-les comme un ensemble.' }
            }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_meaning' }
        ]
      },

      q_meaning: {
        type: 'question',
        text: { en: 'Does the adjective change meaning depending on its position?', fr: 'L’adjectif change-t-il de sens selon sa position ?' },
        note: { en: 'ancien, cher, propre, pauvre, brave, seul, même, certain, dernier, prochain, grand…', fr: 'ancien, cher, propre, pauvre, brave, seul, même, certain, dernier, prochain, grand…' },
        options: [
          {
            id: 'oui', tone: 'purple',
            label: { en: 'Yes', fr: 'Oui' },
            next: 'end',
            result: {
              title: { en: 'Meaning depends on position', fr: 'Le sens dépend de la position' },
              tone: 'purple',
              html: T(
                [{ en: 'Adjective', fr: 'Adjectif' }, { en: 'Before the noun', fr: 'Avant le nom' }, { en: 'After the noun', fr: 'Après le nom' }],
                [
                  ['ancien', ex('un ancien professeur') + ' <span class="wr-note-inline">(former)</span>', ex('un immeuble ancien') + ' <span class="wr-note-inline">(old)</span>'],
                  ['cher', ex('mon cher ami') + ' <span class="wr-note-inline">(dear)</span>', ex('un livre cher') + ' <span class="wr-note-inline">(expensive)</span>'],
                  ['propre', ex('ma propre voiture') + ' <span class="wr-note-inline">(own)</span>', ex('une voiture propre') + ' <span class="wr-note-inline">(clean)</span>'],
                  ['grand', ex('un grand homme') + ' <span class="wr-note-inline">(great)</span>', ex('un homme grand') + ' <span class="wr-note-inline">(tall)</span>'],
                  ['pauvre', ex('un pauvre homme') + ' <span class="wr-note-inline">(pitiable)</span>', ex('un homme pauvre') + ' <span class="wr-note-inline">(not rich)</span>'],
                  ['brave', ex('un brave homme') + ' <span class="wr-note-inline">(good, decent)</span>', ex('un homme brave') + ' <span class="wr-note-inline">(courageous)</span>'],
                  ['seul', ex('la seule solution') + ' <span class="wr-note-inline">(only)</span>', ex('une personne seule') + ' <span class="wr-note-inline">(lonely)</span>'],
                  ['même', ex('le même jour') + ' <span class="wr-note-inline">(same)</span>', ex('le jour même') + ' <span class="wr-note-inline">(that very)</span>'],
                  ['dernier', ex('la dernière semaine') + ' <span class="wr-note-inline">(final)</span>', ex('la semaine dernière') + ' <span class="wr-note-inline">(previous)</span>'],
                  ['prochain', ex('le prochain arrêt') + ' <span class="wr-note-inline">(next in sequence)</span>', ex('l’année prochaine') + ' <span class="wr-note-inline">(next, calendar)</span>'],
                  ['certain', ex('un certain succès') + ' <span class="wr-note-inline">(some, vague)</span>', ex('un succès certain') + ' <span class="wr-note-inline">(sure)</span>']
                ]
              )
            }
          },
          { id: 'non', tone: 'blue', label: { en: 'No', fr: 'Non' }, next: 'q_multiple' }
        ]
      },

      q_multiple: {
        type: 'question',
        text: { en: 'Are there two or more adjectives describing the noun?', fr: 'Y a-t-il deux adjectifs ou plus qui décrivent le nom ?' },
        options: [
          {
            id: 'oui', tone: 'orange',
            label: { en: 'Yes', fr: 'Oui' },
            next: 'end',
            result: {
              title: { en: 'Each adjective keeps its own position', fr: 'Chaque adjectif garde sa propre position' },
              tone: 'orange',
              html: T([Exemple], [
                [ex('une belle voiture rouge')], [ex('un petit garçon intelligent et gentil')]
              ]),
              note: { en: 'If both adjectives would normally go after the noun, join them with et. If one belongs before and one after, split them: one before, one after.', fr: 'Si les deux adjectifs se placent normalement après le nom, reliez-les avec et. Si l’un se place avant et l’autre après, séparez-les : un avant, un après.' }
            }
          },
          {
            id: 'non', tone: 'blue',
            label: { en: 'No → the default rule', fr: 'Non → la règle par défaut' },
            next: 'end',
            result: {
              title: { en: 'After the noun', fr: 'Après le nom' },
              tone: 'blue',
              html: T(
                [{ en: 'Category', fr: 'Catégorie' }, Exemple],
                [
                  [{ en: 'color', fr: 'couleur' }, ex('une chemise bleue')],
                  [{ en: 'shape', fr: 'forme' }, ex('une table ronde')],
                  [{ en: 'nationality', fr: 'nationalité' }, ex('un livre français')],
                  [{ en: 'religion', fr: 'religion' }, ex('une église catholique')],
                  [{ en: 'material', fr: 'matière' }, ex('une table en bois')]
                ]
              ),
              note: { en: 'This is the general rule: most descriptive adjectives go after the noun. The short BAGS-type set and the meaning-changing set are the exceptions.', fr: 'C’est la règle générale : la plupart des adjectifs descriptifs se placent après le nom. Le petit ensemble d’adjectifs courts et l’ensemble à sens variable sont les exceptions.' }
            }
          }
        ]
      },

      end: { type: 'end', title: { en: 'Adjective correctly placed', fr: 'Adjectif correctement placé' } }
    }
  };
})();
