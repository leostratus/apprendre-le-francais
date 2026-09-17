window.APP = window.APP || {};
APP.data = APP.data || {};

(function () {
  var H = APP.dataHelpers;
  var T = H.table, say = H.say;
  var Exemple = { en: 'Example', fr: 'Exemple' };

  function ex(sentence) { return say('<em>' + sentence + '</em>', sentence); }

  APP.data.adverbesPlacement = {
    start: 'q_type',
    nodes: {
      q_type: {
        type: 'question',
        text: { en: 'What kind of adverb is it?', fr: 'Quel type d’adverbe est-ce ?' },
        options: [
          {
            id: 'manner', tone: 'green',
            label: { en: 'Manner, intensity, or quantity', fr: 'Manière, intensité ou quantité' },
            sub: { en: 'lentement, bien, beaucoup, très, trop, assez…', fr: 'lentement, bien, beaucoup, très, trop, assez…' },
            next: 'q_tense'
          },
          {
            id: 'time_place', tone: 'orange',
            label: { en: 'Time or place', fr: 'Temps ou lieu' },
            sub: { en: 'hier, aujourd’hui, demain, bientôt, ici, là, partout…', fr: 'hier, aujourd’hui, demain, bientôt, ici, là, partout…' },
            next: 'end',
            result: {
              title: { en: 'At the start or end of the clause', fr: 'En début ou en fin de proposition' },
              tone: 'orange',
              html: T(
                [{ en: 'Position', fr: 'Position' }, Exemple, { en: 'Effect', fr: 'Effet' }],
                [
                  [{ en: 'Start', fr: 'Début' }, ex('Hier, il est parti.'), { en: 'emphasis', fr: 'mise en relief' }],
                  [{ en: 'End', fr: 'Fin' }, ex('Il est parti hier.'), { en: 'neutral', fr: 'neutre' }],
                  [{ en: 'Start', fr: 'Début' }, ex('Ici, on parle français.'), { en: 'emphasis', fr: 'mise en relief' }],
                  [{ en: 'End', fr: 'Fin' }, ex('On parle français ici.'), { en: 'neutral', fr: 'neutre' }]
                ]
              ),
              note: { en: 'Both positions are correct — placing the adverb at the start of the sentence gives it stylistic emphasis.', fr: 'Les deux positions sont correctes — le début de phrase met l’adverbe en relief stylistique.' }
            }
          },
          {
            id: 'modifier', tone: 'purple',
            label: { en: 'Modifies an adjective or another adverb', fr: 'Modifie un adjectif ou un autre adverbe' },
            sub: { en: 'très, assez, trop, si, vraiment, plutôt…', fr: 'très, assez, trop, si, vraiment, plutôt…' },
            next: 'end',
            result: {
              title: { en: 'Directly before the word it modifies', fr: 'Directement avant le mot modifié' },
              tone: 'purple',
              html: T(
                [{ en: 'Modifies', fr: 'Modifie' }, Exemple],
                [
                  [{ en: 'adjective', fr: 'adjectif' }, ex('très grand, assez facile, trop lent')],
                  [{ en: 'adverb', fr: 'adverbe' }, ex('très bien, assez souvent, trop vite')],
                  [{ en: 'adjective', fr: 'adjectif' }, ex('vraiment beau, plutôt sympa')]
                ]
              ),
              note: { en: 'These intensity adverbs always precede the word they modify — never after.', fr: 'Ces adverbes d’intensité précèdent toujours le mot qu’ils modifient — jamais après.' }
            }
          }
        ]
      },

      q_tense: {
        type: 'question',
        text: { en: 'Is the sentence in a simple or compound tense?', fr: 'La phrase est-elle au temps simple ou composé ?' },
        note: {
          en: 'Simple tenses: présent, imparfait, futur, conditionnel. Compound tenses: passé composé, plus-que-parfait…',
          fr: 'Temps simples : présent, imparfait, futur, conditionnel. Temps composés : passé composé, plus-que-parfait…'
        },
        options: [
          {
            id: 'simple', tone: 'green',
            label: { en: 'Simple tense', fr: 'Temps simple' },
            next: 'end',
            result: {
              title: { en: 'After the conjugated verb', fr: 'Après le verbe conjugué' },
              tone: 'green',
              html: T([Exemple], [
                [ex('Elle parle lentement.')], [ex('Il travaille bien.')], [ex('Nous mangeons beaucoup.')]
              ])
            }
          },
          { id: 'compound', tone: 'blue', label: { en: 'Compound tense', fr: 'Temps composé' }, next: 'q_short' }
        ]
      },

      q_short: {
        type: 'question',
        text: { en: 'Is the adverb short and common?', fr: 'L’adverbe est-il court et courant ?' },
        note: {
          en: 'bien, mal, mieux, déjà, encore, souvent, toujours, jamais, beaucoup, trop, assez, peu, vite, vraiment…',
          fr: 'bien, mal, mieux, déjà, encore, souvent, toujours, jamais, beaucoup, trop, assez, peu, vite, vraiment…'
        },
        options: [
          {
            id: 'oui', tone: 'green',
            label: { en: 'Yes → between the auxiliary and the past participle', fr: 'Oui → entre auxiliaire et participe' },
            next: 'end',
            result: {
              title: { en: 'Auxiliary + adverb + past participle', fr: 'Auxiliaire + adverbe + participe' },
              tone: 'green',
              html: T([Exemple], [
                [ex('Il a bien mangé.')], [ex('Elle a déjà fini.')],
                [ex('Nous avons beaucoup travaillé.')], [ex('Je n’ai jamais compris.')]
              ])
            }
          },
          {
            id: 'non', tone: 'blue',
            label: { en: 'No (long adverb) → after the past participle', fr: 'Non (adverbe long) → après le participe' },
            next: 'end',
            result: {
              title: { en: 'Auxiliary + past participle + adverb', fr: 'Auxiliaire + participe + adverbe' },
              tone: 'blue',
              html: T([Exemple], [
                [ex('Elle a parlé lentement.')], [ex('Il a répondu poliment.')], [ex('Nous avons travaillé sérieusement.')]
              ])
            }
          }
        ]
      },

      end: { type: 'end', title: { en: 'Adverb correctly placed', fr: 'Adverbe correctement placé' } }
    }
  };
})();
