export enum SingleNoteType {
  Note = "note",
}

export enum ChordType {
  Dim = "dim",
  Min = "min",
  Maj = "maj",
  Aug = "aug",
  Seventh = "7th",
  Maj7 = "maj7",
  Min7 = "min7",
  Dom7 = "dom7",
  MMaj7 = "mMaj7",
  Dim7 = "dim7",
  M7b5 = "m7♭5",
  Sus4 = "sus4",
  Sus2 = "sus2",
  Add9 = "add9",
  Six = "6th",
  Min6 = "min6",
}

export enum IntervalType {
  Min2 = "Minor Second",
  Maj2 = "Major Second",
  Min3 = "Minor Third",
  Maj3 = "Major Third",
  Fourth = "Perfect Fourth",
  Tritone = "Tritone",
  Fifth = "Perfect Fifth",
  Min6 = "Minor Sixth",
  Maj6 = "Major Sixth",
  Min7 = "Minor Seventh",
  Maj7 = "Major Seventh",
  Oct = "Octave",
}

export const CHORD_AND_INTERVAL_OFFSETS: { [key: string]: number[] } = {
  [SingleNoteType.Note]: [0],

  //2 notes
  [IntervalType.Min2]: [0, 1],
  [IntervalType.Maj2]: [0, 2],
  [IntervalType.Min3]: [0, 3],
  [IntervalType.Maj3]: [0, 4],
  [IntervalType.Fourth]: [0, 5],
  [IntervalType.Tritone]: [0, 6],
  [IntervalType.Fifth]: [0, 7],
  [IntervalType.Min6]: [0, 8],
  [IntervalType.Maj6]: [0, 9],
  [IntervalType.Min7]: [0, 10],
  [IntervalType.Maj7]: [0, 11],
  [IntervalType.Oct]: [0, 12],

  //3 or more notes
  [ChordType.Maj]: [0, 4, 7],
  [ChordType.Min]: [0, 3, 7],
  [ChordType.Dim]: [0, 3, 6],
  [ChordType.Aug]: [0, 4, 8],
  [ChordType.Seventh]: [0, 4, 7, 10],
  [ChordType.Maj7]: [0, 4, 7, 11],
  [ChordType.Min7]: [0, 3, 7, 10],
  [ChordType.Dom7]: [0, 4, 7, 10],
  [ChordType.MMaj7]: [0, 3, 7, 11],
  [ChordType.Dim7]: [0, 3, 6, 9],
  [ChordType.M7b5]: [0, 3, 6, 10],
  [ChordType.Sus4]: [0, 5, 7],
  [ChordType.Sus2]: [0, 2, 7],
  [ChordType.Add9]: [0, 4, 7, 14],
  [ChordType.Six]: [0, 4, 7, 9],
  [ChordType.Min6]: [0, 3, 7, 9],
};
