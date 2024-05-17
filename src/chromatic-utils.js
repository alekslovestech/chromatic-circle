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
  "maj",
  "min",
  "dim",
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

export function isBlackKey(nodeIndex) {
  return [1, 3, 6, 8, 10].includes(nodeIndex % 12);
}
