window.APP = window.APP || {};
APP.data = APP.data || {};

// Per-word letter-to-phoneme breakdown for the Sounds page: each example
// word split into spans tagged with the phoneme (bare IPA, no slashes) each
// span realizes, or null where the letters are silent. Generated from real
// espeak-ng transcriptions aligned against this page’s own spelling patterns,
// with hand-checked overrides where espeak misreads an isolated word or the
// alignment can’t resolve a spelling-vs-nasal ordering conflict.
APP.data.sonsBreakdown = {
 "lit": [
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "it",
   "ipa": "i"
  }
 ],
 "île": [
  {
   "text": "î",
   "ipa": "i"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "maïs": [
  {
   "text": "m",
   "ipa": "m"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "ï",
   "ipa": "i"
  },
  {
   "text": "s",
   "ipa": "s"
  }
 ],
 "stylo": [
  {
   "text": "s",
   "ipa": "s"
  },
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "y",
   "ipa": "i"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "o",
   "ipa": "o"
  }
 ],
 "vie": [
  {
   "text": "v",
   "ipa": "v"
  },
  {
   "text": "ie",
   "ipa": "i"
  }
 ],
 "fils": [
  {
   "text": "f",
   "ipa": "f"
  },
  {
   "text": "i",
   "ipa": "i"
  },
  {
   "text": "l",
   "ipa": null
  },
  {
   "text": "s",
   "ipa": "s"
  }
 ],
 "petit": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "e",
   "ipa": "ə"
  },
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "it",
   "ipa": "i"
  }
 ],
 "dix": [
  {
   "text": "d",
   "ipa": "d"
  },
  {
   "text": "ix",
   "ipa": "i"
  }
 ],
 "été": [
  {
   "text": "é",
   "ipa": "e"
  },
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "é",
   "ipa": "e"
  }
 ],
 "parler": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "er",
   "ipa": "e"
  }
 ],
 "nez": [
  {
   "text": "n",
   "ipa": "n"
  },
  {
   "text": "ez",
   "ipa": "e"
  }
 ],
 "année": [
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "nn",
   "ipa": "n"
  },
  {
   "text": "ée",
   "ipa": "e"
  }
 ],
 "j'ai": [
  {
   "text": "j",
   "ipa": "ʒ"
  },
  {
   "text": "'",
   "ipa": null
  },
  {
   "text": "ai",
   "ipa": "e"
  }
 ],
 "payer": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "ay",
   "ipa": "e"
  },
  {
   "text": "er",
   "ipa": "e"
  }
 ],
 "poulet": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "ou",
   "ipa": "u"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "et",
   "ipa": "ɛ"
  }
 ],
 "clef": [
  {
   "text": "c",
   "ipa": "k"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "ef",
   "ipa": "e"
  }
 ],
 "pied": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "ie",
   "ipa": "j"
  },
  {
   "text": "d",
   "ipa": null
  }
 ],
 "ex æquo": [
  {
   "text": "e",
   "ipa": "ɛ"
  },
  {
   "text": "x",
   "ipa": "ks"
  },
  {
   "text": " ",
   "ipa": null
  },
  {
   "text": "æ",
   "ipa": null
  },
  {
   "text": "qu",
   "ipa": "k"
  },
  {
   "text": "o",
   "ipa": "o"
  }
 ],
 "mère": [
  {
   "text": "m",
   "ipa": "m"
  },
  {
   "text": "è",
   "ipa": "ɛ"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "fête": [
  {
   "text": "f",
   "ipa": "f"
  },
  {
   "text": "ê",
   "ipa": "ɛ"
  },
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "faire": [
  {
   "text": "f",
   "ipa": "f"
  },
  {
   "text": "ai",
   "ipa": "ɛ"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "neige": [
  {
   "text": "n",
   "ipa": "n"
  },
  {
   "text": "ei",
   "ipa": "ɛ"
  },
  {
   "text": "ge",
   "ipa": "ʒ"
  }
 ],
 "est": [
  {
   "text": "est",
   "ipa": "ɛ"
  }
 ],
 "paraître": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "aî",
   "ipa": "ɛ"
  },
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "belle": [
  {
   "text": "b",
   "ipa": "b"
  },
  {
   "text": "ell",
   "ipa": "ɛ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "peste": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "est",
   "ipa": "ɛ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "Noël": [
  {
   "text": "N",
   "ipa": "n"
  },
  {
   "text": "o",
   "ipa": "ɔ"
  },
  {
   "text": "ë",
   "ipa": "ɛ"
  },
  {
   "text": "l",
   "ipa": "l"
  }
 ],
 "ami": [
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "m",
   "ipa": "m"
  },
  {
   "text": "i",
   "ipa": "i"
  }
 ],
 "là": [
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "à",
   "ipa": "a"
  }
 ],
 "pâte": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "â",
   "ipa": "a"
  },
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "bois (partie /a/ archaïque)": [
  {
   "text": "b",
   "ipa": "b"
  },
  {
   "text": "oi",
   "ipa": "wa"
  },
  {
   "text": "s",
   "ipa": null
  },
  {
   "text": " (partie /a/ archaïque)",
   "ipa": null
  }
 ],
 "bas": [
  {
   "text": "b",
   "ipa": "b"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "s",
   "ipa": null
  }
 ],
 "bol": [
  {
   "text": "b",
   "ipa": "b"
  },
  {
   "text": "o",
   "ipa": "ɔ"
  },
  {
   "text": "l",
   "ipa": "l"
  }
 ],
 "Paul*": [
  {
   "text": "P",
   "ipa": "p"
  },
  {
   "text": "au",
   "ipa": "ɔ"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "*",
   "ipa": null
  }
 ],
 "oh": [
  {
   "text": "oh",
   "ipa": "ɔ"
  }
 ],
 "or": [
  {
   "text": "or",
   "ipa": "ɔ"
  }
 ],
 "mot": [
  {
   "text": "m",
   "ipa": "m"
  },
  {
   "text": "ot",
   "ipa": "o"
  }
 ],
 "chaud": [
  {
   "text": "ch",
   "ipa": "ʃ"
  },
  {
   "text": "aud",
   "ipa": "o"
  }
 ],
 "beau": [
  {
   "text": "b",
   "ipa": "b"
  },
  {
   "text": "eau",
   "ipa": "o"
  }
 ],
 "tôt": [
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "ô",
   "ipa": "o"
  },
  {
   "text": "t",
   "ipa": null
  }
 ],
 "dos": [
  {
   "text": "d",
   "ipa": "d"
  },
  {
   "text": "os",
   "ipa": "o"
  }
 ],
 "pot": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "ot",
   "ipa": "o"
  }
 ],
 "chevaux": [
  {
   "text": "ch",
   "ipa": "ʃ"
  },
  {
   "text": "e",
   "ipa": "ə"
  },
  {
   "text": "v",
   "ipa": "v"
  },
  {
   "text": "aux",
   "ipa": "o"
  }
 ],
 "fou": [
  {
   "text": "f",
   "ipa": "f"
  },
  {
   "text": "ou",
   "ipa": "u"
  }
 ],
 "où": [
  {
   "text": "où",
   "ipa": "u"
  }
 ],
 "voûte": [
  {
   "text": "v",
   "ipa": "v"
  },
  {
   "text": "oû",
   "ipa": "u"
  },
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "tu": [
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "u",
   "ipa": "y"
  }
 ],
 "dû": [
  {
   "text": "d",
   "ipa": "d"
  },
  {
   "text": "û",
   "ipa": "y"
  }
 ],
 "but": [
  {
   "text": "b",
   "ipa": "b"
  },
  {
   "text": "ut",
   "ipa": "y"
  }
 ],
 "reçus": [
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": "ə"
  },
  {
   "text": "ç",
   "ipa": "s"
  },
  {
   "text": "us",
   "ipa": "y"
  }
 ],
 "deux": [
  {
   "text": "d",
   "ipa": "d"
  },
  {
   "text": "eux",
   "ipa": "ø"
  }
 ],
 "nœud": [
  {
   "text": "n",
   "ipa": "n"
  },
  {
   "text": "œu",
   "ipa": "ø"
  },
  {
   "text": "d",
   "ipa": null
  }
 ],
 "feux": [
  {
   "text": "f",
   "ipa": "f"
  },
  {
   "text": "eux",
   "ipa": "ø"
  }
 ],
 "vœux": [
  {
   "text": "v",
   "ipa": "v"
  },
  {
   "text": "œux",
   "ipa": "ø"
  }
 ],
 "fleur": [
  {
   "text": "f",
   "ipa": "f"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "eur",
   "ipa": "œ"
  }
 ],
 "sœur": [
  {
   "text": "s",
   "ipa": "s"
  },
  {
   "text": "œu",
   "ipa": "œ"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  }
 ],
 "le": [
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "e",
   "ipa": "ə"
  }
 ],
 "fenêtres": [
  {
   "text": "f",
   "ipa": "f"
  },
  {
   "text": "e",
   "ipa": "ə"
  },
  {
   "text": "n",
   "ipa": "n"
  },
  {
   "text": "ê",
   "ipa": "ɛ"
  },
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": null
  },
  {
   "text": "s",
   "ipa": null
  }
 ],
 "nous faisons": [
  {
   "text": "n",
   "ipa": "n"
  },
  {
   "text": "ou",
   "ipa": "u"
  },
  {
   "text": "s",
   "ipa": null
  },
  {
   "text": " ",
   "ipa": null
  },
  {
   "text": "f",
   "ipa": "f"
  },
  {
   "text": "ai",
   "ipa": "ə"
  },
  {
   "text": "s",
   "ipa": "z"
  },
  {
   "text": "ons",
   "ipa": "ɔ̃"
  }
 ],
 "sans": [
  {
   "text": "s",
   "ipa": "s"
  },
  {
   "text": "ans",
   "ipa": "ɑ̃"
  }
 ],
 "chambre": [
  {
   "text": "ch",
   "ipa": "ʃ"
  },
  {
   "text": "amb",
   "ipa": "ɑ̃"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "vent": [
  {
   "text": "v",
   "ipa": "v"
  },
  {
   "text": "en",
   "ipa": "ɑ̃"
  },
  {
   "text": "t",
   "ipa": null
  }
 ],
 "exemple": [
  {
   "text": "e",
   "ipa": "ɛ"
  },
  {
   "text": "x",
   "ipa": "gz"
  },
  {
   "text": "emp",
   "ipa": "ɑ̃"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "paon": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "aon",
   "ipa": "ɑ̃"
  }
 ],
 "océan": [
  {
   "text": "o",
   "ipa": "o"
  },
  {
   "text": "cé",
   "ipa": "s"
  },
  {
   "text": "an",
   "ipa": "ɑ̃"
  }
 ],
 "blanc": [
  {
   "text": "b",
   "ipa": "b"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "anc",
   "ipa": "ɑ̃"
  }
 ],
 "quand": [
  {
   "text": "qu",
   "ipa": "k"
  },
  {
   "text": "and",
   "ipa": "ɑ̃"
  }
 ],
 "sang": [
  {
   "text": "s",
   "ipa": "s"
  },
  {
   "text": "ang",
   "ipa": "ɑ̃"
  }
 ],
 "dans": [
  {
   "text": "d",
   "ipa": "d"
  },
  {
   "text": "ans",
   "ipa": "ɑ̃"
  }
 ],
 "chant": [
  {
   "text": "ch",
   "ipa": "ʃ"
  },
  {
   "text": "ant",
   "ipa": "ɑ̃"
  }
 ],
 "champ": [
  {
   "text": "ch",
   "ipa": "ʃ"
  },
  {
   "text": "amp",
   "ipa": "ɑ̃"
  }
 ],
 "jambe": [
  {
   "text": "j",
   "ipa": "ʒ"
  },
  {
   "text": "amb",
   "ipa": "ɑ̃"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "temps": [
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "emp",
   "ipa": "ɑ̃"
  },
  {
   "text": "s",
   "ipa": null
  }
 ],
 "décembre": [
  {
   "text": "d",
   "ipa": "d"
  },
  {
   "text": "é",
   "ipa": "e"
  },
  {
   "text": "c",
   "ipa": "s"
  },
  {
   "text": "em",
   "ipa": "ɑ̃"
  },
  {
   "text": "b",
   "ipa": "b"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "Jean": [
  {
   "text": "J",
   "ipa": "ʒ"
  },
  {
   "text": "ean",
   "ipa": "ɑ̃"
  }
 ],
 "vin": [
  {
   "text": "v",
   "ipa": "v"
  },
  {
   "text": "in",
   "ipa": "ɛ̃"
  }
 ],
 "simple": [
  {
   "text": "s",
   "ipa": "s"
  },
  {
   "text": "imp",
   "ipa": "ɛ̃"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "main": [
  {
   "text": "m",
   "ipa": "m"
  },
  {
   "text": "ain",
   "ipa": "ɛ̃"
  }
 ],
 "faim": [
  {
   "text": "f",
   "ipa": "f"
  },
  {
   "text": "aim",
   "ipa": "ɛ̃"
  }
 ],
 "plein": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "ein",
   "ipa": "ɛ̃"
  }
 ],
 "Reims": [
  {
   "text": "R",
   "ipa": "ʁ"
  },
  {
   "text": "ei",
   "ipa": "ɛ"
  },
  {
   "text": "m",
   "ipa": "m"
  },
  {
   "text": "s",
   "ipa": null
  }
 ],
 "syndicat": [
  {
   "text": "s",
   "ipa": "s"
  },
  {
   "text": "yn",
   "ipa": "ɛ̃"
  },
  {
   "text": "d",
   "ipa": "d"
  },
  {
   "text": "i",
   "ipa": "i"
  },
  {
   "text": "ca",
   "ipa": "k"
  },
  {
   "text": "t",
   "ipa": null
  }
 ],
 "thym": [
  {
   "text": "th",
   "ipa": "t"
  },
  {
   "text": "ym",
   "ipa": "ɛ̃"
  }
 ],
 "bien": [
  {
   "text": "b",
   "ipa": "b"
  },
  {
   "text": "ien",
   "ipa": "jɛ̃"
  }
 ],
 "distinct": [
  {
   "text": "d",
   "ipa": "d"
  },
  {
   "text": "i",
   "ipa": "i"
  },
  {
   "text": "s",
   "ipa": "s"
  },
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "in",
   "ipa": "ɛ̃"
  },
  {
   "text": "ct",
   "ipa": null
  }
 ],
 "peindre": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "ein",
   "ipa": "ɛ̃"
  },
  {
   "text": "d",
   "ipa": "d"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "vingt": [
  {
   "text": "v",
   "ipa": "v"
  },
  {
   "text": "ing",
   "ipa": "ɛ̃"
  },
  {
   "text": "t",
   "ipa": null
  }
 ],
 "teint": [
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "eint",
   "ipa": "ɛ̃"
  }
 ],
 "impossible": [
  {
   "text": "imp",
   "ipa": "ɛ̃"
  },
  {
   "text": "o",
   "ipa": "ɔ"
  },
  {
   "text": "ss",
   "ipa": "s"
  },
  {
   "text": "i",
   "ipa": "i"
  },
  {
   "text": "b",
   "ipa": "b"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "timbre": [
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "imb",
   "ipa": "ɛ̃"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "craint": [
  {
   "text": "c",
   "ipa": "k"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "aint",
   "ipa": "ɛ̃"
  }
 ],
 "atteint": [
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "tt",
   "ipa": "t"
  },
  {
   "text": "eint",
   "ipa": "ɛ̃"
  }
 ],
 "examen (après i/é)": [
  {
   "text": "e",
   "ipa": "ɛ"
  },
  {
   "text": "x",
   "ipa": "gz"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "m",
   "ipa": "m"
  },
  {
   "text": "en",
   "ipa": "ɛ̃"
  },
  {
   "text": " (après i/é)",
   "ipa": null
  }
 ],
 "bon": [
  {
   "text": "b",
   "ipa": "b"
  },
  {
   "text": "on",
   "ipa": "ɔ̃"
  }
 ],
 "tomber": [
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "omb",
   "ipa": "ɔ̃"
  },
  {
   "text": "er",
   "ipa": "e"
  }
 ],
 "long": [
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "ong",
   "ipa": "ɔ̃"
  }
 ],
 "jonc": [
  {
   "text": "j",
   "ipa": "ʒ"
  },
  {
   "text": "onc",
   "ipa": "ɔ̃"
  }
 ],
 "rond": [
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "ond",
   "ipa": "ɔ̃"
  }
 ],
 "sons": [
  {
   "text": "s",
   "ipa": "s"
  },
  {
   "text": "ons",
   "ipa": "ɔ̃"
  }
 ],
 "ont": [
  {
   "text": "ont",
   "ipa": "ɔ̃"
  }
 ],
 "pompe": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "omp",
   "ipa": "ɔ̃"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "tombe": [
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "omb",
   "ipa": "ɔ̃"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "un": [
  {
   "text": "un",
   "ipa": "œ̃"
  }
 ],
 "parfum": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "f",
   "ipa": "f"
  },
  {
   "text": "um",
   "ipa": "œ̃"
  }
 ],
 "lundi": [
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "und",
   "ipa": "œ̃"
  },
  {
   "text": "i",
   "ipa": "i"
  }
 ],
 "à jeun": [
  {
   "text": "à",
   "ipa": "a"
  },
  {
   "text": " ",
   "ipa": null
  },
  {
   "text": "j",
   "ipa": "ʒ"
  },
  {
   "text": "eu",
   "ipa": "œ"
  },
  {
   "text": "n",
   "ipa": "n"
  }
 ],
 "viande": [
  {
   "text": "v",
   "ipa": "v"
  },
  {
   "text": "ian",
   "ipa": "jɑ̃"
  },
  {
   "text": "d",
   "ipa": "d"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "triangle": [
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "i",
   "ipa": "i"
  },
  {
   "text": "ang",
   "ipa": "ɑ̃"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "chien": [
  {
   "text": "ch",
   "ipa": "ʃ"
  },
  {
   "text": "ien",
   "ipa": "jɛ̃"
  }
 ],
 "lieu": [
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "ieu",
   "ipa": "jø"
  }
 ],
 "violon": [
  {
   "text": "v",
   "ipa": "v"
  },
  {
   "text": "io",
   "ipa": "j"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "o",
   "ipa": "o"
  },
  {
   "text": "n",
   "ipa": null
  }
 ],
 "avion": [
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "v",
   "ipa": "v"
  },
  {
   "text": "ion",
   "ipa": "jɔ̃"
  }
 ],
 "caillou": [
  {
   "text": "c",
   "ipa": "k"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "ill",
   "ipa": "j"
  },
  {
   "text": "ou",
   "ipa": "u"
  }
 ],
 "yéti": [
  {
   "text": "yé",
   "ipa": "j"
  },
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "i",
   "ipa": "i"
  }
 ],
 "yacht": [
  {
   "text": "y",
   "ipa": "j"
  },
  {
   "text": "ach",
   "ipa": "ɔ"
  },
  {
   "text": "t",
   "ipa": "t"
  }
 ],
 "yeux": [
  {
   "text": "yeux",
   "ipa": "j"
  }
 ],
 "fille": [
  {
   "text": "f",
   "ipa": "f"
  },
  {
   "text": "ill",
   "ipa": "j"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "travail": [
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "v",
   "ipa": "v"
  },
  {
   "text": "ail",
   "ipa": "aj"
  }
 ],
 "huit": [
  {
   "text": "h",
   "ipa": null
  },
  {
   "text": "u",
   "ipa": "y"
  },
  {
   "text": "it",
   "ipa": "i"
  }
 ],
 "tuer": [
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "u",
   "ipa": "y"
  },
  {
   "text": "er",
   "ipa": "e"
  }
 ],
 "pluie": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "u",
   "ipa": "y"
  },
  {
   "text": "ie",
   "ipa": "i"
  }
 ],
 "moi": [
  {
   "text": "m",
   "ipa": "m"
  },
  {
   "text": "oi",
   "ipa": "wa"
  }
 ],
 "coin": [
  {
   "text": "co",
   "ipa": "k"
  },
  {
   "text": "in",
   "ipa": "ɛ̃"
  }
 ],
 "noyau": [
  {
   "text": "n",
   "ipa": "n"
  },
  {
   "text": "oy",
   "ipa": "w"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "u",
   "ipa": null
  }
 ],
 "ouate": [
  {
   "text": "ou",
   "ipa": "u"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "ouest": [
  {
   "text": "oue",
   "ipa": "w"
  },
  {
   "text": "s",
   "ipa": "s"
  },
  {
   "text": "t",
   "ipa": "t"
  }
 ],
 "wagon": [
  {
   "text": "w",
   "ipa": "v"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "go",
   "ipa": "g"
  },
  {
   "text": "n",
   "ipa": null
  }
 ],
 "père": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "è",
   "ipa": "ɛ"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "appeler": [
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "pp",
   "ipa": "p"
  },
  {
   "text": "e",
   "ipa": null
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "er",
   "ipa": "e"
  }
 ],
 "compter": [
  {
   "text": "c",
   "ipa": "k"
  },
  {
   "text": "om",
   "ipa": "ɔ̃"
  },
  {
   "text": "p",
   "ipa": null
  },
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "er",
   "ipa": "e"
  }
 ],
 "abbé": [
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "bb",
   "ipa": "b"
  },
  {
   "text": "é",
   "ipa": "e"
  }
 ],
 "addition": [
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "dd",
   "ipa": "d"
  },
  {
   "text": "it",
   "ipa": "i"
  },
  {
   "text": "ion",
   "ipa": "j"
  }
 ],
 "table": [
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "b",
   "ipa": "b"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "battre": [
  {
   "text": "b",
   "ipa": "b"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "tt",
   "ipa": "t"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "théâtre": [
  {
   "text": "th",
   "ipa": "t"
  },
  {
   "text": "é",
   "ipa": "e"
  },
  {
   "text": "â",
   "ipa": "a"
  },
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "café": [
  {
   "text": "ca",
   "ipa": "k"
  },
  {
   "text": "f",
   "ipa": "f"
  },
  {
   "text": "é",
   "ipa": "e"
  }
 ],
 "colère": [
  {
   "text": "co",
   "ipa": "k"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "è",
   "ipa": "ɛ"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "culture": [
  {
   "text": "cu",
   "ipa": "k"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "u",
   "ipa": "y"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "qui": [
  {
   "text": "qu",
   "ipa": "k"
  },
  {
   "text": "i",
   "ipa": "i"
  }
 ],
 "kilo": [
  {
   "text": "k",
   "ipa": "k"
  },
  {
   "text": "i",
   "ipa": "i"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "o",
   "ipa": "o"
  }
 ],
 "ticket": [
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "i",
   "ipa": "i"
  },
  {
   "text": "ck",
   "ipa": "k"
  },
  {
   "text": "e",
   "ipa": "ɛ"
  },
  {
   "text": "t",
   "ipa": null
  }
 ],
 "chorale": [
  {
   "text": "ch",
   "ipa": "k"
  },
  {
   "text": "o",
   "ipa": "o"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "accident": [
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "cc",
   "ipa": "ks"
  },
  {
   "text": "i",
   "ipa": "i"
  },
  {
   "text": "d",
   "ipa": "d"
  },
  {
   "text": "en",
   "ipa": "ɑ̃"
  },
  {
   "text": "t",
   "ipa": null
  }
 ],
 "acquis": [
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "cq",
   "ipa": "k"
  },
  {
   "text": "u",
   "ipa": null
  },
  {
   "text": "is",
   "ipa": "i"
  }
 ],
 "chaque": [
  {
   "text": "ch",
   "ipa": "ʃ"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "que",
   "ipa": "k"
  }
 ],
 "gare": [
  {
   "text": "ga",
   "ipa": "g"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "gomme": [
  {
   "text": "go",
   "ipa": "g"
  },
  {
   "text": "mm",
   "ipa": "m"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "figure": [
  {
   "text": "f",
   "ipa": "f"
  },
  {
   "text": "i",
   "ipa": "i"
  },
  {
   "text": "gu",
   "ipa": "g"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "guerre": [
  {
   "text": "gue",
   "ipa": "g"
  },
  {
   "text": "rr",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "guitare": [
  {
   "text": "gui",
   "ipa": "g"
  },
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "spaghetti": [
  {
   "text": "s",
   "ipa": "s"
  },
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "gh",
   "ipa": "g"
  },
  {
   "text": "ett",
   "ipa": "ɛ"
  },
  {
   "text": "i",
   "ipa": "i"
  }
 ],
 "femme": [
  {
   "text": "f",
   "ipa": "f"
  },
  {
   "text": "e",
   "ipa": "a"
  },
  {
   "text": "mm",
   "ipa": "m"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "affiche": [
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "ff",
   "ipa": "f"
  },
  {
   "text": "i",
   "ipa": "i"
  },
  {
   "text": "ch",
   "ipa": "ʃ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "photo": [
  {
   "text": "ph",
   "ipa": "f"
  },
  {
   "text": "ot",
   "ipa": "o"
  },
  {
   "text": "o",
   "ipa": "o"
  }
 ],
 "ville": [
  {
   "text": "v",
   "ipa": "v"
  },
  {
   "text": "i",
   "ipa": "i"
  },
  {
   "text": "ll",
   "ipa": "l"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "watt": [
  {
   "text": "w",
   "ipa": null
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "tt",
   "ipa": "t"
  }
 ],
 "sac": [
  {
   "text": "s",
   "ipa": "s"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "c",
   "ipa": "k"
  }
 ],
 "poisson": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "oi",
   "ipa": "wa"
  },
  {
   "text": "ss",
   "ipa": "s"
  },
  {
   "text": "on",
   "ipa": "ɔ̃"
  }
 ],
 "ceci": [
  {
   "text": "ce",
   "ipa": "s"
  },
  {
   "text": "ci",
   "ipa": "s"
  }
 ],
 "cible": [
  {
   "text": "ci",
   "ipa": "s"
  },
  {
   "text": "b",
   "ipa": "b"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "cycle": [
  {
   "text": "cy",
   "ipa": "s"
  },
  {
   "text": "c",
   "ipa": "k"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "garçon": [
  {
   "text": "ga",
   "ipa": "g"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "ç",
   "ipa": "s"
  },
  {
   "text": "on",
   "ipa": "ɔ̃"
  }
 ],
 "scène": [
  {
   "text": "scè",
   "ipa": "s"
  },
  {
   "text": "n",
   "ipa": "n"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "science": [
  {
   "text": "sci",
   "ipa": "s"
  },
  {
   "text": "en",
   "ipa": "ɑ̃"
  },
  {
   "text": "ce",
   "ipa": "s"
  }
 ],
 "scythe": [
  {
   "text": "scy",
   "ipa": "s"
  },
  {
   "text": "th",
   "ipa": "t"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "nation": [
  {
   "text": "n",
   "ipa": "n"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "tion",
   "ipa": "sj"
  }
 ],
 "patient": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "tien",
   "ipa": "sj"
  },
  {
   "text": "t",
   "ipa": null
  }
 ],
 "national": [
  {
   "text": "n",
   "ipa": "n"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "tion",
   "ipa": "sj"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "l",
   "ipa": "l"
  }
 ],
 "six": [
  {
   "text": "s",
   "ipa": "s"
  },
  {
   "text": "ix",
   "ipa": "i"
  }
 ],
 "zéro": [
  {
   "text": "z",
   "ipa": "z"
  },
  {
   "text": "é",
   "ipa": "e"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "o",
   "ipa": "o"
  }
 ],
 "maison": [
  {
   "text": "m",
   "ipa": "m"
  },
  {
   "text": "ai",
   "ipa": "ɛ"
  },
  {
   "text": "s",
   "ipa": "z"
  },
  {
   "text": "on",
   "ipa": "ɔ̃"
  }
 ],
 "deuxième": [
  {
   "text": "d",
   "ipa": "d"
  },
  {
   "text": "eux",
   "ipa": "ø"
  },
  {
   "text": "i",
   "ipa": null
  },
  {
   "text": "è",
   "ipa": "ɛ"
  },
  {
   "text": "m",
   "ipa": "m"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "pizza": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "i",
   "ipa": "i"
  },
  {
   "text": "zz",
   "ipa": "z"
  },
  {
   "text": "a",
   "ipa": "a"
  }
 ],
 "chat": [
  {
   "text": "ch",
   "ipa": "ʃ"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "t",
   "ipa": null
  }
 ],
 "schéma": [
  {
   "text": "sch",
   "ipa": "ʃ"
  },
  {
   "text": "é",
   "ipa": "e"
  },
  {
   "text": "m",
   "ipa": "m"
  },
  {
   "text": "a",
   "ipa": "a"
  }
 ],
 "shampooing": [
  {
   "text": "sh",
   "ipa": "ʃ"
  },
  {
   "text": "amp",
   "ipa": "ɑ̃"
  },
  {
   "text": "o",
   "ipa": null
  },
  {
   "text": "oin",
   "ipa": "wɛ̃"
  },
  {
   "text": "g",
   "ipa": null
  }
 ],
 "jardin": [
  {
   "text": "j",
   "ipa": "ʒ"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "d",
   "ipa": "d"
  },
  {
   "text": "in",
   "ipa": "ɛ̃"
  }
 ],
 "geôle": [
  {
   "text": "geô",
   "ipa": "ʒ"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "girafe": [
  {
   "text": "gi",
   "ipa": "ʒ"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "f",
   "ipa": "f"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "gymnase": [
  {
   "text": "gy",
   "ipa": "ʒ"
  },
  {
   "text": "mn",
   "ipa": "n"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "s",
   "ipa": "z"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "mangea": [
  {
   "text": "m",
   "ipa": "m"
  },
  {
   "text": "ang",
   "ipa": "ɑ̃"
  },
  {
   "text": "e",
   "ipa": null
  },
  {
   "text": "a",
   "ipa": "a"
  }
 ],
 "geôlier": [
  {
   "text": "geô",
   "ipa": "ʒ"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "ie",
   "ipa": "j"
  },
  {
   "text": "r",
   "ipa": null
  }
 ],
 "comme": [
  {
   "text": "co",
   "ipa": "k"
  },
  {
   "text": "mm",
   "ipa": "m"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "note": [
  {
   "text": "n",
   "ipa": "n"
  },
  {
   "text": "o",
   "ipa": "ɔ"
  },
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "automne": [
  {
   "text": "au",
   "ipa": "o"
  },
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "o",
   "ipa": "ɔ"
  },
  {
   "text": "mn",
   "ipa": "n"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "montagne": [
  {
   "text": "m",
   "ipa": "m"
  },
  {
   "text": "ont",
   "ipa": "ɔ̃"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "gn",
   "ipa": "ɲ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "camping": [
  {
   "text": "c",
   "ipa": "k"
  },
  {
   "text": "am",
   "ipa": "ɑ̃"
  },
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "ing",
   "ipa": "ŋ"
  }
 ],
 "parking": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "k",
   "ipa": "k"
  },
  {
   "text": "i",
   "ipa": "i"
  },
  {
   "text": "ng",
   "ipa": "ŋ"
  }
 ],
 "livre": [
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "i",
   "ipa": "i"
  },
  {
   "text": "v",
   "ipa": "v"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "rue": [
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "u",
   "ipa": "y"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "terre": [
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "err",
   "ipa": "ɛ"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "rhume": [
  {
   "text": "rh",
   "ipa": "ʁ"
  },
  {
   "text": "u",
   "ipa": "y"
  },
  {
   "text": "m",
   "ipa": "m"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "taxe": [
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "x",
   "ipa": "ks"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "excellent": [
  {
   "text": "e",
   "ipa": "ɛ"
  },
  {
   "text": "xc",
   "ipa": "ks"
  },
  {
   "text": "ell",
   "ipa": "ɛ"
  },
  {
   "text": "en",
   "ipa": "ɑ̃"
  },
  {
   "text": "t",
   "ipa": null
  }
 ],
 "examen": [
  {
   "text": "e",
   "ipa": "ɛ"
  },
  {
   "text": "x",
   "ipa": "gz"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "m",
   "ipa": "m"
  },
  {
   "text": "en",
   "ipa": "ɛ̃"
  }
 ],
 "patience": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "tien",
   "ipa": "sj"
  },
  {
   "text": "ce",
   "ipa": "s"
  }
 ],
 "initier": [
  {
   "text": "i",
   "ipa": "i"
  },
  {
   "text": "n",
   "ipa": "n"
  },
  {
   "text": "it",
   "ipa": "i"
  },
  {
   "text": "ie",
   "ipa": "j"
  },
  {
   "text": "r",
   "ipa": null
  }
 ],
 "action": [
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "c",
   "ipa": "k"
  },
  {
   "text": "tion",
   "ipa": "sj"
  }
 ],
 "bataille": [
  {
   "text": "b",
   "ipa": "b"
  },
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "aille",
   "ipa": "aj"
  }
 ],
 "payant": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "a",
   "ipa": null
  },
  {
   "text": "ya",
   "ipa": "j"
  },
  {
   "text": "n",
   "ipa": null
  },
  {
   "text": "t",
   "ipa": null
  }
 ],
 "réveil": [
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "é",
   "ipa": "e"
  },
  {
   "text": "v",
   "ipa": "v"
  },
  {
   "text": "eil",
   "ipa": "ɛj"
  }
 ],
 "abeille": [
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "b",
   "ipa": "b"
  },
  {
   "text": "eille",
   "ipa": "ɛj"
  }
 ],
 "accueil": [
  {
   "text": "a",
   "ipa": "a"
  },
  {
   "text": "cc",
   "ipa": "k"
  },
  {
   "text": "ueil",
   "ipa": "œj"
  }
 ],
 "feuille": [
  {
   "text": "f",
   "ipa": "f"
  },
  {
   "text": "euille",
   "ipa": "œj"
  }
 ],
 "grenouille": [
  {
   "text": "g",
   "ipa": "g"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": "ə"
  },
  {
   "text": "n",
   "ipa": "n"
  },
  {
   "text": "ouille",
   "ipa": "uj"
  }
 ],
 "bouille": [
  {
   "text": "b",
   "ipa": "b"
  },
  {
   "text": "ouille",
   "ipa": "uj"
  }
 ],
 "mieux": [
  {
   "text": "m",
   "ipa": "m"
  },
  {
   "text": "ieux",
   "ipa": "jø"
  }
 ],
 "trois": [
  {
   "text": "t",
   "ipa": "t"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "oi",
   "ipa": "wa"
  },
  {
   "text": "s",
   "ipa": null
  }
 ],
 "poêle": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "oê",
   "ipa": "wa"
  },
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "e",
   "ipa": null
  }
 ],
 "loin": [
  {
   "text": "l",
   "ipa": "l"
  },
  {
   "text": "oin",
   "ipa": "wɛ̃"
  }
 ],
 "premier": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "e",
   "ipa": "ə"
  },
  {
   "text": "m",
   "ipa": "m"
  },
  {
   "text": "ie",
   "ipa": "j"
  },
  {
   "text": "r",
   "ipa": null
  }
 ],
 "priez": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "r",
   "ipa": "ʁ"
  },
  {
   "text": "ie",
   "ipa": "i"
  },
  {
   "text": "z",
   "ipa": null
  }
 ],
 "peur": [
  {
   "text": "p",
   "ipa": "p"
  },
  {
   "text": "eur",
   "ipa": "œ"
  }
 ],
 "seul": [
  {
   "text": "s",
   "ipa": "s"
  },
  {
   "text": "eul",
   "ipa": "œ"
  }
 ]
};
