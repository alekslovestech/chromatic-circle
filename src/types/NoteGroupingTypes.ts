export enum SpecialType {
  None = "None",
  Note = "Note",
}

export enum IntervalType {
  Minor2 = "Interval_Min2",
  Major2 = "Interval_Maj2",
  Minor3 = "Interval_Min3",
  Major3 = "Interval_Maj3",
  Fourth = "Interval_Fourth",
  Tritone = "Interval_Tritone",
  Fifth = "Interval_Fifth",
  Minor6 = "Interval_Min6",
  Major6 = "Interval_Maj6",
  Minor7 = "Interval_Min7",
  Major7 = "Interval_Maj7",
  Octave = "Interval_Octave",
}

export enum ChordType {
  // Triads
  Major = "Chord_Maj",
  Minor = "Chord_Min",
  Diminished = "Chord_Dim",
  Augmented = "Chord_Aug",

  // Seventh chords
  Major7 = "Chord_Maj7",
  Minor7 = "Chord_Min7",
  Dominant7 = "Chord_Dom7",
  MinorMajor7 = "Chord_MMaj7",
  HalfDiminished = "Chord_M7b5",
  Diminished7 = "Chord_Dim7",

  // Other
  Sus4 = "Chord_Sus4",
  Sus2 = "Chord_Sus2",
  Add9 = "Chord_Add9",
  Six = "Chord_Six",
  Minor6 = "Chord_Min6",
  Seven13 = "Chord_7Add13",
}

export type NoteGroupingId = IntervalType | ChordType | SpecialType;
