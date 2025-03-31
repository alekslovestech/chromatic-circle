export enum GreekModeType {
  Ionian = "Ionian",
  Dorian = "Dorian",
  Phrygian = "Phrygian",
  Lydian = "Lydian",
  Mixolydian = "Mixolydian",
  Aeolian = "Aeolian",
  Locrian = "Locrian",
}

export const MODE_PATTERNS: Record<GreekModeType, number[]> = {
  [GreekModeType.Ionian]: [0, 2, 4, 5, 7, 9, 11], // Major scale
  [GreekModeType.Dorian]: [0, 2, 3, 5, 7, 9, 10], // Minor with raised 6th
  [GreekModeType.Phrygian]: [0, 1, 3, 5, 7, 8, 10], // Minor with lowered 2nd
  [GreekModeType.Lydian]: [0, 2, 4, 6, 7, 9, 11], // Major with raised 4th
  [GreekModeType.Mixolydian]: [0, 2, 4, 5, 7, 9, 10], // Major with lowered 7th
  [GreekModeType.Aeolian]: [0, 2, 3, 5, 7, 8, 10], // Natural minor scale
  [GreekModeType.Locrian]: [0, 1, 3, 5, 6, 8, 10], // Minor with lowered 2nd and 5th
};
