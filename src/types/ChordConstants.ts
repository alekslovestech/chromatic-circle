import { ChordDefinition } from "./ChordDefinition";

export enum ChordAndIntervalType {
  // Single note
  Note,

  // Intervals
  Interval_Min2,
  Interval_Maj2,
  Interval_Min3,
  Interval_Maj3,
  Interval_Fourth,
  Interval_Tritone,
  Interval_Fifth,
  Interval_Min6,
  Interval_Maj6,
  Interval_Min7,
  Interval_Maj7,
  Interval_Oct,

  // Chords
  Chord_Maj,
  Chord_Min,
  Chord_Dim,
  Chord_Aug,
  Chord_Maj7,
  Chord_Min7,
  Chord_Dom7,
  Chord_Dim7,
  Chord_MMaj7,
  Chord_M7b5,
  Chord_Sus4,
  Chord_Sus2,
  Chord_Add9,
  Chord_Six,
  Chord_Min6,
}

export const CHORD_AND_INTERVAL_OFFSETS: {
  [key in ChordAndIntervalType]: ChordDefinition;
} = {
  // Single note
  [ChordAndIntervalType.Note]: new ChordDefinition([0], "note"),

  // Intervals (2 notes)
  [ChordAndIntervalType.Interval_Min2]: new ChordDefinition(
    [0, 1],
    "Minor Second"
  ),
  [ChordAndIntervalType.Interval_Maj2]: new ChordDefinition(
    [0, 2],
    "Major Second"
  ),
  [ChordAndIntervalType.Interval_Min3]: new ChordDefinition(
    [0, 3],
    "Minor Third"
  ),
  [ChordAndIntervalType.Interval_Maj3]: new ChordDefinition(
    [0, 4],
    "Major Third"
  ),
  [ChordAndIntervalType.Interval_Fourth]: new ChordDefinition(
    [0, 5],
    "Perfect Fourth"
  ),
  [ChordAndIntervalType.Interval_Tritone]: new ChordDefinition(
    [0, 6],
    "Tritone"
  ),
  [ChordAndIntervalType.Interval_Fifth]: new ChordDefinition(
    [0, 7],
    "Perfect Fifth"
  ),
  [ChordAndIntervalType.Interval_Min6]: new ChordDefinition(
    [0, 8],
    "Minor Sixth"
  ),
  [ChordAndIntervalType.Interval_Maj6]: new ChordDefinition(
    [0, 9],
    "Major Sixth"
  ),
  [ChordAndIntervalType.Interval_Min7]: new ChordDefinition(
    [0, 10],
    "Minor Seventh"
  ),
  [ChordAndIntervalType.Interval_Maj7]: new ChordDefinition(
    [0, 11],
    "Major Seventh"
  ),
  [ChordAndIntervalType.Interval_Oct]: new ChordDefinition([0, 12], "Octave"),

  // Triads
  [ChordAndIntervalType.Chord_Maj]: new ChordDefinition([0, 4, 7], "maj", true),
  [ChordAndIntervalType.Chord_Min]: new ChordDefinition([0, 3, 7], "min", true),
  [ChordAndIntervalType.Chord_Dim]: new ChordDefinition([0, 3, 6], "dim"),
  [ChordAndIntervalType.Chord_Aug]: new ChordDefinition([0, 4, 8], "aug"),

  // Seventh chords
  [ChordAndIntervalType.Chord_Maj7]: new ChordDefinition(
    [0, 4, 7, 11],
    "maj7",
    true
  ),
  [ChordAndIntervalType.Chord_Min7]: new ChordDefinition(
    [0, 3, 7, 10],
    "min7",
    true
  ),
  [ChordAndIntervalType.Chord_Dom7]: new ChordDefinition(
    [0, 4, 7, 10],
    "dom7",
    true
  ),
  [ChordAndIntervalType.Chord_Dim7]: new ChordDefinition([0, 3, 6, 9], "dim7"),
  [ChordAndIntervalType.Chord_MMaj7]: new ChordDefinition(
    [0, 3, 7, 11],
    "mMaj7",
    true
  ),
  [ChordAndIntervalType.Chord_M7b5]: new ChordDefinition(
    [0, 3, 6, 10],
    "m7♭5",
    true
  ),

  // Other chord types
  [ChordAndIntervalType.Chord_Sus4]: new ChordDefinition([0, 5, 7], "sus4"),
  [ChordAndIntervalType.Chord_Sus2]: new ChordDefinition([0, 2, 7], "sus2"),
  [ChordAndIntervalType.Chord_Add9]: new ChordDefinition([0, 4, 7, 14], "add9"),
  [ChordAndIntervalType.Chord_Six]: new ChordDefinition([0, 4, 7, 9], "6th"),
  [ChordAndIntervalType.Chord_Min6]: new ChordDefinition([0, 3, 7, 9], "min6"),
};
