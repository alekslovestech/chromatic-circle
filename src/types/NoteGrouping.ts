export enum NoteGroupingType {
  None = "None",
  Note = "Note",
  Interval = "Interval",
  Chord = "Chord",
}

export interface NoteGroupingName {
  noteGrouping: NoteGroupingType;
  name: string;
}

export enum NoteGroupingId {
  None = "Ø",

  // Single note
  Note = "Note",

  // Intervals
  Interval_Min2 = "Minor Second",
  Interval_Maj2 = "Major Second",
  Interval_Min3 = "Minor Third",
  Interval_Maj3 = "Major Third",
  Interval_Fourth = "Perfect Fourth",
  Interval_Tritone = "Tritone",
  Interval_Fifth = "Perfect Fifth",
  Interval_Min6 = "Minor Sixth",
  Interval_Maj6 = "Major Sixth",
  Interval_Min7 = "Minor Seventh",
  Interval_Maj7 = "Major Seventh",
  Interval_Oct = "Octave",

  // Chords
  Chord_Maj = "maj",
  Chord_Min = "min",
  Chord_Dim = "dim",
  Chord_Aug = "aug",
  Chord_Sus4 = "sus4",
  Chord_Sus2 = "sus2",

  Chord_Maj7 = "maj7",
  Chord_Min7 = "min7",
  Chord_Dom7 = "dom7",
  Chord_Dim7 = "dim7",
  Chord_MMaj7 = "mMaj7",
  Chord_M7b5 = "m7♭5",

  Chord_Add9 = "add9",
  Chord_Six = "6th",
  Chord_Min6 = "min6",
}

export enum NoteGroupingIdShort {
  None = "Ø",
  // Single note
  Note = "Note",
  // Intervals
  Interval_Min2 = "m2",
  Interval_Maj2 = "M2",
  Interval_Min3 = "m3",
  Interval_Maj3 = "M3",
  Interval_Fourth = "P4",
  Interval_Tritone = "Trit",
  Interval_Fifth = "P5",
  Interval_Min6 = "m6",
  Interval_Maj6 = "M6",
  Interval_Min7 = "m7",
  Interval_Maj7 = "M7",
  Interval_Oct = "Oct",

  // Chords
  Chord_Maj = "maj",
  Chord_Min = "min",
  Chord_Dim = "°",
  Chord_Aug = "+",
  Chord_Sus4 = "sus4",
  Chord_Sus2 = "sus2",

  Chord_Maj7 = "Δ",
  Chord_Min7 = "min7",
  Chord_Dom7 = "dom7",
  Chord_Dim7 = "dim7",
  Chord_MMaj7 = "mMaj7",
  Chord_M7b5 = "Ø",

  Chord_Add9 = "add9",
  Chord_Six = "6th",
  Chord_Min6 = "min6",
}
