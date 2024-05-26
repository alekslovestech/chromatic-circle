export const NOTE_NAMES = [
  "C",
  "C♯/D♭",
  "D",
  "D♯/E♭",
  "E",
  "F",
  "F♯/G♭",
  "G",
  "G♯/A♭",
  "A",
  "A♯/B♭",
  "B",
];

export const CHORD_TYPES = [
  "note",
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

export function isBlackKey(nodeIndex: number) {
  return [1, 3, 6, 8, 10].includes(nodeIndex % 12);
}

// Function to calculate notes based on root note and chord type

export const calculateChordNotesFromIndex = (
  rootIndex: number,
  chordType: string
) => {
  const rootNote = NOTE_NAMES[rootIndex];
  const chordOffsets: any = CHORD_OFFSETS[chordType] as any;
  const newNotes = chordOffsets.map(
    (offset: number) => (offset + rootIndex) % 12
  );
  console.log(`Calculating notes for ${rootNote}:${chordType} = ${newNotes}`);
  return newNotes;
};
