export const MAJOR_KEY_SIGNATURES: Record<string, string[]> = {
  C: [],
  G: ["F#"],
  D: ["F#", "C#"],
  A: ["F#", "C#", "G#"],
  E: ["F#", "C#", "G#", "D#"],
  B: ["F#", "C#", "G#", "D#", "A#"],
  "F#": ["F#", "C#", "G#", "D#", "A#", "E#"], //in major key we prefer sharps
  F: ["Bb"],
  Bb: ["Bb", "Eb"],
  Eb: ["Bb", "Eb", "Ab"],
  Ab: ["Bb", "Eb", "Ab", "Db"],
  Db: ["Bb", "Eb", "Ab", "Db", "Gb"],
};

export const MINOR_KEY_SIGNATURES: Record<string, string[]> = {
  A: [],
  E: ["F#"],
  B: ["F#", "C#"],
  "F#": ["F#", "C#", "G#"],
  "C#": ["F#", "C#", "G#", "D#"],
  "G#": ["F#", "C#", "G#", "D#", "A#"],
  D: ["Bb"],
  G: ["Bb", "Eb"],
  C: ["Bb", "Eb", "Ab"],
  F: ["Bb", "Eb", "Ab", "Db"],
  Bb: ["Bb", "Eb", "Ab", "Db", "Gb"],
  Eb: ["Bb", "Eb", "Ab", "Db", "Gb", "Cb"], //in minor key we prefer flats
};
