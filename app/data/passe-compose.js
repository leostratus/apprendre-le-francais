window.APP = window.APP || {};
APP.data = APP.data || {};

(function () {
  var H = APP.dataHelpers;
  var T = H.table, C = H.combine, say = H.say;
  var Sujet = { en: 'Subject', fr: 'Sujet' };
  var Infinitif = { en: 'Infinitive', fr: 'Infinitif' };
  var Participe = { en: 'Past participle', fr: 'Participe' };
  var Exemple = { en: 'Example', fr: 'Exemple' };
  var Terminaison = { en: 'Ending', fr: 'Terminaison' };

  var etreConj = T([Sujet, { en: 'Être', fr: 'Être' }], [
    ['je', say('<code>suis</code>', 'je suis')], ['tu', say('<code>es</code>', 'tu es')],
    ['il / elle / on', say('<code>est</code>', 'il est')], ['nous', say('<code>sommes</code>', 'nous sommes')],
    ['vous', say('<code>êtes</code>', 'vous êtes')], ['ils / elles', say('<code>sont</code>', 'ils sont')]
  ]);

  var avoirConj = T([Sujet, { en: 'Avoir', fr: 'Avoir' }], [
    ['je', say('<code>ai</code>', 'j’ai')], ['tu', say('<code>as</code>', 'tu as')],
    ['il / elle / on', say('<code>a</code>', 'il a')], ['nous', say('<code>avons</code>', 'nous avons')],
    ['vous', say('<code>avez</code>', 'vous avez')], ['ils / elles', say('<code>ont</code>', 'ils ont')]
  ]);

  var pronomReflechi = T([Sujet, { en: 'Pronoun', fr: 'Pronom' }], [
    ['je', '<code>me (m’)</code>'], ['tu', '<code>te (t’)</code>'], ['il/elle', '<code>se (s’)</code>'],
    ['nous', '<code>nous</code>'], ['vous', '<code>vous</code>'], ['ils/elles', '<code>se (s’)</code>']
  ]);

  function participleRows(pairs, aux) {
    return pairs.map(function (r) {
      var code = '<code>' + r[1] + '</code>';
      return [r[0], say(code, aux + ' ' + r[1])];
    });
  }

  var irregEtre = T([Infinitif, Participe], participleRows([
    ['venir', 'venu'], ['devenir', 'devenu'], ['revenir', 'revenu'], ['parvenir', 'parvenu'], ['survenir', 'survenu'],
    ['mourir', 'mort'], ['naître', 'né'], ['partir', 'parti'], ['repartir', 'reparti'], ['sortir', 'sorti'],
    ['ressortir', 'ressorti'], ['tenir', 'tenu'], ['retenir', 'retenu'], ['appartenir', 'appartenu'], ['aller', 'allé'],
    ['rentrer', 'rentré'], ['rester', 'resté'], ['tomber', 'tombé'], ['retomber', 'retombé'], ['arriver', 'arrivé'],
    ['entrer', 'entré'], ['retourner', 'retourné'], ['passer (par)', 'passé'], ['monter', 'monté'],
    ['remonter', 'remonté'], ['descendre', 'descendu'], ['redescendre', 'redescendu']
  ], 'il est'));

  var regEtre = T([Infinitif, Terminaison, Exemple], [
    ['-er', '<code>-é</code>', say('allé', 'il est allé')],
    ['-ir', '<code>-i</code>', say('parti', 'il est parti')],
    ['-re', '<code>-u</code>', say('descendu', 'il est descendu')]
  ]);

  var irregAvoir = T([Infinitif, Participe], participleRows([
    ['avoir', 'eu'], ['être', 'été'], ['faire', 'fait'], ['défaire', 'défait'], ['refaire', 'refait'], ['dire', 'dit'],
    ['contredire', 'contredit'], ['interdire', 'interdit'], ['écrire', 'écrit'], ['décrire', 'décrit'],
    ['inscrire', 'inscrit'], ['prendre', 'pris'], ['apprendre', 'appris'], ['comprendre', 'compris'],
    ['reprendre', 'repris'], ['surprendre', 'surpris'], ['mettre', 'mis'], ['admettre', 'admis'],
    ['promettre', 'promis'], ['remettre', 'remis'], ['soumettre', 'soumis'], ['voir', 'vu'], ['prévoir', 'prévu'],
    ['revoir', 'revu'], ['vouloir', 'voulu'], ['pouvoir', 'pu'], ['savoir', 'su'], ['valoir', 'valu'],
    ['devoir', 'dû'], ['recevoir', 'reçu'], ['apercevoir', 'aperçu'], ['concevoir', 'conçu'], ['boire', 'bu'],
    ['lire', 'lu'], ['relire', 'relu'], ['élire', 'élu'], ['plaire', 'plu'], ['déplaire', 'déplu'],
    ['pleuvoir', 'plu'], ['falloir', 'fallu'], ['connaître', 'connu'], ['reconnaître', 'reconnu'],
    ['paraître', 'paru'], ['apparaître', 'apparu'], ['disparaître', 'disparu'], ['ouvrir', 'ouvert'],
    ['couvrir', 'couvert'], ['découvrir', 'découvert'], ['offrir', 'offert'], ['souffrir', 'souffert'],
    ['cueillir', 'cueilli'], ['tenir', 'tenu'], ['obtenir', 'obtenu'], ['maintenir', 'maintenu'],
    ['soutenir', 'soutenu'], ['contenir', 'contenu'], ['vivre', 'vécu'], ['survivre', 'survécu'],
    ['suivre', 'suivi'], ['poursuivre', 'poursuivi'], ['craindre', 'craint'], ['plaindre', 'plaint'],
    ['peindre', 'peint'], ['éteindre', 'éteint'], ['atteindre', 'atteint'], ['rejoindre', 'rejoint'],
    ['joindre', 'joint'], ['résoudre', 'résolu'], ['absoudre', 'absous'], ['conduire', 'conduit'],
    ['produire', 'produit'], ['traduire', 'traduit'], ['construire', 'construit'], ['cuire', 'cuit'],
    ['nuire', 'nui'], ['rire', 'ri'], ['sourire', 'souri'], ['vaincre', 'vaincu'], ['convaincre', 'convaincu'],
    ['croître', 'crû'], ['croire', 'cru'], ['courir', 'couru'], ['parcourir', 'parcouru'], ['secourir', 'secouru'],
    ['acquérir', 'acquis'], ['conquérir', 'conquis'], ['asseoir', 'assis'], ['choir', 'chu'], ['coudre', 'cousu'],
    ['moudre', 'moulu'], ['répandre', 'répandu'], ['perdre', 'perdu'], ['répondre', 'répondu'], ['fondre', 'fondu'],
    ['battre', 'battu'], ['combattre', 'combattu'], ['abattre', 'abattu']
  ], 'il a'));

  var regAvoir = T([Infinitif, Terminaison, Exemple], [
    ['-er', '<code>-é</code>', say('mangé', 'il a mangé')],
    ['-ir', '<code>-i</code>', say('fini', 'il a fini')],
    ['-re', '<code>-u</code>', say('vendu', 'il a vendu')]
  ]);

  var agreementSubject = T([{ en: 'Subject', fr: 'Sujet' }, Terminaison, Exemple], [
    [{ en: 'masc. sing.', fr: 'masc. sing.' }, { en: '(none)', fr: '(rien)' }, say('il est parti', 'il est parti')],
    [{ en: 'fem. sing.', fr: 'fém. sing.' }, '<code>+e</code>', say('elle est partie', 'elle est partie')],
    [{ en: 'masc. pl.', fr: 'masc. pl.' }, '<code>+s</code>', say('ils sont partis', 'ils sont partis')],
    [{ en: 'fem. pl.', fr: 'fém. pl.' }, '<code>+es</code>', say('elles sont parties', 'elles sont parties')]
  ]);

  APP.data.passeCompose = {
    start: 'q_reflexive',
    nodes: {
      q_reflexive: {
        type: 'question',
        text: { en: 'Is the verb reflexive (pronominal)?', fr: 'Le verbe est-il pronominal (réfléchi) ?' },
        note: { en: 'se laver, se lever, s’appeler… A reflexive verb always takes être, regardless of the question below.', fr: 'se laver, se lever, s’appeler… Un verbe pronominal prend toujours être, quelle que soit la réponse à la question ci-dessous.' },
        options: [
          {
            id: 'oui',
            label: { en: 'Yes → always être', fr: 'Oui → toujours être' },
            next: 'q_irr_etre_refl',
            result: {
              title: { en: 'Conjugate être (present) + the reflexive pronoun', fr: 'Conjuguer être (présent) + le pronom réfléchi' },
              html: C(etreConj, pronomReflechi),
              note: { en: 'e.g. je me suis lavé', fr: 'ex. je me suis lavé' }
            }
          },
          { id: 'non', label: { en: 'No', fr: 'Non' }, next: 'q_root' }
        ]
      },

      q_root: {
        type: 'question',
        text: { en: 'Does the verb express movement or a change of state?', fr: 'Le verbe exprime un mouvement ou un changement d’état ?' },
        note: {
          en: 'aller, venir, partir, arriver, naître, mourir, rester, tomber, devenir, revenir, monter, sortir, descendre, entrer, retourner, repartir, rentrer',
          fr: 'aller, venir, partir, arriver, naître, mourir, rester, tomber, devenir, revenir, monter, sortir, descendre, entrer, retourner, repartir, rentrer'
        },
        options: [
          {
            id: 'oui',
            label: { en: 'Yes → être', fr: 'Oui → être' },
            next: 'q_irr_etre_move',
            result: { title: { en: 'Conjugate être (present)', fr: 'Conjuguer être (présent)' }, html: etreConj }
          },
          {
            id: 'non',
            label: { en: 'No → avoir', fr: 'Non → avoir' },
            next: 'q_irr_avoir',
            result: { title: { en: 'Conjugate avoir (present)', fr: 'Conjuguer avoir (présent)' }, html: avoirConj }
          }
        ]
      },

      // reflexive verbs: irregular-participle check feeds into the COD-after-verb
      // agreement question (agreement is conditional here)
      q_irr_etre_refl: {
        type: 'question',
        text: { en: 'Is the past participle irregular?', fr: 'Le participe passé est-il irrégulier ?' },
        options: [
          {
            id: 'oui', label: { en: 'Yes → use the irregular form', fr: 'Oui → utiliser la forme irrégulière' }, next: 'q_cod_apres',
            result: { title: { en: 'Common irregular participles (with être)', fr: 'Participes irréguliers courants (avec être)' }, html: irregEtre }
          },
          {
            id: 'non', label: { en: 'No → regular rules', fr: 'Non → règles régulières' }, next: 'q_cod_apres',
            result: { title: { en: 'Regular endings', fr: 'Terminaisons régulières' }, html: regEtre }
          }
        ]
      },

      // non-reflexive être (movement) verbs: agreement with the subject is
      // unconditional, so it rides along with the participle answer
      q_irr_etre_move: {
        type: 'question',
        text: { en: 'Is the past participle irregular?', fr: 'Le participe passé est-il irrégulier ?' },
        options: [
          {
            id: 'oui', label: { en: 'Yes → use the irregular form', fr: 'Oui → utiliser la forme irrégulière' }, next: 'q_negation',
            result: { title: { en: 'Common irregular participles (with être)', fr: 'Participes irréguliers courants (avec être)' }, html: C(irregEtre, '<div style="margin-top:0.8rem;"></div>', agreementSubject) }
          },
          {
            id: 'non', label: { en: 'No → regular rules', fr: 'Non → règles régulières' }, next: 'q_negation',
            result: { title: { en: 'Regular endings, then agreement with the subject', fr: 'Terminaisons régulières, puis accord avec le sujet' }, html: C(regEtre, '<div style="margin-top:0.8rem;"></div>', agreementSubject) }
          }
        ]
      },

      q_cod_apres: {
        type: 'question',
        text: { en: 'Reflexive verb with the direct object placed after the verb?', fr: 'Verbe pronominal + COD placé après le verbe ?' },
        note: { en: 'e.g. elle s’est lavé les mains (les mains = direct object)', fr: 'ex. elle s’est lavé les mains (les mains = COD)' },
        options: [
          {
            id: 'oui', label: { en: 'Yes → no agreement', fr: 'Oui → pas d’accord' }, next: 'q_negation',
            result: { muted: true, html: { en: say('Invariable participle<br>', 'Elle s’est lavé les mains.') + '<em>Elle s’est lavé les mains.</em>', fr: say('Participe invariable<br>', 'Elle s’est lavé les mains.') + '<em>Elle s’est lavé les mains.</em>' } }
          },
          {
            id: 'non', label: { en: 'No → agreement required', fr: 'Non → accord requis' }, next: 'q_negation',
            result: { title: { en: 'Agreement with the subject', fr: 'Accord avec le sujet' }, html: agreementSubject }
          }
        ]
      },

      q_irr_avoir: {
        type: 'question',
        text: { en: 'Is the past participle irregular?', fr: 'Le participe passé est-il irrégulier ?' },
        options: [
          {
            id: 'oui', label: { en: 'Yes → use the irregular form', fr: 'Oui → utiliser la forme irrégulière' }, next: 'q_cod_precede',
            result: { title: { en: 'Irregular participles (with avoir)', fr: 'Participes irréguliers (avec avoir)' }, html: irregAvoir }
          },
          {
            id: 'non', label: { en: 'No → regular rules', fr: 'Non → règles régulières' }, next: 'q_cod_precede',
            result: { title: { en: 'Regular endings', fr: 'Terminaisons régulières' }, html: regAvoir }
          }
        ]
      },

      q_cod_precede: {
        type: 'question',
        text: { en: 'Does a direct object precede the verb?', fr: 'Un COD précède-t-il le verbe ?' },
        note: { en: 'pronoun: je l’ai vue · relative clause: la fille que j’ai vue', fr: 'pronom : je l’ai vue · relative : la fille que j’ai vue' },
        options: [
          {
            id: 'oui', label: { en: 'Yes → agreement required', fr: 'Oui → accord requis' }, next: 'q_negation',
            result: {
              title: { en: 'Agreement with the preceding direct object', fr: 'Accord avec le COD qui précède' },
              html: T([{ en: 'Direct object', fr: 'COD' }, Terminaison, Exemple], [
                [{ en: 'masc. sing.', fr: 'masc. sing.' }, { en: '(none)', fr: '(rien)' }, say('je l’ai vu', 'je l’ai vu')],
                [{ en: 'fem. sing.', fr: 'fém. sing.' }, '<code>+e</code>', say('je l’ai vue', 'je l’ai vue')],
                [{ en: 'masc. pl.', fr: 'masc. pl.' }, '<code>+s</code>', say('je les ai vus', 'je les ai vus')],
                [{ en: 'fem. pl.', fr: 'fém. pl.' }, '<code>+es</code>', say('je les ai vues', 'je les ai vues')]
              ])
            }
          },
          {
            id: 'non', label: { en: 'No', fr: 'Non' }, next: 'q_negation',
            result: { muted: true, html: { en: 'Invariable participle<br>' + say('<em>J’ai mangé.</em>', 'J’ai mangé.'), fr: 'Participe invariable<br>' + say('<em>J’ai mangé.</em>', 'J’ai mangé.') } }
          }
        ]
      },

      q_negation: {
        type: 'question',
        text: { en: 'Is there a negation?', fr: 'Y a-t-il une négation ?' },
        options: [
          {
            id: 'oui', label: { en: 'Yes', fr: 'Oui' }, next: 'q_question',
            result: {
              title: { en: 'Wrap the auxiliary with ne…pas', fr: 'Encadrer l’auxiliaire de ne…pas' },
              html: T([{ en: 'Auxiliary', fr: 'Auxiliaire' }, Exemple], [
                ['avoir', say('<em>je n’ai pas mangé</em>', 'je n’ai pas mangé')],
                ['être', say('<em>elle n’est pas venue</em>', 'elle n’est pas venue')]
              ]),
              note: { en: 'In casual spoken French, ne is often dropped: j’ai pas mangé.', fr: 'À l’oral familier, le ne disparaît souvent : j’ai pas mangé.' }
            }
          },
          { id: 'non', label: { en: 'No', fr: 'Non' }, next: 'q_question', result: { muted: true, html: { en: 'Nothing to change', fr: 'Rien à changer' } } }
        ]
      },

      q_question: {
        type: 'question',
        text: { en: 'Is it a question?', fr: 'Est-ce une question ?' },
        options: [
          { id: 'oui', label: { en: 'Yes', fr: 'Oui' }, next: 'q_tu_vous' },
          { id: 'non', label: { en: 'No', fr: 'Non' }, next: 'end', result: { muted: true, html: { en: 'Nothing to change', fr: 'Rien à changer' } } }
        ]
      },

      q_tu_vous: {
        type: 'question',
        text: { en: 'Are you using tu or vous with the other person?', fr: 'Tutoies-tu ou vouvoyez-vous l’interlocuteur·trice ?' },
        options: [
          {
            id: 'tu', label: { en: 'Tu (informal)', fr: 'Tu (tutoiement)' }, next: 'end',
            result: {
              title: { en: 'Question form', fr: 'Forme de question' },
              html: T([{ en: 'Form', fr: 'Forme' }, Exemple, { en: 'Register', fr: 'Registre' }], [
                [{ en: 'Inversion', fr: 'Inversion' }, say('<em>As-tu mangé ?</em>', 'As-tu mangé ?'), { en: 'formal', fr: 'soutenu' }],
                ['<code>Est-ce que</code>', say('<em>Est-ce que tu as mangé ?</em>', 'Est-ce que tu as mangé ?'), { en: 'neutral', fr: 'neutre' }],
                [{ en: 'Intonation', fr: 'Intonation' }, say('<em>Tu as mangé ?</em>', 'Tu as mangé ?'), { en: 'casual (most common in speech)', fr: 'familier (le plus courant à l’oral)' }]
              ])
            }
          },
          {
            id: 'vous', label: { en: 'Vous (formal)', fr: 'Vous (vouvoiement)' }, next: 'end',
            result: {
              title: { en: 'Question form', fr: 'Forme de question' },
              html: T([{ en: 'Form', fr: 'Forme' }, Exemple, { en: 'Register', fr: 'Registre' }], [
                [{ en: 'Inversion (recommended)', fr: 'Inversion (recommandée)' }, say('<em>Avez-vous mangé ?</em>', 'Avez-vous mangé ?'), { en: 'formal', fr: 'soutenu' }],
                ['<code>Est-ce que</code>', say('<em>Est-ce que vous avez mangé ?</em>', 'Est-ce que vous avez mangé ?'), { en: 'neutral', fr: 'neutre' }],
                [{ en: 'Intonation', fr: 'Intonation' }, say('<em>Vous avez mangé ?</em>', 'Vous avez mangé ?'), { en: 'avoid with vous', fr: 'à éviter avec le vouvoiement' }]
              ])
            }
          }
        ]
      },

      end: { type: 'end', title: { en: 'Your passé composé is correct', fr: 'Votre passé composé est correct' } }
    }
  };

  var isolatedAux = {
    'être': 'il a', 'avoir': 'il a', 'naître': 'il est', 'mourir': 'il est', 'vivre': 'il a', 'suivre': 'il a',
    'courir': 'il a', 'rire': 'il a', 'vaincre': 'il a', 'asseoir': 'il a', 'absoudre': 'il a', 'choir': 'il a',
    'acquérir': 'il a', 'nuire': 'il a'
  };
  var isolatedRows = [
    ['être', 'été'], ['avoir', 'eu'], ['naître', 'né'], ['mourir', 'mort'], ['vivre', 'vécu'], ['suivre', 'suivi'],
    ['courir', 'couru'], ['rire', 'ri'], ['vaincre', 'vaincu'], ['asseoir', 'assis'], ['absoudre', 'absous'],
    ['choir', 'chu'], ['acquérir', 'acquis'], ['nuire', 'nui']
  ].map(function (r) { return [r[0], say('<code>' + r[1] + '</code>', isolatedAux[r[0]] + ' ' + r[1])]; });

  APP.data.passeComposeReference = {
    families: {
      title: { en: 'Irregular past-participle families', fr: 'Familles de participes passés irréguliers' },
      table: T(
        [{ en: 'Participle ending', fr: 'Terminaison du participe' }, Exemple],
        [
          [{ en: 'Verbs in -oir → -u', fr: 'Verbes en -oir → -u' }, 'pouvoir → pu, vouloir → voulu, savoir → su, devoir → dû, recevoir → reçu'],
          [{ en: 'Most verbs in -re → -u', fr: 'Verbes en -re (plupart) → -u' }, 'boire → bu, lire → lu, connaître → connu, paraître → paru, croire → cru'],
          [{ en: 'Family -indre / -oindre / -aindre → -int / -oint', fr: 'Famille -indre / -oindre / -aindre → -int / -oint' }, 'craindre → craint, peindre → peint, joindre → joint, atteindre → atteint'],
          [{ en: 'Verbs in -rir → -ert', fr: 'Verbes en -rir (ouverts) → -ert' }, 'ouvrir → ouvert, offrir → offert, souffrir → souffert, découvrir → découvert'],
          [{ en: 'Verbs in -ire → -it', fr: 'Verbes en -ire → -it' }, 'dire → dit, écrire → écrit, interdire → interdit, décrire → décrit'],
          [{ en: 'Verbs in -uire → -uit', fr: 'Verbes en -uire → -uit' }, 'conduire → conduit, produire → produit, traduire → traduit, cuire → cuit'],
          [{ en: 'Family faire → -fait', fr: 'Famille faire → -fait' }, 'faire → fait, défaire → défait, refaire → refait'],
          [{ en: 'Family prendre → -pris', fr: 'Famille prendre → -pris' }, 'prendre → pris, apprendre → appris, comprendre → compris, surprendre → surpris'],
          [{ en: 'Family mettre → -mis', fr: 'Famille mettre → -mis' }, 'mettre → mis, promettre → promis, remettre → remis, soumettre → soumis'],
          [{ en: 'Family -enir (tenir/venir) → -enu', fr: 'Famille -enir (tenir/venir) → -enu' }, 'venir → venu, tenir → tenu, obtenir → obtenu, devenir → devenu']
        ]
      )
    },
    isolated: {
      title: { en: 'Isolated forms — memorize these', fr: 'Formes isolées — à mémoriser' },
      table: T([Infinitif, Participe], isolatedRows)
    }
  };
})();
