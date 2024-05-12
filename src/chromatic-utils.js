export const notes = [
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

export function isBlackKey(nodeIndex) {
  return [1, 3, 6, 8, 10].includes(nodeIndex % 12);
}
