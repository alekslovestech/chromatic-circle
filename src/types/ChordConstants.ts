export const CHORD_TYPES = [
    "note",
    "min3",
    "dim",
    "min",
    "maj",
    "aug",
    "7th",
    "maj7",
    "min7",
    "dom7",
    "mMaj7",
    "dim7",
    "m7♭5",
    "sus4",
    "sus2",
    "add9",
    "6",
    "min6",
  ];
  
  export const CHORD_OFFSETS: { [key: string]: number[] } = {
    note: [0],
    maj: [0, 4, 7],
    min3: [0, 3],
    min: [0, 3, 7],
    dim: [0, 3, 6],
    aug: [0, 4, 8],
    "7th": [0, 4, 7, 10],
    maj7: [0, 4, 7, 11],
    min7: [0, 3, 7, 10],
    dom7: [0, 4, 7, 10],
    mMaj7: [0, 3, 7, 11],
    dim7: [0, 3, 6, 9],
    "m7♭5": [0, 3, 6, 10],
    sus4: [0, 5, 7],
    sus2: [0, 2, 7],
    add9: [0, 4, 7, 14],
    6: [0, 4, 7, 9],
    min6: [0, 3, 7, 9],
  };