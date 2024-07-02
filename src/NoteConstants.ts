//used for ambiguous display
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
//used for display if mode is sharp

export const SHARP_NAMES = [
  "C",
  "C♯",
  "D",
  "D♯",
  "E",
  "F",
  "F♯",
  "G",
  "G♯",
  "A",
  "A♯",
  "B",
];
//used for display if mode is flat

export const FLAT_NAMES = [
  "C",
  "D♭",
  "D",
  "E♭",
  "E",
  "F",
  "G♭",
  "G",
  "A♭",
  "A",
  "B♭",
  "B",
];

export const EASYSCORE_NAMES_SHARP = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export const NOTE_NAMES_UNIVERSAL = [
  { display: "C" },
  {
    display: "C♯/D♭",
    display_flat: "C♯",
    display_sharp: "D♭",
    easyscore_sharp: "C#",
    easyscore_flat: "Db",
  },
  { display: "D" },
  {
    display: "D♯/E♭",
    display_flat: "D♯",
    display_sharp: "E♭",
    easyscore_sharp: "D#",
    easyscore_flat: "Eb",
  },
  { display: "E" },
  { display: "F" },
  {
    display: "F♯/G♭",
    display_flat: "F♯",
    display_sharp: "G♭",
    easyscore_sharp: "F#",
    easyscore_flat: "Gb",
  },
  { display: "G" },
  {
    display: "G♯/A♭",
    display_flat: "G♯",
    display_sharp: "A♭",
    easyscore_sharp: "G#",
    easyscore_flat: "Ab",
  },
  { display: "A" },
  {
    display: "A♯/B♭",
    display_flat: "A♯",
    display_sharp: "B♭",
    easyscore_sharp: "A#",
    easyscore_flat: "Bb",
  },
  { display: "B" },
];
